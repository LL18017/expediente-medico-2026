<script setup>
import { useRouter } from "vue-router";
import { userAuth } from "src/composable/userAuth";
const router = useRouter();
const { setUser, loadUser } = userAuth()
const user = {
  nombre: 'Mario Josue Lemus Lopez',
  rol: 'Doctor'
}
const irAlIndex = () => {
  router.push("/expediente");
  setUser(user);
};
</script>

<template>
  <q-page class="bg-grey-2 text-black q-pa-md flex column items-center q-pa-xl">
    <div class="flex column items-center">
      <h4 class="text-h3">Data Doc</h4>
      <img src="~assets/logo.png" style="width: 78px; height: 83px; object-fit: contain" />
      <span class="text-center text-white">Esta accion requiere una verificaion de correo o no</span>
      <q-btn rounded-sm label="Ingresar" class="text-black" @click="irAlIndex" />
    </div>
  </q-page>
</template>
