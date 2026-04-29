<template>
    <q-page class="bg-grey-2 q-pa-md">

        <div class="row q-col-gutter-md">

            <!-- SECCIÓN IZQUIERDA -->
            <div class="col-3 bg-white rounded-borders q-pa-md shadow-2">

                <!-- Buscador -->
                <q-input v-model="search" label="Buscar paciente" dense outlined debounce="300" class="q-mb-md">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>

                <!-- Lista de pacientes -->
                <q-list bordered separator>
                    <q-item v-for="paciente in filteredPacientes" :key="paciente.id" clickable
                        @click="selectPaciente(paciente)" :active="pacienteSeleccionado?.id === paciente.id"
                        active-class="bg-teal-2">
                        <q-item-section avatar>
                            <q-img src="/src/assets/avatar-doctor.png" style="width: 40px; height: 40px;" />
                        </q-item-section>

                        <q-item-section>
                            {{ paciente.nombre }}
                        </q-item-section>
                    </q-item>
                </q-list>

                <!-- Menú inferior -->
                <div class="menu-medico-container q-pa-md">
                    <q-list no-border>

                        <q-item clickable v-ripple @click="goTo('consultas')" class="menu-item">
                            <q-item-section avatar>
                                <q-icon name="medical_services" size="28px" />
                            </q-item-section>
                            <q-item-section class="text-label">Consultas</q-item-section>
                        </q-item>

                        <q-item clickable v-ripple @click="goTo('resumen')" class="menu-item">
                            <q-item-section avatar>
                                <q-icon name="auto_stories" size="28px" />
                            </q-item-section>
                            <q-item-section class="text-label">Resumen Clinico</q-item-section>
                        </q-item>

                        <q-item clickable v-ripple @click="goTo('recetas')" class="menu-item">
                            <q-item-section avatar>
                                <q-icon name="post_add" size="28px" />
                            </q-item-section>
                            <q-item-section class="text-label">Resetas</q-item-section>
                        </q-item>

                        <q-item clickable v-ripple @click="goTo('examenes')" class="menu-item">
                            <q-item-section avatar>
                                <q-icon name="feed" size="28px" />
                            </q-item-section>
                            <q-item-section class="text-label">Examenes</q-item-section>
                        </q-item>

                    </q-list>
                </div>

            </div>

            <!-- SECCIÓN DERECHA -->
            <div class="col-9">

                <div class="bg-white q-pa-md rounded-borders shadow-2">

                    <!-- Encabezado paciente -->
                    <div v-if="pacienteSeleccionado" class="row items-center q-mb-md">
                        <q-avatar size="50px">
                            <img src="/src/assets/avatar-doctor.png" />
                        </q-avatar>

                        <div class="q-ml-md">
                            <div class="text-h6">
                                Paciente: {{ pacienteSeleccionado.nombre }}
                            </div>
                            <div class="text-subtitle2 text-grey">
                                Edad: {{ pacienteSeleccionado.edad }} años
                            </div>
                        </div>
                    </div>

                    <!-- Contenido principal -->
                    <div class="row q-col-gutter-md">

                        <!-- Formulario -->
                        <div class="col-7">

                            <div class="text-h4 q-mb-sm ">Exámenes</div>

                            <q-input v-model="form.fecha" label="Fecha" outlined dense class="q-mb-sm" />
                            <q-input v-model="form.ordenadoPor" label="Ordenado por" outlined dense class="q-mb-sm" />

                            <q-select v-model="form.tipo" :options="tiposExamen" label="Tipo de Examen" outlined dense
                                class="q-mb-sm" />

                            <q-input v-model="form.motivo" label="Motivo del examen" type="textarea" outlined dense
                                class="q-mb-md" />

                            <!-- Botones -->
                            <div class="flex flex-center q-gutter-sm">
                                <q-btn color="teal" label="Nuevo Examen" icon="add" @click="nuevoExamen" />
                                <q-btn color="primary" label="Guardar" icon="folder" @click="guardarExamen" />
                                <q-btn color="negative" label="Eliminar" icon="delete" @click="eliminarExamen" />
                            </div>

                        </div>

                        <!-- Historial -->
                        <div class="col-5">

                            <div class="text-h4 q-mb-sm">
                                Historial de Exámenes
                            </div>

                            <q-list bordered separator>

                                <q-item v-for="(examen, index) in historial" :key="index">
                                    <q-item-section>
                                        <div class="text-weight-medium">{{ examen.fecha }}</div>
                                        <div class="text-grey text-caption">{{ examen.tipo }}</div>
                                    </q-item-section>

                                    <q-item-section side>
                                        <q-checkbox v-model="examen.realizado" />
                                    </q-item-section>
                                </q-item>

                            </q-list>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </q-page>
</template>

<script>
export default {
    name: "ExamenesPage",

    data() {
        return {
            search: "",

            pacientes: [
                { id: 1, nombre: "Juan Pérez", edad: 45 },
                { id: 2, nombre: "Carlos Gomez", edad: 38 },
                { id: 3, nombre: "Luis Castro", edad: 50 },
                { id: 4, nombre: "Maria Santos", edad: 29 }
            ],

            pacienteSeleccionado: null,

            form: {
                fecha: "",
                ordenadoPor: "",
                tipo: "",
                motivo: ""
            },

            tiposExamen: ["Orina", "Sangre", "Glucosa"],

            historial: [
                { fecha: "12/10/2025", tipo: "Orina", realizado: false },
                { fecha: "01/01/2026", tipo: "Glucosa", realizado: true }
            ]
        };
    },

    computed: {
        filteredPacientes() {
            return this.pacientes.filter(p =>
                p.nombre.toLowerCase().includes(this.search.toLowerCase())
            );
        }
    },

    methods: {
        selectPaciente(paciente) {
            this.pacienteSeleccionado = paciente;
        },

        goTo(ruta) {
            console.log("Ir a:", ruta);
            // aquí puedes usar:
            // this.$router.push('/ruta')
        },

        nuevoExamen() {
            this.form = {
                fecha: "",
                ordenadoPor: "",
                tipo: "",
                motivo: ""
            };
        },

        guardarExamen() {
            this.historial.push({
                fecha: this.form.fecha,
                tipo: this.form.tipo,
                realizado: false
            });
        },

        eliminarExamen() {
            this.historial.pop();
        }
    }
};
</script>
<style scoped>
/* Contenedor principal del menu izquierdo inferior */
.menu-medico-container {
    background-color: #f0f0f0;
    border-radius: 16px;
    align-self: flex-start;
    margin-right: auto;
}

/* Letras de los items */
.text-label {
    color: #009688 !important;
    font-weight: 500;
    font-size: 1.05rem;
    white-space: nowrap;
}

/* Iconos de los items */
.menu-item .q-icon {
    color: #009688 !important;
}

.menu-item:hover {
    background-color: rgba(0, 150, 136, 0.08);
    border-radius: 10px;
}
</style>