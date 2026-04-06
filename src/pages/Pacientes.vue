<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import { Notify } from "quasar";

// =====================
// STATE
// =====================
const users = ref([]);
const filter = ref("");
let showDialog = ref(false);

// =====================
// API (CouchDB)
// =====================
const { appContext } = getCurrentInstance();
const api = appContext.config.globalProperties.$couch;

const loadPatients = async () => {
  try {
    const res = await api.get("/_all_docs?include_docs=true");
    users.value = res.data.rows.map((r) => r.doc);
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => loadPatients());

// =====================
// COLUMNS
// =====================
const columns = [
  {
    name: "nombre",
    label: "Nombre",
    align: "left",
    field: "nombre",
    sortable: true,
  },
  {
    name: "edad",
    label: "Edad",
    align: "center",
    field: "edad",
    sortable: true,
  },
  { name: "tipo", label: "Tipo", align: "center", field: "tipo" },
  { name: "email", label: "Email", align: "left", field: "email" },
  { name: "telefono", label: "Teléfono", align: "left", field: "telefono" },

  {
    name: "direccion",
    label: "Dirección",
    align: "left",
    field: (row) =>
      (row.direccion?.calle || "—") +
      ", " +
      (row.direccion?.ciudad || "—") +
      ", " +
      (row.direccion?.pais || "—"),
  },

  {
    name: "activo",
    label: "Estatus",
    align: "center",
    field: (row) => (row.activo ? "Activo" : "Inactivo"),
  },

  { name: "acciones", label: "Acciones", align: "center" },
];

// =====================
// CRUD FUNCIONES
// =====================
const deletePatient = (row) => {
  users.value = users.value.filter((p) => p._id !== row._id);
  Notify.create({
    type: "positive",
    message: `Paciente ${row.nombre} eliminado correctamente`,
    position: "bottom-right",
    timeout: 2000,
  });
};

const editPatient = (row) => {
  alert(`Editar paciente: ${row.nombre}`);
};

const viewPatient = (row) => {
  alert(`Ver paciente: ${row.nombre}`);
};

const addPatient = () => {
  alert("Crear nuevo paciente");
};
const openModal = () => {
  showDialog.value = true;
};
</script>

<template>
  <q-page class="q-pa-md">
    <!-- TABLA -->
    <q-table
      :rows="users"
      :columns="columns"
      row-key="_id"
      :filter="filter"
      :grid="$q.screen.lt.md"
      flat
      bordered
      style="width: 100%"
    >
      <!-- 🔥 HEADER PERSONALIZADO -->
      <template v-slot:top>
        <div class="row column item-start full-width items-center q-gutter-sm">
          <!-- Título -->
          <div class="text-h6">Administración de pacientes</div>

          <q-space />
          <div class="row items-center justify-between full-width">
            <!-- Buscador -->
            <q-input
              dense
              debounce="300"
              v-model="filter"
              placeholder="Buscar..."
              outlined
              clearable
              style="width: 450px"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>

            <!-- Botón -->
            <q-btn
              color="primary"
              icon="add"
              label="Nuevo"
              @click="openModal"
              class="q-mt-sm"
            />
          </div>

          <!-- Botón agregar -->
        </div>
      </template>

      <!-- 🔥 CELDA ACCIONES -->
      <template v-slot:body-cell-acciones="props">
        <q-td align="center" class="q-gutter-sm">
          <!-- Editar -->
          <q-btn
            dense
            flat
            icon="edit"
            color="primary"
            @click="editPatient(props.row)"
          >
            <q-tooltip>Editar</q-tooltip>
          </q-btn>

          <!-- Eliminar -->
          <q-btn
            dense
            flat
            icon="delete"
            color="negative"
            @click="deletePatient(props.row)"
          >
            <q-tooltip>Eliminar</q-tooltip>
          </q-btn>

          <!-- Ver -->
          <q-btn
            dense
            flat
            icon="visibility"
            color="info"
            @click="openModal(props.row)"
          >
            <q-tooltip>Ver detalle</q-tooltip>
          </q-btn>
        </q-td>
      </template>
      <template v-slot:item="props">
        <div class="q-pa-sm col-12 col-sm-6 col-md-4">
          <q-card>
            <q-card-section>
              <div class="text-h6">{{ props.row.nombre }}</div>
              <div class="text-subtitle2">{{ props.row.tipo }}</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div><strong>Edad:</strong> {{ props.row.edad }}</div>
              <div><strong>Email:</strong> {{ props.row.email }}</div>
              <div><strong>Teléfono:</strong> {{ props.row.telefono }}</div>
              <div>
                <strong>Estado:</strong>
                {{ props.row.activo ? "Activo" : "Inactivo" }}
              </div>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
              <q-btn
                flat
                icon="edit"
                color="primary"
                @click="editPatient(props.row)"
              />
              <q-btn
                flat
                icon="delete"
                color="negative"
                @click="deletePatient(props.row)"
              />
              <q-btn flat icon="visibility" color="info" @click="openModal" />
            </q-card-actions>
          </q-card>
        </div>
      </template>
    </q-table>
  </q-page>
  <q-dialog v-model="showDialog">
    <q-card style="min-width: 300px">
      <q-card-section class="text-center">
        Este es un modal simple el cual sirve para mostrar detalles
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cerrar" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<style scoped>
.q-table__container {
  overflow-x: auto;
}
</style>
