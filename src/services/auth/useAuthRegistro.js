import { ref, reactive, computed } from 'vue';
import { useQuasar } from 'quasar';

export function useAuthRegistro() {
  const $q = useQuasar();

  // --- Donde se ecnurntra ---
  const step = ref(1);
  const stepper = ref(null); // Referencia al componente q-stepper

  const perfil = reactive({
    nombre: '',
    usuario: '',
    correo: '',
    especialidad: '',
    clinica: '',
    telefono: '',
    foto: null,
    aceptaPoliticas: false
  });

  // --- COMPUTADOS ---
  const perfilValido = computed(() => {
    const emailRegex = /.+@.+\..+/;
    const userRegex = /^[a-zA-Z0-9_]+$/;
    return (
      perfil.nombre.trim() !== '' &&
      perfil.usuario.trim() !== '' &&
      userRegex.test(perfil.usuario) &&
      emailRegex.test(perfil.correo) &&
      perfil.aceptaPoliticas
    );
  });

  // --- ACCIONES ---
  const validarPerfil = () => {
    if (perfilValido.value) {
      // Avanzamos al siguiente paso
      if (stepper.value) stepper.value.next();
    } else {
      $q.notify({
        color: 'negative',
        message: 'Acepta las políticas y completa los campos obligatorios.',
        position: 'top',
        icon: 'warning'
      });
    }
  };

  // Retornamos el objeto
  return {
    step,
    stepper,
    perfil,
    perfilValido,
    validarPerfil
  };
}
