const API_URL = "/data/consultas.json";
import { DB_CONFIG } from "src/config/variables";
import { createBase, getByType } from "./db.service";
/* =========================
   BASE FETCH
========================= */

export async function getConsultas() {
  try {
    const res = await fetch(API_URL);
    return await res.json();
  } catch (error) {
    console.error("Error al obtener consultas:", error);
    return [];
  }
}

/* =========================
   CONSULTAS ORDENADAS
========================= */

export async function getUltimasConsultas(limit = 10) {
  try {
    const data = await getConsultas();

    return data
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
      .slice(0, limit);
  } catch (error) {
    console.error("Error al obtener últimas consultas:", error);
    return [];
  }
}

/* =========================
   POR PACIENTE
========================= */

export async function getConsultasPorPaciente(pacienteId) {
  try {
    const data = await getConsultas();
    return data.filter((c) => c.paciente?.id === pacienteId);
  } catch (error) {
    console.error("Error al filtrar consultas:", error);
    return [];
  }
}

/* =========================
   POR ID
========================= */

export async function getConsultaById(id) {
  try {
    const data = await getConsultas();
    return data.find((c) => c._id === id) || null;
  } catch (error) {
    console.error("Error al buscar consulta:", error);
    return null;
  }
}

/* =========================
   KPIS (STATS)
========================= */

export async function getStatsConsultas() {
  try {
    const data = await getConsultas();

    return {
      consultas: data.length,
      pacientes: new Set(data.map((c) => c.paciente?.id)).size,
      recetas: data.reduce((acc, c) => acc + (c.recetas?.length || 0), 0),
      clinicas: 1, // si luego tienes clínicas reales lo conectamos
    };
  } catch (error) {
    console.error("Error al obtener stats:", error);
    return {
      consultas: 0,
      pacientes: 0,
      recetas: 0,
      clinicas: 0,
    };
  }
}

/* =========================
   GRÁFICO 30 DÍAS
========================= */

export async function getConsultasUltimos30Dias() {
  try {
    const data = await getConsultas();

    const hoy = new Date();

    const dias = Array.from({ length: 30 }, (_, i) => {
      const d = new Date(hoy);
      d.setDate(hoy.getDate() - (29 - i));

      const key = d.toISOString().split("T")[0];

      return {
        key,
        label: d.toLocaleDateString("es-SV", {
          day: "2-digit",
          month: "short",
        }),
        value: 0,
      };
    });

    data.forEach((c) => {
      const fechaKey = new Date(c.fecha).toISOString().split("T")[0];

      const found = dias.find((d) => d.key === fechaKey);
      if (found) found.value++;
    });

    return dias.map(({ label, value }) => ({ label, value }));
  } catch (error) {
    console.error("Error en gráfico 30 días:", error);
    return [];
  }
}

export async function getCountPatient() {
  const patients = await getByType(DB_CONFIG.TYPES.PACIENTE);

  return patients.length;
}
export function getCountConsultasToday() {
  return 13;
}
export function getCountRecetasToday() {
  return 13;
}
export function getCountClinicasToday() {
  return 3;
}

/* =========================
   HELPERS UI (ANTES EN COMPONENTE)
========================= */

export function buildChartData(raw) {
  return {
    labels: raw.map((d) => d.label),
    values: raw.map((d) => d.value),
    maxValue: Math.max(...raw.map((d) => d.value), 1),
  };
}
