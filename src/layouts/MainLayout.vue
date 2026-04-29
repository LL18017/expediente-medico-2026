<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-2 text-black"> <!-- HEADER -->
    <q-header class="bg-grey-2 text-dark">
      <navBarDataDoc />
    </q-header>

    <!-- MAIN -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- FOOTER -->
    <q-footer elevated class="bg-grey-2 text-dark">
      <footerDataDoc />
    </q-footer>
  </q-layout>
</template>

<script setup>
import footerDataDoc from "../components/footer.vue";
import navBarDataDoc from "../components/navbar.vue";
</script>
