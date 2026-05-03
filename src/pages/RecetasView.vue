<template>
  <q-page class="bg-grey-2 flex flex-center q-pa-md recipe-page">
    <div v-if="loading" class="flex flex-center">
      <q-spinner-dots color="teal" size="3em" />
    </div>

    <q-card v-else-if="consulta" class="main-block-card shadow-10 rounded-borders-lg overflow-hidden">
      <!-- Top Banner / Header -->
      <div class="bg-gradient-teal text-white q-pa-sm row items-center justify-between print-hide">
        <q-btn flat round dense icon="arrow_back" @click="$router.back()" class="q-mr-sm" />
        <div class="text-h6 text-weight-bold letter-spacing-1">DataDoc - Expediente Médico</div>
        <q-btn flat round dense icon="print" @click="windowPrint" />
      </div>

      <!-- Contenedor Interno Flex para aprovechar altura -->
      <div class="q-pa-md flex column wrapper-content">
        
        <!-- Encabezado del Doctor y Membrete -->
        <div class="row justify-between items-center q-mb-md border-bottom-light q-pb-sm">
          <div>
            <div class="text-h5 text-weight-bold text-teal-9">Dr. Venas Azules</div>
            <div class="text-subtitle2 text-grey-8">Cardiólogo | JVPM: WM-28323</div>
          </div>
          <div class="text-right text-caption text-grey-8 text-weight-medium">
            <div>Hospital Independiente</div>
            <div>Consultorio 102-D</div>
          </div>
        </div>

        <!-- 3 Columnas Principales Compactas -->
        <div class="row q-col-gutter-md q-mb-md">
          <!-- Datos Paciente -->
          <div class="col-12 col-md-4">
            <div class="info-box bg-blue-50 q-pa-md rounded-borders h-100 border-light">
              <div class="text-subtitle2 text-blue-9 q-mb-sm flex items-center text-weight-bold">
                <q-icon name="person" size="sm" class="q-mr-xs"/> Paciente
              </div>
              <div class="text-body2 text-weight-bold text-black text-uppercase">{{ consulta.paciente.nombre }} {{ consulta.paciente.apellidos }}</div>
              <div class="text-caption text-grey-9 q-mt-xs">{{ getEdad(consulta.paciente.fecha_nacimiento) }} años | Nac: {{ formatFechaCorta(consulta.paciente.fecha_nacimiento) }}</div>
              <div class="text-caption text-grey-9">Doc: {{ consulta.paciente.doc.tipo }} {{ consulta.paciente.doc.valor }}</div>
            </div>
          </div>

          <!-- Datos Consulta -->
          <div class="col-12 col-md-4">
            <div class="info-box bg-teal-50 q-pa-md rounded-borders h-100 border-light">
              <div class="text-subtitle2 text-teal-9 q-mb-sm flex items-center text-weight-bold">
                <q-icon name="event_note" size="sm" class="q-mr-xs"/> Consulta
              </div>
              <div class="text-body2 text-weight-bold text-black text-capitalize">{{ formatFecha(consulta.fecha) }}</div>
              <div class="text-caption text-grey-9 q-mt-xs">Nº Expediente: <strong>{{ consulta._id }}</strong></div>
              <div class="text-caption text-grey-9">Peso: {{ consulta.peso }}kg | Alt: {{ consulta.estatura }}m | PA: {{ consulta.presionarterial }}</div>
            </div>
          </div>

          <!-- Diagnostico -->
          <div class="col-12 col-md-4">
             <div class="info-box bg-orange-50 q-pa-md rounded-borders h-100 border-light">
              <div class="text-subtitle2 text-orange-9 q-mb-sm flex items-center text-weight-bold">
                <q-icon name="medical_services" size="sm" class="q-mr-xs"/> Evaluación
              </div>
              <div class="text-caption text-grey-10 q-mb-xs lines-2" :title="consulta.motivo"><strong>Motivo:</strong> {{ consulta.motivo }}</div>
              <div class="text-caption text-grey-10 lines-2" :title="consulta.diagnostico"><strong>Dx:</strong> {{ consulta.diagnostico }}</div>
            </div>
          </div>
        </div>

        <!-- Receta Médica (Área de scroll interno) -->
        <div class="flex column receta-container">
          <div class="text-subtitle1 text-weight-bold text-green-9 q-mb-sm flex items-center border-bottom-light q-pb-xs">
            <q-icon name="vaccines" size="sm" class="q-mr-xs"/> Receta Médica / Indicaciones
          </div>
          
          <div class="scroll-area-receta bg-grey-1 rounded-borders q-pa-sm border-light">
             <div v-if="consulta.recetas && consulta.recetas.length > 0" class="row q-col-gutter-sm">
                <div class="col-12 col-md-6" v-for="(receta, index) in consulta.recetas" :key="index">
                  <div class="bg-white border-light rounded-borders q-pa-sm row items-center medication-item shadow-1">
                    <q-icon name="medication" color="green-6" size="md" class="q-mr-md"/>
                    <div class="col">
                       <div class="text-body2 text-weight-bold text-black">{{ receta.medicamento }} <span class="text-grey-6 text-weight-regular float-right">#{{ receta.cantidad }}</span></div>
                       <div class="text-caption text-grey-9 q-mt-xs">{{ receta.dosis }} | {{ receta.frecuencia }} | {{ receta.durante }}</div>
                       <div v-if="receta.observaciones" class="text-caption text-green-9 q-mt-xs bg-green-1 q-pa-xs rounded-borders"><em>{{ receta.observaciones }}</em></div>
                    </div>
                  </div>
                </div>
             </div>
             <div v-else class="text-center text-grey-6 q-pa-md">Sin medicamentos recetados.</div>
          </div>
        </div>

        <!-- Footer de la Receta -->
        <div class="row justify-between items-end q-mt-md text-caption text-grey-7 print-footer border-top-light q-pt-sm">
          <div>
            <div class="text-weight-bold text-grey-8">Consultorio DataDoc</div>
            <div>Av. Juan Pérez No.1234 Col.San Juan | Datadoc@gmail.com | Tel: 1234-5678</div>
          </div>
          <div class="text-center">
            <div style="border-bottom: 1px solid #999; width: 150px; margin-bottom: 4px;"></div>
            <div>Firma / Sello del Médico</div>
          </div>
        </div>

      </div>
    </q-card>

    <div v-else class="flex flex-center q-pa-xl text-h6 text-grey-6 column">
      <q-icon name="error_outline" size="4rem" color="grey-4" class="q-mb-md"/>
      Consulta no encontrada.
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const consulta = ref(null);
const loading = ref(true);

const fetchConsultas = async () => {
  try {
    const response = await fetch('/data/consultas.json');
    if (!response.ok) throw new Error('Error al cargar datos');
    const data = await response.json();
    const id = route.query.id;
    if (id) {
      consulta.value = data.find(c => c._id === id) || data[0];
    } else {
      consulta.value = data[0];
    }
  } catch (error) {
    console.error('Error fetching consultas:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchConsultas();
});

const windowPrint = () => {
  window.print();
};

const formatFecha = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('es-ES', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  }).format(date);
};

const formatFechaCorta = (dateString) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

const getEdad = (fechaNacimiento) => {
  if (!fechaNacimiento) return '';
  const hoy = new Date();
  const nac = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nac.getFullYear();
  const m = hoy.getMonth() - nac.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) {
    edad--;
  }
  return edad;
};
</script>

<style scoped>
/* Asegura que el contenedor principal controle el alto */
.recipe-page {
  font-family: 'Inter', 'Roboto', sans-serif;
  min-height: 100vh;
}

/* El bloque único que ocupará la pantalla */
.main-block-card {
  width: 100%;
  max-width: 1100px;
  max-height: 92vh;  /* Límite para que no se salga de la pantalla */
  display: flex;
  flex-direction: column;
  overflow-y: auto;  /* El scroll ahora sucede en todo el cuadro general */
}

/* Estilizar el scroll general */
.main-block-card::-webkit-scrollbar { width: 8px; }
.main-block-card::-webkit-scrollbar-track { background: transparent; }
.main-block-card::-webkit-scrollbar-thumb { background: #b0bec5; border-radius: 10px; }
.main-block-card::-webkit-scrollbar-thumb:hover { background: #90a4ae; }

.wrapper-content {
  display: flex;
  flex-direction: column;
}

/* Colores suaves para diferenciar secciones compactas */
.bg-gradient-teal { background: linear-gradient(135deg, #00897b 0%, #004d40 100%); }
.bg-blue-50 { background-color: #f0f7ff; }
.bg-teal-50 { background-color: #f0fbf9; }
.bg-orange-50 { background-color: #fffaf0; }

.border-bottom-light { border-bottom: 1px solid #e0e0e0; }
.border-top-light { border-top: 1px solid #e0e0e0; }
.border-light { border: 1px solid #eeeeee; }

.rounded-borders-lg { border-radius: 16px; }
.h-100 { height: 100%; }

/* Truncar texto muy largo a 2 lineas en diagnostico si es necesario */
.lines-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}

/* Manejo de la lista de recetas para que crezca libremente */
.receta-container {
  display: flex;
  flex-direction: column;
}

.scroll-area-receta {
  height: auto;
}

.medication-item {
  transition: transform 0.2s;
}
.medication-item:hover {
  transform: translateY(-2px);
  border-color: #4caf50;
}

@media print {
  .print-hide { display: none !important; }
  .recipe-page { height: auto; min-height: 0; display: block; padding: 0 !important; }
  .main-block-card { max-height: none !important; max-width: 100%; box-shadow: none !important; border: 1px solid #ccc; overflow: visible !important; }
  .wrapper-content { overflow: visible !important; }
  .receta-container { overflow: visible !important; }
  .scroll-area-receta { overflow: visible !important; min-height: auto; border: none; background: transparent !important; }
  .bg-blue-50, .bg-teal-50, .bg-orange-50 { background-color: transparent !important; }
}
</style>

<style>
/* Estilos globales para la impresión: oculta la barra lateral, cabeceras y ajusta el contenedor principal */
@media print {
  .q-drawer, .q-header, .q-footer {
    display: none !important;
  }
  .q-page-container {
    padding: 0 !important;
  }
  body, html {
    background: white !important;
  }
}
</style>