<template>
  <q-page class="bg-white">
    <div class="row q-gutter-md">
      <!-- Card 1 -->
      <q-card class="resumen-card text-white bg-teal-5">
        <q-card-section class="text-center">
          <q-icon :name="icon" size="32px" />
          <div class="text-h5 q-mt-sm">nuevo paciente</div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            label="agregar"
            color="white"
            flat
            to="/pacientes/nuevo-paciente"
          />
        </q-card-actions>
      </q-card>

      <!-- Card 2 -->
      <q-card class="resumen-card text-white bg-indigo-5">
        <q-card-section class="text-center">
          <q-icon :name="icon" size="32px" />
          <div class="text-h5 q-mt-sm">nueva cita</div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn label="agregar" color="white" flat to="/citas/nueva-cita" />
        </q-card-actions>
      </q-card>

      <!-- Card 3 -->
      <q-card class="resumen-card text-white bg-orange-5">
        <q-card-section class="text-center">
          <q-icon :name="icon" size="32px" />
          <div class="text-h5 q-mt-sm">consulta</div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn label="citas" color="white" flat to="/citas" />
        </q-card-actions>
      </q-card>

      <!-- Card 5-->
      <q-card class="resumen-card text-white bg-purple-5">
        <q-card-section class="text-center">
          <q-icon :name="icon" size="32px" />
          <div class="text-h5 q-mt-sm">ver pacientes</div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn label="Ver Atendidos" color="white" flat to="/pacientes" />
        </q-card-actions>
      </q-card>
      <!-- Card 4 -->
      <q-card class="resumen-card text-white bg-purple-5">
        <q-card-section class="text-center">
          <q-icon :name="icon" size="32px" />
          <div class="text-h5 q-mt-sm">ver pacientes</div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            label="Ver Atendidos"
            color="white"
            flat
            to="/pacientes/estadisticas"
          />
        </q-card-actions>
      </q-card>
      <!-- Card 5 -->
      <q-card class="resumen-card text-white bg-purple-5">
        <q-card-section class="text-center">
          <q-icon :name="icon" size="32px" />
          <div class="text-h5 q-mt-sm">ver estadisticas</div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            label="Ver graficos"
            color="white"
            flat
            to="/pacientes/estadisticas"
          />
        </q-card-actions>
      </q-card>
    </div>
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
