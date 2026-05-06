import { ref } from 'vue'

export function usePoliticas() {
    const politicas = ref([
        {
            icon: 'business',
            title: '1. Responsable del Tratamiento',
            text: 'La plataforma DataDoc es propiedad intelectual de estudiantes de la Facultad Multidisciplinaria de Occidente (UES). El usuario (profesional de la salud) acepta el rol de Responsable del Tratamiento de Datos Personales, siendo el único obligado a garantizar la confidencialidad y el uso ético de la información clínica registrada según la Ley de Deberes y Derechos de los Pacientes.'
        },
        {
            icon: 'storage',
            title: '2. Categoría de Datos Recopilados',
            text: 'Se procesan datos de carácter sensible, incluyendo pero no limitado a: Identificación del paciente, antecedentes patológicos, diagnósticos clínicos, registros multimedia de exámenes físicos y documentos adjuntos en formato PDF. Todos los datos son capturados bajo la dirección y supervisión exclusiva del profesional médico.'
        },
        {
            icon: 'devices',
            title: '3. Soberanía y Almacenamiento Local',
            text: 'DataDoc implementa una arquitectura "Local-First" mediante la tecnología PouchDB. Esto garantiza que la persistencia de los datos ocurre estrictamente en el almacenamiento interno del dispositivo del usuario. No existe sincronización, respaldo ni transferencia automática hacia servidores de terceros o infraestructuras en la nube administradas por los desarrolladores.'
        },
        {
            icon: 'settings',
            title: '4. Finalidades del Procesamiento',
            text: 'El tratamiento de la información tiene como fin único facilitar la organización, seguimiento y continuidad del cuidado médico del paciente. Se prohíbe explícitamente el uso de la información para perfiles comerciales, minería de datos o cualquier actividad ajena al ejercicio profesional de la medicina y la salud.'
        },
        {
            icon: 'camera_enhance',
            title: '5. Permisos de Hardware y Archivos',
            text: 'Para el correcto funcionamiento del expediente digital, la app requiere permisos de acceso a la cámara y al sistema de archivos. Estos permisos se utilizan exclusivamente para la digitalización de evidencia clínica y carga de reportes externos. Los archivos multimedia resultantes quedan protegidos bajo el mismo protocolo de almacenamiento local.'
        },
        {
            icon: 'security',
            title: '6. Protocolos de Seguridad y Riesgos',
            text: 'Se aplican medidas técnicas para el aislamiento de la base de datos local. No obstante, la seguridad de la información es una responsabilidad compartida: el usuario debe asegurar su dispositivo mediante biometría o contraseñas fuertes. La pérdida, robo del dispositivo o acceso no autorizado por descuido del usuario es responsabilidad ajena a DataDoc.'
        },
        {
            icon: 'share_off',
            title: '7. Transferencia de Datos a Terceros',
            text: 'Bajo ninguna circunstancia DataDoc vende, alquila o cede datos a entidades externas, laboratorios o farmacéuticas. Al no poseer un servidor central, los datos son técnicamente inaccesibles para los desarrolladores, cumpliendo así con los más altos estándares de privacidad por diseño.'
        },
        {
            icon: 'person',
            title: '8. Ejercicio de Derechos ARCO',
            text: 'En cumplimiento con la protección de datos, el profesional garantiza a sus pacientes el derecho de Acceso, Rectificación, Cancelación y Oposición (ARCO). La aplicación proporciona las funcionalidades técnicas para que el médico pueda editar o eliminar registros de forma definitiva conforme el paciente lo solicite.'
        },
        {
            icon: 'gavel',
            title: '9. Jurisdicción y Marco Legal',
            text: 'Este acuerdo se rige por las leyes de la República de El Salvador, incluyendo el Código de Ética Médica y la Ley de Protección de Datos Personales. Cualquier controversia derivada del mal uso de la información clínica será dirimida bajo los tribunales competentes de la jurisdicción salvadoreña.'
        }
    ])
    return {
        politicas
    }
}