<template>
  <q-page class="bg-grey-2 q-pa-md">

    <div class="row q-col-gutter-md">

      <div class="col-12 col-md-3">
        <div class="bg-white rounded-borders q-pa-md shadow-soft columna-izquierda">

          <q-input
            v-model="search"
            label="Buscar paciente"
            dense
            outlined
            color="teal"
            class="q-mb-md input-buscador"
          >
            <template v-slot:prepend>
              <q-icon name="search" color="teal-6" />
            </template>
          </q-input>

          <q-list
            v-if="search.length > 0"
            bordered
            separator
            class="lista-pacientes rounded-borders"
          >
            <q-item
              v-for="paciente in filteredPacientes"
              :key="paciente.id"
              clickable
              v-ripple
              @click="selectPaciente(paciente)"
              class="paciente-item"
            >
              <q-item-section avatar>
                <q-img
                  :src="getAvatar(paciente)"
                  style="width: 40px; height: 40px; border-radius: 50%;"
                />
              </q-item-section>

              <q-item-section class="text-weight-medium text-grey-9">
                {{ paciente.nombre }}
              </q-item-section>
            </q-item>
          </q-list>

          <div v-else class="empty-state">
            <q-img
              src="/src/assets/buscandopacientes.png"
              class="empty-img"
            />
            <div class="text-teal-8 text-weight-medium text-center q-mt-md">
              Busca tu paciente
            </div>
            <div class="text-grey-6 text-center text-caption q-mt-xs">
              Ingresa el nombre para comenzar
            </div>
          </div>

          <q-list no-border class="menu-medico-container shadow-1">

            <q-item clickable v-ripple @click="goTo('consultas')" class="menu-item">
              <q-item-section avatar>
                <q-icon name="medical_services" size="26px" />
              </q-item-section>
              <q-item-section class="text-label">Consultas</q-item-section>
            </q-item>

            <q-item clickable v-ripple @click="goTo('resumen')" class="menu-item">
              <q-item-section avatar>
                <q-icon name="auto_stories" size="26px" />
              </q-item-section>
              <q-item-section class="text-label">Resumen Clínico</q-item-section>
            </q-item>

            <q-item clickable v-ripple @click="goTo('recetas')" class="menu-item">
              <q-item-section avatar>
                <q-icon name="post_add" size="26px" />
              </q-item-section>
              <q-item-section class="text-label">Recetas</q-item-section>
            </q-item>

            <q-item clickable v-ripple @click="goTo('examenes')" class="menu-item">
              <q-item-section avatar>
                <q-icon name="feed" size="26px" />
              </q-item-section>
              <q-item-section class="text-label">Exámenes</q-item-section>
            </q-item>

          </q-list>

        </div>
      </div>

      <div class="col-12 col-md-9">
        <transition name="fade" mode="out-in">
          
          <q-card v-if="pacienteSeleccionado" class="paciente-card shadow-soft" key="paciente">
            
            <q-card-section class="profile-header text-white row items-center q-pa-lg">
              <q-avatar size="80px" class="shadow-2 bg-white">
                <img :src="getAvatar(pacienteSeleccionado)" />
              </q-avatar>
              
              <div class="q-ml-lg header-text">
                <div class="text-h5 text-weight-bold">{{ pacienteSeleccionado.nombre }}</div>
                <div class="text-subtitle1 opacity-80 flex items-center">
                  <q-icon name="cake" class="q-mr-sm" /> {{ pacienteSeleccionado.edad }} años
                </div>
              </div>
              
              <q-space />
              
              <q-btn
                color="white"
                text-color="teal-9"
                icon="folder_open"
                label="Ver Expediente"
                class="btn-expediente text-weight-bold q-px-md shadow-2"
                rounded
                unelevated
                @click="verExpediente(pacienteSeleccionado)"
              />
            </q-card-section>

            <q-card-section class="q-pa-lg bg-white">
              <div class="text-h6 text-teal-9 q-mb-md flex items-center">
                <q-icon name="contact_page" color="teal-6" class="q-mr-sm" size="sm" />
                Información de Contacto
              </div>

              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6" v-if="pacienteSeleccionado.cedula">
                  <q-item class="info-item rounded-borders">
                    <q-item-section avatar>
                      <q-avatar color="teal-1" text-color="teal-8" icon="badge" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption>Cédula / Documento</q-item-label>
                      <q-item-label class="text-body1 text-weight-medium text-dark">
                        {{ pacienteSeleccionado.cedula }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </div>

                <div class="col-12 col-sm-6" v-if="pacienteSeleccionado.telefono">
                  <q-item class="info-item rounded-borders">
                    <q-item-section avatar>
                      <q-avatar color="teal-1" text-color="teal-8" icon="phone" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption>Teléfono</q-item-label>
                      <q-item-label class="text-body1 text-weight-medium text-dark">
                        {{ pacienteSeleccionado.telefono }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </div>

                <div class="col-12" v-if="pacienteSeleccionado.direccion">
                  <q-item class="info-item rounded-borders">
                    <q-item-section avatar>
                      <q-avatar color="teal-1" text-color="teal-8" icon="location_on" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption>Dirección</q-item-label>
                      <q-item-label class="text-body1 text-weight-medium text-dark">
                        {{ pacienteSeleccionado.direccion }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </div>
              </div>
            </q-card-section>
          </q-card>

          <q-card v-else class="empty-state-card shadow-1 flex flex-center" key="vacio">
            <q-card-section class="text-center q-pa-xl">
               <q-img src="/src/assets/doctor.png" class="empty-img-form q-mb-md" />
              <div class="text-h5 text-weight-medium text-teal-9">Ningún paciente seleccionado</div>
              <div class="text-body1 text-grey-6 q-mt-sm">
                Por favor, selecciona un paciente de la lista para ver su información y acceder a su expediente.
              </div>
            </q-card-section>
          </q-card>

        </transition>
      </div>

    </div>
  </q-page>
</template>

<script>
import examenesService from '../services/examenes.service.js'
import '../css/examenesStyle.css'
export default examenesService
</script>