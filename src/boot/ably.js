import Vue from 'vue'
import * as Ably from 'ably'
const ably = new Ably.Realtime({
  key: 'AlEvEw.8o-f5A:poBDB_uFDUH946ii',
  clientId: `${Math.random() * 1000000}`
})
Vue.prototype.$ably = ably
