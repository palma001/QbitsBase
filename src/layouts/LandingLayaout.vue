<template>
  <div class="q-pa-none">
    <q-layout view="hHh Lpr lff">
      <q-header :class="`${classToolbar}`" :style="style">
        <q-toolbar class="text-dark">
          <q-toolbar-title :class="classButton">
            <img src="/icons/logo-2.png" class="q-mt-sm" style="width: 130px;"/>
            <!--<q-btn stretch flat round @click="show = !show" icon="menu" v-if="$q.screen.lt.sm" :class="classButton"/>
            -->
            <!-- Transporte JR&LS-->
          </q-toolbar-title>
          <q-space />
          <div v-if="!$q.screen.lt.sm" class="q-gutter-x-lg">
            <q-btn stretch flat dense label="Home" :class="classButton" v-scroll-to="'#home'"/>
            <q-btn stretch flat dense label="Servicios" :class="classButton" v-scroll-to="'#services'"/>
            <q-btn stretch flat dense label="Contáctanos" :class="classButton" v-scroll-to="'#contactus'"/>
          </div>
          <div class="q-ml-xs q-gutter-x-lg">
            <q-btn stretch flat dense icon="person" :class="classButton" v-if="!GET_USER">
              <q-popup-proxy style="width: 400px;">
                <q-card class="my-card" style="width: 400px;">
                  <q-card-section>
                    <div class="text-h6 text-primary">Iniciar Sesión</div>
                  </q-card-section>
                  <q-separator></q-separator>
                  <q-card-section>
                    <q-input
                      v-model="email"
                      label="Usuario"
                      dense
                      ref="username"
                      @keyup.enter.native="login"
                      :rules="[val => !!val || 'El campo es requerido.']"
                    />
                  </q-card-section>
                  <q-card-section class="q-pt-none">
                    <q-input
                      v-model="password"
                      label="Clave"
                      dense
                      type="password"
                      ref="password"
                      @keyup.enter.native="login"
                      :rules="[val => !!val || 'El campo es requerido.']"
                    />
                  </q-card-section>
                  <q-card-actions align="around">
                    <q-btn flat color="negative" class="q-ml-xs">Recuperar Clave</q-btn>
                    <q-space />
                    <q-btn flat color="primary" @click="login">Iniciar Sesion</q-btn>
                  </q-card-actions>
                </q-card>
              </q-popup-proxy>
            </q-btn>
            <q-btn label="Administrativo" dense stretch flat :class="classButton" @click="$router.push({ 'name': 'NewShipment'})" v-else/>
          </div>
        </q-toolbar>
      </q-header>
      <drawer-landing :show="show" v-if="$q.screen.lt.sm || show"/>
      <q-page-container>
        <router-view />
        <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
          <q-btn fab icon="keyboard_arrow_up" color="primary" />
        </q-page-scroller>
      </q-page-container>
      <q-scroll-observer @scroll="onScroll" @login="eventLogin"/>
    </q-layout>
  </div>
</template>
<script>
import DrawerLanding from '../components/DrawerLanding'
import { mapActions, mapGetters } from 'vuex'
import { ACTIONS, GETTERS } from '../store/module-login/name.js'
export default {
  components: {
    DrawerLanding
  },
  data () {
    return {
      show: false,
      classToolbar: '',
      classButton: '',
      style: '',
      hoverButtonWork: false,
      hoverButtonContactus: false,
      name: '',
      email: '',
      password: ''
    }
  },
  computed: {
    /**
     * Getters Vuex
     */
    ...mapGetters([GETTERS.GET_USER])
  },
  methods: {
    eventLogin (data) {
      this.email = data.email
      this.password = data.password
      this.login()
    },
    onScroll (data) {
      switch (true) {
        case data.position > 100:
          this.classToolbar = 'q-pa-none'
          this.style = 'background: rgba(29, 29, 29, 0.6)'
          this.classButton = 'text-white q-ml-md'
          break
        case data.position < 100:
          this.classToolbar = 'bg-transparent'
          this.classButton = 'text-white q-ml-md'
          this.style = ''
          break
        default:
          break
      }
    },
    /**
     * Login app
     */
    async login () {
      this.$refs.username.validate()
      this.$refs.password.validate()
      if (this.$refs.username.hasError || this.$refs.password.hasError) {
        this.formHasError = true
      } else {
        await this[ACTIONS.LOGIN](
          {
            self: this,
            route: ['authentication', 'login'],
            param: {
              username: this.email,
              password: this.password
            }
          }
        )
      }
    },
    ...mapActions([ACTIONS.LOGIN])
  }
}
</script>
<style>
  .bg-transparent {
    background-color: rgba(255, 0, 0, 0.5)
  }
  .q-body--prevent-scroll {
    position: relative !important;
  }
  .logo {
    width: 200px;
  }
</style>
