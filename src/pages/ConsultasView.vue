<template>
  <q-page class="bg-grey-2 q-pa-md">
    <!-- SECCIÓN DE FILTROS -->
    <div class="row q-col-gutter-sm q-mb-lg justify-center">
      <div class="col-10 col-md-6">
        <q-input v-model="filtroTexto" placeholder="Buscar por paciente o motivo..." bg-color="white" outlined rounded
          dense>
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <div class="col-2 col-md-1 flex flex-center">
        <q-btn flat round color="teal" icon="sort" :class="ordenAscendente ? 'rotate-180' : 'normal-rotate'"
          @click="ordenAscendente = !ordenAscendente" />


      </div>

    </div>

    <!-- LISTA DE CONSULTAS -->
    <div class="max-width-container" style="max-width: 900px; margin: 0 auto;">
      <q-list bordered separator class="bg-white rounded-borders shadow-2">

        <q-expansion-item v-for="item in consultasFiltradas" :key="item._id" group="consultas" icon="medical_services"
          :label="`${item.paciente.nombre} ${item.paciente.apellidos}`"
          :caption="new Date(item.fecha).toLocaleDateString() + ' - ' + item.motivo"
          header-class="text-teal-9 text-weight-bold">
          <q-card>
            <q-card-section class="row q-col-gutter-sm" style="overflow: hidden;">

              <!-- Diagnóstico -->
              <div class="col-12">
                <div class="text-subtitle2 text-teal">Diagnóstico</div>
                <div class="text-body2 q-mt-sm">{{ item.diagnostico }}</div>
              </div>

              <!-- Recetas -->
              <div class="col-12" v-if="item.recetas.length">
                <div class="text-subtitle2 text-secondary">Receta</div>
                <q-chip v-for="(rec, idx) in item.recetas" :key="idx" outline color="secondary" icon="medication">
                  {{ rec.medicamento }} ({{ rec.dosis }})
                </q-chip>
              </div>
              <q-card-actions align="right" class="q-px-md q-pb-md">
                <q-btn flat color="teal" label="Ver Detalles Completos" icon-right="chevron_right"
                  class="text-weight-bold" no-caps>
                  <q-tooltip>Abrir expediente detallado de esta consulta</q-tooltip>
                </q-btn>
              </q-card-actions>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-item v-if="consultasFiltradas.length === 0">
          <q-item-section class="text-center text-grey">
            No se encontraron consultas con esos filtros.
          </q-item-section>
        </q-item>

      </q-list>
    </div>
  </q-page>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
// import PouchDB from 'pouchdb'

const listaConsultas = ref([]) //lista qye guarda los datos
// const db = new PouchDB('consultas')


// variable que contiene lo que se quwierre filtrar
const filtroTexto = ref('')
const ordenAscendente = ref(false)

const consultasFiltradas = computed(() => {
  let resultado = [...listaConsultas.value]

  // Filtro por texto
  if (filtroTexto.value) {
    const busqueda = filtroTexto.value.toLowerCase()
    resultado = resultado.filter(c =>
      c.paciente.nombre.toLowerCase().includes(busqueda) ||
      c.paciente.apellidos.toLowerCase().includes(busqueda) ||
      c.motivo.toLowerCase().includes(busqueda)
    )
  }

  // orden
  return resultado.sort((a, b) => {
    const fechaA = new Date(a.fecha)
    const fechaB = new Date(b.fecha)
    return ordenAscendente.value ? fechaA - fechaB : fechaB - fechaA
  })
})

const cargarConsultas = async () => {
  try {
    //mock
    const response = await fetch('/data/consultas.json')
    const data = await response.json()
    listaConsultas.value = data

    /* Pouch real
    const result = await db.allDocs({ include_docs: true })
    listaConsultas.value = result.rows.map(row => row.doc)Po
    */
  } catch (error) {
    console.error('Error cargando datos:', error)
  }
}


onMounted(() => {
  cargarConsultas()
})

</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}

.normal-rotate {
  transform: rotate(0deg);
  transition: transform 0.3s ease;
}
</style>
