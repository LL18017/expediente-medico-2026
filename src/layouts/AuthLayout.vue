<template>
  <!-- view="lHh Lpr lFf" asegura que el header y footer se queden fijos arriba y abajo -->
  <q-layout view="lHh Lpr lFf" class="bg-medical-gradient text-dark">

    <q-header class="bg-teal shadow-2" style="height: 50px;">
      <q-toolbar class="justify-center" style="min-height: 50px;">
        <!-- Eliminamos el v-if para que se vea en todos los tamaños -->
        <q-toolbar-title class="absolute-center">
          <div class="text-white" style="font-family: 'Comfortaa', cursive; font-size: 1.5rem; letter-spacing: -1px;">
            <span class="text-weight-bolder">Data</span><span class="text-weight-light">Doc</span>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- CONTENEDOR PRINCIPAL -->
    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>

  </q-layout>
</template>

<script setup>
</script>
