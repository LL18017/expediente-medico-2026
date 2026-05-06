<script setup>
import { usePoliticas } from 'src/composable/usePoliticas';
const { politicas } = usePoliticas()
</script>

<template>
  <q-page class="bg-grey-2 column no-wrap" style="height: 100vh; overflow: hidden;">
    <div class="bg-teal-7 text-white shadow-2">
      <div class="q-mx-auto q-px-md q-py-md" style="max-width: 1200px;">
        <div class="row items-center no-wrap">
          <q-icon name="admin_panel_settings" size="3rem" class="q-mr-md" />
          <div>
            <div class="text-h5 text-weight-bolder">Privacidad y Seguridad</div>
            <div class="text-caption text-teal-1">DataDoc | FMOcc-UES</div>
          </div>
        </div>
      </div>
    </div>
    <div class="col scroll q-pa-md">
      <div class="q-mx-auto" style="max-width: 1600px;">

        <div class="row q-col-gutter-md">
          <div v-for="(item, index) in politicas" :key="index" class="col-12 col-sm-6 col-md-4 col-lg-4">
            <q-card flat bordered class="policy-card shadow-1">
              <q-item class="bg-teal-1 q-py-xs" style="min-height: 70px;">
                <q-item-section avatar>
                  <q-icon :name="item.icon" color="teal-8" size="sm" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle2 text-weight-bold text-teal-9">
                    {{ item.title }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-card-section class="q-pa-sm text-body2 text-grey-9 text-justify">
                {{ item.text }}
              </q-card-section>
            </q-card>
          </div>
        </div>

        <div class="row q-mt-lg">
          <div class="col-12">
            <q-card flat bordered class="terms-card shadow-1">
              <q-card-section class="q-pa-md bg-white border-left-teal">
                <div class="row items-start q-gutter-sm no-wrap">
                  <!-- Icono -->
                  <q-icon name="info" color="teal-7" size="20px" class="q-mt-xs" />
                  <!-- Texto -->
                  <div class="text-body2 text-grey-9">
                    <span class="text-weight-bold text-teal-9">
                      Aceptación de Términos:
                    </span>
                    Al utilizar <span class="text-weight-bold">DataDoc</span>, el profesional de la salud confirma que
                    ha leído,
                    comprendido y aceptado el marco legal y de privacidad establecido para la gestión segura
                    de datos clínicos en este dispositivo.
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
    <!-- <q-footer class="bg-white q-pa-sm shadow-up-3">
      <div class="q-mx-auto" style="max-width: 600px;">
        <q-btn unelevated label="Entendido y Acepto" color="teal-7" rounded class="full-width text-weight-bold"
          icon-right="arrow_forward" />
      </div>
    </q-footer> -->
  </q-page>
</template>