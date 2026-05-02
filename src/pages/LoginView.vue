<script setup>
import { useRouter } from "vue-router";
import { userAuth } from "src/composable/userAuth";
const router = useRouter();
//const { setUser, loadUser } = userAuth()
const { setUser } = userAuth()
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
  <q-page class="bg-grey-1 flex flex-center">
    <q-card class="bg-white q-pa-xl shadow-10" style="width: 100%; max-width: 400px; border-radius: 20px">
      <q-card-section class="column items-center q-gutter-md">
        <div class="q-mb-md">
          <q-img src="~assets/logo.png" style="width: 100px; height: 100px" />
        </div>

        <div class="text-center">
          <div class="text-h4 text-weight-bolder text-teal-9">Data Doc</div>
          <div class="text-subtitle2 text-grey-7">Expedientes Médicos</div>
        </div>

        <div class="q-py-md full-width">
          <q-btn unelevated rounded color="teal-9" label="Ingresar al Sistema" class="full-width q-py-sm"
            @click="irAlIndex" />
        </div>
        <q-btn flat no-caps label="¿Olvidó su PIN?" color="grey-7" size="sm" />

      </q-card-section>
    </q-card>
  </q-page>
</template>
