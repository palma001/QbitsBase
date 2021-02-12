<template>
  <div class="q-pa-md">
    <p class="text-h6">
      Localización de los transportes
    </p>
    <gmap-map
      :center="{ lat: initialPosition.lat, lng: initialPosition.lng }"
      :zoom="3"
      map-type-id="terrain"
      style="width: 100%; height: 490px"
    >
      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      />
      <gmap-marker
        :key="index"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        v-for="(m, index) in markers"
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
      infoWinOpen: false,
      usersName: null,
      gettingLocation: true,
      initialPosition: {
        lat: 10,
        lng: 10
      },
      zoom: 11,
      markers: [],
      userlocation: [],
      onlineUsers: [],
      channelName: null,
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
    }
  }
}
</script>
