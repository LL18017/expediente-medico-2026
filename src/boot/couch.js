import { boot } from "quasar/wrappers";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5984/user",
  auth: {
    username: "admin",
    password: "admin",
  },
  headers: { "Content-Type": "application/json" },
});

export default boot(({ app, $q }) => {
  // Interceptor para errores
  api.interceptors.response.use(
    (res) => res,
    (err) => {
      $q.notify({
        color: "negative",
        icon: "error",
        message: err.response?.data?.reason || "Error en la solicitud",
      });
      return Promise.reject(err);
    },
  );

  app.config.globalProperties.$couch = api;
});

export { api };
