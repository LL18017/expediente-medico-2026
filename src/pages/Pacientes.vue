<script setup>
defineOptions({
  name: "PacientesList",
});

import { ref, reactive, computed, onMounted, getCurrentInstance, } from "vue";
import { Notify } from "quasar";

// =====================
// STATE
// =====================
const users = ref([]);
const filter = ref("");
const showDialog = ref(false);
const selectedPatient = ref(null);
const currentStep = ref(1);
const isEditing = ref(false);
const editingId = ref(null);

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

// =====================
// FORM DATA
// =====================
const formData = reactive({
  // Paso 1: Datos Personales
  datosPesonales: {
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
    identidicacion: "",
    oficio: "",
    direccion: "",
    tiposanguineo: "",
    email: "",
  },
  // Paso 2: Antecedentes Familiares
  antecedentesFamiliaries: {
    diabetes: false,
    diabetesDetalles: "",

    hipertension: false,
    hipertensionDetalle: "",

    cancer: false,
    cancerDetalle: "",
    otros: [],
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
  //PAso 5: Antecedentes Perinatales / Pediartricos
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
  //Datos Adicionales
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
/*
const aseguradorasOptions = [
  "ISSSTE",
  "IMSS",
  "Seguro Popular",
  "GNP Seguros",
  "AXA",
  "Metlife",
  "Otra",
];
*/
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

//Mostrar Nombre COmpleto
const nombreCompleto = computed(() => {
  return '${formData.datosPersonales.nombres || ""} ${formData.datosPersonales.apellidos || ""}'.trim()
});

// Edad calculada
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
// Guardar paciente
const savePatient = async () => {
  try {
    // Validar campos requeridos
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
      // Actualizar
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
      // Crear nuevo
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

// Eliminar paciente
const deletePatient = (row) => {
  users.value = users.value.filter((u) => u._id !== row._id);
  Notify.create({
    type: "positive",
    message: `Paciente eliminado correctamente`,
    position: "bottom-right",
    timeout: 2000,
  });
};

// Editar paciente
const editPatient = (row) => {
  isEditing.value = true;
  editingId.value = row._id;
  currentStep.value = 1;

  if (row.datosPersonales) {
    // Si los datos ya están anidados
    Object.assign(formData.datosPersonales, row.datosPersonales);
    Object.assign(formData.antecedentesFamiliares, row.antecedentesFamiliares || {});
    Object.assign(formData.antecedentesPatologicos, row.antecedentesPatologicos || {});
    Object.assign(formData.antecedentesNoPatologicos, row.antecedentesNoPatologicos || {});
    Object.assign(formData.antecedentesPerinatales, row.antecedentesPerinatales || {});
    Object.assign(formData.adicionales, row.adicionales || {});
  } else {
    // Migración de datos planos a anidados
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

// Ver paciente
const viewPatient = (row) => {
  selectedPatient.value = row;
  Notify.create({
    type: "info",
    message: `Viendo detalles de ${row.datosPersonales?.nombres || row.nombres}`,
    position: "bottom-right",
    timeout: 1500,
  });
};

// Agregar nuevo paciente
const addPatient = () => {
  isEditing.value = false;
  editingId.value = null;
  currentStep.value = 1;
  resetForm();
  showDialog.value = true;
};

// Cerrar diálogo
const closeDialog = () => {
  showDialog.value = false;
  selectedPatient.value = null;
  resetForm();
  currentStep.value = 1;
  isEditing.value = false;
  editingId.value = null;
};

// Resetear formulario
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
    otros: [{ enfermedad: "", detalles: "" }],
  };

  formData.antecedentesPatologicos = {
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

// Agregar otro antecedente familiar
const agregarOtroAntecedente = () => {
  formData.antecedentesFamiliares.otros.push({ enfermedad: "", detalles: "" });
};

// Eliminar antecedente familiar
const eliminarOtroAntecedente = (index) => {
  formData.antecedentesFamiliares.otros.splice(index, 1);
};

// Navegación entre pasos
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
  <q-page class="q-pa-md">
    <div class="text-h6 q-mb-md">Administración de Pacientes</div>

    <!-- TABLA -->
    <q-table :rows="users" :columns="columns" row-key="_id" :filter="filter" :grid="$q.screen.lt.md" flat bordered
      style="width: 100%">
      <!-- HEADER PERSONALIZADO -->
      <template v-slot:top>
        <div class="row column item-start full-width items-center q-gutter-sm">
          <q-space />
          <div class="row items-center justify-between full-width">
            <!-- Buscador -->
            <q-input dense debounce="300" v-model="filter" placeholder="Buscar..." outlined clearable
              style="width: 450px">
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>

            <!-- Botón Nuevo -->
            <q-btn color="primary" icon="add" label="Nuevo Paciente" @click="addPatient" class="q-mt-sm" />
          </div>
        </div>
      </template>

      <!-- CELDA ACCIONES -->
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

      <!-- VISTA GRID (MÓVIL) -->
      <template v-slot:item="props">
        <div class="q-pa-sm col-12 col-sm-6 col-md-4">
          <q-card>
            <q-card-section>
              <div class="text-h6">
                {{ props.row.nombres || props.row.nombre }}
              </div>
              <div class="text-subtitle2">Clave: {{ props.row.clave }}</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <div><strong>Teléfono:</strong> {{ props.row.telefono }}</div>
              <div><strong>Oficio:</strong> {{ props.row.oficio }}</div>
              <div><strong>Email:</strong> {{ props.row.email }}</div>
              <div>
                <strong>Estado:</strong>
                {{ props.row.activo ? "Activo" : "Inactivo" }}
              </div>
            </q-card-section>
            <q-separator />
            <q-card-actions align="right">
              <q-btn flat icon="edit" color="primary" @click="editPatient(props.row)" />
              <q-btn flat icon="delete" color="negative" @click="deletePatient(props.row)" />
              <q-btn flat icon="visibility" color="info" @click="viewPatient(props.row)" />
            </q-card-actions>
          </q-card>
        </div>
      </template>
    </q-table>

    <!-- =====================Modal para agregar datos================ -->
    <q-dialog v-model="showDialog" persistent>
      <q-card style="min-width: 500px; max-width: 600px">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">{{ dialogTitle }}</div>
          <div class="text-subtitle2">Paso {{ currentStep }}/5</div>
        </q-card-section>

        <q-card-section class="q-pt-md">
          <!-- ================= PASO 1: DATOS PERSONALES ================= -->
          <div v-if="currentStep === 1">
            <div class="text-h6 text-primary q-mb-md">Datos personales</div>
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
              <div class="col-6">
                <q-input v-model="formData.datosPersonales.nombres" label="Nombres *" outlined dense />
              </div>
              <div class="col-6">
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

          <!-- ================= PASO 2: ANTECEDENTES FAMILIARES ================= -->
          <div v-if="currentStep === 2">
            <div class="text-h6 text-primary q-mb-md">Antecedentes Familiares</div>
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <div class="row items-center">
                  <div class="col-4"><strong>Diabetes</strong></div>
                  <div class="col-8">
                    <q-toggle v-model="formData.antecedentesFamiliares.diabetes" color="primary" />
                  </div>
                </div>
                <q-input v-if="formData.antecedentesFamiliares.diabetes"
                  v-model="formData.antecedentesFamiliares.diabetesDetalle" label="Especificar" outlined dense
                  class="q-mt-sm q-ml-md" />
              </div>
              <div class="col-12">
                <div class="row items-center">
                  <div class="col-4"><strong>Hipertensión</strong></div>
                  <div class="col-8">
                    <q-toggle v-model="formData.antecedentesFamiliares.hipertension" color="primary" />
                  </div>
                </div>
                <q-input v-if="formData.antecedentesFamiliares.hipertension"
                  v-model="formData.antecedentesFamiliares.hipertensionDetalle" label="Especificar" outlined dense
                  class="q-mt-sm q-ml-md" />
              </div>
              <div class="col-12">
                <div class="row items-center">
                  <div class="col-4"><strong>Cáncer</strong></div>
                  <div class="col-8">
                    <q-toggle v-model="formData.antecedentesFamiliares.cancer" color="primary" />
                  </div>
                </div>
                <q-input v-if="formData.antecedentesFamiliares.cancer"
                  v-model="formData.antecedentesFamiliares.cancerDetalle" label="Especificar" outlined dense
                  class="q-mt-sm q-ml-md" />
              </div>

              <div class="col-12 q-mt-md">
                <div class="text-subtitle2">Otros antecedentes</div>
                <div v-for="(item, index) in formData.antecedentesFamiliares.otros" :key="index"
                  class="row q-col-gutter-sm q-mt-sm">
                  <div class="col-5">
                    <q-input v-model="item.enfermedad" label="Enfermedad" outlined dense />
                  </div>
                  <div class="col-5">
                    <q-input v-model="item.detalles" label="Detalles" outlined dense />
                  </div>
                  <div class="col-2">
                    <q-btn flat icon="delete" color="negative" @click="eliminarOtroAntecedente(index)" size="sm" />
                  </div>
                </div>
                <q-btn flat label="+ Agregar otro" color="primary" @click="agregarOtroAntecedente" class="q-mt-sm" />
              </div>
            </div>
          </div>
          <!--============================Paso 3: Antecedentes PAtologicos====================-->
          <div v-if="currentStep === 3">
            <div class="text-h6 text-primaty q-mb-md">Antecedentes Patológicos</div>
            <div class="row q-col gutter-md">
              <div class="col-12">
                <div class="row items-center">
                  <div class="col-5">
                    <strong>Enfermedades</strong>
                  </div>
                  <div class="col-7">
                    <q-toggel v-memo="formData.antecedentesPatologicos.enfermedades" color="primary" />
                  </div>
                </div>
                <q-input v-if="formData.antecedentesPatologicos.enfermedades"
                  v-model="formData.antecedentesPatologicos.enfermedadesDetalle" label="Especificar" outlined
                  dense="" />
              </div>
              <div class="col-12">
                <div class="row items-center">
                  <div class="col-5">
                    <strong>Hospitalizaciones</strong>
                  </div>
                  <div class="col-7">
                    <q-toggel v-model="formData.antecedentesPatologicos.hospitalizaciones" color="primary" />
                  </div>
                </div>
                <q-input v-if="formData.antecedentesPatologicos.hospitalizaciones"
                  v-model="formData.antecedentesPatologicos.hospitalizacionesDetalle" label="Especificar" outlined dense
                  class="q-mt-sm q-ml-md" />
              </div>
              <div class="col-12">
                <div class="row items-center">
                  <div class="col-5">
                    <strong>Transfusiones</strong>
                  </div>
                  <div class="col-7">
                    <q-toggle v-model="formData.antecedentesPatologicos.transfusiones" color="primary" />
                  </div>
                </div>
                <q-input v-if="formData.antecedentesPatologicos.transfusiones"
                  v-model="formData.antecedentesPatologicos.transfusionesDetalle" label="Especificar" outlined dense
                  class="q-mt-sm q-ml*md" />
              </div>
              <div class="col-12">
                <dic class="row items-center">
                  <div class="col-5">
                    <strong>INtervenciones Quirúrgicas</strong>
                  </div>
                  <div class="col-7">
                    <q-toggle v-model="formData.antecedentesPatologicos.intervenciones" color="primary" />
                  </div>
                </dic>
                <q-input v-if="antecedentesPatologicos.intervenciones"
                  v-model="formData.antecedentesPatologicos.intervencionesDetalle" label="Especificar" outlined dense
                  class="q-mt-sm q-ml-md" />
              </div>
              <div class="col-12">
                <div class="row items-center">
                  <div class="col-5">
                    <strong>Traumatismo / Facturas</strong>
                  </div>
                  <div class="col-7">
                    <q-toggle v-model="formData.antecedentesPatologicos.traumatismos" color="primary" />
                  </div>
                </div>
                <q-input v-if="formData.antecedentesPatologicos.traumatismos"
                  v-model="formData.antecedentesPatologicos.traumatismosDetalle" label="Especificar" outlined dense
                  class="q-mt-sm q-ml-md" />
              </div>
            </div>
          </div>
          <!-- ================= PASO 4: ANTECEDENTES NO PATOLÓGICOS ================= -->
          <div v-if="currentStep === 4">
            <div class="text-h6 text-primary q-mb-md">Antecedentes No Patológicos</div>
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <div class="row items-center">
                  <div class="col-4"><strong>Tabaco</strong></div>
                  <div class="col-8">
                    <q-toggle v-model="formData.antecedentesNoPatologicos.tabaco" color="primary" />
                  </div>
                </div>
                <q-input v-if="formData.antecedentesNoPatologicos.tabaco"
                  v-model="formData.antecedentesNoPatologicos.tabacoCantidad" label="Cantidad / Frecuencia" outlined
                  dense class="q-mt-sm q-ml-md" />
              </div>
              <div class="col-12">
                <div class="row items-center">
                  <div class="col-4"><strong>Alcohol</strong></div>
                  <div class="col-8">
                    <q-toggle v-model="formData.antecedentesNoPatologicos.alcohol" color="primary" />
                  </div>
                </div>
                <q-input v-if="formData.antecedentesNoPatologicos.alcohol"
                  v-model="formData.antecedentesNoPatologicos.alcoholFrecuencia" label="Frecuencia" outlined dense
                  class="q-mt-sm q-ml-md" />
              </div>
              <div class="col-12">
                <div class="row items-center">
                  <div class="col-4"><strong>Drogas</strong></div>
                  <div class="col-8">
                    <q-toggle v-model="formData.antecedentesNoPatologicos.drogas" color="primary" />
                  </div>
                </div>
                <q-input v-if="formData.antecedentesNoPatologicos.drogas"
                  v-model="formData.antecedentesNoPatologicos.drogasTipo" label="Tipo" outlined dense
                  class="q-mt-sm q-ml-md" />
              </div>
              <div class="col-12">
                <div class="row items-center">
                  <div class="col-4"><strong>Medicamentos</strong></div>
                  <div class="col-8">
                    <q-toggle v-model="formData.antecedentesNoPatologicos.medicamentos" color="primary" />
                  </div>
                </div>
                <q-input v-if="formData.antecedentesNoPatologicos.medicamentos"
                  v-model="formData.antecedentesNoPatologicos.medicamentosCuales" label="¿Cuáles?" outlined dense
                  class="q-mt-sm q-ml-md" />
              </div>
              <div class="col-12">
                <div class="row items-center">
                  <div class="col-4"><strong>Vacunas</strong></div>
                  <div class="col-8">
                    <q-toggle v-model="formData.antecedentesNoPatologicos.vacunas" color="primary" />
                  </div>
                </div>
                <q-input v-if="formData.antecedentesNoPatologicos.vacunas"
                  v-model="formData.antecedentesNoPatologicos.vacunasCuales" label="¿Cuáles?" outlined dense
                  class="q-mt-sm q-ml-md" />
              </div>
              <div class="col-12">
                <div class="row items-center">
                  <div class="col-4"><strong>Alergias</strong></div>
                  <div class="col-8">
                    <q-toggle v-model="formData.antecedentesNoPatologicos.alergias" color="primary" />
                  </div>
                </div>
                <q-input v-if="formData.antecedentesNoPatologicos.alergias"
                  v-model="formData.antecedentesNoPatologicos.alergiasCuales" label="Especificar" outlined dense
                  class="q-mt-sm q-ml-md" />
              </div>
              <div class="col-12">
                <div class="row items-center">
                  <div class="col-4"><strong>Convivencia con animales</strong></div>
                  <div class="col-8">
                    <q-toggle v-model="formData.antecedentesNoPatologicos.convivenciaAnimales" color="primary" />
                  </div>
                </div>
                <q-input v-if="formData.antecedentesNoPatologicos.convivenciaAnimales"
                  v-model="formData.antecedentesNoPatologicos.convivenciaAnimalesCuales" label="¿Cuáles?" outlined dense
                  class="q-mt-sm q-ml-md" />
              </div>
            </div>
          </div>

          <!-- ================= PASO 5: ANTECEDENTES PERINATALES ================= -->
          <div v-if="currentStep === 5">
            <div class="text-h6 text-primary q-mb-md">Antecedentes Perinatales / Pediátricos</div>
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <div class="row items-center">
                  <div class="col-4"><strong>Embarazo</strong></div>
                  <div class="col-8">
                    <q-option-group v-model="formData.antecedentesPerinatales.embarazo" :options="opcionesEmbarazo"
                      color="primary" inline />
                  </div>
                </div>
                <q-input v-if="formData.antecedentesPerinatales.embarazo === 'Con complicaciones'"
                  v-model="formData.antecedentesPerinatales.embarazoComplicaciones" label="Especificar complicaciones"
                  outlined dense class="q-mt-sm q-ml-md" />
              </div>

              <div class="col-12">
                <div class="row items-center">
                  <div class="col-4"><strong>Parto</strong></div>
                  <div class="col-8">
                    <q-option-group v-model="formData.antecedentesPerinatales.parto" :options="opcionesEmbarazo"
                      color="primary" inline />
                  </div>
                </div>
                <q-input v-if="formData.antecedentesPerinatales.parto === 'Con complicaciones'"
                  v-model="formData.antecedentesPerinatales.partoComplicaciones" label="Especificar complicaciones"
                  outlined dense class="q-mt-sm q-ml-md" />
              </div>

              <div class="col-12">
                <div class="row items-center">
                  <div class="col-4"><strong>Desarrollo</strong></div>
                  <div class="col-8">
                    <q-option-group v-model="formData.antecedentesPerinatales.desarrollo" :options="opcionesEmbarazo"
                      color="primary" inline />
                  </div>
                </div>
                <q-input v-if="formData.antecedentesPerinatales.desarrollo === 'Con complicaciones'"
                  v-model="formData.antecedentesPerinatales.desarrolloComplicaciones" label="Especificar complicaciones"
                  outlined dense class="q-mt-sm q-ml-md" />
              </div>

              <div class="col-12">
                <div class="row items-center">
                  <div class="col-4"><strong>Crecimiento</strong></div>
                  <div class="col-8">
                    <q-option-group v-model="formData.antecedentesPerinatales.crecimiento" :options="opcionesEmbarazo"
                      color="primary" inline />
                  </div>
                </div>
                <q-input v-if="formData.antecedentesPerinatales.crecimiento === 'Con complicaciones'"
                  v-model="formData.antecedentesPerinatales.crecimientoComplicaciones"
                  label="Especificar complicaciones" outlined dense class="q-mt-sm q-ml-md" />
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat label="Cancelar" v-close-popup color="negative" @click="closeDialog" />
          <q-btn v-if="currentStep > 1" flat label="Atrás" color="secondary" @click="prevStep" />
          <q-btn flat :label="currentStep === 5 ? 'Guardar' : 'Siguiente'" color="primary"
            @click="currentStep === 5 ? savePatient() : nextStep()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<style scoped>
.q-table__container {
  overflow-x: auto;
}
</style>
