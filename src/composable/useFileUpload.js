import { ref } from 'vue';

export function useFileUpload() {
  const isLoading = ref(false);
  const error = ref(null);

  /**
   * Abre el selector de archivos
   * @param {Object} options - Opciones { accept: 'image/*, application/pdf' }
   * @returns {Promise<File|null>}
   */
  const openFileDialog = (options = { accept: '*/*' }) => {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = options.accept;
      input.onchange = (e) => {
        const file = e.target.files[0];
        resolve(file || null);
      };
      input.click();
    });
  };

  /**
   * 1. QUITAR: El uso de `fileToBase64` para guardar en Pouch.
   * 2. AGREGAR: Guarda el archivo usando "Attachments" de PouchDB.
   * 3. AGREGAR: Para mostrar la foto en el perfil antes de guardarla:
   *    const previewUrl = URL.createObjectURL(file);
   * @param {File} file
   * @returns {Promise<string>}
   */
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      isLoading.value = true;
      const reader = new FileReader();

      reader.onload = () => {
        isLoading.value = false;
        resolve(reader.result);
      };

      reader.onerror = (err) => {
        isLoading.value = false;
        error.value = err;
        reject(err);
      };

      reader.readAsDataURL(file);
    });
  };

  return {
    isLoading,
    error,
    openFileDialog, //Funcion para cargar archivos
    fileToBase64
  };
}
