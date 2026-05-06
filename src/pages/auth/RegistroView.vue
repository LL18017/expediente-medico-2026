<template>
  <q-page class="bg-medical-gradient relative-position overflow-hidden"
    :class="{ 'flex flex-center': $q.screen.gt.sm }">

    <!-- FONDO CURVO Paso 1-->
    <div v-if="$q.screen.gt.sm && step === 1" class="absolute bg-white animate__animated animate__fadeIn"
      style="width: 1500px; height: 1500px; border-radius: 50%; right: -650px; top: 50%; transform: translateY(-50%); z-index: 0; box-shadow: -20px 0 50px rgba(0,168,150,0.05);">
    </div>

    <!-- FONDO CURVO Paso 2 en adelante-->
    <div v-if="$q.screen.gt.sm && step >= 2" class="absolute bg-white animate__animated animate__fadeIn"
      style="width: 1500px; height: 1500px; border-radius: 50%; left: -650px; top: 50%; transform: translateY(-50%); z-index: 0; box-shadow: 20px 0 50px rgba(0,168,150,0.05);">
    </div>

    <div class="relative-position full-width" style="max-width: 1200px; margin: 0 auto; z-index: 1;">
      <q-stepper v-model="step" ref="stepper" color="teal" animated flat class="bg-transparent"
        header-class="text-weight-bold">
        <!-- PASO 1: Bienvenida Movil y Desktop -->
        <q-step :name="1" :done="step > 1">

          <!-- DESKTOP -->
          <div v-if="$q.screen.gt.sm" class="row items-center q-px-xl full-height animate__animated animate__fadeIn"
            style="min-height: 70vh;">
            <!-- Lado Izquierdo -->
            <div class="col-md-6 text-left q-pr-xl">
              <div class="text-h4 text-dark text-weight-bold q-mb-md" style="line-height: 1.3;">
                Gestiona citas, consultas, expedientes y seguimiento clínico desde un solo lugar.
              </div>
              <q-separator color="teal-3" size="3px" style="width: 60px;" class="q-mb-lg" />
              <div class="text-subtitle1 text-grey-7 q-mb-xl" style="font-size: 1.2rem;">
                Simplifica tu trabajo diario y brinda mejor atención a tus pacientes.
              </div>
              <q-btn @click="$refs.stepper.next()" color="teal" label="Registrarme"
                class="text-weight-bold text-subtitle1 q-px-xl" size="lg" rounded no-caps
                style="box-shadow: 0 6px 20px rgba(0,168,150,0.4);" />
            </div>

            <!-- Lado Derecho  -->
            <div class="col-md-6 flex flex-center relative-position" style="min-height: 500px;">
              <q-img src="~assets/doc-welcome.png" style="height: 550px; max-width: 500px; z-index: 1;" fit="contain">
                <template v-slot:error>
                  <div class="absolute-full flex flex-center bg-grey-2 text-grey-7" style="border-radius: 12px;">
                    [Ilustración Doctor]
                  </div>
                </template>
              </q-img>
            </div>
          </div>

          <!-- MÓVIL -->
          <div v-else class="text-center animate__animated animate__fadeIn column items-center q-pt-xl q-mt-xl">
            <!-- Escudo Médico -->
            <div class="row items-center justify-center q-mb-md full-width" style="max-width: 300px;">
              <q-separator class="col-4" color="teal-3" size="2px" />
              <div class="col-3 text-center">
                <q-icon name="health_and_safety" color="teal-4" size="56px" />
              </div>
              <q-separator class="col-4" color="teal-3" size="2px" />
            </div>
            <div class="text-subtitle1 text-grey-8 q-mb-lg text-weight-medium q-px-sm"
              style="line-height: 1.3; max-width: 320px;">
              Gestiona citas, consultas,<br>
              expedientes y seguimiento clínico<br>
              desde un solo lugar.
            </div>
            <q-img src="~assets/doc-welcome.png" style="height: 240px; max-width: 200px;" class="q-mb-xl" fit="contain">
              <template v-slot:error>
                <div class="absolute-full flex flex-center bg-grey-2 text-grey-7" style="border-radius: 12px;">
                  [Ilustración Doctor]
                </div>
              </template>
            </q-img>
            <q-stepper-navigation class="flex justify-center full-width q-px-md q-pb-md q-mb-xl">
              <q-btn @click="$refs.stepper.next()" color="teal" label="Registrarme"
                class="full-width text-weight-bold text-subtitle1" size="lg" rounded no-caps
                style="box-shadow: 0 6px 20px rgba(0,168,150,0.4);" />
            </q-stepper-navigation>
          </div>
        </q-step>


        <!-- PASO 2: Creacion del Perfil -->
        <q-step :name="2" :done="step > 2">

          <!-- DESKTOP -->
          <div v-if="$q.screen.gt.sm" class="row full-height animate__animated animate__fadeIn"
            style="min-height: 80vh;">

            <div class="absolute-top-left q-pa-xl" style="z-index: 10;">
              <q-btn flat no-caps color="teal" @click="$refs.stepper.previous()" class="q-px-sm">
                <div class="row items-center">
                  <q-icon name="arrow_back_ios_new" size="sm" class="q-mr-sm" />
                  <span class="text-h6 text-weight-medium">Volver</span>
                </div>
              </q-btn>
            </div>

            <!-- Izquierda -->
            <div class="col-md-5 flex column justify-center items-start q-pl-xl relative-position"
              style="padding-left: 100px; z-index: 1;">
              <div class="q-mb-lg"> <!-- componente-->
                <AvatarPicker v-model="perfil.foto" />
              </div>

              <div class="text-h3 text-dark q-mb-md" style="font-family: 'Quicksand', sans-serif;">
                Nueva cuenta
              </div>

              <div class="text-subtitle1 text-grey-7 q-mb-xl" style="line-height: 1.4; max-width: 250px;">
                Completa tus datos para crear<br>tu cuenta en DataDoc.
              </div>
            </div>

            <!-- Derecha -->
            <div class="col-md-7 flex column justify-center items-center relative-position" style="z-index: 1;">
              <div style="width: 100%; max-width: 500px;">

                <div class="q-mb-md">
                  <div class="text-teal text-weight-medium q-mb-sm">Nombre completo *</div>
                  <q-input v-model="perfil.nombre" placeholder="Juan Armando Guerra Guevara" outlined class="bg-white"
                    color="teal" :rules="[val => !!val || 'Requerido']" lazy-rules hide-bottom-space dense
                    style="border-radius: 8px;" />
                </div>

                <div class="q-mb-md">
                  <div class="text-teal text-weight-medium q-mb-sm">Nombre de usuario *</div>
                  <q-input v-model="perfil.usuario" placeholder="docjuan" outlined class="bg-white" color="teal"
                    :rules="[val => !!val || 'Requerido', val => /^[a-zA-Z0-9_]+$/.test(val) || 'Letras, números y _']"
                    lazy-rules hide-bottom-space dense style="border-radius: 8px;" />
                </div>

                <div class="q-mb-md">
                  <div class="text-teal text-weight-medium q-mb-sm">Correo Electrónico *</div>
                  <q-input v-model="perfil.correo" placeholder="ejemplo@correo.com" type="email" outlined
                    class="bg-white" color="teal"
                    :rules="[val => !!val || 'Requerido', val => /.+@.+\..+/.test(val) || 'Correo no válido']"
                    lazy-rules hide-bottom-space dense style="border-radius: 8px;" />
                </div>

                <div class="q-mb-md">
                  <div class="text-teal text-weight-medium q-mb-sm">Especialidad</div>
                  <q-input v-model="perfil.especialidad" placeholder="Pediatra" outlined class="bg-white" color="teal"
                    hide-bottom-space dense style="border-radius: 8px;">
                    <template v-slot:append>
                      <q-icon name="keyboard_arrow_down" color="grey-5" size="sm" />
                    </template>
                  </q-input>
                </div>

                <div class="row items-center no-wrap q-mb-lg">
                  <q-checkbox v-model="perfil.aceptaPoliticas" color="teal" size="sm" class="q-mr-sm" />
                  <div class="text-body2 text-grey-8">
                    He leído y acepto las <router-link to="/expediente/politicas-privacidad"
                      class="text-teal text-weight-bold" style="text-decoration: underline;">Políticas de
                      Privacidad</router-link>
                  </div>
                </div>

                <q-btn @click="validarPerfil" color="teal" label="Crear PIN de acceso"
                  class="full-width text-weight-bold" size="lg" rounded no-caps
                  style="box-shadow: 0 4px 15px rgba(0,168,150,0.4);" :disable="!perfil.aceptaPoliticas" />

              </div>
            </div>

          </div>

          <!--MÓVIL-->
          <div v-else
            class="animate__animated animate__fadeIn column items-center full-width q-pb-xl relative-position">
            <div class="absolute-top-left q-pa-md" style="z-index: 10;">
              <q-btn flat no-caps color="teal" @click="$refs.stepper.previous()" class="q-px-sm">
                <div class="row items-center">
                  <q-icon name="arrow_back_ios_new" size="sm" class="q-mr-sm" />
                  <span class="text-subtitle1 text-weight-medium">Volver</span>
                </div>
              </q-btn>
            </div>

            <div class="q-mb-sm q-mt-xl"> <!--componente -->
              <AvatarPicker v-model="perfil.foto" />
            </div>

            <div class="text-h5 text-dark q-mb-lg text-weight-medium" style="font-family: 'Quicksand', sans-serif;">
              Nueva cuenta
            </div>

            <div class="full-width q-px-sm q-mt-md">
              <q-input v-model="perfil.nombre" label="Nombre completo *" outlined class="q-mb-sm custom-input bg-white"
                color="teal" :rules="[val => !!val || 'Requerido']" lazy-rules hide-bottom-space />

              <q-input v-model="perfil.usuario" label="Nombre de usuario *" outlined
                class="q-mb-sm custom-input bg-white" color="teal"
                :rules="[val => !!val || 'Requerido', val => /^[a-zA-Z0-9_]+$/.test(val) || 'Letras, números y _']"
                lazy-rules hide-bottom-space />

              <q-input v-model="perfil.correo" label="Correo Electrónico *" type="email" outlined
                class="q-mb-sm custom-input bg-white" color="teal"
                :rules="[val => !!val || 'Requerido', val => /.+@.+\..+/.test(val) || 'Correo no válido']" lazy-rules
                hide-bottom-space />

              <q-input v-model="perfil.especialidad" label="Especialidad" outlined class="q-mb-sm custom-input bg-white"
                color="teal" hide-bottom-space />
            </div>

            <div class="full-width q-px-md q-mb-md flex justify-start">
              <div class="row items-center no-wrap">
                <q-checkbox v-model="perfil.aceptaPoliticas" color="teal" size="sm" class="q-mr-xs" />
                <div class="text-caption text-grey-8" style="line-height: 1.2;">
                  He leído y acepto las
                  <router-link to="/expediente/politicas-privacidad" class="text-teal text-weight-bold"
                    style="text-decoration: underline;">
                    Políticas de Privacidad
                  </router-link>
                </div>
              </div>
            </div>

            <div class="full-width flex justify-center q-mb-xl">
              <q-btn @click="validarPerfil" color="teal" label="Crear PIN de acceso" class="text-weight-bold full-width"
                size="lg" rounded no-caps style="box-shadow: 0 4px 15px rgba(0,168,150,0.4);"
                :disable="!perfil.aceptaPoliticas" />
            </div>
          </div>
        </q-step>
        <!-- PASO 3: Definición de PIN -->
        <q-step :name="3" :done="step > 3">
          <!-- DESKTOP -->
          <div v-if="$q.screen.gt.sm" class="row full-height animate__animated animate__fadeIn"
            style="min-height: 80vh;">

            <div class="absolute-top-left q-pa-xl" style="z-index: 10;">
              <q-btn flat no-caps color="teal" @click="retrocederPin" class="q-px-sm">
                <div class="row items-center">
                  <q-icon name="arrow_back_ios_new" size="sm" class="q-mr-sm" />
                  <span class="text-h6 text-weight-medium">Volver</span>
                </div>
              </q-btn>
            </div>

            <div class="col-12 flex column justify-center items-center relative-position" style="z-index: 1;">
              <div class="text-center" style="max-width: 450px; width: 100%;">

                <div class="flex flex-center q-mb-md">
                  <q-avatar size="80px" color="teal-1" text-color="teal">
                    <q-icon name="lock_outline" size="40px" />
                  </q-avatar>
                </div>

                <div class="text-h3 text-dark q-mb-sm text-weight-bold" style="font-family: 'Quicksand', sans-serif;">
                  {{ confirmandoPin ? 'Confirmar PIN' : 'Crear PIN' }}
                </div>

                <div class="flex flex-center q-mb-md">
                  <q-separator color="teal" size="3px" style="width: 50px; border-radius: 2px;" />
                </div>

                <div class="text-subtitle1 text-grey-7 q-mb-xl"
                  style="line-height: 1.4; max-width: 320px; margin: 0 auto;">
                  <span v-if="confirmandoPin">
                    Ingresa nuevamente el PIN para verificarlo.
                  </span>
                  <span v-else>
                    Este PIN será requerido cada vez que abras la aplicación.
                  </span>
                </div>

                <div class="flex flex-center q-mb-lg">
                  <PinInput ref="pinInputRef" @complete="manejarIngresoPin" />
                </div>

                <div v-if="errorPin" class="text-negative text-subtitle2 q-mt-md animate__animated animate__shakeX">
                  {{ errorPin }}
                </div>
              </div>
            </div>
          </div>

          <!-- MÓVIL -->
          <div v-else class="animate__animated animate__fadeIn column items-center full-width q-pb-xl relative-position"
            style="min-height: 60vh; justify-content: center;">
            <div class="absolute-top-left q-pa-md" style="z-index: 10;">
              <q-btn flat no-caps color="teal" @click="retrocederPin" class="q-px-sm">
                <div class="row items-center">
                  <q-icon name="arrow_back_ios_new" size="sm" class="q-mr-sm" />
                  <span class="text-subtitle1 text-weight-medium">Volver</span>
                </div>
              </q-btn>
            </div>

            <div class="text-center full-width q-mt-xl">
              <div class="flex flex-center q-mb-md">
                <q-avatar size="64px" color="teal-1" text-color="teal">
                  <q-icon name="lock_outline" size="32px" />
                </q-avatar>
              </div>

              <div class="text-h4 text-dark q-mb-sm text-weight-bold" style="font-family: 'Quicksand', sans-serif;">
                {{ confirmandoPin ? 'Confirmar PIN' : 'Crear PIN' }}
              </div>

              <div class="flex flex-center q-mb-md">
                <q-separator color="teal" size="3px" style="width: 40px; border-radius: 2px;" />
              </div>

              <div class="text-body1 text-grey-7 q-mb-xl q-px-md"
                style="line-height: 1.4; max-width: 300px; margin: 0 auto;">
                <span v-if="confirmandoPin">
                  Ingresa nuevamente el PIN para verificarlo.
                </span>
                <span v-else>
                  Este PIN será requerido cada vez que abras la aplicación.
                </span>
              </div>

              <div class="flex flex-center q-mb-lg">
                <PinInput ref="pinInputRef" @complete="manejarIngresoPin" />
              </div>

              <div v-if="errorPin" class="text-negative text-body2 q-mt-md animate__animated animate__shakeX">
                {{ errorPin }}
              </div>
            </div>
          </div>
        </q-step>

        <!-- PASO 4: Respaldo -->
        <q-step :name="4">
          <!-- DESKTOP -->
          <div v-if="$q.screen.gt.sm" class="row full-height animate__animated animate__fadeIn"
            style="min-height: 80vh;">

            <div class="absolute-top-left q-pa-xl" style="z-index: 10;">
              <q-btn flat no-caps color="teal" @click="$refs.stepper.previous()" class="q-px-sm">
                <div class="row items-center">
                  <q-icon name="arrow_back_ios_new" size="sm" class="q-mr-sm" />
                  <span class="text-h6 text-weight-medium">Volver</span>
                </div>
              </q-btn>
            </div>

            <div class="col-md-5 flex column justify-center items-start q-pl-xl relative-position"
              style="padding-left: 100px; z-index: 1;">
              <div class="text-h3 text-dark q-mb-md" style="font-family: 'Quicksand', sans-serif;">
                Respaldo de Seguridad
              </div>
              <div class="text-subtitle1 text-grey-7 q-mb-xl" style="line-height: 1.4; max-width: 350px;">
                En caso de olvidar tu PIN, estas preguntas te permitirán recuperar el acceso de forma local de manera
                segura.
              </div>
            </div>

            <div class="col-md-7 flex column justify-center items-center relative-position" style="z-index: 1;">
              <div style="width: 100%; max-width: 500px;">
                <div v-for="(item, index) in preguntasRespaldo" :key="index" class="q-mb-lg">
                  <div class="text-teal text-weight-medium q-mb-sm">Pregunta {{ index + 1 }}</div>
                  <q-select v-model="item.pregunta" :options="opcionesPreguntas" label="Selecciona una pregunta"
                    outlined class="bg-white q-mb-sm custom-input" color="teal" emit-value map-options dense
                    style="border-radius: 8px;" />
                  <q-input v-model="item.respuesta" label="Tu respuesta" outlined class="bg-white custom-input"
                    color="teal" dense style="border-radius: 8px;" />
                </div>

                <q-btn @click="finalizarRegistro" color="teal" label="Finalizar y Entrar"
                  class="full-width text-weight-bold q-mt-md" size="lg" rounded no-caps
                  style="box-shadow: 0 4px 15px rgba(0,168,150,0.4);" :disable="!preguntasValidas" />
              </div>
            </div>
          </div>

          <!-- MÓVIL -->
          <div v-else
            class="animate__animated animate__fadeIn column items-center full-width q-pb-xl relative-position">
            <div class="absolute-top-left q-pa-md" style="z-index: 10;">
              <q-btn flat no-caps color="teal" @click="$refs.stepper.previous()" class="q-px-sm">
                <div class="row items-center">
                  <q-icon name="arrow_back_ios_new" size="sm" class="q-mr-sm" />
                  <span class="text-subtitle1 text-weight-medium">Volver</span>
                </div>
              </q-btn>
            </div>

            <div class="text-h5 text-dark q-mb-sm text-weight-medium text-center q-mt-xl"
              style="font-family: 'Quicksand', sans-serif;">
              Respaldo
            </div>

            <div class="text-body2 text-grey-7 q-mb-lg text-center q-px-md" style="line-height: 1.4;">
              En caso de olvidar tu PIN, estas preguntas te permitirán recuperar el acceso.
            </div>

            <div class="full-width q-px-sm">
              <div v-for="(item, index) in preguntasRespaldo" :key="index" class="q-mb-md bg-white q-pa-md shadow-1"
                style="border-radius: 12px;">
                <q-select v-model="item.pregunta" :options="opcionesPreguntas" label="Selecciona una pregunta" outlined
                  class="q-mb-sm custom-input" color="teal" emit-value map-options dense />
                <q-input v-model="item.respuesta" label="Tu respuesta" outlined class="custom-input" color="teal"
                  dense />
              </div>
            </div>

            <div class="full-width flex justify-center q-mt-md q-mb-xl q-px-sm">
              <q-btn @click="finalizarRegistro" color="teal" label="Finalizar y Entrar"
                class="text-weight-bold full-width" size="lg" rounded no-caps
                style="box-shadow: 0 4px 15px rgba(0,168,150,0.4);" :disable="!preguntasValidas" />
            </div>
          </div>
        </q-step>
      </q-stepper>
    </div>
  </q-page>
</template>

<script setup>
import { useAuthRegistro } from 'src/services/auth/useAuthRegistro';
import AvatarPicker from 'src/components/AvatarPicker.vue'; //Componente para el perfil
import PinInput from 'src/components/auth/PinInput.vue';

const {
  step,
  stepper,
  perfil,
  validarPerfil,
  pinInputRef,
  confirmandoPin,
  errorPin,
  manejarIngresoPin,
  retrocederPin,
  opcionesPreguntas,
  preguntasRespaldo,
  preguntasValidas,
  finalizarRegistro
} = useAuthRegistro();
</script>

<style scoped>
.bg-medical-gradient {
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f5f5 100%);
  min-height: 100vh;
}

:deep(.q-stepper__header) {
  display: none !important;
}

:deep(.q-stepper__dot) {
  font-weight: bold;
}

:deep(.q-stepper__step-inner) {
  padding-top: 4px;
}

:deep(.custom-input .q-field__control) {
  border-radius: 12px;
}

:deep(.custom-input .q-field__control:before) {
  border: none !important;
}

:deep(.custom-input .q-field__control:after) {
  border: none !important;
}

:deep(input::placeholder) {
  color: #b0b0b0 !important;
  opacity: 0.7 !important;
  font-weight: 300;
}
</style>
