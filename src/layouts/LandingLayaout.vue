<template>
  <div class="q-pa-none">
    <q-layout view="lHh Lpr lFf">
      <q-header :class="`${classToolbar}`">
        <q-toolbar class="text-dark">
          <q-toolbar-title :class="classButton">
            Transporte JR&LS
          </q-toolbar-title>
          <q-space />
          <q-btn stretch flat label="Home" :class="classButton" v-scroll-to="'#home'"/>
          <q-btn stretch flat label="Servicios" :class="classButton" v-scroll-to="'#services'"/>
          <q-btn stretch flat label="Contáctanos" :class="classButton" v-scroll-to="'#contactus'"/>
          <q-btn stretch flat icon="person" :class="classButton">
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
                <q-card-section>
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
        </q-toolbar>
      </q-header>
      <q-page-container>
        <router-view />
        <!-- place QPageScroller at end of page -->
        <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
          <q-btn fab icon="keyboard_arrow_up" color="primary" />
        </q-page-scroller>
      </q-page-container>
      <q-scroll-observer @scroll="onScroll" />
    </q-layout>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { ACTIONS } from '../store/module-login/name.js'
export default {
  data () {
    return {
      classToolbar: '',
      classButton: '',
      hoverButtonWork: false,
      hoverButtonContactus: false,
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    onScroll (data) {
      switch (true) {
        case data.position > 100:
          this.classToolbar = 'bg-white q-pa-sm'
          this.classButton = 'text-dark'
          break
        case data.position < 100:
          this.classToolbar = 'bg-transparent q-pa-lg'
          this.classButton = 'text-white'
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
</style>
