import { ref } from 'vue'

export function useDesarrolladores() {
    const desarrolladores = ref([

        { name: 'Samuel Martinez', role: 'Estudiante y Desarrollador', email: 'mb21011@ues.edu.sv', initial: 'S', color: 'light-blue-2' },
        { name: 'Luis Hernandez', role: 'Estudiante y Desarrollador', email: 'hm20059@ues.edu.sv', initial: 'L', color: 'blue-2' },
        { name: 'Mario Lemus', role: 'Estudiante y Desarrollador', email: 'LL18017@ues.edu.sv', initial: 'M', color: 'teal-2' },
        { name: 'Gerardo Avila', role: 'Estudiante y Desarrollador', email: 'mu18006@ues.edu.sv', initial: 'G', color: 'indigo-2' },
        { name: 'Eduardo Gomez', role: 'Estudiante y Desarrollador', email: 'Gp21004@ues.edu.sv', initial: 'E', color: 'deep-purple-2' },
        { name: 'Luis Barraza', role: 'Estudiante y Desarrollador', email: 'bc20029@ues.edu.sv', initial: 'L', color: 'purple-2' },

    ])
    return {
        desarrolladores
    }
}