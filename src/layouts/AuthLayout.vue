<template>
  <q-layout>
    <q-header elevated>
      <navBarDataDoc />
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <!-- FOOTER -->
    <q-footer elevated>
      <footerDataDoc />
    </q-footer>
  </q-layout>
</template>
<script setup>
import footerDataDoc from "../components/footer.vue";
import navBarDataDoc from "../components/navbar.vue";
</script>
