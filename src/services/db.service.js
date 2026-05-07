// src/services/core/db.service.js

import PouchDB from "pouchdb";
import { DB_CONFIG } from "src/config/variables";

const db = new PouchDB(DB_CONFIG.NAME);

/* GENERAR ID */
const generateId = (prefix) => prefix + Date.now();

/* CREATE GENÉRICO */
export const createBase = (type, prefix, data) => {
  return db.put({
    _id: generateId(prefix),
    type,
    ...data,
    createdAt: new Date().toISOString(),
  });
};

/* GET POR TIPO */
export const getByType = async (type) => {
  const res = await db.allDocs({ include_docs: true });

  return res.rows.map((r) => r.doc).filter((d) => d.type === type);
};

/* GET POR ID */
export const getById = (id) => db.get(id);

/* UPDATE */
export const updateBase = async (id, data) => {
  const doc = await db.get(id);

  return db.put({
    ...doc,
    ...data,
    updatedAt: new Date().toISOString(),
  });
};

/* DELETE */
export const removeBase = async (id) => {
  const doc = await db.get(id);
  return db.remove(doc);
};

export const clearData = async () => {
  try {
    const res = await db.allDocs({ include_docs: true });

    const docsToDelete = res.rows.map((row) => ({
      _id: row.id,
      _rev: row.doc._rev,
      _deleted: true,
    }));

    if (docsToDelete.length === 0) {
      console.log("No hay datos para eliminar");
      return;
    }

    await db.bulkDocs(docsToDelete);

    console.log("Datos eliminados correctamente");

    loadBackupInfo(); // refresca UI
  } catch (err) {
    console.error("Error limpiando datos:", err);
  }
};
