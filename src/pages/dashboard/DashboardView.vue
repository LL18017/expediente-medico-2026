<template>
  <q-page class="q-pa-sm full-height">
    <div class="dashboard-header">
      <!-- IZQUIERDA -->
      <div class="header-left">
        <q-avatar size="56px" class="shadow-2">
          <img src="~assets/avatar-doctor.png" />
        </q-avatar>

        <div class="header-text">
          <div class="text-h6 text-weight-medium">Bienvenido de nuevo</div>

          <div class="text-caption text-grey-7">
            Resumen del expediente clínico
          </div>

          <div class="text-caption text-grey-5">
            {{ today }}
          </div>
        </div>
      </div>

      <!-- DERECHA -->
      <div class="header-actions">
        <q-btn
          unelevated
          color="primary"
          icon="person_add"
          label="Paciente"
          class="btn-soft"
        />

        <q-btn
          unelevated
          color="teal"
          icon="medical_services"
          label="Consulta"
          class="btn-soft"
        />
      </div>
    </div>

    <!-- GRID -->
    <div class="grid">
      <!-- IZQUIERDA -->
      <div class="card-info">
        <!-- PACIENTES -->
        <q-card clickable @click="$router.push('/expediente/pacientes')">
          <q-card-section class="row items-center justify-between">
            <div class="row items-center">
              <q-icon
                name="people"
                size="28px"
                color="primary"
                class="q-mr-sm"
              />

              <div>
                <div class="text-caption text-grey">Pacientes activos</div>

                <div class="text-h6">
                  {{ totalPactient }}
                </div>
              </div>
            </div>

            <q-icon name="arrow_forward_ios" size="20px" color="grey-5" />
          </q-card-section>
        </q-card>

        <!-- CONSULTAS -->
        <q-card clickable @click="$router.push('/expediente/consultas')">
          <q-card-section class="row items-center justify-between">
            <div class="row items-center">
              <q-icon
                name="event_note"
                size="28px"
                color="teal"
                class="q-mr-sm"
              />

              <div>
                <div class="text-caption text-grey">Consultas hoy</div>

                <div class="text-h6">
                  {{ totalConsultas }}
                </div>
              </div>
            </div>

            <q-icon name="arrow_forward_ios" size="20px" color="grey-5" />
          </q-card-section>
        </q-card>

        <!-- RECETAS -->
        <q-card clickable @click="$router.push('/expediente/recetas')">
          <q-card-section class="row items-center justify-between">
            <div class="row items-center">
              <q-icon
                name="local_pharmacy"
                size="28px"
                color="amber"
                class="q-mr-sm"
              />

              <div>
                <div class="text-caption text-grey">Recetas hoy</div>

                <div class="text-h6">
                  {{ totalRecetas }}
                </div>
              </div>
            </div>

            <q-icon name="arrow_forward_ios" size="20px" color="grey-5" />
          </q-card-section>
        </q-card>

        <!-- CLINICAS -->
        <q-card clickable @click="$router.push('/expediente/clinicas')">
          <q-card-section class="row items-center justify-between">
            <div class="row items-center">
              <q-icon name="home" size="28px" color="purple" class="q-mr-sm" />

              <div>
                <div class="text-caption text-grey">Total de clínicas</div>

                <div class="text-h6">
                  {{ totalclinicas }}
                </div>
              </div>
            </div>

            <q-icon name="arrow_forward_ios" size="20px" color="grey-5" />
          </q-card-section>
        </q-card>

        <!-- GRÁFICA -->
        <div class="card-grafic">
          <q-card>
            <q-card-section>
              <div class="text-subtitle1">Pacientes atendidos</div>

              <div class="text-caption text-grey">Últimos 30 días</div>
            </q-card-section>

            <q-separator />

            <q-card-section style="height: 340px; width: 100%">
              <canvas ref="chartRef"></canvas>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- DERECHA -->
      <div class="card-list">
        <q-card class="dashboard-card">
          <q-card-section class="column fit">
            <div class="text-subtitle1 q-mb-sm">Últimas citas</div>

            <q-list bordered class="lista-scroll">
              <q-item v-for="(c, i) in proximasCitas" :key="i">
                <q-item-section avatar>
                  <q-avatar color="grey-3">
                    <q-icon name="event" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>
                    {{ c.paciente }}
                  </q-item-label>

                  <q-item-label caption>
                    {{ c.fecha }}
                  </q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-btn dense flat color="primary" label="Ver" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import "./DashboardView.css";

import useDashboard from "./DashboardView";

const {
  today,
  chartRef,
  totalPactient,
  totalConsultas,
  totalRecetas,
  totalclinicas,
  proximasCitas,
} = useDashboard();
</script>
