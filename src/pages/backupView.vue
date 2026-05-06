<template>
  <q-page class="q-pa-md">
    <!-- HEADER -->
    <div class="row items-center justify-between q-mb-md">
      <div>
        <div class="text-h5">Respaldos del sistema</div>
        <div class="text-subtitle2 text-grey">
          Genera y descarga backups de la base de datos
        </div>
      </div>

      <q-btn
        color="primary"
        icon="add"
        label="Crear respaldo"
        @click="createBackup"
      />
    </div>

    <!-- GRID -->
    <div class="row q-col-gutter-md">
      <!-- LISTA -->
      <div class="col-12 col-md-8">
        <q-card>
          <q-card-section class="text-subtitle1">
            Respaldos disponibles
          </q-card-section>

          <q-separator />

          <q-list separator>
            <q-item v-for="b in backups" :key="b.id">
              <q-item-section avatar>
                <q-avatar color="blue-1" text-color="primary">
                  <q-icon name="backup" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  {{ b.name }}
                </q-item-label>

                <q-item-label caption>
                  {{ b.date }} · {{ b.size }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-btn
                  dense
                  flat
                  icon="download"
                  color="green"
                  @click="downloadBackup(b)"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
      <!-- PANEL INFO -->
      <div class="col-12 col-md-4">
        <q-card class="q-pa-md">
          <div class="text-subtitle1 q-mb-sm">Estado del sistema</div>

          <q-separator class="q-mb-md" />

          <div class="q-mb-sm">
            <div class="text-caption text-grey">Total respaldos</div>
            <div class="text-h6">{{ backups.length }}</div>
          </div>

          <div class="q-mb-sm">
            <div class="text-caption text-grey">Último respaldo</div>
            <div class="text-body2">{{ lastBackup }}</div>
          </div>

          <q-banner class="bg-blue-1 text-primary q-mt-md" rounded>
            Puedes descargar o generar respaldos en cualquier momento.
          </q-banner>

          <!-- =========================
         IMPORTAR RESPALDO
    ========================== -->
          <q-separator class="q-mt-md q-mb-md" />

          <div class="text-subtitle1 q-mb-sm">Importar respaldo</div>

          <q-file
            v-model="file"
            label="Seleccionar archivo"
            filled
            accept=".sql,.json"
            clearable
            class="q-mb-sm"
          />

          <q-btn
            color="green"
            icon="upload"
            label="Importar"
            class="full-width"
            :disable="!file"
            @click="importBackup"
          />
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";

/* =========================
   BACKUPS MOCK
========================= */
const backups = ref([
  {
    id: 1,
    name: "backup_usuarios.sql",
    date: "2026-05-01 10:00",
    size: "2.1 MB",
  },
  {
    id: 2,
    name: "backup_consultas.sql",
    date: "2026-04-28 09:30",
    size: "3.4 MB",
  },
  {
    id: 3,
    name: "backup_general.sql",
    date: "2026-04-25 18:10",
    size: "5.8 MB",
  },
]);

/* =========================
   COMPUTED
========================= */
const lastBackup = computed(() => {
  return backups.value[0]?.date || "Sin datos";
});

/* =========================
   CREATE BACKUP
========================= */
const createBackup = async () => {
  const newBackup = {
    id: Date.now(),
    name: `backup_general_${Date.now()}.sql`,
    date: new Date().toLocaleString("es-SV"),
    size: (Math.random() * 5 + 1).toFixed(1) + " MB",
  };

  backups.value.unshift(newBackup);
};

/* =========================
   DOWNLOAD BACKUP
========================= */
const downloadBackup = (backup) => {
  // Simulación (aquí luego conectas API real)
  const blob = new Blob(
    [`-- Backup file: ${backup.name}\n-- Fecha: ${backup.date}`],
    { type: "text/sql" },
  );

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = backup.name;
  link.click();

  URL.revokeObjectURL(link.href);
};
</script>

<style scoped>
@media (max-width: 600px) {
  .text-h5 {
    font-size: 18px;
  }
}
</style>
