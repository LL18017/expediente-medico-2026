<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { userAuth } from "src/composable/userAuth";
const { loadUser, user } = userAuth();

const router = useRouter();
const $q = useQuasar();
const leftDrawerOpen = ref(false);

const toggleDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
const goTo = (route) => {
  router.push(route);
};
onMounted(() => {
  loadUser();
});
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <!--  HEADER -->
    <q-header elevated class="bg-teal text-white">
      <q-toolbar>
        <!-- LOGO ESCRITORIO (Izquierda) -->
        <q-toolbar-title
          v-if="$q.screen.gt.sm"
          shrink
          class="text-white q-mr-xl"
        >
          <div
            clickable
            @click="goTo('/expediente')"
            style="
              font-family: &quot;Comfortaa&quot;, cursive;
              font-size: 1.5rem;
              letter-spacing: -1px;
            "
          >
            <span class="text-weight-bolder">Data</span
            ><span class="text-weight-light">Doc</span>
          </div>
        </q-toolbar-title>

        <!--  MOBILE: botón menú -->
        <q-btn
          v-if="$q.screen.lt.md"
          flat
          round
          icon="menu"
          @click="toggleDrawer"
        />

        <!--  LOGO CENTRAL EN MÓVIL -->
        <q-toolbar-title v-if="$q.screen.lt.md" class="absolute-center">
          <div
            class="text-white"
            style="
              font-family: &quot;Comfortaa&quot;, cursive;
              font-size: 1.5rem;
              letter-spacing: -1px;
            "
          >
            <span class="text-weight-bolder">Data</span
            ><span class="text-weight-light">Doc</span>
          </div>
        </q-toolbar-title>

        <q-space />

        <!-- Notificaciones -->
        <q-btn flat round icon="notifications" />

        <!-- Avatar + menú -->
        <q-btn v-if="$q.screen.gt.sm" flat round>
          <q-avatar size="32px">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVyUST5ZFd-LKYvc9xN7zIyNk3zgMCdTXL2Q&s"
            />
          </q-avatar>

          <!-- Dropdown -->
          <q-menu>
            <q-list style="min-width: 200px">
              <q-item>
                <q-item-section>
                  <div class="text-weight-regular">{{ user?.nombre }}</div>
                </q-item-section>
              </q-item>

              <q-separator />

              <q-item
                clickable
                @click="goTo('/expediente/politicas-privacidad')"
              >
                <q-item-section avatar>
                  <q-icon name="policy" />
                </q-item-section>
                <q-item-section>Política y Privacidad</q-item-section>
              </q-item>

              <q-item clickable @click="goTo('/expediente/desarrolladores')">
                <q-item-section avatar>
                  <q-icon name="code" />
                </q-item-section>
                <q-item-section>Desarrolladores</q-item-section>
              </q-item>

              <q-item clickable @click="goTo('/expediente/desarrolladores')">
                <q-item-section avatar>
                  <q-icon name="help" />
                </q-item-section>
                <q-item-section>Ayuda</q-item-section>
              </q-item>
              <q-item clickable @click="goTo('/expediente/backup')">
                <q-item-section avatar>
                  <q-icon name="backup" />
                </q-item-section>
                <q-item-section>Respaldos</q-item-section>
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

    <!-- DRAWER solo móvil -->
    <q-drawer v-if="$q.screen.lt.md" v-model="leftDrawerOpen" overlay>
      <q-list>
        <!-- PERFIL -->
        <q-item-section avatar class="bg-teal-5 perfil">
          <q-avatar size="80px">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVyUST5ZFd-LKYvc9xN7zIyNk3zgMCdTXL2Q&s"
            />
          </q-avatar>
          <div class="text-h6 text-center">{{ user?.nombre }}</div>
          <div class="text-caption">Bienvenido</div>
        </q-item-section>

        <!-- MENÚ -->
        <q-item
          clickable
          @click="goTo('/expediente')"
          class="text-teal text-center text-subtitle1 text-weight-regular"
        >
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>Inicio</q-item-section>
        </q-item>
        <q-item
          clickable
          @click="goTo('/expediente/politicas-privacidad')"
          class="text-teal text-center text-subtitle1 text-weight-regular"
        >
          <q-item-section avatar>
            <q-icon name="policy" />
          </q-item-section>
          <q-item-section>Política y Privacidad</q-item-section>
        </q-item>

        <q-item
          clickable
          @click="goTo('/expediente/desarrolladores')"
          class="text-teal text-center text-subtitle1 text-weight-regular"
        >
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>Desarrolladores</q-item-section>
        </q-item>

        <q-item
          clickable
          @click="goTo('/expediente/desarrolladores')"
          class="text-teal text-center text-subtitle1 text-weight-regular"
        >
          <q-item-section avatar>
            <q-icon name="help" />
          </q-item-section>
          <q-item-section class="text-teal text-weight-regular"
            >Ayuda</q-item-section
          >
        </q-item>

        <q-item
          clickable
          @click="goTo('/expediente/backup')"
          class="text-teal text-center text-subtitle1 text-weight-regular"
        >
          <q-item-section avatar>
            <q-icon name="help" />
          </q-item-section>
          <q-item-section class="text-teal text-weight-regular"
            >Respaldos</q-item-section
          >
        </q-item>

        <q-item
          clickable
          @click="goTo('/expediente/clinicas')"
          class="text-teal text-center text-subtitle1 text-weight-regular"
        >
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section class="text-teal text-weight-regular"
            >Clínicas</q-item-section
          >
        </q-item>
        <q-separator />

        <q-item
          clickable
          @click="goTo('/')"
          class="text-teal text-center text-subtitle1 text-weight-regular"
        >
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section class="text-teal text-weight-regular"
            >Cerrar Sesión</q-item-section
          >
        </q-item>
        <q-separator />
      </q-list>
    </q-drawer>

    <!-- CONTENIDO -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.tabs-desktop {
  /*margin-left: 200px;*/
}

.nav-icosn {
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-icosn > * {
  width: auto;
}

/* Espacio interno (más ancho cada tab) */
.tab-item {
  padding-left: 32px;
  padding-right: 32px;
}

/* Separación entre tabs */
.tab-item:not(:last-child) {
  margin-right: 16px;
}

.perfil {
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media (max-width: 1200px) {
  .tabs-desktop {
    margin-left: 50px;
  }
}
</style>
>>>>>>> Stashed changes
