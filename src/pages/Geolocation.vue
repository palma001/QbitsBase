<template>
  <div class="q-pa-xs" v-if="coordinates">
    <gmap-map
      :center="this.coordinates"
      :zoom="12"
      map-type-id="roadmap"
      style="width: 100%; height: 550px"
    >
      <gmap-marker
        :position="this.coordinates"
        :clickable="true"
        :draggable="true"
      />
      <gmap-polyline
        :path.sync="plPath"
        :draggable="true"
        :options="{geodesic:true, strokeColor:'#FF0000'}"
      />
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: 'Geolocation',
  data () {
    return {
      markers: [],
      plPath: [
        { lat: 37.772, lng: -122.214 },
        { lat: 21.291, lng: -157.821 },
        { lat: -18.142, lng: 178.431 },
        { lat: -27.467, lng: 153.027 }
      ],
      coordinates: {},
      options: {
        rotateControl: true
      }
    }
  },
  created () {
    this.location()
  },
  methods: {
    location () {
      this.$getLocation(this.options)
        .then(coordinates => {
          console.log(this.coordinates)
          this.coordinates.lat = coordinates.lat
          this.coordinates.lng = coordinates.lng
          this.plPath.push(this.coordinates)
        })
    }
  }
}
</script>
