<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-2 text-black q-pa-md flex column items-center q-pa-xl">
    <!-- HEADER -->
    <q-header>
      <navBarDataDoc />
    </q-header>

    <!-- MAIN -->
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
