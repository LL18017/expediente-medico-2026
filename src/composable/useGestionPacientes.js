import { ref, reactive, computed, onMounted } from "vue";
import { Notify } from "quasar";

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
const users = ref([]);
const filter = ref("");
const showDialog = ref(false);
const selectedPatient = ref(null);
const currentStep = ref(1);
const isEditing = ref(false);
const editingId = ref(null);
const isLoading = ref(false);

// =====================
// FORM DATA
// =====================
const createInitialState = () => ({
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

const formData = reactive(createInitialState());

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
// CARGA DE DATOS DESDE JSON
// =====================
const fetchPacientes = async () => {
  isLoading.value = true;
  try {
    console.log("Intentando cargar: /data/db.json");
    const response = await fetch("/data/db.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Datos cargados:", data);

    // Filtrar SOLO los documentos que son pacientes
    // Buscar en rows donde doc.coleccion === "exmed-pacientes"
    if (data.rows && Array.isArray(data.rows)) {
      const pacientes = data.rows
        .filter(row => row.doc && row.doc.coleccion === "exmed-pacientes")
        .map(row => {
          const doc = row.doc;
          return {
            _id: doc._id,
            datosPersonales: {
              nombres: doc.nombres || "",
              apellidos: doc.apellidos || "",
              birthDay: doc.fecha_nacimiento ? new Date(doc.fecha_nacimiento).getDate() : null,
              birthMonth: doc.fecha_nacimiento ? monthsOptions[new Date(doc.fecha_nacimiento).getMonth()] : null,
              birthYear: doc.fecha_nacimiento ? new Date(doc.fecha_nacimiento).getFullYear() : null,
              sexo: doc.sexo || null,
              telefono: doc.telefono || "",
              identificacion: doc.doc?.valor || "",
              oficio: doc.oficio || "",
              direccion: doc.direccion || "",
              tiposanguineo: doc.tiposanguineo || "",
              email: doc.correo || "",
            },
            antecedentesFamiliares: {
              diabetes: doc.antecedentes_familiares?.some(a => a.nombre === "Diabetes" && a.aplica) || false,
              diabetesDetalle: "",
              hipertension: doc.antecedentes_familiares?.some(a => a.nombre === "Hipertension" && a.aplica) || false,
              hipertensionDetalle: "",
              cancer: false,
              cancerDetalle: "",
              otros: doc.antecedentes_familiares?.filter(a => !["Diabetes", "Hipertension"].includes(a.nombre)).map(a => `${a.nombre}: ${a.aplica}`).join(", ") || "",
            },
            antecedentesPatologicos: {
              enfermedades: doc.antecedentes_patologicos?.some(a => a.tipo && a.valor) || false,
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
              tabaco: doc.antecedentes_no_patologicos?.fuma || false,
              tabacoCantidad: "",
              alcohol: doc.antecedentes_no_patologicos?.toma || false,
              alcoholFrecuencia: "",
              drogas: false,
              drogasTipo: "",
              medicamentos: false,
              medicamentosCuales: "",
              vacunas: false,
              vacunasCuales: "",
              alergias: doc.condiciones_especiales ? true : false,
              alergiasCuales: doc.condiciones_especiales || "",
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
            edad: doc.fecha_nacimiento ? new Date().getFullYear() - new Date(doc.fecha_nacimiento).getFullYear() : null,
          };
        });

      users.value = pacientes;
      console.log("Pacientes cargados:", users.value.length);
    } else {
      users.value = [];
      console.warn("No se encontraron pacientes en la estructura de datos");
    }
  } catch (error) {
    console.error("Error cargando pacientes:", error);
    Notify.create({
      type: "negative",
      message: `Error al cargar la base de datos: ${error.message}`,
      position: "bottom-right"
    });
  } finally {
    isLoading.value = false;
  }
};

// =====================
// CRUD FUNCIONES
// =====================
const savePatient = async () => {
  try {
    const { nombres, telefono } = formData.datosPersonales;
    if (!nombres || !telefono) {
      Notify.create({
        type: "warning",
        message: "Complete campos requeridos (Nombre, Teléfono)",
        position: "bottom-right"
      });
      currentStep.value = 1;
      return;
    }

    // Clonar datos para evitar referencias reactivas
    const patientData = JSON.parse(JSON.stringify(formData));
    patientData.edad = edadCalculada.value;
    patientData.updatedAt = new Date().toISOString();

    if (isEditing.value && editingId.value) {
      const index = users.value.findIndex((u) => u._id === editingId.value);
      if (index !== -1) {
        users.value[index] = { ...patientData, _id: editingId.value };
        Notify.create({
          type: "positive",
          message: "Paciente actualizado correctamente",
          position: "bottom-right"
        });
      }
    } else {
      // Crear nuevo paciente
      const newPatient = {
        ...patientData,
        _id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      users.value.push(newPatient);
      Notify.create({
        type: "positive",
        message: "Paciente creado correctamente",
        position: "bottom-right"
      });
    }
    closeDialog();
  } catch (error) {
    console.error("Error saving patient:", error);
    Notify.create({
      type: "negative",
      message: "Error al guardar el paciente",
      position: "bottom-right"
    });
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

  // Asignar datos del paciente al formulario
  Object.assign(formData.datosPersonales, row.datosPersonales);
  Object.assign(formData.antecedentesFamiliares, row.antecedentesFamiliares || {});
  Object.assign(formData.antecedentesPatologicos, row.antecedentesPatologicos || {});
  Object.assign(formData.antecedentesNoPatologicos, row.antecedentesNoPatologicos || {});
  Object.assign(formData.antecedentesPerinatales, row.antecedentesPerinatales || {});
  Object.assign(formData.adicionales, row.adicionales || {});

  showDialog.value = true;
};

const updatePatient = (pacienteEditado) => {
  const index = users.value.findIndex(u => u._id === pacienteEditado._id);
  if (index !== -1) {
    users.value[index] = pacienteEditado;
    Notify.create({
      type: 'positive',
      message: 'Datos del paciente actualizados correctamente',
      position: 'bottom-right',
      timeout: 2500
    });
    return true;
  }
  Notify.create({
    type: 'negative',
    message: 'Error al actualizar el paciente',
    position: 'bottom-right',
    timeout: 2500
  });
  return false;
};

const viewPatient = (row) => {
  Notify.create({
    type: "info",
    message: `Viendo detalles de ${row.datosPersonales?.nombres} ${row.datosPersonales?.apellidos}`,
    position: "bottom-right",
    timeout: 1500
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
  Object.assign(formData, createInitialState());
};

const nextStep = () => {
  if (currentStep.value < 5) currentStep.value++;
};

const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--;
};

// =====================
// EXPORTAR COMPOSABLE
// =====================
export function useGestionPacientes() {
  // Cargar datos al montar
  onMounted(fetchPacientes);

  return {
    // Estado
    users,
    filter,
    showDialog,
    selectedPatient,
    currentStep,
    isEditing,
    editingId,
    formData,
    isLoading,

    // Opciones y columnas
    daysOptions,
    monthsOptions,
    opcionesEmbarazo,
    columns,

    // Computed
    dialogTitle,
    nombreCompleto,
    edadCalculada,

    // Métodos CRUD
    savePatient,
    deletePatient,
    editPatient,
    viewPatient,
    addPatient,
    closeDialog,
    resetForm,
    nextStep,
    prevStep,
    updatePatient,

    // Método para recargar datos
    refreshData: fetchPacientes,
  };
}
