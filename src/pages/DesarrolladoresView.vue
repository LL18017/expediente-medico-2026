  <script setup>
  import { useDesarrolladores } from 'src/composable/useDesarrolladores';
  const { desarrolladores } = useDesarrolladores()
</script>

<template>
  <q-page class="bg-grey-2 column no-wrap" style="height: 100vh; overflow: hidden;">
    <div class="col scroll q-pa-md">
      <div class="container-devs q-mx-auto q-pt-lg" style="max-width: 1600px;">
        <div class="text-center q-mb-xl">
          <q-icon name="groups" size="60px" color="teal-7" class="q-mb-sm" />
          <div class="text-h4 text-weight-bold text-teal-9">Desarrolladores</div>
          <p class="text-grey-8 q-mx-auto text-body1 q-mt-md" style="max-width: 1000px;">
            Somos estudiantes de la
            <span class="text-weight-bold text-teal-7">Universidad de El Salvador de la Facultad Multidisciplinaria de
              Occidente</span>
            y desarrollamos <span class="text-weight-bold text-teal-7">DataDoc</span> como una solución innovadora para
            el registro y seguimiento de expedientes médicos.
          </p>
        </div>

        <div class="row q-col-gutter-lg justify-center">
          <div v-for="dev in desarrolladores" :key="dev.email" class="col-12 col-sm-6 col-md-4">
            <q-card class="dev-card shadow-3 q-pa-sm border-radius-lg">
              <q-item>
                <q-item-section avatar>
                  <q-avatar :bg-color="dev.color" size="60px" text-color="teal-10" class="text-weight-bold shadow-1">
                    {{ dev.initial }}
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-weight-bold">{{ dev.name }}</q-item-label>
                  <q-item-label caption class="text-teal-8 text-weight-bold">{{ dev.role }}</q-item-label>
                  <q-item-label caption class="text-grey-7">{{ dev.email }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
        </div>

        <div class="row justify-center q-mt-xl q-pb-xl">
          <div class="col-auto">
            <q-chip outline color="teal-7" icon="school" class="text-weight-medium shadow-1" size="md">
              FMOcc - Ingeniería de Sistemas
            </q-chip>
          </div>
        </div>

      </div>
    </div>
  </q-page>
</template>

<style scoped>
/* 3. El CSS para limpiar el scroll horizontal y dejar el vertical suave */
.scroll {
  overflow-y: auto;
  overflow-x: hidden;
}

/* Ocultar las flechitas y la barra visualmente */
::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
}

* {
  scrollbar-width: none !important;
  /* Firefox */
  -ms-overflow-style: none !important;
  /* Edge */
}

.dev-card {
  transition: transform 0.3s ease;
  border: 1px solid rgba(0, 128, 128, 0.1);
}

.dev-card:hover {
  transform: translateY(-5px);
}
</style>