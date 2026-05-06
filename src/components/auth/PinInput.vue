<template>
  <div class="row q-gutter-sm justify-center">
    <q-input v-for="(digit, index) in 4" :key="index" v-model="pinArray[index]" :ref="el => inputRefs[index] = el"
      outlined dense maxlength="1" mask="#" unmasked-value class="pin-input" type="tel"
      input-class="text-center text-h6" @update:model-value="onInput(index)" @keydown.delete="onDelete(index)" />
  </div>
</template>

<script setup>

import { usePinInput } from 'src/services/auth/usePinInput.js';
const emit = defineEmits(['complete']);

const {
  pinArray,
  inputRefs,
  onInput,
  onDelete,
  resetForm,
  getPinValue
} = usePinInput(emit);

defineExpose({ resetForm, getPinValue });
</script>

<style scoped>
/* Bordes de casillas input */
:deep(.q-field--outlined .q-field__control) {
  border-radius: 12px;
}

.pin-input {
  width: 50px;
}
</style>
