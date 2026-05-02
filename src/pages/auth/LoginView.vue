<template>
  <q-page class="flex flex-center bg-white">
    <q-card flat class="text-center q-pa-lg" style="width: 100%; max-width: 400px;">
      <div class="text-h4 text-weight-bold text-dark q-mb-sm">¡Bienvenido!</div>
      <q-img src="~assets/doc_login.png" style="height: 150px; max-width: 150px;" class="q-mx-auto q-mb-md">
        <template v-slot:error> <!-- EN caso de error al cargar la imagen -->
          <div class="absolute-full flex flex-center bg-grey-3 text-grey-7">
            [Img Doctor]
          </div>
        </template>
      </q-img>
      <div class="text-subtitle1 text-weight-medium q-mb-lg">Iniciar Sesión</div>
      <q-input v-model="usuario" label="Usuario" outlined dense bg-color="grey-2" class="q-mb-md" />
      <div class="row justify-start q-mb-lg">
        <q-checkbox v-model="recordarUsuario" label="Recordar usuario" color="teal" />
      </div>
      <div class="text-left text-weight-medium q-mb-sm text-grey-8">PIN</div>
      <!-- uso del componente del PIN-->
      <PinInput ref="pinComponentRef" />
      <div class="text-negative text-caption q-mt-sm" v-if="errorMsg">{{ errorMsg }}</div>
      <div class="q-mt-lg">
        <q-btn flat no-caps color="grey-7" label="Recuperar USUARIO o PIN" to="/expediente/recuperar" />
      </div>
      <q-btn @click="ingresar" class="q-mt-md full-width" color="teal" size="lg" label="Ingresar" no-caps rounded />
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import PinInput from 'src/components/auth/PinInput.vue';
import { useAuthLogin } from 'src/services/auth/useAuthLogin.js';

const { pinComponentRef, errorMsg, ingresar } = useAuthLogin();

const usuario = ref('');
const recordarUsuario = ref(false);
</script>
