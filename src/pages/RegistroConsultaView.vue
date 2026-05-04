<template>
    <q-page class="bg-grey-2 q-pa-md">
        <q-form ref="formularioConsulta" @submit="guardarConsulta">
            <div class="q-mx-auto" style="max-width: 1400px;">
                <q-card class="q-mb-md border-radius-md shadow-2 bg-teal-7 text-white">
                    <q-item>
                        <q-item-section avatar>
                            <q-avatar size="60px" color="white" text-color="teal-7" icon="person" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label class="text-h6 text-weight-bold">Juan Pérez García</q-item-label>
                            <q-item-label>Edad: 45 años | Expediente: #00124</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                            <q-chip :color="consulta.estado === 'Finalizada' ? 'teal-9' : 'orange-9'"
                                text-color="white"> Consulta
                                {{ consulta.estado }}
                            </q-chip>
                        </q-item-section>
                    </q-item>
                </q-card>
                <q-card flat bordered class="shadow-1">
                    <q-tabs v-model="tab" dense class="text-grey" active-color="teal-7" indicator-color="teal-7"
                        align="justify" narrow-indicator>
                        <q-tab name="historia" label="Anamnesis" icon="history_edu" />
                        <q-tab name="signos" label="Signos Vitales" icon="monitor_heart" />
                        <q-tab name="diagnostico" label="Diagnóstico" icon="assignment" />
                    </q-tabs>
                    <q-separator />
                    <q-tab-panels v-model="tab" animated>
                        <q-tab-panel name="historia">
                            <div class="text-h6 q-mb-md text-teal-9">Historia Clínica</div>
                            <div class="row q-col-gutter-md">
                                <q-input filled v-model="consulta.motivo" label="Motivo de la consulta *" class="col-12"
                                    placeholder="Ej. Dolor de cabeza persistente desde hace 3 días" lazy-rules
                                    :rules="[val => !!val || 'Por favor, ingrese motivo de consulta']" />
                                <div class="col-12">
                                    <q-input filled v-model="consulta.historia" label="Historia de la enfermedad actual"
                                        type="textarea" rows="3" class="col-12"
                                        placeholder="Ej: Paciente refiere inicio de síntomas hace 48 horas con dolor tipo cólico en fosa ilíaca derecha, que irradia a espalda, acompañado de náuseas y febrícula no cuantificada..."
                                        lazy-rules
                                        :rules="[val => !!val || 'Por favor, relate la evolucion de los sintomas']" />
                                    <div class="q-px-sm q-pt-xs text-caption text-grey-8" style="line-height: 1.2;">
                                        <q-icon name="info" size="14px" color="teal-7" class="q-mr-xs" />
                                        <strong>Guía:</strong> ¿Cuándo inició? ¿Cómo es el dolor? ¿Qué lo alivia? ¿Qué
                                        lo empeora?
                                    </div>
                                </div>
                            </div>
                            <q-separator class="q-my-lg" color="teal-2" />
                            <div class="row items-center q-mb-md">
                                <q-icon name="folder_shared" color="teal-7" size="sm" class="q-mr-sm" />
                                <div class="text-h6 text-teal-9">Antecedentes del Paciente</div>
                            </div>
                            <div class="row q-col-gutter-md">
                                <div class="col-12">
                                    <q-input filled v-model="consulta.antecedentes.alergias"
                                        label="Alergias Medicamentosas *" bg-color="red-1" color="red-7"
                                        placeholder="Ej: Penicilina, Sulfa, Aspirina (Si no tiene, poner 'Negado')">
                                        <template v-slot:prepend>
                                            <q-icon name="warning" color="red-7" />
                                        </template>
                                    </q-input>
                                </div>
                                <div class="col-12 col-md-6">
                                    <q-card flat bordered class="q-pa-sm">
                                        <div class="text-subtitle2 q-mb-xs text-teal-9">Enfermedades Crónicas /
                                            Patológicos</div>
                                        <div class="row">
                                            <q-checkbox class="col-6" v-model="consulta.antecedentes.patologicos"
                                                val="Diabetes" label="Diabetes" color="teal" />
                                            <q-checkbox class="col-6" v-model="consulta.antecedentes.patologicos"
                                                val="Hipertensión" label="Hipertensión" color="teal" />
                                            <q-checkbox class="col-6" v-model="consulta.antecedentes.patologicos"
                                                val="Asma" label="Asma" color="teal" />
                                            <q-checkbox class="col-6" v-model="consulta.antecedentes.patologicos"
                                                val="Obesidad" label="Obesidad" color="teal" />
                                        </div>
                                        <q-input dense filled v-model="consulta.antecedentes.otrosPatologicos"
                                            label="Otras enfermedades o detalles" class="q-mt-sm" />
                                    </q-card>
                                </div>
                                <div class="col-12 col-md-6">
                                    <q-input filled v-model="consulta.antecedentes.quirurgicos"
                                        label="Antecedentes Quirúrgicos" type="textarea" autogrow
                                        placeholder="Ej: Apendicectomía (2015), Cesárea (2010)" />
                                    <q-input filled v-model="consulta.antecedentes.familiares"
                                        label="Antecedentes Familiares" type="textarea" autogrow class="q-mt-md"
                                        placeholder="Ej: Madre con Cáncer de Mama, Padre con Infartos" />
                                </div>
                            </div>
                        </q-tab-panel>
                        <q-tab-panel name="signos">
                            <div class="text-h6 q-mb-md text-teal-9">Signos Vitales y Examen Físico</div>
                            <div class="row q-col-gutter-sm">
                                <q-input filled v-model="consulta.presion" label="Presión Art. (mmHg)"
                                    class="col-6 col-sm-3" mask="###/###" />
                                <q-input filled v-model="consulta.temperatura" label="Temp. (°C)" class="col-6 col-sm-3"
                                    type="number" />
                                <q-input filled v-model="consulta.frecuencia" label="Frec. Card. (lpm)"
                                    class="col-6 col-sm-3" />
                                <q-input filled v-model="consulta.saturacion" label="SpO2 (%)" class="col-6 col-sm-3" />

                                <q-input filled v-model="consulta.peso" label="Peso (kg)"
                                    class="col-6 col-sm-3 q-mt-md" />
                                <q-input filled v-model="consulta.talla" label="Talla (cm)"
                                    class="col-6 col-sm-3 q-mt-md" />

                                <q-input filled v-model="consulta.examenFisico" label="Hallazgos del Examen Físico"
                                    type="textarea" class="col-12 q-mt-md"
                                    placeholder="Ej: Paciente orientado en tiempo y espacio. Mucosas orales hidratadas. Tórax simétrico, campos pulmonares con presencia de estertores crepitantes en base derecha. Abdomen blando, depresible, sin megalias..."
                                    hint="Guía: Estado general, cabeza/cuello, tórax, abdomen, extremidades y sistema neurológico." />
                            </div>
                        </q-tab-panel>
                        <q-tab-panel name="diagnostico">
                            <div class="text-h6 q-mb-md text-teal-9">Impresión Clínica</div>
                            <div class="row q-col-gutter-md">

                                <q-input filled v-model="consulta.diagnostico"
                                    label="Diagnóstico (CIE-10 o descripción) *" class="col-12"
                                    placeholder="Ej: J03.9 - Amigdalitis aguda, no especificada o Hipertensión arterial esencial"
                                    hint="Escriba el nombre de la enfermedad o el código CIE-10" />

                                <q-input filled v-model="consulta.tratamiento" label="Plan de tratamiento / Receta *"
                                    type="textarea" autogrow class="col-12"
                                    placeholder="Ej: 1. Amoxicilina 500mg, 1 tableta cada 8 horas por 7 días. &#10;2. Paracetamol 500mg, 1 tableta cada 6 horas si hay fiebre o dolor. &#10;3. Abundantes líquidos y reposo."
                                    hint="Incluya dosis, frecuencia y duración del tratamiento" />


                                <q-input filled v-model="consulta.proximaCita" label="Fecha próxima cita (opcional)"
                                    mask="date" class="col-12 col-sm-6" placeholder="YYYY/MM/DD">
                                    <template v-slot:append>
                                        <q-icon name="event" class="cursor-pointer">
                                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                <q-date v-model="consulta.proximaCita">
                                                    <div class="row items-center justify-end">
                                                        <q-btn v-slot:close label="OK" color="primary" flat />
                                                    </div>
                                                </q-date>
                                            </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                </q-input>
                            </div>
                            <q-btn no-caps push color="teal-7" label="Generar Receta" @click="show()" />
                        </q-tab-panel>
                    </q-tab-panels>
                    <q-separator />
                    <q-card-actions align="right" class="q-pa-md">
                        <q-btn flat label="Cancelar" color="grey-7" v-close-popup />
                        <q-btn v-if="tab !== 'diagnostico'" unelevated icon="save_as" label="Guardar Avance"
                            color="orange-8" @click="guardarConsulta" />
                        <q-btn v-else unelevated icon="check_circle" label="Finalizar Consulta" color="teal-7"
                            @click="guardarConsulta" />
                    </q-card-actions>
                </q-card>
            </div>
        </q-form>
    </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
const router = useRouter()
const $q = useQuasar()
const tab = ref('historia')
const formularioConsulta = ref(null) // Referencia para validar el form

const consulta = ref({
    estado: 'En Proceso', // Estado inicial
    motivo: '',
    historia: '',
    antecedentes: {
        alergias: '',
        patologicos: [],
        otrosPatologicos: '',
        quirurgicos: '',
        familiares: ''
    },
    // ... otros campos (presion, diagnostico, etc.)
})

const show = () => {
    console.log('Generando receta...')
    router.push('/expediente/recetas')
}

const guardarConsulta = async () => {
    // Si el botón que se presionó fue el de la pestaña de Diagnóstico
    if (tab.value === 'diagnostico') {
        const validacion = await formularioConsulta.value.validate()

        if (validacion) {
            consulta.value.estado = 'Finalizada'
            $q.notify({
                color: 'teal-9',
                message: 'Consulta Finalizada con éxito',
                icon: 'verified'
            })
            // Aquí cierras el expediente o rediriges
        } else {
            // Si falta algo en diagnóstico pero le dio a finalizar
            $q.notify({
                color: 'red-5',
                message: 'Faltan campos obligatorios para finalizar',
                icon: 'warning'
            })
            return // No guarda si intentó finalizar y falló
        }
    } else {
        // Si está en cualquier otra pestaña (Anamnesis o Signos)
        consulta.value.estado = 'En Seguimiento'
        $q.notify({
            color: 'orange-9',
            message: 'Progreso guardado (En Seguimiento)',
            icon: 'history'
        })
    }

    // Lógica común de guardado en PouchDB
    console.log('Datos guardados:', consulta.value)
}
</script>