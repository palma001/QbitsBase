import Vue from 'vue'

// As a plugin
import VueMask, { VueMaskDirective, VueMaskFilter } from 'v-mask'
Vue.use(VueMask)

// Or as a directive
Vue.directive('mask', VueMaskDirective)

// Or only as a filter
Vue.filter('VMask', VueMaskFilter)
