<template>
  <q-layout class="bg-grey-2 text-dark">
    <q-page-container>
      <router-view />
    </q-page-container>
    <!-- FOOTER -->
  </q-layout>
</template>
<script setup>
import footerDataDoc from "../components/footer.vue";
import navBarDataDoc from "../components/navbar.vue";
</script>
