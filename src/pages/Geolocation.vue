<template>
  <div class="q-pa-sm row items-start q-gutter-md" v-if="coordinates">
    <GmapMap
      :center="this.coordinates"
      :zoom="100"
      map-type-id="terrain"
      style="width: 100%; height: 550px"
    >
      <GmapMarker
        :position="this.coordinates"
        :clickable="true"
        :draggable="true"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: 'Geolocation',
  data () {
    return {
      markers: [],
      coordinates: {},
      options: {}
    }
  },
  created () {
    this.location()
  },
  methods: {
    location () {
      this.$watchLocation(this.options)
        .then(coordinates => {
          this.coordinates.lat = coordinates.lat
          this.coordinates.lng = coordinates.lng
          console.log(this.coordinates)
        })
    }
  }
}
</script>
