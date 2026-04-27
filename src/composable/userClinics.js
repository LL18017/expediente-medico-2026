import { ref, computed } from 'vue'

const clinics = ref([])
const selectedClinic = ref(null)

export function userClinics() {

  const loadClinics = () => {
    const data = localStorage.getItem('clinics')

    if (data) {
      clinics.value = JSON.parse(data)
    } else {
      clinics.value = [
        {
          id: 1,
          name: 'Hospital San Juan de Dios',
          lat: 13.9942,
          lng: -89.5597
        },
        {
          id: 2,
          name: 'Clínica Médica Santa Ana',
          lat: 13.9915,
          lng: -89.5560
        },
        {
          id: 3,
          name: 'Centro Médico Lamatepec',
          lat: 13.9970,
          lng: -89.5650
        }
      ]

      localStorage.setItem('clinics', JSON.stringify(clinics.value))
    }
  }

  const addClinic = (clinic) => {
    clinic.id = Date.now()
    clinics.value.push(clinic)
    localStorage.setItem('clinics', JSON.stringify(clinics.value))
  }

  const deleteClinic = (clinic) => {

    console.log(clinic);

    if (!clinic) return

    clinics.value = clinics.value.filter(
      c => c.id !== clinic.id
    )

    // limpiar selección
    if (selectedClinic.value?.id === clinic.id) {
      selectedClinic.value = null
    }

    localStorage.setItem('clinics', JSON.stringify(clinics.value))
  }


  const selectClinic = (clinic) => {
    selectedClinic.value = clinic
  }

  const totalClinics = computed(() => clinics.value.length)

  return {
    clinics,
    selectedClinic,
    totalClinics,
    loadClinics,
    addClinic,
    deleteClinic,
    selectClinic
  }
}