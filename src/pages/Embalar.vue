<template>
  <div class="q-pa-md row q-gutter-y-md row">
    <div class="col-12 row q-gutter-sm">
      <div class="col-sm-3 col-xs-12">
        <q-input
          filled
          dense
          autofocus
          label="Código Factura"
          v-model="codigoFactura"
          :disable="factura.length === 0 ? false : true"
          @keyup.enter="obtenerFactura"
        >
          <template v-slot:append>
            <q-spinner
              v-if="loadingFactura"
              color="primary"
              :thickness="2"
            />
            <q-icon name="search" v-else/>
          </template>
        </q-input>
      </div>
      <div class="col-sm-2 col-xs-12">
        <q-select
          filled
          dense
          v-model="tipoEntrega"
          :options="listaTipoEntrega"
          label="Tipos de entrega"
        />
      </div>
      <div class="col-sm-3 col-xs-12">
        <q-select
          filled
          label="Empaque"
          v-model="tipoEmpaque"
          multiple
          dense
          input-debounce="0"
          :options="listaTipoEmpaque"
        />
      </div>
      <div class="col-sm-2 col-xs-12">
        <q-btn
          color="teal"
          text-color="white"
          label="Finalizar"
          size="15px"
          @click="finalizarEntrega">
        </q-btn>
      </div>
    </div>
    <div class="col-sm-12 row" v-if="tipoEmpaque.length > 0">
      <div v-for="tipo in tipoEmpaque" :key="tipo.id" class="col-sm-2 col-xs-4">
        <q-input
          type="number"
          dense
          filled
          style="width: 95%"
          v-model="cantidadEmpaque[tipo.label]"
          :label="`Cantidad de ${tipo.label}`"
        />
      </div>
    </div>
    <div class="col-12 q-mt-md" v-if="factura.length > 0">
      <b-markup-table :data="factura" :header="columns" title="Lista de productos"/>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab color="purple" icon="keyboard_arrow_up" direction="up" label="Opciones" label-position="left" external-label>
        <q-fab-action
          color="amber"
          icon="qr_code"
          glossy
          label="Scanner"
          label-position="left"
          external-label
          @click="persistent = true"
        />
      </q-fab>
    </q-page-sticky>
    <q-dialog v-model="persistent" transition-show="scale" transition-hide="scale">
      <q-card style="width: 352px; height: 336px;" class="q-pa-none">
        <q-card-section class="q-pa-xs">
          <q-select dense behavior="menu" v-model="scanner" :options="options" label="Tipo de scanner" />
        </q-card-section>
        <qrcode-stream
          style="width: 100% !important; height: 288px; !important;"
          @decode="obtenerFactura"
          v-if="scanner === 'Qr'"
        />
        <v-quagga v-else class="full-width" :frequency="0" :onDetected="logIt" :readerTypes="readerTypes"></v-quagga>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mixins } from '../mixins'
import BMarkupTable from '../components/BMarkupTable'
export default {
  mixins: [mixins.containerMixin],
  components: {
    BMarkupTable
  },
  data () {
    return {
      cantidadEmpaque: {},
      /**
       * Loading factura
       * @type {Boolean} Loading factura
       */
      loadingFactura: false,
      /**
       * Estado del componente dialog
       * @type {String} Estado del componente dialog
       */
      persistent: false,
      /**
       * Productos de la factura
       * @type {Array} Productos de la factura
       */
      factura: [],
      /**
       * Tipo de scanner
       * @type {String} Tipo de scanner
       */
      scanner: 'Barra',
      /**
       * Data de los tipos de scanner
       * @type {Array} Data de los tipos de scanner
       */
      options: [
        'Barra', 'Qr'
      ],
      /**
       * Tipo de codigo de barra
       * @type {String} Tipo de codigo de barra
       */
      readerTypes: [
        'code_128_reader',
        'ean_reader'
      ],
      /**
       * Código de la factura
       * @type {String} código de la factura
       */
      codigoFactura: null,
      /**
       * Valor del tipo de empaque
       * @type {Array} tipo de empaque
       */
      tipoEmpaque: [],
      /**
       * Valor del tipo de entrega del empaque
       * @type {String} tipo de entrega del empaque
       */
      tipoEntrega: null,
      /**
       * Tipos de empaque
       * @type {Array} datos de los tipo de empaque
       */
      listaTipoEmpaque: [],
      /**
       * Tipos de entrega
       * @type {Array} datos de los tipo de entrega
       */
      listaTipoEntrega: [
        'Delivery', 'Tienda'
      ],
      /**
       * Columnas de la tabla de los productos de la factura
       * @type {Array} columnas de la tabla
       */
      columns: [
        {
          value: 'descripcion',
          label: 'Nombre del producto',
          align: 'left'
        },
        {
          value: 'cantidad',
          label: 'Cantidad producto',
          align: 'right'
        },
        {
          value: 'cantidad_embalado',
          label: 'Cantidad embalado',
          align: 'right'
        }
      ]
    }
  },
  created () {
    this.$barcodeScanner.init(this.obtenerFactura)
    this.obtenerEmpaques()
  },
  methods: {
    async obtenerEmpaques () {
      const { res } = await this.$services.getData(['empaques', ''])
      this.listaTipoEmpaque = res.data.map(element => {
        return {
          label: element.nombre,
          value: element.codigo
        }
      })
    },
    /**
     * Finalizar embalaje
     */
    finalizarEntrega () {
      this.factura.forEach(element => {
        if (Number(element.cantidad) > Number(element.cantidad_embalado)) {
          this.notify(
            this,
            `el producto ${element.nombre_producto} no tiene la cantidad embalada correcta`,
            'negative',
            'warining'
          )
        } else if (Number(element.cantidad) < Number(element.cantidad_embalado)) {
          this.notify(
            this,
            `el producto ${element.nombre_producto} supera la cantidad en la factura`,
            'negative',
            'warining'
          )
        }
      })
    },
    /**
     * Obtiene el codigo de barra o Qr
     * @param {String} data codigo de barra o Qr
     */
    logIt (data) {
      if (this.factura.length <= 0) {
        this.obtenerFactura(data.codeResult.code)
      } else {
        this.obtenerProducto(data.codeResult.code)
      }
    },

    /**
     * Obtiene la factura
     * @param {String} code codigo de barra o Qr de la factura
     */
    obtenerFactura (code) {
      this.codigoFactura = typeof code !== 'string' ? this.codigoFactura : code
      this.loadingFactura = true
      this.$services.getOneData(['factura', this.codigoFactura, 'detalles'])
        .then(({ res }) => {
          console.log(res.data)
          this.factura = res.data
          this.loadingFactura = false
          this.persistent = false
        })
        .catch((e) => {
          this.notify(this, e, 'negative', 'warning')
          this.factura = []
          this.loadingFactura = false
        })
    },
    /**
     * Obtener producto
     * @param {String} codigo codigo del producto
     */
    obtenerProducto (codigo) {
      const factura = this.factura.filter(row => Number(row.codigo) === Number(codigo))
      if (factura.length > 0) {
        this.factura.map(product => {
          if (Number(product.codigo) === Number(codigo)) {
            if (product.cantidad > product.cantidad_embalado) {
              product.cantidad_embalado += 1
              return product
            } else {
              alert('Producto supero el limite')
            }
          }
        })
      } else {
        this.notify(this, 'Producto no encontrada', 'negative', 'warning')
      }
    }
  }
}
</script>
