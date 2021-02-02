<template>
  <div class="q-pa-md">
    <gmap-map
      :center="{ lat: initialPosition.lat, lng: initialPosition.lng }"
      :zoom="10"
      map-type-id="terrain"
      style="width: 100%; height: 90%"
    >
      <!-- check if icon link in makers payload then display -->
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        @click="center = m.position"
        :icon="m.icon"
        :title="m.userName"
      />
    </gmap-map>

    <div class="notification">
      <p>Online Users: {{ markers.length }}</p>
      <ul>
        <li v-for="(user, i) in onlineUsers" :key="i">
          <pre v-text="user.data.userName"></pre>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Geolocation',
  data () {
    return {
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
      channelName: null
    }
  },
  mounted () {
    const name = prompt('To get started, input your name in the field below and locate your friends around based on your location, please turn on your location setting \n What is your name?')
    this.usersName = name
    const channel = prompt('Enter the name of the channel you are interested in')
    this.channelName = channel
  },
  async created () {
    await this.location()
    var channel = this.$ably.channels.get(this.channelName)
    channel.attach(err => {
      if (err) {
        return console.error('Error attaching to the channel')
      }
      console.log('We are now attached to the channel')
      channel.presence.enter(this.userlocation, function (err) {
        if (err) {
          return console.error('Error entering presence')
        }
        console.log('We are now successfully present')
      })
    })
    const self = this
    channel.presence.subscribe('update', function (presenceMsg) {
      console.log(presenceMsg)
      console.log(
        'Received a ' + presenceMsg.action + ' from ' + presenceMsg.clientId
      )
      channel.presence.get(members => {
        console.log(members)
        self.markers = members.map(mem => {
          if (JSON.stringify(self.userlocation) === JSON.stringify(mem.data)) {
            return {
              ...mem.data,
              icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            }
          } else {
            return {
              ...mem.data,
              icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            }
          }
        })
        self.onlineUsers = members
        console.log(
          'There are now ' + members.length + ' clients present on this channel'
        )
      })
    })
  },
  methods: {
    location () {
      this.$getLocation(this.options)
        .then(coordinates => {
          this.initialPosition.lat = coordinates.lat
          this.initialPosition.lng = coordinates.lng
          const userData = {
            position: {
              lat: coordinates.lat,
              lng: coordinates.lng
            },
            userName: this.usersName
          }

          this.userlocation = userData
          this.updateRoom(userData)
        })
    },
    updateRoom (data) {
      const channel = this.$ably.channels.get(this.channelName)
      channel.presence.update(data, function (err) {
        if (err) {
          return console.error('Error updating presence data')
        }
        console.log('We have successfully updated our data')
      })
    }
  }
}
</script>
