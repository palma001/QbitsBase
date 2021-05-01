<template>
  <q-page padding>
    <div id="printMe">
      <print-voucher/>
    </div>
    <button @click="print">Print local range</button>
  </q-page>
</template>
<script>
import PrintVoucher from '../components/PrintVoucher'
export default {
  components: {
    PrintVoucher
  },
  data () {
    return {}
  },
  methods: {
    print () {
      // Pass the element id here
      setTimeout(() => {
        this.$htmlToPaper('printMe', null, () => {
          console.log('print')
        })
      })
    }
  }
}
</script>
