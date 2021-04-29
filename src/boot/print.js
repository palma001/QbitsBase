import Vue from 'vue'
import VueHtmlToPaper from 'vue-html-to-paper'
const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://cdn.jsdelivr.net/npm/quasar@1.15.11/dist/quasar.rtl.min.css',
    'https://cdn.jsdelivr.net/npm/vue@^2.0.0/dist/vue.min.js'
  ]
}
Vue.use(VueHtmlToPaper, options)
