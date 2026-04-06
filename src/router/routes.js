const routes = [
  {
    path: "/",
    component: () => import("layouts/AuthLayout.vue"),
    children: [{ path: "", component: () => import("pages/LoginPage.vue") }],
  },

  {
    path: "/expediente",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/pacientes",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Pacientes.vue") }],
  },
  {
    path: "/pacientes/nuevo-paciente",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/NuevoPaciente.vue") },
    ],
  },
  {
    path: "/pacientes/estadisticas",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/estadisticas.vue") }],
  },
  {
    path: "/citas/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Citas.vue") }],
  },
  {
    path: "/citas/nueva-cita",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/NuevaCita.vue") }],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
