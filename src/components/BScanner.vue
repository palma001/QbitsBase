<template>
  <div>
    <q-dialog v-model="showScanner" transition-show="scale" transition-hide="scale">
      <q-card style="width: 250px; height: 298px;" class="q-pa-none">
        <q-card-section class="q-pa-xs">
          <q-select dense behavior="menu" v-model="value" :options="optionsScanner" label="Tipo de scanner" />
        </q-card-section>
        <qrcode-stream
          style="width: 100% !important; height: 250px; !important;"
          @decode="eventQr"
          v-if="value === 'Qr'"
        />
        <b-quagga
          v-else
          class="full-width"
          :onDetected="eventQuagga"
          :readerTypes="readerTypes"
        />
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import BQuagga from '../components/BQuagga'
export default {
  name: 'BScanner',
  components: {
    BQuagga
  },
  props: {
    /**
     * Show scanner
     * @type {Boolean} Show scanner
     */
    show: {
      type: Boolean,
      default: false
    },
    /**
     * Data de los tipos de scanner
     * @type {Array} Data de los tipos de scanner
     */
    optionsScanner: {
      type: Array,
      default () {
        return [
          'Barra',
          'Qr'
        ]
      }
    },
    readerSize: {
      type: Object,
      default () {
        return {
          width: 100,
          height: 50
        }
      }
    },
    /**
     * Tipo de codigo de barra
     * @type {Array} Tipo de codigo de barra
     */
    readerTypes: {
      type: Array,
      default () {
        return [
          'code_128_reader',
          'ean_reader',
          'ean_8_reader',
          'code_39_reader',
          'code_39_vin_reader',
          'codabar_reader',
          'upc_reader',
          'upc_e_reader',
          'i2of5_reader'
        ]
      }
    }
  },
  data () {
    return {
      /**
       * Value scanner
       * @type {Atring} value scanner type
       */
      value: 'Barra',
      /**
       * Status scanner
       * @type {Boolean} Status scanner
       */
      showScanner: false
    }
  },
  watch: {
    show () {
      this.showScanner = this.show
    }
  },
  methods: {
    /**
     * Emit event scanner qr
     * @param {String} data code scanner
     */
    eventQr (data) {
      this.$emit('eventScanner', data)
    },
    /**
     * Emit event scanner
     * @param {Object} data code scanner
     */
    eventQuagga (data) {
      this.$emit('eventScanner', data.codeResult.code)
    }
  }
}
</script>
