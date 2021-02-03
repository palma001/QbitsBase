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
import { CLOSE_BOX_CUT } from '../Graphql/BoxCut/boxCutMutations'
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
      modules: []
    }
  },

  created () {
    this.getAllModules()
    this.$crontab.addJob({
      name: 'location',
      interval: {
        seconds: '/60'
      },
      job: this.location
    })
  },

  computed: {
    /**
     * Getters Vuex
     */
    ...mapGetters([GETTERS.GET_USER])
  },
  methods: {
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
      this.closeBox()
    },
    /**
     * Enviar localización
    */
    location () {
      if (this[GETTERS.GET_USER].rol.name === 'transporte') {
        let coo = 1
        setInterval(() => {
          this.$getLocation({})
            .then(coordinates => {
              const userData = {
                position: {
                  lat: coordinates.lat + coo,
                  lng: coordinates.lng
                },
                userName: this[GETTERS.GET_USER].name
              }
              this.updateRoom(userData)
            })
          coo += 1
        }, 5000)
      }
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
    /**
     * Close box
     */
    async closeBox () {
      if (this.$q.sessionStorage.has('box_cut_id')) {
        await this.$apollo.mutate({
          mutation: CLOSE_BOX_CUT,
          variables: {
            id: this.$q.sessionStorage.getItem('box_cut_id')
          }
        })
      }
      this.$q.sessionStorage.clear()
    },
    ...mapActions([ACTIONS.LOGOUT])
  }
}
</script>
