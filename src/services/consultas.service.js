// src/services/consultas.service.js

import { DB_CONFIG } from "src/config/variables";
import { createBase, getByType } from "./db.service";

/* CREAR CONSULTA */
export const createConsulta = (data) => {
  return createBase(DB_CONFIG.TYPES.CONSULTA, DB_CONFIG.PREFIX.CONSULTA, data);
};

/* LISTAR CONSULTAS */
export const getConsultas = () => {
  return getByType(DB_CONFIG.TYPES.CONSULTA);
};

/* CONSULTAS POR PACIENTE */
export const getConsultasByPaciente = async (pacienteId) => {
  const consultas = await getConsultas();

  return consultas.filter((c) => c.paciente.id === pacienteId);
};

/* ÚLTIMAS CONSULTAS DE HOY */
export const getUltimasConsultas = async (limit = 10) => {
  const consultas = await getConsultas();

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const manana = new Date(hoy);
  manana.setDate(manana.getDate() + 1);

  const consultasFiltradas = consultas
    .filter((c) => {
      const fechaConsulta = new Date(c.fecha);
      return fechaConsulta >= hoy && fechaConsulta < manana;
    })
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .slice(0, limit);

  console.log(consultasFiltradas);
  return consultasFiltradas;
};

export const countConsultasHoy = async () => {
  const consultas = await getConsultas();

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const manana = new Date(hoy);
  manana.setDate(manana.getDate() + 1);

  const consultasFiltradas = consultas
    .filter((c) => {
      const fechaConsulta = new Date(c.fecha);
      return fechaConsulta >= hoy && fechaConsulta < manana;
    })
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    return consultasFiltradas.length
};

/* CONSULTAS ÚLTIMOS 30 DÍAS (PARA GRÁFICOS) */
export const getConsultasUltimos30DiasChart = async () => {
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
      if (!c.fecha) return;

      const fechaKey = new Date(c.fecha).toISOString().split("T")[0];

      const found = dias.find((d) => d.key === fechaKey);
      if (found) found.value++;
    });

    return dias.map(({ label, value }) => ({
      label,
      value,
    }));
  } catch (error) {
    console.error("Error en consultas 30 días chart:", error);
    return [];
  }
};


