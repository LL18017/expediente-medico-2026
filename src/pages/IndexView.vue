<template>
  <q-page class="bg-grey-2 text-black q-pa-md flex column items-center q-pa-xl">

  </q-page>
</template>

<script setup>
defineProps({
  icon: String,
  valor: [String, Number],
  titulo: String,
  subtexto: String,
});
</script>

<style scoped>
.resumen-card {
  border-radius: 12px;
  width: 140px;
}
</style>
