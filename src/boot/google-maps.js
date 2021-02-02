import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDp3Ud3SixagW8bJOwtosy5bBMB5JRNS_k',
    libraries: 'places' // This is required if you use the Autocomplete plugin
  }
})
