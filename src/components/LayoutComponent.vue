<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-teal glossy">
        <q-btn flat
          dense
          round
          class="q-mr-sm"
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-separator dark vertical inset />
        <q-toolbar-title>{{ titleApp }}</q-toolbar-title>
        <q-separator dark vertical inset />
        <q-btn
          flat
          dense
          round
          icon="person"
          class="q-mr-sm q-ml-sm">
          <q-menu>
            <q-list style="min-width: 180px;">
              <q-item clickable
                v-close-popup>
                <q-item-section>
                  <div class="row q-pa-xs">
                    <div class="column">
                      <q-avatar size="45px">
                        <img src="../assets/user.png">
                      </q-avatar>
                    </div>
                    <div class="column">
                      <div class="text-subtitle1 text-primary q-mt-sm q-mb-xs q-ml-sm">
                        {{ GET_USER ? ucwords(GET_USER.nombre) : '' }}
                      </div>
                    </div>
                  </div>
                </q-item-section>
              </q-item>
              <q-expansion-item expand-separator
                class="text-primary"
                icon="people_alt"
                :label="GET_USER ? `${GET_USER.email}` : ''">
                <q-item clickable @click="darkMode">
                  <q-item-section avatar>
                    <q-icon name="chrome_reader_mode">
                    </q-icon>
                  </q-item-section>
                  <q-item-section>
                    <span>
                      {{ ucwords($t('template.darkMode')) }}
                      <q-badge transparent class="glossy">
                        {{ ucwords(this.$q.dark.isActive ? $t('template.desactive') : $t('template.active')) }}
                      </q-badge>
                    </span>
                  </q-item-section>
                </q-item>
              </q-expansion-item>
              <q-item clickable
                v-close-popup>
                <q-item-section>
                  <q-btn color="negative"
                    label="Logout"
                    push
                    size="sm"
                    v-close-popup
                    @click="logout" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
    >
      <q-expansion-item
        expand-separator
        v-for="category_module in dataMenu"
        :key="category_module.id"
        :icon="category_module.icon"
        :default-opened="category_module.open"
        :label="ucwords($t(`template.${category_module.name}`))"
      >
        <div
          v-for="list in category_module.modules"
          :key="list.id"
        >
          <q-list
            v-for="(divice, index) in list.devices"
            :key="index"
          >
            <q-item
              v-if="validateDivice(divice) && validateRole(list.access)"
              clickable
              v-ripple
              class="q-ml-lg"
              :active="active">
              <q-item-section avatar
                v-if="list.icon">
                <q-icon :name="list.icon" />
              </q-item-section>
              <q-item-section @click="changeRoute(list.route)">
                <q-item-label>
                  {{ ucwords($t(`modules.${list.name}`)) }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-expansion-item>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-inner-loading :showing="visible">
      <q-spinner-gears size="100px" color="primary"/>
    </q-inner-loading>
  </q-layout>
</template>

<script>
import { mixins } from '../mixins'
import { GETTERS } from '../store/module-login/name.js'
import { mapGetters } from 'vuex'
import { SessionStorage } from 'quasar'
export default {
  name: 'LayoutComponent',
  mixins: [mixins.containerMixin],
  props: {

    /**
     * Title component
     *
     * @type {String} data content
     */
    titleApp: {
      type: String,
      required: true
    },
    /**
     * Title component
     *
     * @type {String} data content
     */
    titleMenu: {
      type: String,
      required: false
    },
    /**
     * List menu
     *
     * @type {Array} data content
     */
    data: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      labelDrown: null,
      dataMenu: [],
      active: true,
      visible: false,
      sucursales: SessionStorage.getItem('sucursales'),
      /**
       * Status menu
       *
       * @type {Bollean} status menu
       */
      leftDrawerOpen: !this.$q.screen.sm
    }
  },
  watch: {
    data (value) {
      this.dataMenu = value.filter(element => {
        return element.modules.filter(module => {
          return this.validateRole(module.access)
        }).length > 0
      })
    }
  },
  created () {
    this.loadingPage()
  },
  computed: {
    /**
     * Getters Vuex
     */
    ...mapGetters([GETTERS.GET_USER])
  },
  methods: {
    validateRole (access) {
      const user = this[GETTERS.GET_USER]
      if (access && user) {
        return access.filter(element => {
          return element === user.rol
        })[0]
      }
    },
    /**
     * Emit event logout
     */
    logout () {
      this.$emit('logout')
    },
    /**
     * Dark mode aplication
     */
    darkMode () {
      this.$q.dark.toggle()
      SessionStorage.set('dark', this.$q.dark.isActive)
    },
    /**
     * Loading aplications
     */
    loadingPage () {
      this.$q.dark.set(SessionStorage.getItem('dark'))
    },
    /**
     * Change route
     * @param  {String} data name route
     */
    changeRoute (data) {
      this.$router.push({ name: data })
    },
    /**
     * Validate divice
     * @param  {String} validate divice
     */
    validateDivice (divice) {
      return this.$q.platform.is[divice]
    }
  }
}
</script>

<style>
.my-menu-link {
  background-color: #efebe4;
  color: #f5ad23;
}
</style>
