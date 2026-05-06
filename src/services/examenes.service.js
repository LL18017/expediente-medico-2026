import { userAuth } from 'src/composable/userAuth'
import { useRouter } from 'vue-router'
import { Notify } from 'quasar'

const monthsOptions = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const getMonthName = (monthIndex) => {
  return monthsOptions[monthIndex];
};

export default {
  name: "ExamenesPage",

  setup() {
    const { user } = userAuth()
    const router = useRouter()


    function verExpediente(paciente) {
      console.log("Paciente seleccionado:", paciente);

      if (!paciente) {
        Notify.create({
          type: 'error',
          message: 'Error: Datos del paciente incompletos',
          position: 'bottom-right'
        })
        return
      }

      try {
        // Transformar el paciente al formato que espera ExpedienteView
        const pacienteFormateado = {
          _id: paciente.id || paciente._id,
          datosPersonales: {
            nombres: paciente.nombres || '',
            apellidos: paciente.apellidos || '',
            birthDay: paciente.fecha_nacimiento ? new Date(paciente.fecha_nacimiento).getDate() : null,
            birthMonth: paciente.fecha_nacimiento ? getMonthName(new Date(paciente.fecha_nacimiento).getMonth()) : null,
            birthYear: paciente.fecha_nacimiento ? new Date(paciente.fecha_nacimiento).getFullYear() : null,
            sexo: paciente.sexo || '',
            telefono: paciente.telefono || '',
            identificacion: paciente.doc?.valor || paciente.identificacion || '',
            oficio: paciente.oficio || '',
            direccion: paciente.direccion || '',
            tiposanguineo: paciente.tiposanguineo || '',
            email: paciente.correo || paciente.email || '',
          },
          antecedentesFamiliares: {
            diabetes: paciente.antecedentes_familiares?.some(a => a.nombre === "Diabetes" && a.aplica) || false,
            diabetesDetalle: "",
            hipertension: paciente.antecedentes_familiares?.some(a => a.nombre === "Hipertension" && a.aplica) || false,
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
            tabaco: paciente.antecedentes_no_patologicos?.fuma || false,
            tabacoCantidad: "",
            alcohol: paciente.antecedentes_no_patologicos?.toma || false,
            alcoholFrecuencia: "",
            drogas: false,
            drogasTipo: "",
            medicamentos: false,
            medicamentosCuales: "",
            vacunas: false,
            vacunasCuales: "",
            alergias: paciente.condiciones_especiales ? true : false,
            alergiasCuales: paciente.condiciones_especiales || "",
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
          edad: paciente.edad || null
        }

        console.log("Paciente formateado para expediente:", pacienteFormateado)

        // Serializar correctamente para URL
        const pacienteSerializado = encodeURIComponent(JSON.stringify(pacienteFormateado))

        router.push({
          path: '/expediente/paciente',
          query: { paciente: pacienteSerializado }
        })

      } catch (error) {
        console.error("Error al serializar paciente:", error)
        Notify.create({
          type: 'error',
          message: 'Error al abrir el expediente: ' + error.message,
          position: 'bottom-right'
        })
      }
    }

    return {
      user,
      verExpediente
    }
  },

  data() {
    return {
      search: "",
      pacientes: [],
      pacienteSeleccionado: null,
      form: {
        fecha: "",
        ordenadoPor: "",
        tipo: "",
        motivo: ""
      },
      tiposExamen: ["Orina", "Sangre", "Glucosa"]
    };
  },

  mounted() {
    this.cargarPacientes()
  },

  computed: {
    filteredPacientes() {
      if (!this.search || this.search.trim() === "") {
        return [];
      }

      return this.pacientes.filter(p =>
        p.nombre.toLowerCase().includes(this.search.toLowerCase())
      );
    },

    inicialesPaciente() {
      if (!this.pacienteSeleccionado) return "";
      return this.pacienteSeleccionado.nombre
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase();
    }
  },

  methods: {
    selectPaciente(paciente) {
      this.pacienteSeleccionado = paciente;
      this.search = "";

      this.form = {
        fecha: "",
        ordenadoPor: this.user?.nombre || '',
        tipo: "",
        motivo: ""
      };
    },

    goTo(ruta) {
      console.log("Ir a:", ruta);
    },

    async cargarPacientes() {
      try {
        const response = await fetch('/data/db.json')
        const data = await response.json()

        this.pacientes = data.rows
          .filter(item => item.doc && item.doc.coleccion === 'exmed-pacientes')
          .map(item => {
            const p = item.doc
            return {
              ...p,
              id: p._id,
              _id: p._id,
              nombre: `${p.nombres || ''} ${p.apellidos || ''}`.trim(),
              nombres: p.nombres || '',
              apellidos: p.apellidos || '',
              edad: this.calcularEdad(p.fecha_nacimiento),
              sexo: p.sexo,
              telefono: p.telefono,
              correo: p.correo,
              direccion: p.direccion,
              fecha_nacimiento: p.fecha_nacimiento,
              oficio: p.oficio,
              tiposanguineo: p.tipo_sangre,
              doc: p.doc,
              antecedentes_familiares: p.antecedentes_familiares || [],
              antecedentes_no_patologicos: p.antecedentes_no_patologicos || {},
              condiciones_especiales: p.condiciones_especiales || ''
            }
          })

        console.log('Pacientes cargados:', this.pacientes)

      } catch (error) {
        console.error('Error cargando pacientes:', error)
        Notify.create({
          type: 'negative',
          message: 'Error al cargar pacientes',
          position: 'bottom-right'
        })
      }
    },

    calcularEdad(fecha) {
      if (!fecha) return null

      const hoy = new Date()
      const nacimiento = new Date(fecha)

      let edad = hoy.getFullYear() - nacimiento.getFullYear()
      const mes = hoy.getMonth() - nacimiento.getMonth()

      if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--
      }

      return edad
    },

    getAvatar(paciente) {
      if (!paciente) return '/src/assets/userMasc.png';

      const genero = (paciente.genero || paciente.sexo || '').toLowerCase();

      if (genero.includes('femen')) {
        return '/src/assets/userFem.png';
      }

      return '/src/assets/userMasc.png';
    }
  }
};
