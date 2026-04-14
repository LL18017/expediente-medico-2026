const routes = [
  {
    path: "/",
    component: () => import("layouts/AuthLayout.vue"),
    children: [{ path: "", component: () => import("pages/LoginPage.vue") }],
  },

  {//dashboard
    path: "/expediente",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {//politicas y privaciadad
    path: "/expediente/politicas-privacidad",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/PoliticasPrivacidad.vue") }],
  },
  {//administar pacientes
    path: "/expediente/pacientes",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Pacientes.vue") }],
  },
  {
    path: "/expediente/consultas",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/consultas.vue") }],
  },
  {
    path: "/expediente/desarrolladores",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/desarrolladores.vue") }],
  },
  {
    path: "/expediente/politicas-privacidad",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/PoliticasPrivacidad.vue") }],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
