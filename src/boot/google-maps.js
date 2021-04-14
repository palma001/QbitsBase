import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDQbFmDzZsIfYI1hlZQJfSqwta_73MItxo',
    libraries: 'places' // This is required if you use the Autocomplete plugin
  }
})
