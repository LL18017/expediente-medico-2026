<script setup></script>

<template>
  <q-page class="bg-grey-2 q-pa-sm q-pa-md-xl flex flex-center">

    <div class="row justify-center full-width">
      <q-card class="col-12 col-sm-10 col-md-7 col-lg-5 shadow-10" style="border-radius: 20px; overflow: hidden;">

        <q-card-section class="bg-teal-7 text-white q-pa-lg">
          <div class="row items-center no-wrap">
            <q-icon name="admin_panel_settings" size="clamp(2rem, 5vw, 3.5rem)" class="q-mr-md" />
            <div>
              <div class="text-h5 text-weight-bolder">Privacidad y Seguridad</div>
              <div class="text-subtitle2 text-teal-1">DataDoc | Proyecto UES El Salvador</div>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section class="q-pa-none">
          <q-scroll-area class="policy-scroll">
            <div class="q-pa-lg text-body1 text-grey-9">

              <div class="text-caption text-uppercase text-grey-7 q-mb-md">Versión para profesionales de la salud</div>

              <div class="row q-mb-lg no-wrap">
                <q-icon name="business" color="teal-7" size="sm" class="q-mr-md" />
                <div>
                  <div class="text-h6 q-mb-xs">1. Responsable del Proyecto</div>
                  <p class="text-justify">Esta aplicación es desarrollada por el grupo de estudiantes de la
                    <strong>Universidad de El Salvador (UES)</strong>. El resguardo legal de la información clínica
                    recae directamente sobre el profesional de la salud titular de la cuenta.
                  </p>
                </div>
              </div>

              <div class="row q-mb-lg no-wrap">
                <q-icon name="devices" color="teal-7" size="sm" class="q-mr-md" />
                <div>
                  <div class="text-h6 q-mb-xs">2. Almacenamiento Local (PouchDB)</div>
                  <p class="text-justify">
                    DataDoc prioriza la soberanía de los datos. La información de los pacientes se almacena mediante
                    <strong>PouchDB</strong> directamente en este dispositivo.
                    <q-badge outline color="teal" label="Seguridad: Sin servidor externo" />
                  </p>
                </div>
              </div>

              <div class="row q-mb-lg no-wrap">
                <q-icon name="camera_enhance" color="teal-7" size="sm" class="q-mr-md" />
                <div>
                  <div class="text-h6 q-mb-xs">3. Uso de Multimedia y PDF</div>
                  <p class="text-justify">Se requiere acceso a la cámara y archivos para la digitalización de exámenes
                    físicos y carga de reportes PDF. Estos archivos permanecen bajo el mismo esquema de almacenamiento
                    local cifrado.</p>
                </div>
              </div>

              <div class="row q-mb-lg no-wrap">
                <q-icon name="gavel" color="teal-7" size="sm" class="q-mr-md" />
                <div>
                  <div class="text-h6 q-mb-xs">4. Marco Legal Local</div>
                  <p class="text-justify">El uso de esta herramienta se rige por la ética médica salvadoreña y las
                    normativas de protección de datos personales vigentes en El Salvador.</p>
                </div>
              </div>

              <div class="bg-teal-1 q-pa-md border-radius-inherit" style="border-radius: 10px;">
                <p class="text-caption text-teal-10 q-ma-none">
                  <strong>Nota universitaria:</strong> Este software es una herramienta de apoyo y no sustituye la
                  responsabilidad del médico sobre la custodia de los expedientes físicos o legales.
                </p>
              </div>

            </div>
          </q-scroll-area>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right" class="q-pa-md bg-white">
          <q-btn unelevated label="Entendido y Acepto" color="teal-7" rounded
            class="full-width q-py-sm text-weight-bold" icon-right="arrow_forward" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<style scoped>
.policy-scroll {
  height: 50vh;
  width: 100%;
}

/* 1. Forzar que el contenido no sea más ancho que el contenedor */
.overflow-hidden {
  overflow-x: hidden !important;
  max-width: 100% !important;
}

/* 2. Ocultar barras de scroll nativas (las de las flechitas) en Chrome/Safari/Edge */
:deep(.q-scrollarea__container::-webkit-scrollbar),
:deep(.q-scrollarea__content::-webkit-scrollbar),
::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}

/* 3. Ocultar en Firefox */
* {
  scrollbar-width: none !important;
}

/* 4. Asegurar que las filas no se salgan */
.row {
  margin-left: 0 !important;
  margin-right: 0 !important;
  width: 100% !important;
}
</style>