<template>
    <q-page class="bg-white text-black q-pb-xl">

        <div class="bg-teal-6 text-white row items-center q-pa-sm">
            <q-btn flat round dense icon="chevron_left" class="q-mr-sm" />
            <div class="text-h5 text-center col text-weight-regular">DataDoc</div>
            <div style="width: 32px"></div>
        </div>

        <div class="column items-center q-py-md">
            <q-avatar size="70px" class="q-mb-sm bg-teal-3">
                <img src="https://cdn.quasar.dev/img/avatar.png" alt="Doctor Avatar">
            </q-avatar>
            <div class="text-h6 text-weight-regular">Dr. Venas Azules</div>
            <div class="text-subtitle1">Cardiólogo</div>
            <div class="text-body2 text-grey-8 text-center">
                WM-28323 Hospital: Independiente Especialidad: Cirujano <br>
                Consultorio: 102-D
            </div>
        </div>

        <q-separator class="bg-indigo-10 q-my-sm" size="4px" />

        <div class="row q-col-gutter-xl q-pa-md">

            <div class="col-12 col-md-6 column q-gutter-y-lg">
                <div>
                    <div class="bg-blue-1 text-black q-py-xs q-px-sm inline-block q-mb-md text-weight-medium">
                        Datos de consulta
                    </div>
                    <div class="column q-gutter-y-sm">
                        <div class="row items-center">
                            <div class="col-4 text-body2">Fecha:</div>
                            <div class="col-8 bg-grey-2 rounded-borders q-py-xs q-px-md text-body2">10/05/2025</div>
                        </div>
                        <div class="row items-center">
                            <div class="col-4 text-body2">Brindado por:</div>
                            <div class="col-8 bg-grey-2 rounded-borders q-py-xs q-px-md text-body2">Venas Azules</div>
                        </div>
                        <div class="row items-center">
                            <div class="col-4 text-body2">Especialidad</div>
                            <div class="col-8 bg-grey-2 rounded-borders q-py-xs q-px-md text-body2">Cardiólogo</div>
                        </div>
                        <div class="row items-center">
                            <div class="col-4 text-body2">Nº. Expediente</div>
                            <div class="col-8 bg-grey-2 rounded-borders q-py-xs q-px-md text-body2">1297-5</div>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="bg-blue-1 text-black q-py-xs q-px-sm inline-block q-mb-md text-weight-medium">
                        Datos del paciente
                    </div>
                    <div class="column q-gutter-y-sm">
                        <div class="row items-center">
                            <div class="col-4 text-body2">Nombre:</div>
                            <div class="col-8 bg-grey-2 rounded-borders q-py-xs q-px-md text-body2">Juan Perez</div>
                        </div>
                        <div class="row items-center">
                            <div class="col-4 text-body2">Años:</div>
                            <div class="col-8 bg-grey-2 rounded-borders q-py-xs q-px-md text-body2">23</div>
                        </div>
                        <div class="row items-center">
                            <div class="col-4 text-body2">Fecha nac.</div>
                            <div class="col-8 bg-grey-2 rounded-borders q-py-xs q-px-md text-body2">09/09/2002</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-6 column q-gutter-y-lg">
                <div>
                    <div class="bg-blue-1 text-black q-py-xs q-px-sm inline-block q-mb-md text-weight-medium">
                        Motivo de consulta
                    </div>
                    <div class="column q-gutter-y-md">
                        <div class="row">
                            <div class="col-3 text-body2 q-pt-xs">Consulta por:</div>
                            <div class="col-9 bg-grey-2 rounded-borders q-pa-sm text-body2" style="min-height: 50px;">
                                Vómitos
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-3 text-body2 q-pt-xs text-center q-pr-sm">Presente enfermedad</div>
                            <div class="col-9 bg-grey-2 rounded-borders q-pa-sm text-body2" style="min-height: 70px;">
                                Paciente presenta mareos tras pasado unos días con ese síntoma
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="bg-blue-1 text-black q-py-xs q-px-sm inline-block q-mb-md text-weight-medium">
                        Receta médica
                    </div>
                    <div class="row">
                        <div class="col-3 text-body2 q-pt-xs">Receta:</div>
                        <div class="col-9 bg-grey-2 rounded-borders q-pa-md text-body2">
                            <ol class="q-pl-md q-mt-none q-mb-none">
                                <li class="q-mb-sm">
                                    <strong>Paracetamol 500mg</strong> ----------------------- #20 tabletas<br>
                                    <span class="text-caption">Indicación: Tomar 1 tableta cada 8 horas por 5
                                        días</span>
                                </li>
                                <li>
                                    <strong>Amoxicilina 875mg</strong> ------------------------- #14 tabletas<br>
                                    <span class="text-caption">Indicación: Tomar 1 tableta cada 12 horas por 7
                                        días.</span>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <q-separator class="bg-indigo-10 q-mt-xl" size="4px" />

        <div class="row items-center justify-between q-pa-lg">
            <div class="text-h5 text-weight-medium">Consultorio DataDoc</div>

            <q-btn color="green-6" text-color="white" label="Imprimir" rounded unelevated
                class="text-weight-bold q-px-xl" size="md" @click="window.print()" />

            <div class="text-right text-body2">
                <div>Av. Juan Pérez No.1234 Col.San Juan</div>
                <div class="q-mt-xs">
                    <span class="q-mr-md">Tel. Cel. 1234-5678</span>
                    <span>Datadoc@gmail.com</span>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script setup>
// window.print() es la función estándar de los navegadores para imprimir
const windowPrint = () => {
    window.print();
};
</script>

<style scoped>
.rounded-borders {
    border-radius: 12px;
}

/* Opcional: Esto ayuda a que al imprimir no salgan botones o fondos innecesarios */
@media print {

    .q-btn,
    .bg-teal-6 {
        display: none !important;
    }
}
</style>