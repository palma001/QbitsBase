import Vue from 'vue'
import VueCrontab from 'vue-crontab'
VueCrontab.setOption({
  auto_start: true
})
Vue.use(VueCrontab)
