<template>
  <div class="body">
    <!-- <div class="row justify-center container-logo">
      <div class="col-md-5 col-xl-4 col-lg-5 col-sm-10 col-xs-10 offset-sm-2 offset-lg-1 offset-xl-2 offset-md-1" style="position: relative;">
      </div>
    </div> -->
    <div class="row justify-center q-mt-lg">
      <div class="col-12">
        <q-card flat class="my-card q-pa-none" style="background-color: transparent !important;">
          <q-card-section class="text-center q-pa-none">
            <img src="icons/Monteverde-svg.svg" class="img">
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xl-3 col-lg-4 col-md-4 col-sm-5 col-xs-11 q-mt-md">
        <q-card class="my-card">
          <q-card-section class="bg-teal glossy text-white">
            <div class="text-h6">Iniciar sesión</div>
          </q-card-section>
          <q-card-section>
            <q-input
              class="q-mt-lg"
              color="primary"
              v-model="usuario"
              label="Email"
              ref="username"
              name="username"
              outlined
              dense
              @keyup.enter.native="login"
              :rules="[val => !!val || 'El campo es requerido.']">
              <template v-slot:prepend>
                <q-icon name="email" />
              </template>
            </q-input>
            <q-input
              class="q-mt-md"
              color="primary"
              v-model="password"
              label="Contraseña"
              ref="password"
              name="password"
              type="password"
              outlined
              dense
              @keyup.enter.native="login"
              :rules="[val => !!val || 'El campo es requerido.']">
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
              <template v-slot:append>
                <q-btn
                  color="teal"
                  text-color="white"
                  size="xs"
                  icon="qr_code"
                  round
                  @click="scanner = !scanner"
                />
              </template>
            </q-input>
          </q-card-section>
          <q-card-actions class="">
            <q-space/>
            <q-btn
              color="teal glossy"
              aria-label="inicio"
              @click="login"
              :disable="btnDisable">
              <span v-if="btnDisable">
                <q-spinner-hourglass
                  color="blue-1"
                  size="20px"
                  :disable="btnDisable"
                />
                Cargando...
              </span>
              <span v-if="!btnDisable">
                Iniciar Sesión
              </span>
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <b-scanner :show="scanner" @eventScanner="eventScanner"/>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { ACTIONS } from '../store/module-login/name.js'
import BScanner from '../components/BScanner.vue'
export default {
  components: {
    BScanner
  },
  data () {
    return {
      scanner: false,
      /**
         * Email User
         * @type {String}
         */
      usuario: '',
      /**
         * Password User
         * @type {String}
         */
      password: '',
      /**
       * Message Error
       * @type {String}
       */
      message: null,

      btnDisable: false
    }
  },
  methods: {
    /**
     * return error when field is empty
     * @param {string}
     */
    errorValidation (field) {
      return this.errors.has(field) ? 'is-danger' : null
    },
    async eventScanner (code) {
      await this[ACTIONS.LOGIN](
        {
          self: this,
          route: ['usuarios', 'login', 'codigo'],
          param: {
            codigo: code
          }
        }
      )
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
            route: ['usuarios', 'login', 'usuario-password'],
            param: {
              email: this.usuario,
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
  .img {
    width: 300px;
  }
</style>
