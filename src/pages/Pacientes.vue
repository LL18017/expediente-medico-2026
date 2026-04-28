<script setup>
defineOptions({
  name: "PacientesList",
});

import { ref, reactive, computed, /*onMounted, getCurrentInstance*/ } from "vue";
import { Notify } from "quasar";
import logo from "src/assets/logo.png";

// =====================
// STATE
// =====================
//const users = ref([]);
const filter = ref("");
const showDialog = ref(false);
const selectedPatient = ref(null);
const currentStep = ref(1);
const isEditing = ref(false);
const editingId = ref(null);

//===================================
// USANDO DATOS QUEMASOS PARA ENTREGA
// ==================================
const users = ref([
  {
    _id: "1",
    datosPersonales: {
      clave: "PAC-001",
      fecha: "2026-01-15",
      fechaConsulta: "2026-01-15",
      nombres: "Juan",
      apellidos: "Pérez García",
      birthDay: 15,
      birthMonth: "Enero",
      birthYear: 1985,
      sexo: "Hombre",
      telefono: "555-1234",
      identificacion: "INE123456",
      oficio: "Ingeniero",
      direccion: "Calle Principal #123, Colonia Centro",
      tiposanguineo: "O+",
      email: "juan.perez@email.com",
    },
    antecedentesFamiliares: {
      diabetes: true,
      diabetesDetalle: "Abuela materna",
      hipertension: true,
      hipertensionDetalle: "Padre",
      cancer: false,
      cancerDetalle: "",
      otros: "Ninguno",
    },
    antecedentesPatologicos: {
      enfermedades: false,
      enfermedadesDetalle: "",
      hospitalizaciones: true,
      hospitalizacionesDetalle: "Apéndice 2019",
      transfusiones: false,
      transfusionesDetalle: "",
      intervenciones: false,
      intervencionesDetalle: "",
      traumatismos: true,
      traumatismosDetalle: "Fractura de brazo 2015",
    },
    antecedentesNoPatologicos: {
      tabaco: true,
      tabacoCantidad: "5 cigarros/día",
      alcohol: false,
      alcoholFrecuencia: "",
      drogas: false,
      drogasTipo: "",
      medicamentos: true,
      medicamentosCuales: "Paracetamol ocasional",
      vacunas: true,
      vacunasCuales: "COVID, Influenza",
      alergias: true,
      alergiasCuales: "Polvo",
      convivenciaAnimales: true,
      convivenciaAnimalesCuales: "Perro",
    },
    antecedentesPerinatales: {
      embarazo: "Normal",
      embarazoComplicaciones: "",
      parto: "Normal",
      partoComplicaciones: "",
      desarrollo: "Normal",
      desarrolloComplicaciones: "",
      crecimiento: "Normal",
      crecimientoComplicaciones: "",
    },
    adicionales: {
      activo: true,
      tipo: "General",
      notas: "",
    },
    edad: 39,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    _id: "2",
    datosPersonales: {
      clave: "PAC-002",
      fecha: "2026-04-20",
      fechaConsulta: "2026-04-20",
      nombres: "María",
      apellidos: "López Rodríguez",
      birthDay: 22,
      birthMonth: "Marzo",
      birthYear: 1990,
      sexo: "Mujer",
      telefono: "555-5678",
      identificacion: "INE789012",
      oficio: "Médico",
      direccion: "Av. Reforma #456, Colonia Juárez",
      tiposanguineo: "A+",
      email: "maria.lopez@email.com",
    },
    antecedentesFamiliares: {
      diabetes: false,
      diabetesDetalle: "",
      hipertension: false,
      hipertensionDetalle: "",
      cancer: true,
      cancerDetalle: "Madre - Cáncer de mama",
      otros: "Ninguno",
    },
    antecedentesPatologicos: {
      enfermedades: true,
      enfermedadesDetalle: "Asma",
      hospitalizaciones: false,
      hospitalizacionesDetalle: "",
      transfusiones: false,
      transfusionesDetalle: "",
      intervenciones: false,
      intervencionesDetalle: "",
      traumatismos: false,
      traumatismosDetalle: "",
    },
    antecedentesNoPatologicos: {
      tabaco: false,
      tabacoCantidad: "",
      alcohol: true,
      alcoholFrecuencia: "Social",
      drogas: false,
      drogasTipo: "",
      medicamentos: true,
      medicamentosCuales: "Salbutamol",
      vacunas: true,
      vacunasCuales: "Completo",
      alergias: false,
      alergiasCuales: "",
      convivenciaAnimales: true,
      convivenciaAnimalesCuales: "Gatos",
    },
    antecedentesPerinatales: {
      embarazo: "Normal",
      embarazoComplicaciones: "",
      parto: "Con complicaciones",
      partoComplicaciones: "Cesárea",
      desarrollo: "Normal",
      desarrolloComplicaciones: "",
      crecimiento: "Normal",
      crecimientoComplicaciones: "",
    },
    adicionales: {
      activo: true,
      tipo: "General",
      notas: "",
    },
    edad: 34,
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z",
  },
  {
    _id: "3",
    datosPersonales: {
      clave: "PAC-003",
      fecha: "2026-04-27",
      fechaConsulta: "2026-04-27",
      nombres: "Carlos",
      apellidos: "Ramírez Sánchez",
      birthDay: 10,
      birthMonth: "Diciembre",
      birthYear: 1975,
      sexo: "Hombre",
      telefono: "555-9012",
      identificacion: "INE345678",
      oficio: "Comerciante",
      direccion: "Calle Libertad #789, Colonia Moderna",
      tiposanguineo: "B+",
      email: "carlos.ramirez@email.com",
    },
    antecedentesFamiliares: {
      diabetes: true,
      diabetesDetalle: "Padre y abuelo",
      hipertension: true,
      hipertensionDetalle: "Padre",
      cancer: false,
      cancerDetalle: "",
      otros: "Ninguno",
    },
    antecedentesPatologicos: {
      enfermedades: true,
      enfermedadesDetalle: "Diabetes tipo 2",
      hospitalizaciones: true,
      hospitalizacionesDetalle: "Diabetes 2023",
      transfusiones: false,
      transfusionesDetalle: "",
      intervenciones: false,
      intervencionesDetalle: "",
      traumatismos: false,
      traumatismosDetalle: "",
    },
    antecedentesNoPatologicos: {
      tabaco: true,
      tabacoCantidad: "1 cajetilla/día",
      alcohol: true,
      alcoholFrecuencia: "Frecuente",
      drogas: false,
      drogasTipo: "",
      medicamentos: true,
      medicamentosCuales: "Metformina",
      vacunas: true,
      vacunasCuales: "Influenza, Neumococo",
      alergias: false,
      alergiasCuales: "",
      convivenciaAnimales: false,
      convivenciaAnimalesCuales: "",
    },
    antecedentesPerinatales: {
      embarazo: "Normal",
      embarazoComplicaciones: "",
      parto: "Normal",
      partoComplicaciones: "",
      desarrollo: "Normal",
      desarrolloComplicaciones: "",
      crecimiento: "Normal",
      crecimientoComplicaciones: "",
    },
    adicionales: {
      activo: false,
      tipo: "General",
      notas: "Paciente en tratamiento",
    },
    edad: 49,
    createdAt: "2024-02-01T10:00:00Z",
    updatedAt: "2024-02-01T10:00:00Z",
  },
]);


/*
// =====================
// API (CouchDB)
// =====================
const { appContext } = getCurrentInstance();
const api = appContext.config.globalProperties.$couch;

const loadPatients = async () => {
  try {
    const res = await api.get("/_all_docs?include_docs=true");
    users.value = res.data.rows.map((r) => r.doc);
  } catch (error) {
    console.error("Error loading patients:", error);
    Notify.create({
      type: "negative",
      message: "Error al cargar los pacientes",
      position: "bottom-right",
    });
  }
};

onMounted(() => loadPatients());
*/
// =====================
// FORM DATA
// =====================
const formData = reactive({
  // Paso 1: Datos Personales
  datosPersonales: {
    clave: "",
    fecha: new Date().toISOString().split("T")[0],
    fechaConsulta: "",
    nombres: "",
    apellidos: "",
    birthDay: null,
    birthMonth: null,
    birthYear: null,
    sexo: null,
    telefono: "",
    identificacion: "",
    oficio: "",
    direccion: "",
    tiposanguineo: "",
    email: "",
  },
  // Paso 2: Antecedentes Familiares
  antecedentesFamiliares: {
    diabetes: false,
    diabetesDetalle: "",
    hipertension: false,
    hipertensionDetalle: "",
    cancer: false,
    cancerDetalle: "",
    otros: "",
  },
  // Paso 3: Antecedentes Patologicos
  antecedentesPatologicos: {
    enfermedades: false,
    enfermedadesDetalle: "",
    hospitalizaciones: false,
    hospitalizacionesDetalle: "",
    transfusiones: false,
    transfusionesDetalle: "",
    intervenciones: false,
    intervencionesDetalle: "",
    traumatismos: false,
    traumatismosDetalle: "",
  },
  // Paso 4: Antecedentes no patologicos
  antecedentesNoPatologicos: {
    tabaco: false,
    tabacoCantidad: "",
    alcohol: false,
    alcoholFrecuencia: "",
    drogas: false,
    drogasTipo: "",
    medicamentos: false,
    medicamentosCuales: "",
    vacunas: false,
    vacunasCuales: "",
    alergias: false,
    alergiasCuales: "",
    convivenciaAnimales: false,
    convivenciaAnimalesCuales: "",
  },
  // Paso 5: Antecedentes Perinatales / Pediátricos
  antecedentesPerinatales: {
    embarazo: "",
    embarazoComplicaciones: "",
    parto: "",
    partoComplicaciones: "",
    desarrollo: "",
    desarrolloComplicaciones: "",
    crecimiento: "",
    crecimientoComplicaciones: "",
  },
  // Datos Adicionales
  adicionales: {
    activo: true,
    tipo: "General",
    notas: "",
  },
});

// =====================
// OPTIONS
// =====================
const daysOptions = Array.from({ length: 31 }, (_, i) => i + 1);
const monthsOptions = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const opcionesEmbarazo = [
  { label: "Normal", value: "Normal" },
  { label: "Con complicaciones", value: "Con complicaciones" },
];

// =====================
// COMPUTED
// =====================
const dialogTitle = computed(() => {
  if (isEditing.value) return "Editar Paciente";
  return "Nuevo Paciente";
});

const nombreCompleto = computed(() => {
  return `${formData.datosPersonales.nombres || ""} ${formData.datosPersonales.apellidos || ""}`.trim();
});

const edadCalculada = computed(() => {
  const { birthDay, birthMonth, birthYear } = formData.datosPersonales;
  if (birthYear && birthMonth && birthDay) {
    const today = new Date();
    const monthIndex = monthsOptions.indexOf(birthMonth);
    const birthDate = new Date(birthYear, monthIndex, birthDay);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  return null;
});

// =====================
// COLUMNS
// =====================
const columns = [
  {
    name: "clave",
    label: "Clave",
    align: "left",
    field: (row) => row.datosPersonales?.clave || row.clave,
    sortable: true,
  },
  {
    name: "nombre",
    label: "Nombre",
    align: "left",
    field: (row) => {
      if (row.datosPersonales) {
        return `${row.datosPersonales.nombres || ""} ${row.datosPersonales.apellidos || ""}`.trim();
      }
      return row.nombres || "";
    },
    sortable: true,
  },
  {
    name: "edad",
    label: "Edad",
    align: "center",
    field: (row) => row.edad || row.datosPersonales?.edad,
    sortable: true,
  },
  { name: "tipo", label: "Tipo", align: "center", field: (row) => row.adicionales?.tipo || row.tipo },
  { name: "email", label: "Email", align: "left", field: (row) => row.datosPersonales?.email || row.email },
  { name: "telefono", label: "Teléfono", align: "left", field: (row) => row.datosPersonales?.telefono || row.telefono },
  { name: "oficio", label: "Oficio", align: "left", field: (row) => row.datosPersonales?.oficio || row.oficio },
  {
    name: "activo",
    label: "Estatus",
    align: "center",
    field: (row) => (row.adicionales?.activo || row.activo) ? "Activo" : "Inactivo",
  },
  { name: "acciones", label: "Acciones", align: "center" },
];

// =====================
// CRUD FUNCIONES
// =====================
const savePatient = async () => {
  try {
    const { nombres, telefono, clave } = formData.datosPersonales;
    if (!clave || !nombres || !telefono) {
      Notify.create({
        type: "warning",
        message: "Por favor completa los campos requeridos (Clave, Nombre, Teléfono)",
        position: "bottom-right",
      });
      currentStep.value = 1;
      return;
    }

    const patientData = {
      ...formData,
      edad: edadCalculada.value,
      nombreCompleto: nombreCompleto.value,
      updatedAt: new Date().toISOString(),
    };

    if (isEditing.value && editingId.value) {
      const index = users.value.findIndex((u) => u._id === editingId.value);
      if (index !== -1) {
        patientData._id = editingId.value;
        users.value[index] = patientData;
      }
      Notify.create({
        type: "positive",
        message: "Paciente actualizado correctamente",
        position: "bottom-right",
      });
    } else {
      patientData._id = new Date().toISOString() + "-" + Math.random().toString(36).substr(2, 9);
      patientData.createdAt = new Date().toISOString();
      users.value.push(patientData);
      Notify.create({
        type: "positive",
        message: "Paciente creado correctamente",
        position: "bottom-right",
      });
    }
    closeDialog();
  } catch (error) {
    console.error("Error saving patient:", error);
    Notify.create({
      type: "negative",
      message: "Error al guardar: " + error.message,
      position: "bottom-right",
    });
  }
};

const deletePatient = (row) => {
  users.value = users.value.filter((u) => u._id !== row._id);
  Notify.create({
    type: "positive",
    message: "Paciente eliminado correctamente",
    position: "bottom-right",
    timeout: 2000,
  });
};

const editPatient = (row) => {
  isEditing.value = true;
  editingId.value = row._id;
  currentStep.value = 1;

  if (row.datosPersonales) {
    Object.assign(formData.datosPersonales, row.datosPersonales);
    Object.assign(formData.antecedentesFamiliares, row.antecedentesFamiliares || {});
    Object.assign(formData.antecedentesPatologicos, row.antecedentesPatologicos || {});
    Object.assign(formData.antecedentesNoPatologicos, row.antecedentesNoPatologicos || {});
    Object.assign(formData.antecedentesPerinatales, row.antecedentesPerinatales || {});
    Object.assign(formData.adicionales, row.adicionales || {});
  } else {
    formData.datosPersonales = {
      clave: row.clave || "",
      fecha: row.fecha || new Date().toISOString().split("T")[0],
      fechaConsulta: row.fechaConsulta || "",
      nombres: row.nombres || "",
      apellidos: row.apellidos || "",
      birthDay: row.birthDay || null,
      birthMonth: row.birthMonth || null,
      birthYear: row.birthYear || null,
      sexo: row.sexo || null,
      telefono: row.telefono || "",
      identificacion: row.identificacion || "",
      oficio: row.oficio || "",
      direccion: row.direccion || "",
      tiposanguineo: row.tiposanguineo || "",
      email: row.email || "",
    };
    formData.adicionales = {
      activo: row.activo !== undefined ? row.activo : true,
      tipo: row.tipo || "General",
      notas: row.notas || "",
    };
  }
  showDialog.value = true;
};

const viewPatient = (row) => {
  selectedPatient.value = row;
  Notify.create({
    type: "info",
    message: `Viendo detalles de ${row.datosPersonales?.nombres || row.nombres}`,
    position: "bottom-right",
    timeout: 1500,
  });
};

const addPatient = () => {
  isEditing.value = false;
  editingId.value = null;
  currentStep.value = 1;
  resetForm();
  showDialog.value = true;
};

const closeDialog = () => {
  showDialog.value = false;
  selectedPatient.value = null;
  resetForm();
  currentStep.value = 1;
  isEditing.value = false;
  editingId.value = null;
};

const resetForm = () => {
  formData.datosPersonales = {
    clave: "",
    fecha: new Date().toISOString().split("T")[0],
    fechaConsulta: "",
    nombres: "",
    apellidos: "",
    birthDay: null,
    birthMonth: null,
    birthYear: null,
    sexo: null,
    telefono: "",
    identificacion: "",
    oficio: "",
    direccion: "",
    tiposanguineo: "",
    email: "",
  };

  formData.antecedentesFamiliares = {
    diabetes: false,
    diabetesDetalle: "",
    hipertension: false,
    hipertensionDetalle: "",
    cancer: false,
    cancerDetalle: "",
    otros: "",
  };

  formData.antecedentesPatologicos = {
    enfermedades: false,
    enfermedadesDetalle: "",
    hospitalizations: false,
    hospitalizacionesDetalle: "",
    transfusiones: false,
    transfusionesDetalle: "",
    intervenciones: false,
    intervencionesDetalle: "",
    traumatismos: false,
    traumatismosDetalle: "",
  };

  formData.antecedentesNoPatologicos = {
    tabaco: false,
    tabacoCantidad: "",
    alcohol: false,
    alcoholFrecuencia: "",
    drogas: false,
    drogasTipo: "",
    medicamentos: false,
    medicamentosCuales: "",
    vacunas: false,
    vacunasCuales: "",
    alergias: false,
    alergiasCuales: "",
    convivenciaAnimales: false,
    convivenciaAnimalesCuales: "",
  };

  formData.antecedentesPerinatales = {
    embarazo: "",
    embarazoComplicaciones: "",
    parto: "",
    partoComplicaciones: "",
    desarrollo: "",
    desarrolloComplicaciones: "",
    crecimiento: "",
    crecimientoComplicaciones: "",
  };

  formData.adicionales = {
    activo: true,
    tipo: "General",
    notas: "",
  };
};

const nextStep = () => {
  if (currentStep.value < 5) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};
</script>

<template>
  <q-page class="q-pa-md mobile-scroll-page">
    <div class="text-h6 q-mb-md">Administración de Pacientes</div>

    <q-table :rows="users" :columns="columns" row-key="_id" :filter="filter" :grid="$q.screen.lt.md" flat bordered
      style="width: 100%">
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
          <q-btn dense flat icon="edit" color="primary" @click="editPatient(props.row)">
            <q-tooltip>Editar</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="delete" color="negative" @click="deletePatient(props.row)">
            <q-tooltip>Eliminar</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="visibility" color="info" @click="viewPatient(props.row)">
            <q-tooltip>Ver detalle</q-tooltip>
          </q-btn>
        </q-td>
      </template>

      <!--===== Vista Móvil (responsive - se ajusta sola) =====-->
      <template v-slot:item="props">
        <div class="q-pa-sm col-12 col-sm-6 col-md-4">
          <q-card>
            <q-card-section>
              <div class="text-h6 text-truncate">{{ props.row.datosPersonales?.nombres || props.row.nombres }}</div>
              <div class="text-subtitle2">Clave: {{ props.row.datosPersonales?.clave || props.row.clave }}</div>
            </q-card-section>

            <!-- Los detalles se ocultan en móvil muy pequeño -->
            <q-card-section class="q-pt-none responsive-details">
              <div><strong>Teléfono:</strong> {{ props.row.datosPersonales?.telefono || props.row.telefono }}</div>
              <div class="responsive-hide-office"><strong>Oficio:</strong> {{ props.row.datosPersonales?.oficio ||
                props.row.oficio }}</div>
              <div class="responsive-hide-email"><strong>Email:</strong> {{ props.row.datosPersonales?.email ||
                props.row.email }}</div>
              <div><strong>Estado:</strong> {{ (props.row.adicionales?.activo || props.row.activo) ? "Activo" :
                "Inactivo" }}</div>
            </q-card-section>

            <q-separator />
            <q-card-actions align="right" class="responsive-actions">
              <q-btn flat icon="edit" color="primary" @click="editPatient(props.row)" size="responsive" />
              <q-btn flat icon="delete" color="negative" @click="deletePatient(props.row)" size="responsive" />
              <q-btn flat icon="visibility" color="info" @click="viewPatient(props.row)" size="responsive" />
            </q-card-actions>
          </q-card>
        </div>
      </template>
    </q-table>

    <!-- MODAL DE 5 PASOS -->
    <q-dialog v-model="showDialog" persistent>
      <q-card class="responsive-modal" style="max-width: 650px;">
        <q-card-section class="bg-primary text-white">
          <div class="row items-center no-wrap">
            <div class="col-auto">
              <img :src="logo" alt="Logo"
                style="height: 50px; width: auto; background: rgba(255,255,255,0.2); border-radius: 10px; padding: 5px 10px;" />
            </div>
            <div class="col q-ml-md">
              <div class="text-h6">{{ dialogTitle }}</div>
              <div class="text-subtitle2">Paso {{ currentStep }} de 5</div>

              <!-- BARRA DE PROGRESO -->
              <div class="progress-bar-container q-mt-sm">
                <div class="progress-bar" :style="{ width: (currentStep / 5) * 100 + '%' }"></div>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-md">
          <!-- PASO 1: DATOS PERSONALES -->
          <div v-if="currentStep === 1">
            <div class="text-h6 text-primary q-mb-md">Datos personales</div>
            <div class="field-group">
              <div class="row q-col-gutter-md">
                <div class="col-6">
                  <q-input v-model="formData.datosPersonales.clave" label="Clave *" outlined dense />
                </div>
                <div class="col-6">
                  <q-input v-model="formData.datosPersonales.fecha" label="Fecha" dense type="date" outlined />
                </div>
                <div class="col-12">
                  <q-input v-model="formData.datosPersonales.fechaConsulta" label="Fecha de consulta" dense type="date"
                    outlined />
                </div>
                <div class="col-12">
                  <q-input v-model="formData.datosPersonales.nombres" label="Nombres *" outlined dense />
                </div>
                <div class="col-12">
                  <q-input v-model="formData.datosPersonales.apellidos" label="Apellidos *" outlined dense />
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
                <div class="col-12">
                  <q-input v-model="formData.datosPersonales.telefono" label="Teléfono *" outlined dense />
                </div>
                <div class="col-12">
                  <q-input v-model="formData.datosPersonales.identificacion" label="Identificación" outlined dense />
                </div>
                <div class="col-12">
                  <q-input v-model="formData.datosPersonales.oficio" label="Oficio" outlined dense />
                </div>
                <div class="col-12">
                  <q-input v-model="formData.datosPersonales.direccion" label="Dirección" outlined dense type="textarea"
                    rows="2" />
                </div>
                <div class="col-12">
                  <q-input v-model="formData.datosPersonales.tiposanguineo" label="Tipo sanguíneo" outlined dense />
                </div>
                <div class="col-12">
                  <q-input v-model="formData.datosPersonales.email" label="Email" outlined dense type="email" />
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

          <!-- PASO 3: ANTECEDENTES PATOLÓGICOS - VERSIÓN CORREGIDA -->
          <div v-if="currentStep === 3">
            <div class="text-h6 text-primary q-mb-md">Antecedentes Patológicos</div>
            <div class="field-group">

              <!-- Enfermedades -->
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

              <!-- Hospitalizaciones -->
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

              <!-- Transfusiones -->
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

              <!-- Intervenciones Quirúrgicas -->
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

              <!-- Traumatismos / Fracturas -->
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
                <div class="field-label">Tabaquismo</div>
                <div class="field-value">
                  <q-btn-toggle v-model="formData.antecedentesNoPatologicos.tabaco"
                    :options="[{ label: 'NO', value: false }, { label: 'SI', value: true }]"
                    class="custom-toggle-group" />
                </div>
              </div>
              <div v-if="formData.antecedentesNoPatologicos.tabaco" class="field-detail">
                <q-input v-model="formData.antecedentesNoPatologicos.tabacoCantidad" label="Cantidad / Frecuencia"
                  outlined dense />
              </div>

              <div class="field-row">
                <div class="field-label">Alcoholismo</div>
                <div class="field-value">
                  <q-btn-toggle v-model="formData.antecedentesNoPatologicos.alcohol"
                    :options="[{ label: 'NO', value: false }, { label: 'SI', value: true }]"
                    class="custom-toggle-group" />
                </div>
              </div>
              <div v-if="formData.antecedentesNoPatologicos.alcohol" class="field-detail">
                <q-input v-model="formData.antecedentesNoPatologicos.alcoholFrecuencia" label="Frecuencia" outlined
                  dense />
              </div>

              <div class="field-row">
                <div class="field-label">Drogas</div>
                <div class="field-value">
                  <q-btn-toggle v-model="formData.antecedentesNoPatologicos.drogas"
                    :options="[{ label: 'NO', value: false }, { label: 'SI', value: true }]"
                    class="custom-toggle-group" />
                </div>
              </div>
              <div v-if="formData.antecedentesNoPatologicos.drogas" class="field-detail">
                <q-input v-model="formData.antecedentesNoPatologicos.drogasTipo" label="Tipo" outlined dense />
              </div>

              <div class="field-row">
                <div class="field-label">Medicamentos</div>
                <div class="field-value">
                  <q-btn-toggle v-model="formData.antecedentesNoPatologicos.medicamentos"
                    :options="[{ label: 'NO', value: false }, { label: 'SI', value: true }]"
                    class="custom-toggle-group" />
                </div>
              </div>
              <div v-if="formData.antecedentesNoPatologicos.medicamentos" class="field-detail">
                <q-input v-model="formData.antecedentesNoPatologicos.medicamentosCuales" label="¿Cuáles?" outlined
                  dense />
              </div>

              <div class="field-row">
                <div class="field-label">Vacunas</div>
                <div class="field-value">
                  <q-btn-toggle v-model="formData.antecedentesNoPatologicos.vacunas"
                    :options="[{ label: 'NO', value: false }, { label: 'SI', value: true }]"
                    class="custom-toggle-group" />
                </div>
              </div>
              <div v-if="formData.antecedentesNoPatologicos.vacunas" class="field-detail">
                <q-input v-model="formData.antecedentesNoPatologicos.vacunasCuales" label="¿Cuáles?" outlined dense />
              </div>

              <div class="field-row">
                <div class="field-label">Alergias</div>
                <div class="field-value">
                  <q-btn-toggle v-model="formData.antecedentesNoPatologicos.alergias"
                    :options="[{ label: 'NO', value: false }, { label: 'SI', value: true }]"
                    class="custom-toggle-group" />
                </div>
              </div>
              <div v-if="formData.antecedentesNoPatologicos.alergias" class="field-detail">
                <q-input v-model="formData.antecedentesNoPatologicos.alergiasCuales" label="Especificar" outlined
                  dense />
              </div>

              <div class="field-row">
                <div class="field-label">Convivencia con animales</div>
                <div class="field-value">
                  <q-btn-toggle v-model="formData.antecedentesNoPatologicos.convivenciaAnimales"
                    :options="[{ label: 'NO', value: false }, { label: 'SI', value: true }]"
                    class="custom-toggle-group" />
                </div>
              </div>
              <div v-if="formData.antecedentesNoPatologicos.convivenciaAnimales" class="field-detail">
                <q-input v-model="formData.antecedentesNoPatologicos.convivenciaAnimalesCuales" label="¿Cuáles?"
                  outlined dense />
              </div>
            </div>
          </div>

          <!-- PASO 5: ANTECEDENTES PERINATALES -->
          <div v-if="currentStep === 5">
            <div class="text-h6 text-primary q-mb-md">Antecedentes Perinatales / Pediátricos</div>
            <div class="field-group">
              <div class="field-row">
                <div class="field-label">Embarazo</div>
                <div class="field-value">
                  <q-option-group v-model="formData.antecedentesPerinatales.embarazo" :options="opcionesEmbarazo"
                    color="primary" inline />
                </div>
              </div>
              <div v-if="formData.antecedentesPerinatales.embarazo === 'Con complicaciones'" class="field-detail">
                <q-input v-model="formData.antecedentesPerinatales.embarazoComplicaciones"
                  label="Especificar complicaciones" outlined dense />
              </div>

              <div class="field-row">
                <div class="field-label">Parto</div>
                <div class="field-value">
                  <q-option-group v-model="formData.antecedentesPerinatales.parto" :options="opcionesEmbarazo"
                    color="primary" inline />
                </div>
              </div>
              <div v-if="formData.antecedentesPerinatales.parto === 'Con complicaciones'" class="field-detail">
                <q-input v-model="formData.antecedentesPerinatales.partoComplicaciones"
                  label="Especificar complicaciones" outlined dense />
              </div>

              <div class="field-row">
                <div class="field-label">Desarrollo</div>
                <div class="field-value">
                  <q-option-group v-model="formData.antecedentesPerinatales.desarrollo" :options="opcionesEmbarazo"
                    color="primary" inline />
                </div>
              </div>
              <div v-if="formData.antecedentesPerinatales.desarrollo === 'Con complicaciones'" class="field-detail">
                <q-input v-model="formData.antecedentesPerinatales.desarrolloComplicaciones"
                  label="Especificar complicaciones" outlined dense />
              </div>

              <div class="field-row">
                <div class="field-label">Crecimiento</div>
                <div class="field-value">
                  <q-option-group v-model="formData.antecedentesPerinatales.crecimiento" :options="opcionesEmbarazo"
                    color="primary" inline />
                </div>
              </div>
              <div v-if="formData.antecedentesPerinatales.crecimiento === 'Con complicaciones'" class="field-detail">
                <q-input v-model="formData.antecedentesPerinatales.crecimientoComplicaciones"
                  label="Especificar complicaciones" outlined dense />
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

<style scoped>
.q-table__container {
  overflow-x: auto;
}

/* ==================== RESPONSIVE PARA MÓVIL ==================== */
@media (max-width: 480px) {

  /* Ocultar campos menos importantes */
  .responsive-hide-office,
  .responsive-hide-email {
    display: none !important;
  }

  /* Reducir padding de la tarjeta */
  .q-card-section {
    padding: 10px !important;
  }

  /* Texto más pequeño */
  .text-h6 {
    font-size: 16px !important;
  }

  .text-subtitle2 {
    font-size: 12px !important;
  }

  /* Botones más pequeños */
  .responsive-actions .q-btn {
    min-width: 32px !important;
    padding: 4px !important;
  }

  .responsive-actions .q-btn .q-icon {
    font-size: 18px !important;
  }
}

/* Móvil muy pequeño*/
@media (max-width: 380px) {

  /* Ocultar teléfono también */
  .q-pt-none div:first-child {
    display: none !important;
  }

  /* Mostrar solo nombre, clave y acciones */
  .q-card-section .text-h6 {
    font-size: 14px !important;
  }

  /* Botones aún más pequeños */
  .responsive-actions .q-btn {
    min-width: 28px !important;
  }
}

/* Tablet*/
@media (min-width: 481px) and (max-width: 768px) {

  /* Todo normal pero más compacto */
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

/* Botón responsive que cambia de tamaño */
.q-btn[size="responsive"] {
  min-width: 40px;
}

@media (max-width: 480px) {
  .q-btn[size="responsive"] {
    min-width: 32px !important;
  }
}

/* ==================== ESTILOS PARA LOS MODALES CON RECUADROS ==================== */
/* Header del modal */
.q-dialog .bg-primary {
  background: #009688 !important;
}

/* Grupos de campos con borde */
.field-group {
  border: none !important;
  border-radius: 12px;
  padding: 16px;
  background: linear-gradient(135deg, #009688 0%, #26a69a 50%, #009688 100%) !important;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0, 150, 136, 0.2);
}

/* Fila de campo individual */
.field-row {
  display: flex;
  align-items: center;
  padding: 12px 8px;
  border-bottom: 1px solid #f0f0f0;
}

.field-row:last-child {
  border-bottom: none;
}

/* Etiqueta del campo */
.field-label {
  width: 140px;
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

/* Valor del campo */
.field-value {
  flex: 1;
}

/* Detalle que aparece al seleccionar SI */
.field-detail {
  margin-left: 148px;
  margin-bottom: 12px;
  margin-top: 4px;
  padding-right: 8px;
}

/* Botones toggle tipo recuadro (SI/NO) */
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

/* Estilo para que los inputs parezcan recuadros */
:deep(.q-field--outlined .q-field__control) {
  background: #fafafa !important;
  border-radius: 8px !important;
  border: 1px solid #d0d0d0 !important;
}

:deep(.q-field--outlined .q-field__control:before) {
  border: none !important;
}

:deep(.q-field--outlined .q-field__control:hover:before) {
  border: none !important;
}

:deep(.q-field--outlined.q-field--focused .q-field__control) {
  border-color: #009688 !important;
  border-width: 2px !important;
}

/* Toggles (interruptores) */
:deep(.q-toggle__inner--active) {
  background: #009688 !important;
}

:deep(.q-toggle__track) {
  background: #009688 !important;
}

/* Radios */
:deep(.q-radio__inner--active) {
  color: #009688 !important;
}

/* Labels en focus */
:deep(.q-field--focused .q-field__label) {
  color: #009688 !important;
}

/* Títulos de sección */
.text-primary {
  color: #009688 !important;
  font-weight: 600;
  margin-bottom: 16px;
  font-size: 18px;
}

/* Fondo del modal */
:deep(.q-dialog__backdrop) {
  background: rgba(0, 0, 0, 0.6) !important;
}

/* Tarjeta del modal */
:deep(.q-card) {
  border-radius: 12px !important;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2) !important;
}

/* ==================== BOTONES DEL MODAL ==================== */
/* Contenedor de botones - alineación y espaciado */
.q-card-actions {
  display: flex !important;
  justify-content: flex-end !important;
  align-items: center !important;
  gap: 12px !important;
  padding: 16px 24px !important;
}

/* Resetear estilos por defecto de Quasar */
:deep(.q-card-actions .q-btn--primary) {
  background: none !important;
  color: inherit !important;
  min-width: auto !important;
}

/* Estilos base para todos los botones*/
.cancel-btn,
.back-btn,
.next-btn {
  min-width: 110px !important;
  height: 38px !important;
  padding: 0 20px !important;
  border-radius: 8px !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  font-family: inherit !important;
  transition: all 0.2s ease !important;
  cursor: pointer !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  margin: 0 !important;
}

/* Botón Cancelar */
.cancel-btn {
  background: transparent !important;
  color: #d32f2f !important;
  border: 1px solid #d32f2f !important;
}

.cancel-btn:hover {
  background: rgba(211, 47, 47, 0.08) !important;
  transform: translateY(-1px);
}

/* Botón Atrás */
.back-btn {
  background: transparent !important;
  color: #666 !important;
  border: 1px solid #bdbdbd !important;
}

.back-btn:hover {
  background: rgba(102, 102, 102, 0.08) !important;
  transform: translateY(-1px);
}

/* Botón Siguiente/Guardar */
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

/* Eliminar cualquier estilo previo que afecte al botón primary */
:deep(.q-card-actions .q-btn--primary) {
  all: unset !important;
}

/* O si prefieres no usar all:unset, usa esto: */
:deep(.q-card-actions .q-btn--primary) {
  background: none !important;
  color: inherit !important;
  min-width: auto !important;
}

/* Opciones de grupo (Embarazo, Parto, etc) */
:deep(.q-option-group) {
  gap: 16px;
}

:deep(.q-option-group .q-radio) {
  margin-right: 16px;
}

:deep(.q-option-group .q-radio__label) {
  color: #333;
  font-weight: normal;
}

/* Alinear todos los detalles que aparecen debajo de los campos */
.field-detail {
  margin-left: 168px !important;
  margin-bottom: 16px !important;
  margin-top: 0 !important;
  padding-right: 8px;
}

/* Asegurar que los labels tengan el mismo ancho en todos los pasos */
.field-row .field-label {
  width: 160px !important;
  flex-shrink: 0;
}

/* ==================== BARRA DE PROGRESO ==================== */
/* Contenedor de la barra */
.progress-bar-container {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  height: 6px;
  overflow: hidden;
}

/* Barra que avanza */
.progress-bar {
  background: white;
  height: 100%;
  border-radius: 10px;
  transition: width 0.3s ease;
}

/* Porcentaje */
.progress-percent {
  font-size: 12px;
  font-weight: bold;
}

/* Forzar scroll en móvil */
.mobile-scroll-page {
  height: 100vh !important;
  overflow-y: auto !important;
  -webkit-overflow-scrolling: touch !important;
}

/* Ajustar para que no haya desbordamiento */
.q-page-container {
  overflow: hidden !important;
}
</style>
