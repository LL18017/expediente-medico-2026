<template>
  <q-page class="q-pa-md">
    <!-- HEADER -->
    <div class="row items-center q-mb-lg">
      <img
        src="../assets/avatar-doctor.png"
        style="width: 60px; height: 60px; object-fit: contain"
      />
      <div class="q-ml-md">
        <div class="text-h6">Bienvenido Dr Venas Azules</div>
        <div class="text-caption">Cardiólogo</div>
      </div>
    </div>

    <!-- CONTENIDO -->
    <div class="row q-col-gutter-md">
      <!-- IZQUIERDA -->
      <div class="col-12 col-md-6">
        <!-- SELECT PACIENTE -->
        <q-card class="q-pa-md q-mb-md">
          <div class="text-subtitle2 q-mb-sm">Seleccionar Paciente</div>

          <q-select
            filled
            v-model="model"
            :options="options"
            option-label="label"
            option-value="value"
            emit-value
            map-options
            behavior="menu"
            label="Paciente"
          />
        </q-card>

        <!-- CALENDARIO -->
        <q-card class="q-pa-md">
          <div class="text-subtitle2 q-mb-sm">Agendar la cita</div>

          <q-date v-model="date" minimal />
        </q-card>
      </div>

      <!-- DERECHA -->
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md q-mb-md">
          <div class="text-subtitle2">Horarios</div>
          <div class="text-caption q-mb-sm">5 disponibles</div>

          <div class="q-gutter-sm">
            <q-card v-for="hora in horas" :key="hora" class="q-pa-sm">
              {{ hora }}
            </q-card>
          </div>
        </q-card>

        <q-btn label="Agendar cita" color="teal" class="full-width" />
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";

const model = ref(null);
const date = ref(null);

const options = [
  { label: "Juan Pérez", value: 1 },
  { label: "María López", value: 2 },
  { label: "Carlos Gómez", value: 3 },
];

const horas = ["07:00 am", "08:00 am", "12:00 pm", "04:00 pm", "05:00 pm"];
</script>
