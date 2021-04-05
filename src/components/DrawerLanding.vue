<template>
  <q-drawer
    behavior="mobile"
    show-if-above
    bordered
    dark
    v-model="drawer"
    :breakpoint="500"
  >
    <q-scroll-area class="fit">
      <q-list padding>
        <q-item
          clickable
          v-ripple
          v-scroll-to="'#home'"
          :active="link === 'home'"
          @click="link = 'home'"
        >
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>

          <q-item-section>
            Home
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          v-scroll-to="'#services'"
          :active="link === 'services'"
          @click="link = 'services'"
        >
          <q-item-section avatar>
            <q-icon name="star" />
          </q-item-section>

          <q-item-section>
            Servicios
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          v-scroll-to="'#contactus'"
          :active="link === 'contactus'"
          @click="link = 'contactus'">
          <q-item-section avatar>
            <q-icon name="phone" />
          </q-item-section>

          <q-item-section>
            Contáctanos
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>

          <q-item-section>
            Iniciar Sesión
          </q-item-section>
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
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
      drawer: false,
      email: '',
      password: '',
      link: 'home'
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show () {
      this.drawer = this.show
    }
  },
  methods: {
    login () {
      this.$emit('login', { email: this.email, password: this.password })
    }
  }
}
</script>
