<template>
  <LayoutComponent
    titleApp="Monteverde"
    titleMenu="Opciones"
    :data="modules"
    @logout="logout"
  />
</template>

<script>

import LayoutComponent from 'components/LayoutComponent.vue'
import { mapActions, mapGetters } from 'vuex'
import { ACTIONS, GETTERS } from '../store/module-login/name.js'
export default {
  name: 'MainLayout',
  components: { LayoutComponent },
  data () {
    return {
      /**
       * Data menu
       *
       * @type {Array} data menu
       */
      modules: [],
      coo: 1
    }
  },

  created () {
    this.getAllModules()
    this.loadCron()
  },

  computed: {
    /**
     * Getters Vuex
     */
    ...mapGetters([GETTERS.GET_USER])
  },
  methods: {
    loadCron () {
      this.$crontab.addJob({
        name: 'location',
        interval: {
          seconds: '/10'
        },
        job: this.location,
        condition: this.validateSession
      })
    },
    validateSession () {
      return this[GETTERS.GET_USER] && this[GETTERS.GET_USER].rol.name === 'transporte'
    },
    /**
     * Get all products
     */
    getAllModules () {
      this.$mockData.getData('category-modules')
        .then(({ response }) => {
          this.modules = response.data.content
        })
    },
    /**
     * Log out api
     */
    logout () {
      this[ACTIONS.LOGOUT]({ self: this })
    },
    /**
     * Enviar localización
    */
    location () {
      this.$getLocation({})
        .then(coordinates => {
          const userData = {
            position: {
              lat: coordinates.lat + this.coo,
              lng: coordinates.lng
            },
            userName: `${this[GETTERS.GET_USER].first_name} ${this[GETTERS.GET_USER].last_name}`
          }
          this.updateRoom(userData)
        })
      this.coo += 1
    },
    updateRoom (data) {
      const channel = this.$ably.channels.get(this[GETTERS.GET_USER].id)
      channel.presence.update(data, function (err) {
        if (err) {
          return console.error('Error updating presence data')
        }
        console.log('We have successfully updated our data')
      })
    },
    ...mapActions([ACTIONS.LOGOUT])
  }
}
</script>
