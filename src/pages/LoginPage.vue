<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const irAlIndex = () => {
  router.push("/expediente");
};
</script>

<template>
  <q-page>
    <div class="flex column items-center">
      <h4 class="text-h3">Data Doc</h4>
      <img
        src="~assets/logo.png"
        style="width: 78px; height: 83px; object-fit: contain"
      />
      <span class="text-body1 text-center text-grey-7"
        >Esta accion requiere una verificaion de correo</span
      >
      <q-btn
        rounded-sm
        label="Ingresar"
        class="bg-teal-5 text-white"
        @click="irAlIndex"
      />
    </div>
  </q-page>
</template>
