<script setup>
// Datos de los desarrolladores para manejarlo de forma limpia con un v-for
const developers = [
  { name: 'Luis Hernandez', role: 'Estudiante y Desarrollador', email: 'hm20059@ues.edu.sv', initial: 'L', color: 'blue-2' },
  { name: 'Mario Lemus', role: 'Estudiante y Desarrollador', email: 'LL18017@ues.edu.sv', initial: 'M', color: 'teal-2' },
  { name: 'Luis Barraza', role: 'Estudiante y Desarrollador', email: 'bc20029@ues.edu.sv', initial: 'L', color: 'purple-2' },
  { name: 'Gerardo Avila', role: 'Estudiante y Desarrollador', email: 'mu18006@ues.edu.sv', initial: 'G', color: 'indigo-2' },
  { name: 'Eduardo Gomez', role: 'Estudiante y Desarrollador', email: 'Gp21004@ues.edu.sv', initial: 'E', color: 'deep-purple-2' },
  { name: 'Samuel Martinez', role: 'Estudiante y Desarrollador', email: 'mb21011@ues.edu.sv', initial: 'S', color: 'light-blue-2' },
]
</script>

<template>
  <q-page class="bg-grey-2 q-pa-md q-pa-md-xl flex flex-center">
    <div class="container-devs full-width">

      <div class="text-center q-mb-xl">
        <q-icon name="groups" size="60px" color="teal-7" class="q-mb-sm" />
        <div class="text-h4 text-weight-bold text-teal-9">Desarrolladores</div>
        <p class="text-grey-8 q-mx-auto text-body1" style="max-width: 700px;">
          Somos estudiantes de la <span class="text-weight-bold text-teal-7">Universidad de El Salvador de la Facultad
            Multidisciplinaria de Occidente</span>
          y desarrollamos <span class="text-weight-bold text-teal-7">DataDoc</span> como una solución innovadora para el
          registro y seguimiento de expedientes médicos.
        </p>
      </div>

      <div class="row q-col-gutter-lg justify-center">
        <div v-for="dev in developers" :key="dev.email" class="col-12 col-sm-6 col-md-4">
          <q-card class="dev-card shadow-3 q-pa-sm border-radius-lg overflow-hidden">
            <q-item>
              <q-item-section avatar>
                <q-avatar :bg-color="dev.color" size="60px" text-color="teal-10" class="text-weight-bold shadow-1">
                  {{ dev.initial }}
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-h6 text-weight-bold">{{ dev.name }}</q-item-label>
                <q-item-label caption class="text-teal-8">{{ dev.role }}</q-item-label>
                <q-item-label caption class="text-grey-7">{{ dev.email }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
        </div>
      </div>

      <div class="text-center q-mt-xl">
        <q-chip outline color="teal-7" icon="school">FMOcc - Ingeniería de Sistemas</q-chip>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
.container-devs {
  max-width: 1100px;
}

.dev-card {
  transition: all 0.3s ease;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

/* Efecto hover solo para escritorio para que se sienta interactivo */
.dev-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
  border-color: var(--q-primary);
}

.border-radius-lg {
  border-radius: 16px !important;
}

/* Ajuste para que el texto no se vea gigante en móvil */
@media (max-width: 600px) {
  .text-h4 {
    font-size: 1.8rem;
  }
}
</style>
