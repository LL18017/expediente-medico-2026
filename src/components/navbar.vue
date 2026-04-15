<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const router = useRouter()
const $q = useQuasar()
const leftDrawerOpen = ref(false)

const toggleDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
const goTo = (route) => {
  router.push(route)
}
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <!-- 🔝 HEADER -->
    <q-header elevated class="bg-teal text-white">
      <q-toolbar>

        <!-- 📱 MOBILE: botón menú -->
        <q-btn
          v-if="$q.screen.lt.md"
          flat
          round
          icon="menu"
          @click="toggleDrawer"
        />

        <!-- 🖥️ DESKTOP: menú horizontal -->
        <q-tabs
          v-if="$q.screen.gt.sm"
          align="left"
          dense
          class="text-white"
        >
          <q-tab name="inicio" label="Inicio" @click="goTo('/expediente')"/>
          <q-tab name="consultas" label="Consultas" @click="goTo('/expediente/consultas')"/>
          <q-tab name="pacientes" label="Pacientes" @click="goTo('/expediente/pacientes')" />
          <q-tab name="404" label="404" @click="goTo('/expediente/55sdsdads')"/>
          <q-tab name="expediente" label="Mi Expediente" @click="goTo('/expediente')" />
        </q-tabs>

        <q-space />

        <!-- 🔔 Notificaciones -->
        <q-btn flat round icon="notifications" />

        <!-- 👤 Avatar + menú -->
        <q-btn flat round>
          <q-avatar size="32px">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVyUST5ZFd-LKYvc9xN7zIyNk3zgMCdTXL2Q&s"/>
          </q-avatar>

          <!-- Dropdown -->
          <q-menu>
            <q-list style="min-width: 200px">

              <q-item>
                <q-item-section>
                  <div class="text-weight-bold">Chepe</div>
                </q-item-section>
              </q-item>

              <q-separator />

              <q-item clickable @click="goTo('/expediente/politicas-privacidad')">
                <q-item-section avatar>
                  <q-icon name="policy" />
                </q-item-section>
                <q-item-section>Política y Privacidad</q-item-section>
              </q-item>

              <q-item clickable @click="goTo('/expediente/desarrolladores')">
                <q-item-section avatar >
                  <q-icon name="code" />
                </q-item-section>
                <q-item-section>Desarrolladores</q-item-section>
              </q-item>

              <q-item clickable  @click="goTo('/expediente/desarrolladores')">
                <q-item-section avatar>
                  <q-icon name="help" />
                </q-item-section>
                <q-item-section>Ayuda</q-item-section>
              </q-item>

              <q-separator />

              <q-item clickable @click="goTo('/')">
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>
                <q-item-section>Cerrar sesión</q-item-section>
              </q-item>

            </q-list>
          </q-menu>
        </q-btn>

      </q-toolbar>
    </q-header>

    <!-- 📱 DRAWER solo móvil -->
    <q-drawer
      v-if="$q.screen.lt.md"
      v-model="leftDrawerOpen"
      overlay
    >
      <q-list>
        <q-item clickable>
          <q-item-section class="text-teal">
          Inicio
          </q-item-section>
        </q-item>
        <q-item clickable class="text-teal">
          <q-item-section>Consultas</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- 📄 CONTENIDO -->
    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>