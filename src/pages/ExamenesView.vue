<template>
  <!-- //////////////////////
                     VISTA DE MOVIL
                            /////////////////////// -->

  <q-page v-if="$q.screen.lt.md" class="q-pa-sm" style="height: 100vh; overflow-y: auto;"> <!--  bara de busqyeda -->
    <q-input v-model="search" rounded outlined placeholder="Buscar paciente" class="q-mb-md">
      <template v-slot:prepend>
        <q-icon name="arrow_back" />
      </template>
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>

    <!-- ESTADO VACÍO ( solamente es para cuando se pasa a vista movil por primera vez ) -->
    <div v-if="!pacienteSeleccionado" class="text-center q-mt-xl">

      <q-img src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png" style="width: 150px; margin: auto;" />

      <div class="text-grey-7 q-mt-md">
        Busca y selecciona un paciente
      </div>
    </div>

    <!-- PACIENTE (solo si hay búsqueda y selección) -->
    <q-list v-if="search.length > 0" bordered class="q-mb-md">
      <q-item v-for="paciente in filteredPacientes" :key="paciente.id" clickable @click="selectPaciente(paciente)">
        <q-item-section avatar>
          <q-img src="/src/assets/avatar-doctor.png" style="width: 40px; height: 40px;" />
        </q-item-section>

        <q-item-section>
          {{ paciente.nombre }}
        </q-item-section>
      </q-item>
    </q-list>

    <!--informacion del paciente -->
    <div v-if="pacienteSeleccionado" class="bg-grey-3 q-pa-md q-mb-md row items-center">
      <q-img src="/src/assets/avatar-doctor.png" style="width: 40px; height: 40px;" />
      <div class="q-ml-md">
        <div class="text-subtitle1">
          Paciente: {{ pacienteSeleccionado.nombre }}
        </div>
        <div class="text-caption">
          Edad: {{ pacienteSeleccionado.edad }} años
        </div>
      </div>
    </div>


    <!-- FORMULARIO ( para el registro de exámenes) -->
    <div v-if="pacienteSeleccionado" class="bg-white q-pa-md q-mb-md">

      <div class="text-h6 text-center q-mb-md">Formulario de Exámenes</div>

      <q-form ref="formExamenMobile">

        <q-input v-model="form.fecha" label="Fecha de emision" outlined dense class="q-mb-sm" readonly
          :rules="[val => !!val || 'Este campo es obligatorio']">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="form.fecha" mask="YYYY-MM-DD">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="OK" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input v-model="form.ordenadoPor" label="Ordenado por" outlined dense class="q-mb-sm" readonly />
        <q-space style="height: 10px;" />

        <q-select v-model="form.tipo" :options="tiposExamen" label="Tipo de Examen" outlined dense class="q-mb-sm"
          :rules="[val => !!val || 'Selecciona un tipo']" />

        <q-input v-model="form.motivo" label="Motivo de realización de examen" type="textarea" outlined dense
          class="q-mb-md" :rules="[val => !!val || 'Este campo es obligatorio']" />

      </q-form>

      <!-- BOTONES -->
      <div class="row q-gutter-sm justify-center">
        <q-btn color="teal" label="Nuevo" icon="add" @click="nuevoExamenMobile" />
        <q-btn color="primary" label="Guardar" icon="folder" @click="guardarExamenMobile" />
        <q-btn color="negative" label="Eliminar" icon="delete" @click="eliminarExamen" />
      </div>

    </div>

    <!--HISTORIAL  -->
    <div v-if="pacienteSeleccionado" class="bg-white q-pa-md">

      <div class="text-subtitle1 text-center q-mb-md">
        Historial de Exámenes
      </div>

      <q-list bordered separator>
        <q-item v-for="examen in historial" :key="examen.id">
          <q-item-section>
            <div class="text-caption text-grey">
              fecha de emision:
              {{ examen.fecha }}
            </div>
            <div class="text-body1">
              Tipo de estudio:
              {{ examen.tipo }}
            </div>
          </q-item-section>

          <q-item-section side>
            <q-checkbox v-model="examen.realizado" />
          </q-item-section>
        </q-item>
      </q-list>
      <q-space style="height: 120px;" />

    </div>
  </q-page>

  <!-- //////////////////////
                     VISTA DE ORDENADOR
                            /////////////////////// -->



  <q-page v-else class="bg-grey-2 q-pa-md">
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
          <q-item v-for="paciente in filteredPacientes" :key="paciente.id" clickable @click="selectPaciente(paciente)"
            :active="pacienteSeleccionado?.id === paciente.id" active-class="bg-teal-2">
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
              <q-item-section class="text-label">Recetas</q-item-section>
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

              <q-form ref="formExamen">

                <q-input v-model="form.fecha" label="Fecha de emision" outlined dense class="q-mb-sm" readonly
                  :rules="[val => !!val || 'Este campo es obligatorio']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="form.fecha" mask="YYYY-MM-DD">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="OK" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>

                <q-input v-model="form.ordenadoPor" label="Ordenado por" outlined dense class="q-mb-sm" readonly />
                <q-space style="height: 10px;" />

                <q-select v-model="form.tipo" :options="tiposExamen" label="Tipo de Examen" outlined dense
                  class="q-mb-sm" :rules="[val => !!val || 'Selecciona un tipo']" />

                <q-input v-model="form.motivo" label="Motivo" type="textarea" outlined dense class="q-mb-md"
                  :rules="[val => !!val || 'Este campo es obligatorio']" />

              </q-form>

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
                    <div class="text-weight-medium">
                      Fecaha de emision:
                      {{ examen.fecha }}</div>
                    <div class="text-grey text-caption">
                      Tipo de estudio: {{ examen.tipo }}</div>
                  </q-item-section>

                  <q-item-section side>
                    <q-checkbox label="Estado" v-model="examen.realizado" />
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
import { userAuth } from 'src/composable/userAuth'

export default {
  setup() {
    const { user } = userAuth()

    return {
      user
    }
  },
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
        { id: 1, fecha: "12/10/2025", tipo: "Orina", realizado: false },
        { id: 2, fecha: "01/01/2026", tipo: "Glucosa", realizado: false }
      ]
    };
  },

  computed: {
    filteredPacientes() {
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
      this.form.ordenadoPor = this.user?.nombre || '';
    },

    goTo(ruta) {
      console.log("Ir a:", ruta);
    },

    nuevoExamen() {
      this.form = {
        fecha: "",
        ordenadoPor: "",
        tipo: "",
        motivo: ""
      };
      this.$refs.formExamen.resetValidation();
      this.form.ordenadoPor = this.user?.nombre || '';
    },

    async guardarExamen() {
      const valido = await this.$refs.formExamen.validate();

      if (!valido) {
        return; // No guardar si el formulario no es válido
      }

      this.historial.push({
        fecha: this.form.fecha,
        tipo: this.form.tipo,
        realizado: false
      });

      // Limpiar datos
      this.form = {
        fecha: "",
        ordenadoPor: "",
        tipo: "",
        motivo: ""
      };
      this.$refs.formExamen.reset();

      this.$q.notify({
        type: 'positive',
        message: 'Examen guardado correctamente'
      });
    },

    async guardarExamenMobile() {
      const valido = await this.$refs.formExamenMobile.validate();

      if (!valido) return;

      this.historial.push({
        fecha: this.form.fecha,
        tipo: this.form.tipo,
        realizado: false
      });
      // Limpiar datos
      this.form = {
        fecha: "",
        ordenadoPor: "",
        tipo: "",
        motivo: ""
      };
      this.$refs.formExamenMobile.reset();

      this.$q.notify({
        type: 'positive',
        message: 'Examen guardado correctamente'
      });
    },

    nuevoExamenMobile() {
      this.form = {
        fecha: "",
        ordenadoPor: "",
        tipo: "",
        motivo: ""
      };
      this.form.ordenadoPor = this.user?.nombre || '';
      this.$refs.formExamenMobile.resetValidation();
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
