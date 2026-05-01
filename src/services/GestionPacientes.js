import { ref, reactive, computed } from "vue";
import { Notify } from "quasar";

//================================
//DATOS QUEMADOS PARA PRESENTACION
//===============================
const datosPacientesIniciales = [
  {
    _id: "1",
    datosPersonales: {
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
      diabetes: false,
      diabetesDetalle: "",
      hipertension: false,
      hipertensionDetalle: "",
      cancer: false,
      cancerDetalle: "",
      otros: "",
    },
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
    adicionales: {
      activo: true,
      tipo: "General",
      notas: "",
    },
    edad: 39,
  },
  {
    _id: "2",
    datosPersonales: {
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
      cancer: false,
      cancerDetalle: "",
      otros: "",
    },
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
    adicionales: {
      activo: true,
      tipo: "General",
      notas: "",
    },
    edad: 34,
  },
  {
    _id: "3",
    datosPersonales: {
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
      diabetes: false,
      diabetesDetalle: "",
      hipertension: false,
      hipertensionDetalle: "",
      cancer: false,
      cancerDetalle: "",
      otros: "",
    },
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
    adicionales: {
      activo: false,
      tipo: "General",
      notas: "",
    },
    edad: 49,
  },
];

// =====================
// OPTIONS
// =====================
const daysOptions = Array.from({ length: 31 }, (_, i) => i + 1);
const monthsOptions = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];
const opcionesEmbarazo = [
  { label: "Normal", value: "Normal" },
  { label: "Con complicaciones", value: "Con complicaciones" },
];

// =====================
// COLUMNS
// =====================
const columns = [
  {
    name: "nombre",
    label: "Nombre",
    align: "left",
    field: (row) => `${row.datosPersonales?.nombres || ""} ${row.datosPersonales?.apellidos || ""}`.trim(),
    sortable: true
  },
  {
    name: "telefono",
    label: "Teléfono",
    align: "left",
    field: (row) => row.datosPersonales?.telefono
  },
  {
    name: "activo",
    label: "Estado",
    align: "center",
    field: (row) => row.adicionales?.activo ? "Activo" : "Inactivo"
  },
  {
    name: "acciones",
    label: "Acciones",
    align: "center"
  },
];

// =====================
// STATE
// =====================
const users = ref(datosPacientesIniciales);
const filter = ref("");
const showDialog = ref(false);
const selectedPatient = ref(null);
const currentStep = ref(1);
const isEditing = ref(false);
const editingId = ref(null);

// =====================
// FORM DATA
// =====================
const formData = reactive({
  datosPersonales: {
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
  antecedentesFamiliares: {
    diabetes: false,
    diabetesDetalle: "",
    hipertension: false,
    hipertensionDetalle: "",
    cancer: false,
    cancerDetalle: "",
    otros: "",
  },
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
  adicionales: {
    activo: true,
    tipo: "General",
    notas: "",
  },
});

// =====================
// COMPUTED
// =====================
const dialogTitle = computed(() => isEditing.value ? "Editar Paciente" : "Nuevo Paciente");
const nombreCompleto = computed(() => `${formData.datosPersonales.nombres || ""} ${formData.datosPersonales.apellidos || ""}`.trim());
const edadCalculada = computed(() => {
  const { birthDay, birthMonth, birthYear } = formData.datosPersonales;
  if (birthYear && birthMonth && birthDay) {
    const today = new Date();
    const monthIndex = monthsOptions.indexOf(birthMonth);
    const birthDate = new Date(birthYear, monthIndex, birthDay);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  }
  return null;
});

// =====================
// CRUD FUNCIONES
// =====================
const savePatient = async () => {
  try {
    const { nombres, telefono } = formData.datosPersonales;
    if (!nombres || !telefono) {
      Notify.create({ type: "warning", message: "Complete campos requeridos (Nombre, Teléfono)", position: "bottom-right" });
      currentStep.value = 1;
      return;
    }

    const patientData = {
      ...formData,
      edad: edadCalculada.value,
      updatedAt: new Date().toISOString(),
    };

    if (isEditing.value && editingId.value) {
      const index = users.value.findIndex((u) => u._id === editingId.value);
      if (index !== -1) users.value[index] = { ...patientData, _id: editingId.value };
      Notify.create({ type: "positive", message: "Paciente actualizado", position: "bottom-right" });
    } else {
      users.value.push({ ...patientData, _id: Date.now().toString(), createdAt: new Date().toISOString() });
      Notify.create({ type: "positive", message: "Paciente creado", position: "bottom-right" });
    }
    closeDialog();
  } catch (error) {
    console.error("Error saving patient:", error);
    Notify.create({ type: "negative", message: "Error al guardar", position: "bottom-right" });
  }
};

const deletePatient = (row) => {
  Notify.create({
    type: 'warning',
    message: `¿Está seguro que desea eliminar a ${row.datosPersonales?.nombres || row.nombres} ${row.datosPersonales?.apellidos || row.apellidos}?`,
    position: 'bottom-right',
    timeout: 5000,
    actions: [
      {
        label: 'Sí, eliminar',
        color: 'negative',
        handler: () => {
          users.value = users.value.filter((u) => u._id !== row._id);
          Notify.create({
            type: 'positive',
            message: 'Paciente eliminado correctamente',
            position: 'bottom-right',
            timeout: 2000,
          });
        },
      },
      {
        label: 'Cancelar',
        color: 'primary',
        handler: () => {
          Notify.create({
            type: 'info',
            message: 'Eliminación cancelada',
            position: 'bottom-right',
            timeout: 1500,
          });
        },
      },
    ],
  });
};

const editPatient = (row) => {
  isEditing.value = true;
  editingId.value = row._id;
  currentStep.value = 1;
  Object.assign(formData.datosPersonales, row.datosPersonales);
  Object.assign(formData.antecedentesFamiliares, row.antecedentesFamiliares || {});
  Object.assign(formData.antecedentesPatologicos, row.antecedentesPatologicos || {});
  Object.assign(formData.antecedentesNoPatologicos, row.antecedentesNoPatologicos || {});
  Object.assign(formData.antecedentesPerinatales, row.antecedentesPerinatales || {});
  Object.assign(formData.adicionales, row.adicionales || {});
  showDialog.value = true;
};

const viewPatient = (row) => {
  Notify.create({ type: "info", message: `Viendo detalles de ${row.datosPersonales?.nombres}`, position: "bottom-right", timeout: 1500 });
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
    diabetes: false, diabetesDetalle: "", hipertension: false, hipertensionDetalle: "",
    cancer: false, cancerDetalle: "", otros: "",
  };
  formData.antecedentesPatologicos = {
    enfermedades: false, enfermedadesDetalle: "", hospitalizaciones: false, hospitalizacionesDetalle: "",
    transfusiones: false, transfusionesDetalle: "", intervenciones: false, intervencionesDetalle: "",
    traumatismos: false, traumatismosDetalle: "",
  };
  formData.antecedentesNoPatologicos = {
    tabaco: false, tabacoCantidad: "", alcohol: false, alcoholFrecuencia: "", drogas: false, drogasTipo: "",
    medicamentos: false, medicamentosCuales: "", vacunas: false, vacunasCuales: "", alergias: false,
    alergiasCuales: "", convivenciaAnimales: false, convivenciaAnimalesCuales: "",
  };
  formData.antecedentesPerinatales = {
    embarazo: "", embarazoComplicaciones: "", parto: "", partoComplicaciones: "",
    desarrollo: "", desarrolloComplicaciones: "", crecimiento: "", crecimientoComplicaciones: "",
  };
  formData.adicionales = { activo: true, tipo: "General", notas: "" };
};

const nextStep = () => { if (currentStep.value < 5) currentStep.value++; };
const prevStep = () => { if (currentStep.value > 1) currentStep.value--; };

export function useGestionPacientes() {
  return {
    users,
    filter,
    showDialog,
    selectedPatient,
    currentStep,
    isEditing,
    editingId,
    formData,
    daysOptions,
    monthsOptions,
    opcionesEmbarazo,
    columns,
    dialogTitle,
    nombreCompleto,
    edadCalculada,
    savePatient,
    deletePatient,
    editPatient,
    viewPatient,
    addPatient,
    closeDialog,
    resetForm,
    nextStep,
    prevStep,
  };
}
