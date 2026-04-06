<template>
  <q-card class="bg-teal-5 text-white policy-cards">
    <q-card-section class="text-center flex column">
      <span class="text-h5">Data doc</span>
    </q-card-section>
  </q-card>
</template>
<script setup></script>
<style scoped>
.policy-card {
  position: fixed; /* Fija el card en la ventana */
  top: 0; /* Pegado al fondo */
  left: 0; /* Alineado a la izquierda */
  width: 100%; /* O ancho que quieras */
  z-index: 1000; /* Para que quede por encima de otros elementos */
}
</style>
