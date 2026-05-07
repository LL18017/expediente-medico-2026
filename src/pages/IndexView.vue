<template>
  <q-page class="q-pa-sm full-height">
    <div class="dashboard-header">
      <!-- IZQUIERDA -->
      <div class="header-left">
        <q-avatar size="56px" class="shadow-2">
          <img src="~assets/avatar-doctor.png" />
        </q-avatar>

        <div class="header-text">
          <div class="text-h6 text-weight-medium">Bienvenido de nuevo</div>

          <div class="text-caption text-grey-7">
            Resumen del expediente clínico
          </div>

          <div class="text-caption text-grey-5">
            {{ today }}
          </div>
        </div>
      </div>

      <!-- DERECHA -->
      <div class="header-actions">
        <q-btn
          unelevated
          color="primary"
          icon="person_add"
          label="Paciente"
          class="btn-soft"
        />

        <q-btn
          unelevated
          color="teal"
          icon="medical_services"
          label="Consulta"
          class="btn-soft"
        />
      </div>
    </div>

    <!-- LAYOUT -->
    <div class="grid">
      <!-- IZQUIERDA -->
      <div class="card-info">
        <!-- CARDS -->
        <q-card clickable @click="$router.push('/expediente/pacientes')">
          <q-card-section class="row items-center justify-between">
            <div class="row items-center">
              <q-icon
                name="people"
                size="28px"
                color="primary"
                class="q-mr-sm"
              />
              <div>
                <div class="text-caption text-grey">Pacientes activos</div>
                <div class="text-h6">{{ totalPactient }}</div>
              </div>
            </div>
            <q-icon name="arrow_forward_ios" size="20px" color="grey-5" />
          </q-card-section>
        </q-card>

        <q-card clickable @click="$router.push('/expediente/consultas')">
          <q-card-section class="row items-center justify-between">
            <div class="row items-center">
              <q-icon
                name="event_note"
                size="28px"
                color="teal"
                class="q-mr-sm"
              />
              <div>
                <div class="text-caption text-grey">Consultas hoy</div>
                <div class="text-h6">{{ totalConsultas }}</div>
              </div>
            </div>
            <q-icon name="arrow_forward_ios" size="20px" color="grey-5" />
          </q-card-section>
        </q-card>

        <q-card clickable @click="$router.push('/expediente/recetas')">
          <q-card-section class="row items-center justify-between">
            <div class="row items-center">
              <q-icon
                name="local_pharmacy"
                size="28px"
                color="amber"
                class="q-mr-sm"
              />
              <div>
                <div class="text-caption text-grey">Recetas hoy</div>
                <div class="text-h6">{{ totalRecetas }}</div>
              </div>
            </div>
            <q-icon name="arrow_forward_ios" size="20px" color="grey-5" />
          </q-card-section>
        </q-card>

        <q-card clickable @click="$router.push('/expediente/clinicas')">
          <q-card-section class="row items-center justify-between">
            <div class="row items-center">
              <q-icon name="home" size="28px" color="purple" class="q-mr-sm" />

              <div>
                <div class="text-caption text-grey">Total de clinicas</div>
                <div class="text-h6">{{ totalclinicas }}</div>
              </div>
            </div>

            <q-icon name="arrow_forward_ios" size="20px" color="grey-5" />
          </q-card-section>
        </q-card>

        <!-- GRÁFICA -->
        <div class="card-grafic">
          <q-card>
            <q-card-section>
              <div class="text-subtitle1">Pacientes atendidos</div>
              <div class="text-caption text-grey">Últimos 30 días</div>
            </q-card-section>

            <q-separator />

            <q-card-section style="height: 340px; width: 100%">
              <canvas ref="chartRef"></canvas>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- DERECHA -->
      <div class="card-list">
        <q-card class="dashboard-card">
          <q-card-section class="column fit">
            <div class="text-subtitle1 q-mb-sm">Últimas citas</div>

            <q-list bordered class="lista-scroll">
              <q-item v-for="(c, i) in proximasCitas" :key="i">
                <q-item-section avatar>
                  <q-avatar color="grey-3">
                    <q-icon name="event" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ c.paciente }}</q-item-label>
                  <q-item-label caption>{{ c.fecha }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-btn dense flat color="primary" label="Ver" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import Chart from "chart.js/auto";
import {
  getConsultasUltimos30Dias,
  getCountPatient,
  getCountConsultasToday,
  getCountRecetasToday,
  getCountClinicasToday,
} from "src/services/dashboard.service";



import {
  getUltimasConsultas,
  countConsultasHoy,
  getConsultasUltimos30DiasChart,
} from "src/services/consultas.service";

/* =========================
   FECHA
========================= */
const today = new Date().toLocaleDateString("es-SV", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

/* =========================
   STATE
========================= */
const chartRef = ref(null);
let chartInstance = null;

const totalPactient = ref(0);
const totalConsultas = ref(0);
const totalRecetas = ref(0);
const totalclinicas = ref(0);

const monthlyPatientsSeries = ref([]);
const monthLabels = ref([]);
const proximasCitas = ref([]);

/* =========================
   CHART
========================= */
function renderChart() {
  if (!chartRef.value) return;

  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(chartRef.value, {
    type: "bar",
    data: {
      labels: monthLabels.value,
      datasets: [
        {
          data: monthlyPatientsSeries.value,
          backgroundColor: "rgba(38, 166, 154, 0.7)",
          hoverBackgroundColor: "rgba(38, 166, 154, 1)",
          borderRadius: 6,
          barThickness: 8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#1f2937",
          padding: 10,
          cornerRadius: 6,
          displayColors: false,
          callbacks: {
            label: (ctx) => `${ctx.raw} consultas`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "#9CA3AF", font: { size: 10 } },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(0,0,0,0.05)",
            drawBorder: false,
          },
          ticks: {
            color: "#9CA3AF",
            font: { size: 10 },
            stepSize: 1,
          },
        },
      },
      animation: {
        duration: 800,
        easing: "easeOutQuart",
      },
    },
  });
}

/* =========================
   MAPEAR CONSULTAS
========================= */
function mapConsultas(consultas) {
  return consultas.map((c) => ({
    paciente: `${c.paciente?.nombre || ""} ${c.paciente?.apellidos || ""}`,
    fecha: new Date(c.fecha).toLocaleString("es-SV", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));
}

/* =========================
   LOAD STATS
========================= */
async function loadConsultas() {
  const consultas = await getUltimasConsultas();
  proximasCitas.value = mapConsultas(consultas);
}

async function loadChartData() {
  const data = await getConsultasUltimos30DiasChart();
  monthLabels.value = data.map((d) => d.label);
  monthlyPatientsSeries.value = data.map((d) => d.value);
  renderChart();
}

function loadCounters() {
  totalPactient.value = getCountPatient();
  totalclinicas.value = getCountClinicasToday();
  totalRecetas.value = getCountRecetasToday();
}

/* =========================
   INIT
========================= */
onMounted(async () => {
  await loadConsultas();
  await loadChartData();
  totalConsultas.value = await countConsultasHoy();
  loadCounters();
});

/* =========================
   WATCH
========================= */
watch(monthlyPatientsSeries, renderChart);
</script>
<style scoped>
/* =========================
   HEADER
========================= */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.header-actions {
  display: flex;
  gap: 10px;
}

/* BOTONES */
.btn-soft {
  border-radius: 10px;
  padding: 6px 14px;
  white-space: nowrap;
}

/* =========================
   GRID GENERAL
========================= */
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

/* =========================
   CARDS IZQUIERDA
========================= */
.grid .card-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

/* gráfica ocupa todo el ancho */
.grid .card-grafic {
  grid-column: span 2;
}

/* =========================
   LISTA DERECHA
========================= */
.grid .card-list {
  height: auto; /* 🔥 evita problemas mobile */
  overflow: visible; /* 🔥 evita doble scroll */
}

.lista-scroll {
  max-height: none; /* 🔥 elimina altura fija */
  overflow: visible;
}

/* =========================
   GRÁFICA
========================= */
.chart-section {
  height: 340px;
}

/* =========================
   TOOLTIP (si lo reutilizas)
========================= */
.chart-tooltip {
  position: absolute;
  background: rgba(0, 0, 0, 0.85);
  color: white;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 12px;
  pointer-events: none;
  transform: translate(-50%, -100%);
  white-space: nowrap;
}

/* =========================
   RESPONSIVE TABLET
========================= */
@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .grid .card-grafic {
    grid-column: span 2;
  }
}

/* =========================
   RESPONSIVE MOBILE
========================= */
@media (max-width: 600px) {
  /* HEADER */
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .header-actions {
    width: 100%;
    justify-content: space-between;
  }

  .btn-soft {
    flex: 1;
    justify-content: center;
  }

  /* CARDS */
  .grid .card-info {
    grid-template-columns: 1fr;
  }

  /* GRÁFICA */
  .chart-section {
    height: 220px;
  }
}
</style>
