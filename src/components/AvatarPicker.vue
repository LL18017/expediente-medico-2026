<template>
  <div class="relative-position" style="display: inline-block;">
    <q-avatar :size="currentSize" color="purple-1" text-color="teal-4">
      <img v-if="modelValue" :src="modelValue" style="object-fit: cover;">
      <q-icon v-else name="person" :size="iconSize" />
    </q-avatar>

    <q-btn round color="teal" icon="add" :size="buttonSize" class="absolute-bottom-right"
      style="margin-bottom: 5px; margin-right: 5px; box-shadow: 0 4px 10px rgba(0,168,150,0.3);" @click="handleUpload"
      :loading="isLoading" />
  </div>
</template>

<script setup>
/**
 * @component AvatarPicker
 * @description
 * Componente para la selección y previsualización de fotos de perfil.
 * Encapsula la interfaz gráfica la lógica de selección de archivos usando `useFileUpload`.
 */
import { computed } from 'vue';
import { useQuasar } from 'quasar';
import { useFileUpload } from 'src/composable/useFileUpload';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  desktopSize: {
    type: String,
    default: '140px'
  },
  mobileSize: {
    type: String,
    default: '110px'
  }
});

const emit = defineEmits(['update:modelValue']);
const $q = useQuasar();
const { openFileDialog, fileToBase64, isLoading } = useFileUpload();

const currentSize = computed(() => {
  return $q.screen.gt.sm ? props.desktopSize : props.mobileSize;
});

const iconSize = computed(() => {
  const sizeValue = parseInt(currentSize.value.replace('px', ''));
  return (sizeValue * 0.65) + 'px';
});

const buttonSize = computed(() => {
  return $q.screen.gt.sm ? 'md' : 'sm';
});

const handleUpload = async () => {
  const file = await openFileDialog({ accept: 'image/*' });
  if (file) {
    try {
      const base64 = await fileToBase64(file);
      emit('update:modelValue', base64);
    } catch (e) {
      console.error('Error procesando el archivo', e);
    }
  }
};
</script>
