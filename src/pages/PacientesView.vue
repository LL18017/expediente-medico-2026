<template>
  <q-page class="q-pa-md mobile-scroll-page">
    <div class="text-h6 q-mb-md">Administración de Pacientes</div>

    <!-- Indicador de carga -->
    <div v-if="isLoading" class="row justify-center q-pa-md">
      <q-spinner color="primary" size="3rem" />
      <p class="q-ml-md">Cargando pacientes...</p>
    </div>

    <div v-else>
      <q-table :rows="filteredUsers" :columns="columns" row-key="_id" :filter="filter" :grid="$q.screen.lt.md" flat
        bordered style="width: 100%">
        <template v-slot:top>
          <div class="row column item-start full-width items-center q-gutter-sm">
            <q-space />
            <div class="row items-center justify-between full-width">
              <q-input dense debounce="300" v-model="filter" placeholder="Buscar..." outlined clearable
                style="width: 450px">
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
              <q-btn color="primary" icon="add" label="Nuevo Paciente" @click="addPatient" class="q-mt-sm" />
            </div>
          </div>
        </template>

        <template v-slot:body-cell-acciones="props">
          <q-td align="center" class="q-gutter-sm">
            <q-btn dense flat icon="folder" color="info" @click="verExpediente(props.row)">
              <q-tooltip>Ver Expediente</q-tooltip>
            </q-btn>
            <q-btn dense flat icon="delete" color="negative" @click="deletePatient(props.row)">
              <q-tooltip>Eliminar</q-tooltip>
            </q-btn>
          </q-td>
        </template>

        <!-- Vista Móvil -->
        <template v-slot:item="props">
          <div class="q-pa-sm col-12 col-sm-6 col-md-4">
            <q-card>
              <q-card-section>
                <div class="text-h6 text-truncate">{{ props.row.nombres }} {{ props.row.apellidos }}</div>
                <div class="text-subtitle2">Teléfono: {{ props.row.telefono }}</div>
                <div class="text-subtitle2">Identificación: {{ props.row.doc?.valor }}</div>
              </q-card-section>
              <q-card-section class="q-pt-none">
                <div><strong>Estado:</strong> Activo</div>
                <div><strong>Fecha nacimiento:</strong> {{ props.row.fecha_nacimiento }}</div>
              </q-card-section>
              <q-separator />
              <q-card-actions align="right">
                <q-btn flat icon="folder" color="info" @click="verExpediente(props.row)" size="sm" />
                <q-btn flat icon="delete" color="negative" @click="deletePatient(props.row)" size="sm" />
              </q-card-actions>
            </q-card>
          </div>
        </template>
      </q-table>
    </div>

    <!-- MODAL DE 5 PASOS -->
    <q-dialog v-model="showDialog" persistent class="fixed-size-dialog">
      <q-card class="fixed-size-card">
        <q-card-section class="bg-primary text-white">
          <div class="row items-center no-wrap">
            <div class="col-auto">
              <img :src="logo" alt="Logo"
                style="height: 50px; width: auto; background: rgba(255,255,255,0.2); border-radius: 10px; padding: 5px 10px;" />
            </div>
            <div class="col q-ml-md">
              <div class="text-h6">{{ dialogTitle }}</div>
              <div class="text-subtitle2">Paso {{ currentStep }} de 5</div>
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-md fixed-content">
          <!-- PASO 1: DATOS PERSONALES -->
          <div v-if="currentStep === 1">
            <div class="text-h6 text-primary q-mb-md">Datos personales</div>
            <div class="field-group">
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input v-model="formData.datosPersonales.nombres" label="Nombres *" outlined dense
                    :rules="[val => !!val || 'Campo obligatorio']" />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="formData.datosPersonales.apellidos" label="Apellidos" outlined dense />
                </div>
                <div class="col-12">
                  <div class="text-caption text-grey q-mb-sm">Fecha de nacimiento</div>
                  <div class="row q-col-gutter-sm">
                    <div class="col-4">
                      <q-select v-model="formData.datosPersonales.birthDay" :options="daysOptions" label="Día" outlined
                        dense />
                    </div>
                    <div class="col-4">
                      <q-select v-model="formData.datosPersonales.birthMonth" :options="monthsOptions" label="Mes"
                        outlined dense />
                    </div>
                    <div class="col-4">
                      <q-input v-model="formData.datosPersonales.birthYear" label="Año" outlined dense type="number" />
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="text-caption text-grey q-mb-sm">Sexo</div>
                  <q-radio v-model="formData.datosPersonales.sexo" val="Hombre" label="Hombre" color="primary" />
                  <q-radio v-model="formData.datosPersonales.sexo" val="Mujer" label="Mujer" color="primary" />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="formData.datosPersonales.telefono" label="Teléfono *" outlined dense
                    :rules="[val => !!val || 'Campo obligatorio']" />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="formData.datosPersonales.identificacion" label="Identificación" outlined dense />
                </div>
                <div class="col-12">
                  <q-input v-model="formData.datosPersonales.oficio" label="Oficio" outlined dense />
                </div>
                <div class="col-12">
                  <q-input v-model="formData.datosPersonales.direccion" label="Dirección" outlined dense type="textarea"
                    rows="2" />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="formData.datosPersonales.tiposanguineo" label="Tipo sanguíneo" outlined dense />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="formData.datosPersonales.email" label="Email" outlined dense type="email" />
                </div>
              </div>
              <!-- Mostrar edad calculada -->
              <div v-if="edadCalculada !== null" class="row q-mt-md">
                <div class="col-12">
                  <q-badge color="info" label="Edad calculada" />
                  <span class="q-ml-sm">{{ edadCalculada }} años</span>
                </div>
              </div>
            </div>
          </div>

          <!-- PASO 2: ANTECEDENTES FAMILIARES -->
          <div v-if="currentStep === 2">
            <div class="text-h6 text-primary q-mb-md">Antecedentes Familiares</div>
            <div class="field-group">
              <div class="field-row">
                <div class="field-label">Diabetes</div>
                <div class="field-value">
                  <q-btn-toggle v-model="formData.antecedentesFamiliares.diabetes"
                    :options="[{ label: 'NO', value: false }, { label: 'SI', value: true }]"
                    class="custom-toggle-group" />
                </div>
              </div>
              <div v-if="formData.antecedentesFamiliares.diabetes" class="field-detail">
                <q-input v-model="formData.antecedentesFamiliares.diabetesDetalle" label="Especificar" outlined dense
                  placeholder="Ejemplo: Abuelo materno" />
              </div>

              <div class="field-row">
                <div class="field-label">Hipertensión</div>
                <div class="field-value">
                  <q-btn-toggle v-model="formData.antecedentesFamiliares.hipertension"
                    :options="[{ label: 'NO', value: false }, { label: 'SI', value: true }]"
                    class="custom-toggle-group" />
                </div>
              </div>
              <div v-if="formData.antecedentesFamiliares.hipertension" class="field-detail">
                <q-input v-model="formData.antecedentesFamiliares.hipertensionDetalle" label="Especificar" outlined
                  dense placeholder="Ejemplo: Padre" />
              </div>

              <div class="field-row">
                <div class="field-label">Cáncer</div>
                <div class="field-value">
                  <q-btn-toggle v-model="formData.antecedentesFamiliares.cancer"
                    :options="[{ label: 'NO', value: false }, { label: 'SI', value: true }]"
                    class="custom-toggle-group" />
                </div>
              </div>
              <div v-if="formData.antecedentesFamiliares.cancer" class="field-detail">
                <q-input v-model="formData.antecedentesFamiliares.cancerDetalle" label="Especificar" outlined dense />
              </div>

              <div class="field-row">
                <div class="field-label">Otros</div>
                <div class="field-value">
                  <q-input v-model="formData.antecedentesFamiliares.otros" label="Especificar" outlined dense />
                </div>
              </div>
            </div>
          </div>

          <!-- PASO 3: ANTECEDENTES PATOLÓGICOS -->
          <div v-if="currentStep === 3">
            <div class="text-h6 text-primary q-mb-md">Antecedentes Patológicos</div>
            <div class="field-group">
              <div class="field-row">
                <div class="field-label">Enfermedades</div>
                <div class="field-value">
                  <q-toggle v-model="formData.antecedentesPatologicos.enfermedades" color="primary" />
                </div>
              </div>
              <div v-if="formData.antecedentesPatologicos.enfermedades" class="field-detail">
                <q-input v-model="formData.antecedentesPatologicos.enfermedadesDetalle" label="Especificar" outlined
                  dense />
              </div>

              <div class="field-row">
                <div class="field-label">Hospitalizaciones</div>
                <div class="field-value">
                  <q-toggle v-model="formData.antecedentesPatologicos.hospitalizaciones" color="primary" />
                </div>
              </div>
              <div v-if="formData.antecedentesPatologicos.hospitalizaciones" class="field-detail">
                <q-input v-model="formData.antecedentesPatologicos.hospitalizacionesDetalle" label="Especificar"
                  outlined dense />
              </div>

              <div class="field-row">
                <div class="field-label">Transfusiones</div>
                <div class="field-value">
                  <q-toggle v-model="formData.antecedentesPatologicos.transfusiones" color="primary" />
                </div>
              </div>
              <div v-if="formData.antecedentesPatologicos.transfusiones" class="field-detail">
                <q-input v-model="formData.antecedentesPatologicos.transfusionesDetalle" label="Especificar" outlined
                  dense />
              </div>

              <div class="field-row">
                <div class="field-label">Intervenciones Quirúrgicas</div>
                <div class="field-value">
                  <q-toggle v-model="formData.antecedentesPatologicos.intervenciones" color="primary" />
                </div>
              </div>
              <div v-if="formData.antecedentesPatologicos.intervenciones" class="field-detail">
                <q-input v-model="formData.antecedentesPatologicos.intervencionesDetalle" label="Especificar" outlined
                  dense />
              </div>

              <div class="field-row">
                <div class="field-label">Traumatismos / Fracturas</div>
                <div class="field-value">
                  <q-toggle v-model="formData.antecedentesPatologicos.traumatismos" color="primary" />
                </div>
              </div>
              <div v-if="formData.antecedentesPatologicos.traumatismos" class="field-detail">
                <q-input v-model="formData.antecedentesPatologicos.traumatismosDetalle" label="Especificar" outlined
                  dense />
              </div>
            </div>
          </div>

          <!-- PASO 4: ANTECEDENTES NO PATOLÓGICOS -->
          <div v-if="currentStep === 4">
            <div class="text-h6 text-primary q-mb-md">Antecedentes No Patológicos</div>
            <div class="field-group">
              <div class="field-row">
                <div class="field-label">Tabaco</div>
                <div class="field-value">
                  <q-toggle v-model="formData.antecedentesNoPatologicos.tabaco" color="primary" />
                </div>
              </div>
              <div v-if="formData.antecedentesNoPatologicos.tabaco" class="field-detail">
                <q-input v-model="formData.antecedentesNoPatologicos.tabacoCantidad" label="Cantidad / Frecuencia"
                  outlined dense />
              </div>

              <div class="field-row">
                <div class="field-label">Alcohol</div>
                <div class="field-value">
                  <q-toggle v-model="formData.antecedentesNoPatologicos.alcohol" color="primary" />
                </div>
              </div>
              <div v-if="formData.antecedentesNoPatologicos.alcohol" class="field-detail">
                <q-input v-model="formData.antecedentesNoPatologicos.alcoholFrecuencia" label="Frecuencia" outlined
                  dense />
              </div>

              <div class="field-row">
                <div class="field-label">Alergias</div>
                <div class="field-value">
                  <q-toggle v-model="formData.antecedentesNoPatologicos.alergias" color="primary" />
                </div>
              </div>
              <div v-if="formData.antecedentesNoPatologicos.alergias" class="field-detail">
                <q-input v-model="formData.antecedentesNoPatologicos.alergiasCuales" label="Especificar" outlined
                  dense />
              </div>
            </div>
          </div>

          <!-- PASO 5: ANTECEDENTES PERINATALES -->
          <div v-if="currentStep === 5">
            <div class="text-h6 text-primary q-mb-md">Antecedentes Perinatales</div>
            <div class="field-group">
              <div class="field-row">
                <div class="field-label">Embarazo</div>
                <div class="field-value">
                  <q-option-group v-model="formData.antecedentesPerinatales.embarazo" :options="opcionesEmbarazo"
                    color="primary" inline />
                </div>
              </div>
              <div v-if="formData.antecedentesPerinatales.embarazo === 'Con complicaciones'" class="field-detail">
                <q-input v-model="formData.antecedentesPerinatales.embarazoComplicaciones" label="Especificar" outlined
                  dense />
              </div>

              <div class="field-row">
                <div class="field-label">Parto</div>
                <div class="field-value">
                  <q-option-group v-model="formData.antecedentesPerinatales.parto" :options="opcionesEmbarazo"
                    color="primary" inline />
                </div>
              </div>
              <div v-if="formData.antecedentesPerinatales.parto === 'Con complicaciones'" class="field-detail">
                <q-input v-model="formData.antecedentesPerinatales.partoComplicaciones" label="Especificar" outlined
                  dense />
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat label="Cancelar" v-close-popup color="negative" @click="closeDialog" class="cancel-btn" />
          <q-btn v-if="currentStep > 1" flat label="Atrás" color="secondary" @click="prevStep" class="back-btn" />
          <q-btn flat :label="currentStep === 5 ? 'Guardar' : 'Siguiente'" color="primary"
            @click="currentStep === 5 ? savePatient() : nextStep()" class="next-btn" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Notify } from 'quasar'
import { useGestionPacientes } from 'src/composable/useGestionPacientes'
import logo from 'src/assets/logo.png'

const router = useRouter()

// Usar el composable
const {
  users,
  filter,
  showDialog,
  currentStep,
  formData,
  daysOptions,
  monthsOptions,
  opcionesEmbarazo,
  columns,
  dialogTitle,
  edadCalculada,
  isLoading,
  savePatient,
  deletePatient,
  addPatient,
  closeDialog,
  nextStep,
  prevStep
} = useGestionPacientes()

// Filtrar pacientes (búsqueda local adaptada a la estructura de CouchDB)
const filteredUsers = computed(() => {
  if (!filter.value) return users.value
  const searchTerm = filter.value.toLowerCase()
  return users.value.filter(user => {
    const nombreCompleto = `${user.nombres || ''} ${user.apellidos || ''}`.toLowerCase()
    const telefono = user.telefono || ''
    const identificacion = user.doc?.valor || ''
    return nombreCompleto.includes(searchTerm) ||
      telefono.includes(searchTerm) ||
      identificacion.includes(searchTerm)
  })
})
const verExpediente = (paciente) => {
  console.log("Paciente seleccionado:", paciente)

  if (!paciente || !paciente._id) {
    Notify.create({
      type: 'error',
      message: 'Error: Datos del paciente incompletos',
      position: 'bottom-right'
    })
    return
  }

  try {
    const pacienteSerializado = JSON.stringify(paciente)
    router.push({
      path: '/expediente/paciente',
      query: { paciente: pacienteSerializado }
    })
  } catch (error) {
    console.error("Error al serializar paciente:", error)
    Notify.create({
      type: 'error',
      message: 'Error al abrir el expediente',
      position: 'bottom-right'
    })
  }
}
</script>

<style scoped>
/* ==================== ESTILOS DE LA TABLA ==================== */
.q-table__container {
  overflow-x: auto;
}

/* ==================== RESPONSIVE PARA MÓVIL ==================== */
@media (max-width: 480px) {

  .responsive-hide-office,
  .responsive-hide-email {
    display: none !important;
  }

  .q-card-section {
    padding: 10px !important;
  }

  .text-h6 {
    font-size: 16px !important;
  }

  .text-subtitle2 {
    font-size: 12px !important;
  }

  .responsive-actions .q-btn {
    min-width: 32px !important;
    padding: 4px !important;
  }

  .responsive-actions .q-btn .q-icon {
    font-size: 18px !important;
  }
}

@media (max-width: 380px) {
  .q-pt-none div:first-child {
    display: none !important;
  }

  .q-card-section .text-h6 {
    font-size: 14px !important;
  }

  .responsive-actions .q-btn {
    min-width: 28px !important;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .q-card-section {
    padding: 12px !important;
  }

  .text-h6 {
    font-size: 18px !important;
  }

  .responsive-actions .q-btn {
    min-width: 36px !important;
  }
}

.q-btn[size="responsive"] {
  min-width: 40px;
}

@media (max-width: 480px) {
  .q-btn[size="responsive"] {
    min-width: 32px !important;
  }
}

/* ==================== MODAL CON TAMAÑO FIJO ==================== */

/* Fondo del modal */
:deep(.q-dialog__backdrop) {
  background: rgba(0, 0, 0, 0.6) !important;
}

/* Tarjeta del modal - tamaño fijo para escritorio */
.fixed-size-card {
  width: 800px !important;
  max-width: 800px !important;
  min-width: 800px !important;
  height: 85vh !important;
  max-height: 85vh !important;
  display: flex !important;
  flex-direction: column !important;
  border-radius: 16px !important;
  overflow: hidden !important;
}

/* Contenido del modal con scroll interno */
.fixed-content {
  flex: 1 !important;
  overflow-y: auto !important;
  padding: 16px 20px !important;
}

/* Personalizar scroll del contenido */
.fixed-content::-webkit-scrollbar {
  width: 6px;
}

.fixed-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.fixed-content::-webkit-scrollbar-thumb {
  background: #009688;
  border-radius: 3px;
}

/* Responsive - para pantallas más pequeñas */
@media (max-width: 850px) {
  .fixed-size-card {
    width: 90vw !important;
    min-width: 90vw !important;
    height: 85vh !important;
  }
}

/* Para móvil (menos de 600px) */
@media (max-width: 600px) {
  .fixed-size-card {
    width: 95vw !important;
    min-width: 95vw !important;
    height: 90vh !important;
  }
}

/* Header del modal */
.q-dialog .bg-primary {
  background: #009688 !important;
}

/* Botones del modal en la parte inferior */
.fixed-size-card .q-card-actions {
  flex-shrink: 0 !important;
  border-top: 1px solid #e0e0e0;
  background: #fafafa;
  display: flex !important;
  justify-content: flex-end !important;
  align-items: center !important;
  gap: 12px !important;
  padding: 16px 24px !important;
}

/* ==================== GRUPOS DE CAMPOS CON BORDE ==================== */
.field-group {
  border: none !important;
  border-radius: 12px;
  padding: 16px;
  background: linear-gradient(135deg, #009688 0%, #26a69a 50%, #009688 100%) !important;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0, 150, 136, 0.2);
}

.field-row {
  display: flex;
  align-items: center;
  padding: 12px 8px;
  border-bottom: 1px solid #f0f0f0;
}

.field-row:last-child {
  border-bottom: none;
}

.field-label {
  width: 140px;
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.field-value {
  flex: 1;
}

.field-detail {
  margin-left: 148px;
  margin-bottom: 12px;
  margin-top: 4px;
  padding-right: 8px;
}

/* ==================== BOTONES TOGGLE (SI/NO) ==================== */
.custom-toggle-group {
  border: 1px solid #d0d0d0 !important;
  border-radius: 8px !important;
  overflow: hidden;
  background: white;
}

.custom-toggle-group .q-btn {
  background: white !important;
  color: #666 !important;
  border-radius: 0 !important;
  min-width: 70px;
}

.custom-toggle-group .q-btn--active {
  background: #009688 !important;
  color: white !important;
  border-color: #009688 !important;
}

/* ==================== INPUTS Y CAMPOS ==================== */
:deep(.q-field--outlined .q-field__control) {
  background: #fafafa !important;
  border-radius: 8px !important;
  border: 1px solid #d0d0d0 !important;
}

:deep(.q-field--outlined .q-field__control:before) {
  border: none !important;
}

:deep(.q-field--outlined.q-field--focused .q-field__control) {
  border-color: #009688 !important;
  border-width: 2px !important;
}

:deep(.q-toggle__inner--active) {
  background: #009688 !important;
}

:deep(.q-radio__inner--active) {
  color: #009688 !important;
}

:deep(.q-field--focused .q-field__label) {
  color: #009688 !important;
}

/* ==================== TÍTULOS DE SECCIÓN ==================== */
.text-primary {
  color: #009688 !important;
  font-weight: 600;
  margin-bottom: 16px;
  font-size: 18px;
}

/* ==================== BOTONES DEL MODAL (GENERALES) ==================== */
.cancel-btn,
.back-btn,
.next-btn {
  min-width: 110px !important;
  height: 38px !important;
  padding: 0 20px !important;
  border-radius: 8px !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  transition: all 0.2s ease !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  margin: 0 !important;
}

.cancel-btn {
  background: transparent !important;
  color: #d32f2f !important;
  border: 1px solid #d32f2f !important;
}

.cancel-btn:hover {
  background: rgba(211, 47, 47, 0.08) !important;
  transform: translateY(-1px);
}

.back-btn {
  background: transparent !important;
  color: #666 !important;
  border: 1px solid #bdbdbd !important;
}

.back-btn:hover {
  background: rgba(102, 102, 102, 0.08) !important;
  transform: translateY(-1px);
}

.next-btn {
  background: #009688 !important;
  color: white !important;
  border: 1px solid #009688 !important;
  box-shadow: 0 2px 4px rgba(0, 150, 136, 0.2);
}

.next-btn:hover {
  background: #00796b !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 150, 136, 0.3);
}

/* ==================== OPCIONES DE GRUPO ==================== */
:deep(.q-option-group) {
  gap: 16px;
}

:deep(.q-option-group .q-radio) {
  margin-right: 16px;
}

/* ==================== SCROLL EN MÓVIL ==================== */
.mobile-scroll-page {
  height: 100vh !important;
  overflow-y: auto !important;
  -webkit-overflow-scrolling: touch !important;
}

.q-page-container {
  overflow: hidden !important;
}
</style>
