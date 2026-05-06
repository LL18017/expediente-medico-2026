import { ref, reactive, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

export function useAuthRegistro() {
  const $q = useQuasar();
  const router = useRouter();

  // --- Para manejar en que paso se encuentra---
  const step = ref(1);
  const stepper = ref(null); // Referencia al componente q-stepper

  const perfil = reactive({
    nombre: '',
    usuario: '',
    correo: '',
    especialidad: '',
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

  // --- ESTADO: PASO 3 (PIN) ---
  const pinInputRef = ref(null);
  const pinOriginal = ref('');
  const confirmandoPin = ref(false);
  const errorPin = ref('');

  const manejarIngresoPin = (pinValue) => {
    errorPin.value = '';

    if (!confirmandoPin.value) {
      pinOriginal.value = pinValue;
      confirmandoPin.value = true;
      setTimeout(() => {
        if (pinInputRef.value) pinInputRef.value.resetForm();
      }, 200);
    } else {
      if (pinValue === pinOriginal.value) {
        stepper.value.next();
      } else {
        errorPin.value = 'Los PINs no coinciden. Intenta de nuevo.';
        setTimeout(() => {
          if (pinInputRef.value) pinInputRef.value.resetForm();
        }, 500);
      }
    }
  };

  const retrocederPin = () => {
    if (confirmandoPin.value) {
      confirmandoPin.value = false;
      pinOriginal.value = '';
      errorPin.value = '';
      if (pinInputRef.value) pinInputRef.value.resetForm();
    } else {
      stepper.value.previous();
    }
  };

  // --- ESTADO: PASO 4 (Preguntas) ---
  const opcionesPreguntas = [
    '¿Cuál es el nombre de tu primera mascota?',
    '¿En qué ciudad naciste?',
    '¿Cuál era tu apodo de la infancia?',
    '¿Cuál es el nombre de tu colegio primario?',
    '¿Cuál es tu color favorito?'
  ];

  const preguntasRespaldo = reactive([
    { pregunta: '', respuesta: '' },
    { pregunta: '', respuesta: '' },
    { pregunta: '', respuesta: '' }
  ]);

  const preguntasValidas = computed(() => {
    const todasLlenas = preguntasRespaldo.every(p => p.pregunta !== '' && p.respuesta.trim() !== '');
    const setPreguntas = new Set(preguntasRespaldo.map(p => p.pregunta));
    return todasLlenas && setPreguntas.size === 3;
  });

  // --- FINALIZACIÓN ---
  const finalizarRegistro = () => {
    // en PouchDB o LocalStorage.
    console.log('--- DATOS A GUARDAR ---');
    console.log('Perfil:', perfil);
    console.log('PIN:', pinOriginal.value);
    console.log('Preguntas:', preguntasRespaldo);

    $q.notify({
      color: 'positive',
      message: '¡Configuración completada con éxito!',
      icon: 'check_circle',
      position: 'top'
    });

    router.push('/expediente');
  };

  return {
    step,
    stepper,
    perfil,
    perfilValido,
    validarPerfil,
    pinInputRef,
    pinOriginal,
    confirmandoPin,
    errorPin,
    manejarIngresoPin,
    retrocederPin,
    opcionesPreguntas,
    preguntasRespaldo,
    preguntasValidas,
    finalizarRegistro
  };
}
