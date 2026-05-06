import { userAuth } from 'src/composable/userAuth'
import { useRouter } from 'vue-router'
import { Notify } from 'quasar'

export default {
    name: "ExamenesPage",

    setup() {
        const { user } = userAuth()
        const router = useRouter()

        // 🔥 FUNCIÓN PARA IR AL EXPEDIENTE
        function verExpediente(paciente) {
            console.log("Paciente seleccionado:", paciente)

            if (!paciente) {
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

        return {
            user,
            verExpediente // 👈 IMPORTANTE exportarlo
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

                this.pacientes = data.rows.map(item => {
                    const p = item.doc

                    return {
                        ...p,
                        id: p._id,
                        nombre: `${p.nombres} ${p.apellidos || ''}`,
                        edad: this.calcularEdad(p.fecha_nacimiento),
                        sexo: p.sexo
                    }
                })

                console.log('Pacientes cargados:', this.pacientes)

            } catch (error) {
                console.error('Error cargando pacientes:', error)
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
