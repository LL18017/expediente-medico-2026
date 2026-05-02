<template>
  <div class="bg-grey-2 row q-col-gutter-md q-ma-sm">

    <!-- formularios -->
    <div class="col-12 col-md-4">
      <q-card class="bg-white text-dark full-height column">

        <q-card-section class="bg-teal-5 text-white">
          <div class="text-h6">
            Clínicas ({{ totalClinics }})
          </div>
        </q-card-section>
        <!-- CHECK -->
        <q-card-section>
          <q-checkbox v-model="showForm" label="Crear clinica" />
        </q-card-section>
        <!-- clinicas -->
        <q-card-section v-if="!showForm">
          <q-select filled v-model="selectedClinic" :options="clinics" option-label="name" label="Selecionar clínica"
            @update:model-value="handleSelectClinic" color="teal" />
        </q-card-section>

        <!-- tipo de ubicaiones -->
        <q-card-section v-if="showForm">
          <q-select filled v-model="locationMode" :options="locationOptions" label="Seleccionar ubicación" color="teal"
            @update:model-value="handleLocationMode" />
        </q-card-section>
        <!-- boton de eliminar -->
        <div class="row justify-center q-gutter-sm q-my-md" v-if="!showForm">
          <q-btn color="red" label="Eliminar clínica" :disable="!selectedClinic" @click="removeClinic" />
        </div>
        <!-- crear-->
        <q-slide-transition>
          <q-card-section v-if="showForm">

            <q-input filled v-model="newClinic.name" label="Nombre clínica" />


            <div class="row justify-center q-gutter-sm q-my-md">
              <q-btn class="q-mt-md" color="teal-5" label="Guardar clínica" @click="saveClinic" />
            </div>
          </q-card-section>
        </q-slide-transition>

      </q-card>
    </div>

    <!-- mapa -->
    <div class="col-12 col-md-8">
      <q-card class="full-height column">

        <!-- BUSCADOR -->
        <div class="q-pa-sm " v-if="showForm">
          <div class="q-pa-sm" v-if="showForm">
            <q-select filled v-model="selectedPlace" use-input hide-selected fill-input input-debounce="400"
              :options="searchOptions" option-label="label" label="Buscar ubicación..." @filter="filterPlaces"
              @update:model-value="selectPlace" @keyup.enter="selectFirstOption" />
          </div>
        </div>

        <q-card-section class="col-grow">
          <div ref="mapRef" class="map-container"></div>
        </q-card-section>

      </q-card>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, onBeforeUnmount } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Notify } from 'quasar'
// 👇 composable
import { userClinics } from 'src/composable/userClinics'

const {
  clinics,
  selectedClinic,
  totalClinics,
  loadClinics,
  addClinic,
  deleteClinic,
  selectClinic
} = userClinics()

// mapa
const map = ref(null)
const marker = ref(null)
const mapRef = ref(null)

// buscador
const mapSearch = ref('')
const searchOptions = ref([])
const selectedPlace = ref(null)

//ubicación
const locationOptions = [
  'Ubicación actual',
  'Seleccionar en mapa'
]
const locationMode = ref(locationOptions[0])

const selecting = ref(false)

// nueva clínica
const newClinic = ref({
  name: '',
  lat: null,
  lng: null
})

//mostrar formulario
const showForm = ref(false)

// INIT
onMounted(() => {
  loadClinics();
  handleLocationMode(locationOptions[0]);
  map.value = L.map(mapRef.value).setView([13.99, -89.56], 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    .addTo(map.value)

  // fix inicial
  setTimeout(() => {
    map.value.invalidateSize()
  }, 300)

  map.value.on('click', (e) => {
    if (!selecting.value) return

    const { lat, lng } = e.latlng

    newClinic.value.lat = lat
    newClinic.value.lng = lng

    setMarker(lat, lng)
  })
})

// limpiar mapa
onBeforeUnmount(() => {
  if (map.value) {
    map.value.off()
    map.value.remove()
    map.value = null
  }
})

// recalcular cuando cambia layout
watch(showForm, async () => {
  await nextTick()
  setTimeout(() => {
    map.value?.invalidateSize()
  }, 200)
})

// marcador
const setMarker = (lat, lng) => {
  if (marker.value) map.value.removeLayer(marker.value)

  marker.value = L.marker([lat, lng]).addTo(map.value)
  map.value.setView([lat, lng], 15)

  // fix render
  setTimeout(() => {
    map.value.invalidateSize()
  }, 100)
}
//limpia el marcador
const clearMarker = () => {
  if (marker.value) {
    map.value.removeLayer(marker.value)
    marker.value = null
  }
}

// modo ubicación
const handleLocationMode = (mode) => {
  clearMarker()

  newClinic.value.lat = null
  newClinic.value.lng = null

  if (mode === 'Ubicación actual') {
    selecting.value = false

    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude
      const lng = pos.coords.longitude

      newClinic.value.lat = lat
      newClinic.value.lng = lng

      setMarker(lat, lng)
    })
  }

  if (mode === 'Seleccionar en mapa') {
    selecting.value = true
  }
}



const filterPlaces = async (val, update) => {
  if (!val) {
    update(() => {
      searchOptions.value = []
    })
    return
  }

  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${val}`
  )

  const data = await res.json()

  update(() => {
    searchOptions.value = data.map(item => ({
      label: item.display_name,
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon)
    }))
  })
}

const selectPlace = (place) => {
  if (!place) return

  newClinic.value.lat = place.lat
  newClinic.value.lng = place.lng

  setMarker(place.lat, place.lng)
}
const selectFirstOption = () => {
  if (searchOptions.value.length > 0) {
    selectPlace(searchOptions.value[0])
  }
}
//guaradar clinica
const saveClinic = () => {
  if (!newClinic.value.name || !newClinic.value.lat) {
    Notify.create({
      type: 'warning',
      message: 'Completa nombre y ubicación',
      position: 'top-right'
    })
    return
  }

  addClinic({ ...newClinic.value })

  Notify.create({
    type: 'positive',
    message: 'Clínica guardada correctamente',
    position: 'top-right'
  })

  newClinic.value = { name: '', lat: null, lng: null }
  showForm.value = false
  clearMarker()

}


const removeClinic = () => {
  if (!selectedClinic.value) {
    Notify.create({
      type: 'warning',
      message: 'Selecciona una clínica',
      position: 'top-right'
    })
    return
  }

  deleteClinic(selectedClinic.value)

  Notify.create({
    type: 'negative',
    message: 'Clínica eliminada',
    position: 'top-right'
  })
  navigator.geolocation.getCurrentPosition((pos) => {
    const lat = pos.coords.latitude
    const lng = pos.coords.longitude

    newClinic.value.lat = lat
    newClinic.value.lng = lng

    setMarker(lat, lng)
  })
  clearMarker();


}


//  seleccionar clínica
const handleSelectClinic = (clinic) => {
  selectClinic(clinic)

  if (clinic) {
    setMarker(clinic.lat, clinic.lng)
  }
}
</script>

<style>
.map-container {
  height: 100%;
  min-height: 500px;
  width: 100%;
}
</style>
