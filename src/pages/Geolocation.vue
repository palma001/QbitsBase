<template>
  <div class="q-pa-md" style="width: 100%; height: 100%">
    <p class="text-h6">
      Localización de los transportes
    </p>
    <gmap-map
      v-if="userData"
      map-type-id="terrain"
      style="width: 100%; height: 78vh"
      :center="userData.position"
      :zoom="10"
    >
      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      />
      <gmap-marker
        v-for="(m, index) in markers"
        :key="index"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        @click="toggleInfoWindow(m, index)"
      />
    </gmap-map>
  </div>
</template>

<script>
import { GETTERS } from '../store/module-login/name.js'
import { mapGetters } from 'vuex'
export default {
  name: 'Geolocation',
  data () {
    return {
      userData: null,
      infoWinOpen: false,
      zoom: 11,
      markers: [],
      infoWindowPos: null,
      infoOptions: {
        content: '',
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    }
  },
  computed: {
    /**
     * Getters Vuex
     */
    ...mapGetters([GETTERS.GET_USER])
  },
  mounted () {
    this.obtenerCamiones()
    this.location()
  },
  methods: {
    toggleInfoWindow (marker, idx) {
      this.infoWindowPos = marker.position
      this.infoOptions.content = marker.userName
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    },
    obtenerCoordenadas (data) {
      data.map(element => {
        var channel = this.$ably.channels.get(element.codigo)
        channel.presence.subscribe('update', (presenceMsg) => {
          channel.presence.get((e, members) => {
            this.markers = members.map(mem => {
              this.infoWindowPos = mem.data.position
              return {
                ...mem.data
              }
            })
          })
        })
      })
    },
    obtenerCamiones () {
      this.$services.getData(['usuarios'], {
        rol: 'ET'
      })
        .then(({ res }) => {
          this.obtenerCoordenadas(res.data)
        })
    },
    /**
     * Enviar localización
    */
    location () {
      this.$getLocation({})
        .then(coordinates => {
          this.userData = {
            position: {
              lat: coordinates.lat,
              lng: coordinates.lng
            },
            userName: this[GETTERS.GET_USER].nombre
          }
        })
    }
  }
}
</script>
