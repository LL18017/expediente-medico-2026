import { ref } from 'vue';
import { useRouter } from 'vue-router';


export function useAuthLogin() {
  const router = useRouter();
  // Referencia componente PinInput
  const pinComponentRef = ref(null);
  const errorMsg = ref('');

  // Función principal de validación
  const validarPin = (pinIngresado) => {
    console.log("Intentando validar PIN:", pinIngresado);
    // mock con "1234"
    const pinCorrecto = "1234";
    if (pinIngresado === pinCorrecto) {
      console.log("¡Acceso correcto!");
      errorMsg.value = '';
      router.push('/expediente');
    } else {
      errorMsg.value = 'PIN incorrecto. Intenta de nuevo.';
      // Llamamos a la función resetForm() en componente PinInput
      if (pinComponentRef.value) {
        pinComponentRef.value.resetForm();
      }
    }
  };

  const ingresar = () => {
    const pinVal = pinComponentRef.value.getPinValue();

    if (pinVal.length < 4) {
      errorMsg.value = 'Por favor, ingresa los 4 dígitos del PIN';
      return;
    }

    validarPin(pinVal);
  };

  // Retorna un objeto para el template
  return {
    pinComponentRef,
    errorMsg,
    validarPin,
    ingresar
  };
}
