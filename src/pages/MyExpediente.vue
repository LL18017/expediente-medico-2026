<template>
  <q-page class="q-pa-md">
    <div class="row items-center q-mb-md">
      <q-btn flat icon="arrow_back" @click="$router.back()" class="q-mr-md" />
      <div class="text-h5">Expediente del Paciente</div>
    </div>

    <!-- Tabla única con scroll -->
    <q-card class="expediente-card">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">{{ nombreCompleto }}</div>
        <div class="text-subtitle2">Clave: {{ paciente.datosPersonales?.clave || '—' }}</div>
      </q-card-section>

      <q-card-section class="q-pa0">
        <div class="scroll-container">
          <table class="expediente-table">
            <!-- DATOS PERSONALES -->
            <tbody>
              <tr class="section-header">
                <td colspan="2">DATOS PERSONALES</td>
              </tr>
              <tr>
                <td class="label">Nombre completo</td>
                <td class="value">{{ nombreCompleto }}</td>
              </tr>
              <tr>
                <td class="label">Clave</td>
                <td class="value">{{ paciente.datosPersonales?.clave || '—' }}</td>
              </tr>
              <tr>
                <td class="label">Fecha de nacimiento</td>
                <td class="value">{{ fechaNacimiento }}</td>
              </tr>
              <tr>
                <td class="label">Edad</td>
                <td class="value">{{ paciente.edad || '—' }} años</td>
              </tr>
              <tr>
                <td class="label">Sexo</td>
                <td class="value">{{ paciente.datosPersonales?.sexo || '—' }}</td>
              </tr>
              <tr>
                <td class="label">Teléfono</td>
                <td class="value">{{ paciente.datosPersonales?.telefono || '—' }}</td>
              </tr>
              <tr>
                <td class="label">Identificación</td>
                <td class="value">{{ paciente.datosPersonales?.identificacion || '—' }}</td>
              </tr>
              <tr>
                <td class="label">Oficio</td>
                <td class="value">{{ paciente.datosPersonales?.oficio || '—' }}</td>
              </tr>
              <tr>
                <td class="label">Tipo sanguíneo</td>
                <td class="value">{{ paciente.datosPersonales?.tiposanguineo || '—' }}</td>
              </tr>
              <tr>
                <td class="label">Email</td>
                <td class="value">{{ paciente.datosPersonales?.email || '—' }}</td>
              </tr>
              <tr>
                <td class="label">Dirección</td>
                <td class="value">{{ paciente.datosPersonales?.direccion || '—' }}</td>
              </tr>

              <!-- ANTECEDENTES FAMILIARES -->
              <tr class="section-header">
                <td colspan="2">ANTECEDENTES FAMILIARES</td>
              </tr>
              <tr>
                <td class="label">Diabetes</td>
                <td class="value">
                  <q-badge :color="paciente.antecedentesFamiliares?.diabetes ? 'positive' : 'negative'">
                    {{ paciente.antecedentesFamiliares?.diabetes ? 'SÍ' : 'NO' }}
                  </q-badge>
                  <span v-if="paciente.antecedentesFamiliares?.diabetesDetalle" class="detail-text">
                    ({{ paciente.antecedentesFamiliares.diabetesDetalle }})
                  </span>
                </td>
              </tr>
              <tr>
                <td class="label">Hipertensión</td>
                <td class="value">
                  <q-badge :color="paciente.antecedentesFamiliares?.hipertension ? 'positive' : 'negative'">
                    {{ paciente.antecedentesFamiliares?.hipertension ? 'SÍ' : 'NO' }}
                  </q-badge>
                  <span v-if="paciente.antecedentesFamiliares?.hipertensionDetalle" class="detail-text">
                    ({{ paciente.antecedentesFamiliares.hipertensionDetalle }})
                  </span>
                </td>
              </tr>
              <tr>
                <td class="label">Cáncer</td>
                <td class="value">
                  <q-badge :color="paciente.antecedentesFamiliares?.cancer ? 'positive' : 'negative'">
                    {{ paciente.antecedentesFamiliares?.cancer ? 'SÍ' : 'NO' }}
                  </q-badge>
                  <span v-if="paciente.antecedentesFamiliares?.cancerDetalle" class="detail-text">
                    ({{ paciente.antecedentesFamiliares.cancerDetalle }})
                  </span>
                </td>
              </tr>
              <tr>
                <td class="label">Otros</td>
                <td class="value">{{ paciente.antecedentesFamiliares?.otros || 'Ninguno' }}</td>
              </tr>

              <!-- ANTECEDENTES PATOLÓGICOS -->
              <tr class="section-header">
                <td colspan="2">ANTECEDENTES PATOLÓGICOS</td>
              </tr>
              <tr>
                <td class="label">Enfermedades</td>
                <td class="value">{{ paciente.antecedentesPatologicos?.enfermedadesDetalle || 'Ninguna' }}</td>
              </tr>
              <tr>
                <td class="label">Hospitalizaciones</td>
                <td class="value">{{ paciente.antecedentesPatologicos?.hospitalizacionesDetalle || 'Ninguna' }}</td>
              </tr>
              <tr>
                <td class="label">Transfusiones</td>
                <td class="value">{{ paciente.antecedentesPatologicos?.transfusionesDetalle || 'Ninguna' }}</td>
              </tr>
              <tr>
                <td class="label">Intervenciones quirúrgicas</td>
                <td class="value">{{ paciente.antecedentesPatologicos?.intervencionesDetalle || 'Ninguna' }}</td>
              </tr>
              <tr>
                <td class="label">Traumatismos / Fracturas</td>
                <td class="value">{{ paciente.antecedentesPatologicos?.traumatismosDetalle || 'Ninguna' }}</td>
              </tr>

              <!-- ANTECEDENTES NO PATOLÓGICOS -->
              <tr class="section-header">
                <td colspan="2"> ANTECEDENTES NO PATOLÓGICOS</td>
              </tr>
              <tr>
                <td class="label">Tabaco</td>
                <td class="value">
                  {{ paciente.antecedentesNoPatologicos?.tabaco ? 'SÍ' : 'NO' }}
                  <span v-if="paciente.antecedentesNoPatologicos?.tabacoCantidad" class="detail-text">
                    ({{ paciente.antecedentesNoPatologicos.tabacoCantidad }})
                  </span>
                </td>
              </tr>
              <tr>
                <td class="label">Alcohol</td>
                <td class="value">
                  {{ paciente.antecedentesNoPatologicos?.alcohol ? 'SÍ' : 'NO' }}
                  <span v-if="paciente.antecedentesNoPatologicos?.alcoholFrecuencia" class="detail-text">
                    ({{ paciente.antecedentesNoPatologicos.alcoholFrecuencia }})
                  </span>
                </td>
              </tr>
              <tr>
                <td class="label">Drogas</td>
                <td class="value">
                  {{ paciente.antecedentesNoPatologicos?.drogas ? 'SÍ' : 'NO' }}
                  <span v-if="paciente.antecedentesNoPatologicos?.drogasTipo" class="detail-text">
                    ({{ paciente.antecedentesNoPatologicos.drogasTipo }})
                  </span>
                </td>
              </tr>
              <tr>
                <td class="label">Medicamentos</td>
                <td class="value">
                  {{ paciente.antecedentesNoPatologicos?.medicamentos ? 'SÍ' : 'NO' }}
                  <span v-if="paciente.antecedentesNoPatologicos?.medicamentosCuales" class="detail-text">
                    ({{ paciente.antecedentesNoPatologicos.medicamentosCuales }})
                  </span>
                </td>
              </tr>
              <tr>
                <td class="label">Vacunas</td>
                <td class="value">
                  {{ paciente.antecedentesNoPatologicos?.vacunas ? 'SÍ' : 'NO' }}
                  <span v-if="paciente.antecedentesNoPatologicos?.vacunasCuales" class="detail-text">
                    ({{ paciente.antecedentesNoPatologicos.vacunasCuales }})
                  </span>
                </td>
              </tr>
              <tr>
                <td class="label">Alergias</td>
                <td class="value">
                  {{ paciente.antecedentesNoPatologicos?.alergias ? 'SÍ' : 'NO' }}
                  <span v-if="paciente.antecedentesNoPatologicos?.alergiasCuales" class="detail-text">
                    ({{ paciente.antecedentesNoPatologicos.alergiasCuales }})
                  </span>
                </td>
              </tr>
              <tr>
                <td class="label">Convivencia con animales</td>
                <td class="value">
                  {{ paciente.antecedentesNoPatologicos?.convivenciaAnimales ? 'SÍ' : 'NO' }}
                  <span v-if="paciente.antecedentesNoPatologicos?.convivenciaAnimalesCuales" class="detail-text">
                    ({{ paciente.antecedentesNoPatologicos.convivenciaAnimalesCuales }})
                  </span>
                </td>
              </tr>

              <!-- ANTECEDENTES PERINATALES -->
              <tr class="section-header">
                <td colspan="2">ANTECEDENTES PERINATALES / PEDIÁTRICOS</td>
              </tr>
              <tr>
                <td class="label">Embarazo</td>
                <td class="value">
                  {{ paciente.antecedentesPerinatales?.embarazo || '—' }}
                  <span v-if="paciente.antecedentesPerinatales?.embarazoComplicaciones" class="detail-text">
                    ({{ paciente.antecedentesPerinatales.embarazoComplicaciones }})
                  </span>
                </td>
              </tr>
              <tr>
                <td class="label">Parto</td>
                <td class="value">
                  {{ paciente.antecedentesPerinatales?.parto || '—' }}
                  <span v-if="paciente.antecedentesPerinatales?.partoComplicaciones" class="detail-text">
                    ({{ paciente.antecedentesPerinatales.partoComplicaciones }})
                  </span>
                </td>
              </tr>
              <tr>
                <td class="label">Desarrollo</td>
                <td class="value">
                  {{ paciente.antecedentesPerinatales?.desarrollo || '—' }}
                  <span v-if="paciente.antecedentesPerinatales?.desarrolloComplicaciones" class="detail-text">
                    ({{ paciente.antecedentesPerinatales.desarrolloComplicaciones }})
                  </span>
                </td>
              </tr>
              <tr>
                <td class="label">Crecimiento</td>
                <td class="value">
                  {{ paciente.antecedentesPerinatales?.crecimiento || '—' }}
                  <span v-if="paciente.antecedentesPerinatales?.crecimientoComplicaciones" class="detail-text">
                    ({{ paciente.antecedentesPerinatales.crecimientoComplicaciones }})
                  </span>
                </td>
              </tr>

              <!-- CONSULTAS MÉDICAS -->
              <tr class="section-header">
                <td colspan="2">
                  <div class="row items-center justify-between q-px-sm">
                    <span>CONSULTAS MÉDICAS</span>
                    <q-btn flat dense color="white" icon="add" label="Nueva" @click="openConsultaDialog" size="sm" />
                  </div>
                </td>
              </tr>
              <tr v-if="consultas.length === 0">
                <td colspan="2" class="text-center text-grey">No hay consultas registradas</td>
              </tr>
              <tr v-for="consulta in consultas" :key="consulta.id">
                <td class="label consulta-date">{{ consulta.fecha }}</td>
                <td class="value">
                  <div><strong>Motivo:</strong> {{ consulta.motivo }}</div>
                  <div><strong>Dx:</strong> {{ consulta.diagnostico }}</div>
                  <div class="consulta-actions">
                    <q-btn flat dense icon="edit" size="xs" @click="editarConsulta(consulta)" />
                    <q-btn flat dense icon="delete" size="xs" color="negative" @click="eliminarConsulta(consulta)" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </q-card-section>
    </q-card>

    <!-- Diálogo para nueva consulta -->
    <q-dialog v-model="showConsultaDialog">
      <q-card style="min-width: 400px; max-width: 600px;">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">{{ editandoConsulta ? 'Editar Consulta' : 'Nueva Consulta' }}</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="consultaForm.fecha" label="Fecha" type="date" outlined dense class="q-mb-sm" />
          <q-input v-model="consultaForm.motivo" label="Motivo de consulta" outlined dense type="textarea" rows="2"
            class="q-mb-sm" />
          <q-input v-model="consultaForm.diagnostico" label="Diagnóstico" outlined dense type="textarea" rows="2"
            class="q-mb-sm" />
          <q-input v-model="consultaForm.tratamiento" label="Tratamiento" outlined dense type="textarea" rows="2"
            class="q-mb-sm" />
          <q-input v-model="consultaForm.observaciones" label="Observaciones" outlined dense type="textarea" rows="2" />
        </q-card-section>
        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat label="Cancelar" v-close-popup @click="closeConsultaDialog" />
          <q-btn flat label="Guardar" color="primary" @click="guardarConsulta" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Notify } from 'quasar';

const route = useRoute();
const paciente = ref({});
const consultas = ref([]);
const showConsultaDialog = ref(false);
const editandoConsulta = ref(false);
const consultaEditId = ref(null);

const consultaForm = ref({
  fecha: new Date().toISOString().split('T')[0],
  motivo: '',
  diagnostico: '',
  tratamiento: '',
  observaciones: ''
});

const nombreCompleto = computed(() => {
  return `${paciente.value.datosPersonales?.nombres || ''} ${paciente.value.datosPersonales?.apellidos || ''}`.trim();
});

const fechaNacimiento = computed(() => {
  const { birthDay, birthMonth, birthYear } = paciente.value.datosPersonales || {};
  if (birthDay && birthMonth && birthYear) {
    return `${birthDay} de ${birthMonth} de ${birthYear}`;
  }
  return '—';
});

onMounted(() => {
  const pacienteData = route.query.paciente;
  if (pacienteData) {
    paciente.value = JSON.parse(pacienteData);
    console.log("Paciente cargado:", paciente.value)
  }
  cargarConsultas();
});


const cargarConsultas = () => {
  const saved = localStorage.getItem('consultas_${paciente.value._id}');
  consultas.value = saved ? JSON.parse(saved) : [];
};

const guardarConsultas = () => {
  localStorage.setItem(`consultas_${paciente.value._id}`, JSON.stringify(consultas.value));
};

const openConsultaDialog = () => {
  editandoConsulta.value = false;
  resetConsultaForm();
  showConsultaDialog.value = true;
};

const editarConsulta = (consulta) => {
  editandoConsulta.value = true;
  consultaEditId.value = consulta.id;
  consultaForm.value = { ...consulta };
  showConsultaDialog.value = true;
};

const guardarConsulta = () => {
  if (editandoConsulta.value) {
    const index = consultas.value.findIndex(c => c.id === consultaEditId.value);
    if (index !== -1) {
      consultas.value[index] = { ...consultaForm.value, id: consultaEditId.value };
    }
    Notify.create({ type: 'positive', message: 'Consulta actualizada' });
  } else {
    const nuevaConsulta = {
      ...consultaForm.value,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    consultas.value.push(nuevaConsulta);
    Notify.create({ type: 'positive', message: 'Consulta agregada' });
  }
  guardarConsultas();
  closeConsultaDialog();
};

const eliminarConsulta = (consulta) => {
  consultas.value = consultas.value.filter(c => c.id !== consulta.id);
  guardarConsultas();
  Notify.create({ type: 'positive', message: 'Consulta eliminada' });
};

const resetConsultaForm = () => {
  consultaForm.value = {
    fecha: new Date().toISOString().split('T')[0],
    motivo: '',
    signosVitales: '',
    diagnostico: '',
    tratamiento: '',
    observaciones: ''
  };
};

const closeConsultaDialog = () => {
  showConsultaDialog.value = false;
  editandoConsulta.value = false;
  consultaEditId.value = null;
  resetConsultaForm();
};
</script>
<style>
.bg-primary {
  background: #009688 !important;
}

.expediente-card {
  border-radius: 12px;
  overflow: hidden;
}

.scroll-container {
  max-height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
}

/* Estilos de la tabla */
.expediente-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.expediente-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
  vertical-align: top;
}

.expediente-table .label {
  width: 35%;
  font-weight: 600;
  background-color: #f5f5f5;
  color: #555;
}

.expediente-table .value {
  width: 65%;
  color: #333;
}

/* Secciones */
.section-header td {
  background: #009688;
  color: white;
  font-weight: bold;
  font-size: 14px;
  padding: 10px 16px;
}

/* Detalles adicionales */
.detail-text {
  font-size: 12px;
  color: #666;
  margin-left: 4px;
}

/* Consultas */
.consulta-date {
  font-weight: 600;
  background-color: #fafafa;
  vertical-align: middle;
}

.consulta-actions {
  margin-top: 8px;
  display: flex;
  gap: 8px;
}

/* Scroll personalizado */
.scroll-container::-webkit-scrollbar {
  width: 6px;
}

.scroll-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.scroll-container::-webkit-scrollbar-thumb {
  background: #009688;
  border-radius: 3px;
}

/* Responsive */
@media (max-width: 600px) {
  .expediente-table .label {
    width: 40%;
  }

  .expediente-table td {
    padding: 10px 12px;
    font-size: 13px;
  }
}
</style>
