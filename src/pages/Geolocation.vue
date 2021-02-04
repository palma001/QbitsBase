<template>
  <div class="q-pa-md">
    <gmap-map
      :center="{ lat: initialPosition.lat, lng: initialPosition.lng }"
      :zoom="3"
      map-type-id="terrain"
      style="width: 100%; height: 400px"
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
        :title="m.userName"
        v-for="(m, index) in markers"
        @click="toggleInfoWindow(m, index)"
      />
    </gmap-map>

    <div class="notification">
      <p>Online Users: {{ markers.length }}</p>
      <ul>
        <li v-for="(user, i) in markers" :key="i">
          <pre v-text="user.userName"></pre>
        </li>
      </ul>
    </div>
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
        if (element.rol.name === 'transporte') {
          var channel = this.$ably.channels.get(element.id)
          channel.presence.get((e, members) => {
            this.markers = members.map(mem => {
              this.infoWindowPos = mem.data.position
              return {
                ...mem.data
              }
            })
          })
        }
      })
    },
    obtenerCamiones () {
      this.$mockData.getData('users')
        .then(({ response }) => {
          setInterval(() => {
            this.obtenerCoordenadas(response.data.content)
          }, 1000)
        })
    }
  }
}
</script>
