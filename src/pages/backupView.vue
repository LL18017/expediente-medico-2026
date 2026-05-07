<template>
  <q-page class="q-pa-md flex flex-center">
    <div class="backup-wrapper text-center">
      <!-- IMAGEN -->
      <div class="image-box">
        <img src="~assets/doc-welcome.png" />
      </div>

      <!-- TITULO -->
      <div class="text-h5 q-mb-xs">Gestión de Backups</div>

      <div class="text-caption text-grey q-mb-md">
        Administra los respaldos del sistema
      </div>

      <!-- CONTADOR -->
      <q-chip color="primary" text-color="white" class="q-mb-lg" icon="storage">
        {{ backups.length }} backups disponibles
      </q-chip>

      <!-- BOTONES -->
      <div class="actions">
        <!-- CREAR -->
        <q-btn
          unelevated
          color="primary"
          icon="add"
          label="Crear"
          class="btn-main"
          @click="createBackup"
        />

        <!-- IMPORTAR -->
        <q-btn
          unelevated
          color="secondary"
          icon="upload"
          label="Importar"
          class="btn-soft"
          @click="openImport"
        />

        <!-- VER -->
        <q-btn
          outline
          color="primary"
          icon="visibility"
          label="Ver"
          class="btn-outline"
          @click="showList = true"
        />

        <q-btn
          color="negative"
          icon="cleaning_services"
          label="Limpiar datos"
          @click="clearData"
        />
      </div>
    </div>

    <!-- =========================
         MODAL LISTA BACKUPS
    ========================== -->
    <q-dialog v-model="showList">
      <q-card>
        <q-card-section class="row items-center justify-between">
          <div class="text-h6">Backups disponibles</div>

          <q-btn flat round icon="close" v-close-popup />
        </q-card-section>

        <q-separator />

        <q-list>
          <q-item v-for="b in backups" :key="b.id">
            <q-item-section avatar>
              <q-avatar color="blue-1" text-color="primary">
                <q-icon name="description" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ b.name }}</q-item-label>
              <q-item-label caption> {{ b.date }} · {{ b.size }} </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn
                flat
                round
                icon="download"
                color="primary"
                @click="downloadBackup(b)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-dialog>

    <!-- =========================
         MODAL IMPORTAR
    ========================== -->
    <q-dialog v-model="showImport">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-subtitle1">Importar respaldo</div>
        </q-card-section>

        <q-card-section>
          <q-file
            v-model="file"
            filled
            label="Seleccionar archivo"
            accept=".sql,.json"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn
            color="primary"
            label="Importar"
            :disable="!file"
            @click="importBackup"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- =========================
         LOADING
    ========================== -->
    <q-dialog v-model="loading" persistent>
      <q-card class="q-pa-md">
        <div class="row items-center q-gutter-sm">
          <q-spinner color="primary" />
          <div>
            <div class="text-subtitle2">Creando backup...</div>
            <div class="text-caption text-grey">
              Esto puede tardar unos minutos
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import PouchDB from "pouchdb";

const db = new PouchDB("exmed_db");

const backups = ref([]);

const showList = ref(false);
const showImport = ref(false);
const loading = ref(false);
const file = ref(null);

/* =========================
   CARGAR INFO BACKUPS
========================= */
const loadBackupInfo = async () => {
  const res = await db.allDocs();

  backups.value = [
    {
      id: "local",
      name: "Backup actual",
      date: new Date().toLocaleString("es-SV"),
      size: (JSON.stringify(res).length / 1024).toFixed(2) + " KB",
    },
  ];
};

onMounted(loadBackupInfo);

/* =========================
   CREAR BACKUP REAL
========================= */
const createBackup = async () => {
  loading.value = true;

  try {
    const res = await db.allDocs({ include_docs: true });

    const data = res.rows.map((r) => r.doc);

    const json = JSON.stringify(data, null, 2);

    const blob = new Blob([json], {
      type: "application/json",
    });

    const name = `backup_${Date.now()}.json`;

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = name;
    link.click();

    backups.value.unshift({
      id: Date.now(),
      name,
      date: new Date().toLocaleString("es-SV"),
      size: (blob.size / 1024).toFixed(2) + " KB",
    });
  } catch (error) {
    console.error(error);
  }

  loading.value = false;
};

/* =========================
   IMPORTAR BACKUP REAL
========================= */
const importBackup = async () => {
  if (!file.value) return;

  const reader = new FileReader();

  reader.onload = async (e) => {
    try {
      const json = JSON.parse(e.target.result);

      loading.value = true;

      for (const doc of json) {
        try {
          delete doc._rev; // importante
          await db.put(doc);
        } catch (err) {
          console.warn("Doc duplicado:", doc._id);
        }
      }

      loading.value = false;
      showImport.value = false;

      loadBackupInfo();
    } catch (err) {
      console.error("Error importando:", err);
    }
  };

  reader.readAsText(file.value);
};

/* =========================
   DESCARGAR BACKUP ACTUAL
========================= */
const downloadBackup = async () => {
  await createBackup();
};

/* =========================
   MODAL
========================= */
const openImport = () => {
  showImport.value = true;
};

const clearData = async () => {
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
</script>
<style scoped>
.backup-wrapper {
  max-width: 500px;
  width: 100%;
}

/* IMAGEN */
.image-box {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.image-box img {
  width: 140px;
  opacity: 0.9;
}

/* BOTONES */
.actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.actions .q-btn {
  min-width: 110px;
  border-radius: 8px;
}

/* MOBILE */
@media (max-width: 600px) {
  .actions {
    flex-direction: column;
  }

  .actions .q-btn {
    width: 100%;
  }
}
</style>
