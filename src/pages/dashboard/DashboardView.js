import { ref, onMounted, watch } from "vue";
import Chart from "chart.js/auto";

import {
  getCountPatient,
  getCountRecetasToday,
  getCountClinicasToday,
} from "src/services/dashboard.service";

import {
  getUltimasConsultas,
  countConsultasHoy,
  getConsultasUltimos30DiasChart,
} from "src/services/consultas.service";

export default function DashboardView() {
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

    if (chartInstance) {
      chartInstance.destroy();
    }

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
          legend: {
            display: false,
          },

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
            grid: {
              display: false,
            },

            ticks: {
              color: "#9CA3AF",
              font: {
                size: 10,
              },
            },
          },

          y: {
            beginAtZero: true,

            grid: {
              color: "rgba(0,0,0,0.05)",
              drawBorder: false,
            },

            ticks: {
              color: "#9CA3AF",

              font: {
                size: 10,
              },

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
     LOAD DATA
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

  async function loadCounters() {
    totalPactient.value = (await getCountPatient()) || 0;
    totalConsultas.value = await countConsultasHoy();

    totalclinicas.value = getCountClinicasToday();

    totalRecetas.value = getCountRecetasToday();
  }

  /* =========================
     INIT
  ========================= */
  onMounted(async () => {
    await loadConsultas();

    await loadChartData();

    await loadCounters();
  });

  /* =========================
     WATCH
  ========================= */
  watch(monthlyPatientsSeries, renderChart);

  return {
    today,

    chartRef,

    totalPactient,
    totalConsultas,
    totalRecetas,
    totalclinicas,

    proximasCitas,
  };
}
