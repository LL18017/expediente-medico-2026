const routes = [
  {
    path: "/",
    component: () => import("layouts/AuthLayout.vue"),
    children: [{ path: "", component: () => import("pages/auth/LoginView.vue") }],
  },

  {//dashboard
    path: "/expediente",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexView.vue") }],
  },
  {//politicas y privaciadad
    path: "/expediente/politicas-privacidad",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("src/pages/PoliticasPrivacidadView.vue") }],
  },
  {//administar pacientes
    path: "/expediente/pacientes",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/PacientesView.vue") }],
  },
  {//administar recetas
    path: "/expediente/recetas",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("src/pages/RecetasView.vue") }],
  },
  {
    path: "/expediente/paciente",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("src/pages/MyExpediente.vue") }],
  },
  {//administar clinicas
    path: "/expediente/clinicas",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("src/pages/ClinicasView.vue") }],
  },
  {
    path: "/expediente/consultas", //Cambiar luego
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/ConsultasView.vue") }],
  },
  {
    path: "/expediente/examenes",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("src/pages/ExamenesView.vue") }],
  },
  {
    path: "/expediente/desarrolladores",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("src/pages/DesarrolladoresView.vue") }],
  },
  {
    path: "/expediente/politicas-privacidad",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("src/pages/PoliticasPrivacidadView.vue") }],
  },
  {
    path: "/expediente/registro-consulta",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("src/pages/RegistroConsultaView.vue") }],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
