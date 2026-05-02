import { ref } from 'vue';

export function usePinInput(emit) {
  const pinArray = ref(['', '', '', '']);
  const inputRefs = ref([]);

  const onInput = (index) => {
    if (pinArray.value[index] && index < 3) {
      inputRefs.value[index + 1].focus();
    }
    if (pinArray.value.every(val => val !== '')) {
      setTimeout(() => {
        emit('complete', pinArray.value.join(''));
      }, 100);
      //para evitar que se queden numeros pegados al no ser valido el pinn
    }
  };

  const onDelete = (index) => {
    if (!pinArray.value[index] && index > 0) {
      inputRefs.value[index - 1].focus();
    }
  };

  const resetForm = () => {
    pinArray.value = ['', '', '', ''];
    if (inputRefs.value[0]) inputRefs.value[0].focus();
  };

  const getPinValue = () => pinArray.value.join('');

  return {
    pinArray,
    inputRefs,
    onInput,
    onDelete,
    resetForm,
    getPinValue
  };

}
