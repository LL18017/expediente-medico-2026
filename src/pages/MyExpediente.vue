<template>
  <q-page class="q-pa-md">
    <!-- Header con botón de regreso y botón de editar -->
    <div class="row items-center q-mb-md">
      <q-btn flat icon="arrow_back" @click="$router.back()" class="q-mr-md" />
      <div class="text-h5">Expediente del Paciente</div>
      <q-space />
      <q-btn flat icon="edit" color="primary" label="Editar Datos" @click="openEditDialog" class="q-mr-md" />
    </div>
    <div class="row q-col-gutter-md">
      <div class="col-12 d-block d-md-none q-mb-md">
        <q-card class="info-card">
          <q-card-section class="row items-center">
            <q-avatar size="60px" class="bg-grey-3 q-mr-md">
              <q-icon name="person" size="40px" color="primary" />
            </q-avatar>
            <div>
              <div class="text-h6">{{ nombreCompleto }}</div>
              <div class="text-caption text-grey-7">ID: {{ paciente.datosPersonales?.identificacion || '—' }}</div>
            </div>
            <div class="col-12 q-mt-sm">
              <q-chip :color="paciente.adicionales?.activo ? 'positive' : 'negative'" text-color="white"
                class="full-width">
                {{ paciente.adicionales?.activo ? "Activo" : "Inactivo" }}
              </q-chip>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- COLUMNA IZQUIERDA: Secciones expandibles -->
      <div class="col-12 col-md-8">
        <!-- Datos Personales -->
        <q-card class="q-mb-md">
          <q-card-section>
            <q-expansion-item expand-separator icon="assignment_ind" label="Datos Personales" default-opened
              class="custom-expansion">
              <q-separator />
              <div class="row q-col-gutter-md q-pa-md">
                <div class="col-12 col-md-6"><strong>Nombre completo:</strong> {{ nombreCompleto }}</div>
                <div class="col-12 col-md-6"><strong>Fecha de nacimiento:</strong> {{ fechaNacimiento }}</div>
                <div class="col-12 col-md-6"><strong>Edad:</strong> {{ edad }} años</div>
                <div class="col-12 col-md-6"><strong>Sexo:</strong> {{ paciente.datosPersonales?.sexo || '—' }}</div>
                <div class="col-12 col-md-6"><strong>Teléfono:</strong> {{ paciente.datosPersonales?.telefono || '—' }}
                </div>
                <div class="col-12 col-md-6"><strong>Identificación:</strong> {{
                  paciente.datosPersonales?.identificacion || '—' }}</div>
                <div class="col-12 col-md-6"><strong>Oficio:</strong> {{ paciente.datosPersonales?.oficio || '—' }}
                </div>
                <div class="col-12 col-md-6"><strong>Email:</strong> {{ paciente.datosPersonales?.email || '—' }}</div>
                <div class="col-12 col-md-6"><strong>Dirección:</strong> {{ paciente.datosPersonales?.direccion || '—'
                  }}</div>
                <div class="col-12 col-md-6"><strong>Tipo sanguíneo:</strong> {{ paciente.datosPersonales?.tiposanguineo
                  || '—' }}</div>
              </div>
            </q-expansion-item>
          </q-card-section>
        </q-card>

        <!-- Antecedentes Familiares -->
        <q-card class="q-mb-md">
          <q-card-section>
            <q-expansion-item expand-separator icon="family_restroom" label="Antecedentes Familiares"
              class="custom-expansion">
              <q-separator />
              <div class="row q-col-gutter-md q-pa-md">
                <div class="col-12 col-md-6"><strong>Diabetes:</strong> {{ paciente.antecedentesFamiliares?.diabetes ?
                  'SÍ' : 'NO' }} {{ paciente.antecedentesFamiliares?.diabetesDetalle || '' }}</div>
                <div class="col-12 col-md-6"><strong>Hipertensión:</strong> {{
                  paciente.antecedentesFamiliares?.hipertension ? 'SÍ' : 'NO' }} {{
                    paciente.antecedentesFamiliares?.hipertensionDetalle || '' }}</div>
                <div class="col-12 col-md-6"><strong>Cáncer:</strong> {{ paciente.antecedentesFamiliares?.cancer ? 'SÍ'
                  : 'NO' }} {{ paciente.antecedentesFamiliares?.cancerDetalle || '' }}</div>
                <div class="col-12"><strong>Otros:</strong> {{ paciente.antecedentesFamiliares?.otros || 'Ninguno' }}
                </div>
              </div>
            </q-expansion-item>
          </q-card-section>
        </q-card>

        <!-- Antecedentes Patológicos -->
        <q-card class="q-mb-md">
          <q-card-section>
            <q-expansion-item expand-separator icon="medical_services" label="Antecedentes Patológicos"
              class="custom-expansion">
              <q-separator />
              <div class="row q-col-gutter-md q-pa-md">
                <div class="col-12"><strong>Enfermedades:</strong> {{
                  paciente.antecedentesPatologicos?.enfermedadesDetalle || 'Ninguna' }}</div>
                <div class="col-12"><strong>Hospitalizaciones:</strong> {{
                  paciente.antecedentesPatologicos?.hospitalizacionesDetalle || 'Ninguna' }}</div>
                <div class="col-12"><strong>Intervenciones quirúrgicas:</strong> {{
                  paciente.antecedentesPatologicos?.intervencionesDetalle || 'Ninguna' }}</div>
                <div class="col-12"><strong>Traumatismos:</strong> {{
                  paciente.antecedentesPatologicos?.traumatismosDetalle || 'Ninguna' }}</div>
                <div class="col-12"><strong>Alergias:</strong> {{ paciente.antecedentesNoPatologicos?.alergiasCuales ||
                  'Ninguna' }}</div>
              </div>
            </q-expansion-item>
          </q-card-section>
        </q-card>

        <!-- Hábitos -->
        <q-card class="q-mb-md">
          <q-card-section>
            <q-expansion-item expand-separator icon="health_and_safety" label="Hábitos y Estilo de Vida"
              class="custom-expansion">
              <q-separator />
              <div class="row q-col-gutter-md q-pa-md">
                <div class="col-12 col-md-6"><strong>Tabaco:</strong> {{ paciente.antecedentesNoPatologicos?.tabaco ?
                  'SÍ' : 'NO' }}</div>
                <div class="col-12 col-md-6"><strong>Alcohol:</strong> {{ paciente.antecedentesNoPatologicos?.alcohol ?
                  'SÍ' : 'NO' }}</div>
                <div class="col-12"><strong>Otros:</strong> {{ paciente.antecedentesNoPatologicos?.otros || 'Ninguno' }}
                </div>
              </div>
            </q-expansion-item>
          </q-card-section>
        </q-card>
      </div>

      <!-- COLUMNA DERECHA-->
      <div class="col-12 col-md-4">
        <!-- Tarjeta de información principal -->
        <q-card class="info-card q-mb-md d-none d-md-block">
          <q-card-section class="row items-center">
            <q-avatar size="60px" class="bg-grey-3 q-mr-md">
              <q-icon name="person" size="40px" color="primary" />
            </q-avatar>
            <div>
              <div class="text-h6">{{ nombreCompleto }}</div>
              <div class="text-caption text-grey-7">ID: {{ paciente.datosPersonales?.identificacion || '—' }}</div>
            </div>
            <div class="col-12 q-mt-sm">
              <q-chip :color="paciente.adicionales?.activo ? 'positive' : 'negative'" text-color="white"
                class="full-width">
                {{ paciente.adicionales?.activo ? "Activo" : "Inactivo" }}
              </q-chip>
            </div>
          </q-card-section>
        </q-card>

        <!-- Grid para las tarjetas de estadísticas -->
        <div class="row q-col-gutter-md">
          <!-- Tarjeta: Antecedentes Familiares -->
          <div class="col-6 col-md-12">
            <q-card flat bordered class="stat-card q-mb-md" @click="expandirSeccion('familiares')">
              <q-card-section class="text-center">
                <div class="text-h4 text-primary">{{ contarAntecedentesFamiliares() }}</div>
                <div class="text-caption text-grey-7">Antecedentes Familiares</div>
              </q-card-section>
            </q-card>
          </div>

          <!-- Tarjeta: Antecedentes Patológicos -->
          <div class="col-6 col-md-12">
            <q-card flat bordered class="stat-card q-mb-md" @click="expandirSeccion('patologicos')">
              <q-card-section class="text-center">
                <div class="text-h4 text-primary">{{ contarAntecedentesPatologicos() }}</div>
                <div class="text-caption text-grey-7">Antecedentes Patológicos</div>
              </q-card-section>
            </q-card>
          </div>

          <!-- Tarjeta: Hábitos -->
          <div class="col-6 col-md-12">
            <q-card flat bordered class="stat-card q-mb-md" @click="expandirSeccion('habitos')">
              <q-card-section class="text-center">
                <div class="text-h4 text-primary">{{ contarHabitos() }}</div>
                <div class="text-caption text-grey-7">Hábitos y Estilo de Vida</div>
              </q-card-section>
            </q-card>
          </div>

          <!-- Tarjeta: Consultas -->
          <div class="col-6 col-md-12">
            <q-card flat bordered class="stat-card" @click="scrollToConsultas">
              <q-card-section class="text-center">
                <div class="text-h4 text-primary">{{ consultas.length }}</div>
                <div class="text-caption text-grey-7">Consultas Realizadas</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>

    <!-- Consultas Médicas -->
    <div ref="consultasSection" class="q-mt-lg">
      <q-card>
        <q-card-section class="bg-primary text-white">
          <div class="row items-center justify-between">
            <div class="text-h6">Consultas Médicas</div>
            <q-btn flat color="white" icon="add" label="Nueva Consulta" @click="openConsultaDialog" />
          </div>
        </q-card-section>

        <q-card-section v-if="consultas.length === 0" class="text-center text-grey">
          No hay consultas registradas
        </q-card-section>

        <div class="scroll-table" v-else>
          <table class="consulta-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Motivo</th>
                <th>Diagnóstico</th>
                <th>Tratamiento</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="consulta in consultas" :key="consulta._id">
                <td class="text-no-wrap">{{ formatDate(consulta.fecha) }}</td>
                <td>{{ consulta.motivo }}</td>
                <td>{{ consulta.diagnostico }}</td>
                <td>{{consulta.recetas?.map(r => r.medicamento).join(', ') || '—'}}</td>
                <td class="q-gutter-sm text-no-wrap">
                  <q-btn flat dense icon="edit" size="sm" @click="editarConsulta(consulta)" />
                  <q-btn flat dense icon="delete" size="sm" color="negative" @click="eliminarConsulta(consulta)" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </q-card>
    </div>

    <!-- DIÁLOGO DE EDICIÓN -->
    <q-dialog v-model="showEditDialog" persistent class="fixed-size-dialog">
      <q-card class="fixed-size-card">
        <q-card-section class="bg-primary text-white">
          <div class="row items-center no-wrap">
            <div class="col-auto">
              <img :src="logo" alt="Logo"
                style="height: 50px; width: auto; background: rgba(255,255,255,0.2); border-radius: 10px; padding: 5px 10px;" />
            </div>
            <div class="col q-ml-md">
              <div class="text-h6">Editar Paciente</div>
              <div class="text-subtitle2">Paso {{ editStep }} de 5</div>
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-md fixed-content">
          <!-- PASO 1: DATOS PERSONALES -->
          <div v-if="editStep === 1">
            <div class="text-h6 text-primary q-mb-md">Datos personales</div>
            <div class="field-group">
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input v-model="editForm.nombres" label="Nombres *" outlined dense />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="editForm.apellidos" label="Apellidos *" outlined dense />
                </div>
                <div class="col-12">
                  <div class="text-caption text-grey q-mb-sm">Fecha de nacimiento</div>
                  <div class="row q-col-gutter-sm">
                    <div class="col-4">
                      <q-select v-model="editForm.birthDay" :options="daysOptions" label="Día" outlined dense />
                    </div>
                    <div class="col-4">
                      <q-select v-model="editForm.birthMonth" :options="monthsOptions" label="Mes" outlined dense />
                    </div>
                    <div class="col-4">
                      <q-input v-model="editForm.birthYear" label="Año" outlined dense type="number" />
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="text-caption text-grey q-mb-sm">Sexo</div>
                  <q-radio v-model="editForm.sexo" val="Masculino" label="Masculino" color="primary" />
                  <q-radio v-model="editForm.sexo" val="Femenino" label="Femenino" color="primary" />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="editForm.telefono" label="Teléfono *" outlined dense />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="editForm.identificacion" label="Identificación" outlined dense />
                </div>
                <div class="col-12">
                  <q-input v-model="editForm.oficio" label="Oficio" outlined dense />
                </div>
                <div class="col-12">
                  <q-input v-model="editForm.direccion" label="Dirección" outlined dense type="textarea" rows="2" />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="editForm.tiposanguineo" label="Tipo sanguíneo" outlined dense />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="editForm.email" label="Email" outlined dense type="email" />
                </div>
                <div class="col-12 q-mt-md">
                  <q-toggle v-model="editForm.activo" label="Paciente activo" color="primary" />
                </div>
              </div>
            </div>
          </div>

          <!-- PASO 2: ANTECEDENTES FAMILIARES -->
          <div v-if="editStep === 2">
            <div class="text-h6 text-primary q-mb-md">Antecedentes Familiares</div>
            <div class="field-group">
              <div class="field-row">
                <div class="field-label">Diabetes</div>
                <div class="field-value">
                  <q-btn-toggle v-model="editForm.diabetes"
                    :options="[{ label: 'NO', value: false }, { label: 'SI', value: true }]"
                    class="custom-toggle-group" />
                </div>
              </div>
              <div v-if="editForm.diabetes" class="field-detail">
                <q-input v-model="editForm.diabetesDetalle" label="Especificar" outlined dense />
              </div>

              <div class="field-row">
                <div class="field-label">Hipertensión</div>
                <div class="field-value">
                  <q-btn-toggle v-model="editForm.hipertension"
                    :options="[{ label: 'NO', value: false }, { label: 'SI', value: true }]"
                    class="custom-toggle-group" />
                </div>
              </div>
              <div v-if="editForm.hipertension" class="field-detail">
                <q-input v-model="editForm.hipertensionDetalle" label="Especificar" outlined dense />
              </div>

              <div class="field-row">
                <div class="field-label">Cáncer</div>
                <div class="field-value">
                  <q-btn-toggle v-model="editForm.cancer"
                    :options="[{ label: 'NO', value: false }, { label: 'SI', value: true }]"
                    class="custom-toggle-group" />
                </div>
              </div>
              <div v-if="editForm.cancer" class="field-detail">
                <q-input v-model="editForm.cancerDetalle" label="Especificar" outlined dense />
              </div>

              <div class="field-row">
                <div class="field-label">Otros</div>
                <div class="field-value">
                  <q-input v-model="editForm.otrosAntecedentes" label="Especificar" outlined dense />
                </div>
              </div>
            </div>
          </div>

          <!-- PASO 3: ANTECEDENTES PATOLÓGICOS -->
          <div v-if="editStep === 3">
            <div class="text-h6 text-primary q-mb-md">Antecedentes Patológicos</div>
            <div class="field-group">
              <div class="field-row">
                <div class="field-label">Enfermedades</div>
                <div class="field-value">
                  <q-toggle v-model="editForm.enfermedades" color="primary" />
                </div>
              </div>
              <div v-if="editForm.enfermedades" class="field-detail">
                <q-input v-model="editForm.enfermedadesDetalle" label="Especificar" outlined dense />
              </div>

              <div class="field-row">
                <div class="field-label">Hospitalizaciones</div>
                <div class="field-value">
                  <q-toggle v-model="editForm.hospitalizaciones" color="primary" />
                </div>
              </div>
              <div v-if="editForm.hospitalizaciones" class="field-detail">
                <q-input v-model="editForm.hospitalizacionesDetalle" label="Especificar" outlined dense />
              </div>

              <div class="field-row">
                <div class="field-label">Intervenciones Quirúrgicas</div>
                <div class="field-value">
                  <q-toggle v-model="editForm.intervenciones" color="primary" />
                </div>
              </div>
              <div v-if="editForm.intervenciones" class="field-detail">
                <q-input v-model="editForm.intervencionesDetalle" label="Especificar" outlined dense />
              </div>

              <div class="field-row">
                <div class="field-label">Traumatismos / Fracturas</div>
                <div class="field-value">
                  <q-toggle v-model="editForm.traumatismos" color="primary" />
                </div>
              </div>
              <div v-if="editForm.traumatismos" class="field-detail">
                <q-input v-model="editForm.traumatismosDetalle" label="Especificar" outlined dense />
              </div>

              <div class="field-row">
                <div class="field-label">Alergias</div>
                <div class="field-value">
                  <q-toggle v-model="editForm.alergias" color="primary" />
                </div>
              </div>
              <div v-if="editForm.alergias" class="field-detail">
                <q-input v-model="editForm.alergiasCuales" label="Especificar" outlined dense />
              </div>
            </div>
          </div>

          <!-- PASO 4: ANTECEDENTES NO PATOLÓGICOS -->
          <div v-if="editStep === 4">
            <div class="text-h6 text-primary q-mb-md">Hábitos</div>
            <div class="field-group">
              <div class="field-row">
                <div class="field-label">Tabaco</div>
                <div class="field-value">
                  <q-toggle v-model="editForm.tabaco" color="primary" />
                </div>
              </div>
              <div class="field-row">
                <div class="field-label">Alcohol</div>
                <div class="field-value">
                  <q-toggle v-model="editForm.alcohol" color="primary" />
                </div>
              </div>
            </div>
          </div>

          <!-- PASO 5: CONFIRMAR -->
          <div v-if="editStep === 5">
            <div class="text-h6 text-primary q-mb-md">Confirmar cambios</div>
            <div class="field-group text-center">
              <q-icon name="check_circle" size="64px" color="positive" />
              <div class="text-h6 q-mt-md">¿Estás seguro de guardar los cambios?</div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat label="Cancelar" v-close-popup color="negative" @click="showEditDialog = false" />
          <q-btn v-if="editStep > 1" flat label="Atrás" color="secondary" @click="editStep--" />
          <q-btn flat :label="editStep === 5 ? 'Guardar' : 'Siguiente'" color="primary"
            @click="editStep === 5 ? guardarEdicionCompleta() : editStep++" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Diálogo para consulta -->
    <q-dialog v-model="showConsultaDialog">
      <q-card style="min-width: 450px; max-width: 600px;">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">{{ editandoConsulta ? 'Editar Consulta' : 'Nueva Consulta' }}</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="consultaForm.fecha" label="Fecha" type="date" outlined dense class="q-mb-sm" />
          <q-input v-model="consultaForm.motivo" label="Motivo de consulta" outlined dense type="textarea" rows="2"
            class="q-mb-sm" />
          <q-input v-model="consultaForm.diagnostico" label="Diagnóstico" outlined dense type="textarea" rows="2"
            class="q-mb-sm" />
          <q-input v-model="consultaForm.medicamento" label="Medicamento" outlined dense class="q-mb-sm" />
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
import logo from "src/assets/logo.png";

const route = useRoute();

const paciente = ref({});
const consultas = ref([]);
const showConsultaDialog = ref(false);
const editandoConsulta = ref(false);
const consultaEditId = ref(null);
const showEditDialog = ref(false);
const editStep = ref(1);
const consultasSection = ref(null);

// Opciones para fechas
const daysOptions = Array.from({ length: 31 }, (_, i) => i + 1);
const monthsOptions = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

// Formulario de edición
const editForm = ref({
  nombres: '',
  apellidos: '',
  birthDay: null,
  birthMonth: null,
  birthYear: null,
  sexo: '',
  telefono: '',
  identificacion: '',
  oficio: '',
  direccion: '',
  tiposanguineo: '',
  email: '',
  activo: true,
  diabetes: false,
  diabetesDetalle: '',
  hipertension: false,
  hipertensionDetalle: '',
  cancer: false,
  cancerDetalle: '',
  otrosAntecedentes: '',
  enfermedades: false,
  enfermedadesDetalle: '',
  hospitalizaciones: false,
  hospitalizacionesDetalle: '',
  intervenciones: false,
  intervencionesDetalle: '',
  traumatismos: false,
  traumatismosDetalle: '',
  alergias: false,
  alergiasCuales: '',
  tabaco: false,
  alcohol: false
});

// Formulario de consulta
const consultaForm = ref({
  fecha: new Date().toISOString().split('T')[0],
  motivo: '',
  diagnostico: '',
  medicamento: '',
  observaciones: ''
});

// Computed
const nombreCompleto = computed(() => {
  const dp = paciente.value.datosPersonales;
  return dp ? `${dp.nombres || ''} ${dp.apellidos || ''}`.trim() : '—';
});

const fechaNacimiento = computed(() => {
  const { birthDay, birthMonth, birthYear } = paciente.value.datosPersonales || {};
  return birthDay && birthMonth && birthYear ? `${birthDay} de ${birthMonth} de ${birthYear}` : '—';
});

const edad = computed(() => {
  const { birthDay, birthMonth, birthYear } = paciente.value.datosPersonales || {};
  if (birthYear && birthMonth && birthDay) {
    const today = new Date();
    const monthIndex = monthsOptions.indexOf(birthMonth);
    const birthDate = new Date(birthYear, monthIndex, birthDay);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  }
  return '—';
});

// Funciones auxiliares
const contarAntecedentesFamiliares = () => {
  const af = paciente.value.antecedentesFamiliares || {};
  let count = 0;
  if (af.diabetes) count++;
  if (af.hipertension) count++;
  if (af.cancer) count++;
  return count;
};

const contarAntecedentesPatologicos = () => {
  const ap = paciente.value.antecedentesPatologicos || {};
  let count = 0;
  if (ap.enfermedades) count++;
  if (ap.hospitalizaciones) count++;
  if (ap.intervenciones) count++;
  if (ap.traumatismos) count++;
  return count;
};

const contarHabitos = () => {
  const anp = paciente.value.antecedentesNoPatologicos || {};
  let count = 0;
  if (anp.tabaco) count++;
  if (anp.alcohol) count++;
  return count;
};

const expandirSeccion = (seccion) => {
  const secciones = {
    familiares: '.family_restroom',
    patologicos: '.medical_services',
    habitos: '.health_and_safety'
  };
  const elemento = document.querySelector(`[icon="${secciones[seccion]}"]`);
  if (elemento) {
    elemento.click();
    elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const scrollToConsultas = () => {
  consultasSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const formatDate = (dateString) => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES');
};

// Edición de paciente
const openEditDialog = () => {
  const dp = paciente.value.datosPersonales || {};
  const af = paciente.value.antecedentesFamiliares || {};
  const ap = paciente.value.antecedentesPatologicos || {};
  const anp = paciente.value.antecedentesNoPatologicos || {};
  const ad = paciente.value.adicionales || {};

  editForm.value = {
    nombres: dp.nombres || '',
    apellidos: dp.apellidos || '',
    birthDay: dp.birthDay || null,
    birthMonth: dp.birthMonth || null,
    birthYear: dp.birthYear || null,
    sexo: dp.sexo || '',
    telefono: dp.telefono || '',
    identificacion: dp.identificacion || '',
    oficio: dp.oficio || '',
    direccion: dp.direccion || '',
    tiposanguineo: dp.tiposanguineo || '',
    email: dp.email || '',
    activo: ad.activo !== undefined ? ad.activo : true,
    diabetes: af.diabetes || false,
    diabetesDetalle: af.diabetesDetalle || '',
    hipertension: af.hipertension || false,
    hipertensionDetalle: af.hipertensionDetalle || '',
    cancer: af.cancer || false,
    cancerDetalle: af.cancerDetalle || '',
    otrosAntecedentes: af.otros || '',
    enfermedades: ap.enfermedades || false,
    enfermedadesDetalle: ap.enfermedadesDetalle || '',
    hospitalizaciones: ap.hospitalizaciones || false,
    hospitalizacionesDetalle: ap.hospitalizacionesDetalle || '',
    intervenciones: ap.intervenciones || false,
    intervencionesDetalle: ap.intervencionesDetalle || '',
    traumatismos: ap.traumatismos || false,
    traumatismosDetalle: ap.traumatismosDetalle || '',
    alergias: anp.alergias || false,
    alergiasCuales: anp.alergiasCuales || '',
    tabaco: anp.tabaco || false,
    alcohol: anp.alcohol || false
  };
  editStep.value = 1;
  showEditDialog.value = true;
};

const guardarEdicionCompleta = () => {
  // Actualizar datos personales
  paciente.value.datosPersonales = {
    ...paciente.value.datosPersonales,
    nombres: editForm.value.nombres,
    apellidos: editForm.value.apellidos,
    birthDay: editForm.value.birthDay,
    birthMonth: editForm.value.birthMonth,
    birthYear: editForm.value.birthYear,
    sexo: editForm.value.sexo,
    telefono: editForm.value.telefono,
    identificacion: editForm.value.identificacion,
    oficio: editForm.value.oficio,
    direccion: editForm.value.direccion,
    tiposanguineo: editForm.value.tiposanguineo,
    email: editForm.value.email
  };

  // Actualizar antecedentes familiares
  paciente.value.antecedentesFamiliares = {
    diabetes: editForm.value.diabetes,
    diabetesDetalle: editForm.value.diabetesDetalle,
    hipertension: editForm.value.hipertension,
    hipertensionDetalle: editForm.value.hipertensionDetalle,
    cancer: editForm.value.cancer,
    cancerDetalle: editForm.value.cancerDetalle,
    otros: editForm.value.otrosAntecedentes
  };

  // Actualizar antecedentes patológicos
  paciente.value.antecedentesPatologicos = {
    enfermedades: editForm.value.enfermedades,
    enfermedadesDetalle: editForm.value.enfermedadesDetalle,
    hospitalizaciones: editForm.value.hospitalizaciones,
    hospitalizacionesDetalle: editForm.value.hospitalizacionesDetalle,
    transfusiones: false,
    transfusionesDetalle: '',
    intervenciones: editForm.value.intervenciones,
    intervencionesDetalle: editForm.value.intervencionesDetalle,
    traumatismos: editForm.value.traumatismos,
    traumatismosDetalle: editForm.value.traumatismosDetalle
  };

  // Actualizar antecedentes no patológicos
  paciente.value.antecedentesNoPatologicos = {
    tabaco: editForm.value.tabaco,
    alcohol: editForm.value.alcohol,
    alergias: editForm.value.alergias,
    alergiasCuales: editForm.value.alergiasCuales,
    ...paciente.value.antecedentesNoPatologicos
  };

  // Actualizar estado activo
  if (!paciente.value.adicionales) {
    paciente.value.adicionales = {};
  }
  paciente.value.adicionales.activo = editForm.value.activo;

  // Actualizar localStorage
  const pacientesGuardados = localStorage.getItem('pacientes');
  if (pacientesGuardados) {
    const pacientes = JSON.parse(pacientesGuardados);
    const index = pacientes.findIndex(p => p._id === paciente.value._id);
    if (index !== -1) {
      pacientes[index] = paciente.value;
      localStorage.setItem('pacientes', JSON.stringify(pacientes));
    }
  }

  showEditDialog.value = false;
  Notify.create({ type: 'positive', message: 'Datos actualizados correctamente', position: 'bottom-right' });
};

// Gestión de consultas
const cargarConsultas = () => {
  const saved = localStorage.getItem(`consultas_${paciente.value._id}`);
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
  consultaEditId.value = consulta._id;
  consultaForm.value = {
    fecha: consulta.fecha,
    motivo: consulta.motivo,
    diagnostico: consulta.diagnostico,
    medicamento: consulta.recetas?.[0]?.medicamento || '',
    observaciones: consulta.observaciones || ''
  };
  showConsultaDialog.value = true;
};

const guardarConsulta = () => {
  if (editandoConsulta.value) {
    const index = consultas.value.findIndex(c => c._id === consultaEditId.value);
    if (index !== -1) {
      consultas.value[index] = {
        ...consultas.value[index],
        fecha: consultaForm.value.fecha,
        motivo: consultaForm.value.motivo,
        diagnostico: consultaForm.value.diagnostico,
        recetas: [{ medicamento: consultaForm.value.medicamento, dosis: '', frecuencia: '', via: '', durante: '', cantidad: 0 }],
        observaciones: consultaForm.value.observaciones
      };
    }
    Notify.create({ type: 'positive', message: 'Consulta actualizada', position: 'bottom-right' });
  } else {
    const nuevaConsulta = {
      _id: Date.now().toString(),
      coleccion: 'exmed-consultas',
      fecha: consultaForm.value.fecha,
      estado: 'Activa',
      paciente: { id: paciente.value._id, nombre: paciente.value.datosPersonales?.nombres, apellidos: paciente.value.datosPersonales?.apellidos },
      motivo: consultaForm.value.motivo,
      diagnostico: consultaForm.value.diagnostico,
      recetas: [{ medicamento: consultaForm.value.medicamento, dosis: '', frecuencia: '', via: '', durante: '', cantidad: 0 }],
      observaciones: consultaForm.value.observaciones
    };
    consultas.value.push(nuevaConsulta);
    Notify.create({ type: 'positive', message: 'Consulta agregada', position: 'bottom-right' });
  }
  guardarConsultas();
  closeConsultaDialog();
};

const eliminarConsulta = (consulta) => {
  consultas.value = consultas.value.filter(c => c._id !== consulta._id);
  guardarConsultas();
  Notify.create({ type: 'positive', message: 'Consulta eliminada', position: 'bottom-right' });
};

const resetConsultaForm = () => {
  consultaForm.value = {
    fecha: new Date().toISOString().split('T')[0],
    motivo: '',
    diagnostico: '',
    medicamento: '',
    observaciones: ''
  };
};

const closeConsultaDialog = () => {
  showConsultaDialog.value = false;
  editandoConsulta.value = false;
  consultaEditId.value = null;
  resetConsultaForm();
};

onMounted(() => {
  if (window.innerWidth <= 600) {
    // Eliminar cualquier estilo que bloquee el scroll
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
    document.body.style.position = 'static';
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.height = 'auto';
    document.documentElement.style.position = 'static';

    // Buscar y corregir el contenedor de Quasar
    const qPage = document.querySelector('.q-page');
    if (qPage) {
      qPage.style.overflow = 'auto';
      qPage.style.height = 'auto';
      qPage.style.minHeight = '100%';
    }
  }
  const pacienteData = route.query.paciente;
  if (pacienteData) {
    try {
      const pacienteDecodificado = decodeURIComponent(pacienteData);
      paciente.value = JSON.parse(pacienteDecodificado);
      console.log("Paciente cargado:", paciente.value);
      cargarConsultas();

      Notify.create({
        type: 'success',
        message: `Paciente: ${paciente.value.datosPersonales?.nombres} ${paciente.value.datosPersonales?.apellidos}`,
        position: 'bottom-right',
        timeout: 2000
      });
    } catch (error) {
      console.error("Error al parsear paciente:", error);
      Notify.create({
        type: 'error',
        message: 'Error al cargar los datos del paciente',
        position: 'bottom-right'
      });
    }
  } else {
    console.warn("No se encontraron datos del paciente");
  }
});
</script>
<style scoped>
/* Mantén todos tus estilos existentes aquí */
.bg-primary {
  background: #009688 !important;
}

.info-card {
  border-radius: 16px;
  border-left: 4px solid #009688;
}

.stat-card {
  border-radius: 12px;
  transition: transform 0.2s;
  cursor: pointer;
}

.stat-card:hover {
  transform: translateY(-4px);
}

.custom-expansion :deep(.q-expansion-item__container) {
  border-radius: 12px;
}

.scroll-table {
  overflow-x: auto;
}

.consulta-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.consulta-table th,
.consulta-table td {
  padding: 12px 8px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.consulta-table th {
  background: #f5f5f5;
  font-weight: 600;
  color: #555;
}

.fixed-size-card {
  width: 1000px !important;
  max-width: 90vw !important;
  height: 90vh !important;
  max-height: 90vh !important;
  display: flex !important;
  flex-direction: column !important;
  border-radius: 16px !important;
}

.fixed-content {
  flex: 1 !important;
  overflow-y: auto !important;
  padding: 16px 24px !important;
}

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

.text-primary {
  color: #009688 !important;
  font-weight: 600;
}

/* Clases de visibilidad */
.d-none {
  display: none !important;
}

.d-block {
  display: block !important;
}

/* ==================== SOLUCIÓN DEFINITIVA PARA SCROLL EN MÓVIL ==================== */

/* Eliminar cualquier restricción de altura que bloquee el scroll */
html,
body,
#q-app,
.q-layout,
.q-layout-container,
.q-page-container {
  overflow: visible !important;
  height: auto !important;
  min-height: 100% !important;
}

/* La página principal debe poder hacer scroll */
.q-page {
  overflow-y: auto !important;
  overflow-x: hidden !important;
  height: auto !important;
  min-height: 100% !important;
  display: block !important;
}

/* Asegurar que el contenido fluya */
.row,
.col,
.col-12,
.col-md-8,
.col-md-4 {
  overflow: visible !important;
}

/* Media query para móvil */
@media (max-width: 600px) {

  /* Forzar scroll en todos los contenedores */
  html,
  body,
  #q-app,
  .q-layout,
  .q-layout-container,
  .q-page-container {
    overflow: auto !important;
    height: auto !important;
    min-height: 100% !important;
    position: static !important;
  }

  /* La página debe tener altura automática */
  .q-page {
    overflow-y: auto !important;
    height: auto !important;
    min-height: 100% !important;
    position: relative !important;
  }

  /* Eliminar cualquier posición fixed que pueda bloquear */
  .q-page>* {
    position: relative !important;
  }

  /* Ajustes del modal */
  .fixed-size-card {
    width: 95vw !important;
  }

  .field-detail {
    margin-left: 0;
  }

  .field-row {
    flex-direction: column;
    align-items: flex-start;
  }

  /* Ocultar en móvil */
  .d-md-block {
    display: none !important;
  }

  /* Mostrar en móvil */
  .d-md-none {
    display: block !important;
  }

  /* Scroll horizontal para la tabla */
  .scroll-table {
    overflow-x: auto !important;
  }

  .consulta-table {
    min-width: 550px;
  }

  .consulta-table th,
  .consulta-table td {
    padding: 8px 4px;
    font-size: 11px;
    white-space: nowrap;
  }
}

/* Media query para desktop */
@media (min-width: 601px) {
  .d-md-block {
    display: block !important;
  }

  .d-md-none {
    display: none !important;
  }
}
</style>
