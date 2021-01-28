<template>
  <div class="q-pa-md row">
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
        <q-select filled dense v-model="tipoEmpaque" :options="listaTipoEmpaque" label="Tipos de Empaque" />
      </div>
      <div class="col-sm-2 col-xs-12">
        <q-select filled dense v-model="tipoEntrega" :options="listaTipoEntrega" label="Tipos de Entrega" />
      </div>
      <div class="col-sm-4 col-xs-12">
        <q-btn color="teal" text-color="white" label="Finalizar Empaque" size="15px" @click="finalizarEntrega"/>
      </div>
    </div>
    <div class="col-12 q-mt-md" v-if="factura.length > 0">
      <q-table
        title="Productos"
        :data="factura"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:body="props">
          <q-tr :props="props" :class="props.row.cantidad === props.row.cantidad_embalado ? 'bg-teal' : ''">
            <q-td key="nombre_producto" :props="props">
              {{ props.row.nombre_producto }}
            </q-td>
            <q-td key="cantidad" :props="props">
              {{ props.row.cantidad }}
            </q-td>
            <q-td key="cantidad_embalado" :props="props">
              {{ props.row.cantidad_embalado }}
              <q-popup-edit v-model="props.row.cantidad_embalado" title="Editar cantidad embalado">
                <q-input type="number" v-model="props.row.cantidad_embalado" dense autofocus counter />
              </q-popup-edit>
            </q-td>
          </q-tr>
        </template>
      </q-table>
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
          @click="abrirModal"
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
        <v-quagga v-else class="full-width" :onDetected="logIt" :readerTypes="readerTypes"></v-quagga>
      </q-card>
    </q-dialog>
    <q-dialog v-model="scannerProductos" transition-show="scale" transition-hide="scale">
      <q-card style="width: 352px; height: 336px;" class="q-pa-none">
        <q-card-section class="q-pa-xs">
          <q-select dense behavior="menu" v-model="scanner" :options="options" label="Tipo de scanner" />
        </q-card-section>
        <qrcode-stream
          style="width: 100% !important; height: 288px; !important;"
          @decode="obtenerProducto"
          v-if="scanner === 'Qr'"
        />
        <v-quagga v-else class="full-width" :onDetected="logItProducto" :readerTypes="readerTypes"></v-quagga>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mixins } from '../mixins'
export default {
  mixins: [mixins.containerMixin],
  data () {
    return {
      barcode: '',
      loadingFactura: false,
      persistent: false,
      scannerProductos: false,
      factura: [],
      scanner: 'Barra',
      options: [
        'Barra', 'Qr'
      ],
      readerTypes: [
        'code_128_reader',
        'ean_reader',
        'ean_8_reader',
        'code_39_reader',
        'code_39_vin_reader',
        'codabar_reader',
        'upc_reader',
        'upc_e_reader',
        'i2of5_reader'
      ],
      /**
       * Código de la factura
       * @type {String} código de la factura
       */
      codigoFactura: null,
      /**
       * Valor del tipo de empaque
       * @type {String} tipo de empaque
       */
      tipoEmpaque: null,
      /**
       * Valor del tipo de entrega del empaque
       * @type {String} tipo de entrega del empaque
       */
      tipoEntrega: null,
      /**
       * Tipos de empaque
       * @type {Array} datos de los tipo de empaque
       */
      listaTipoEmpaque: [
        'CAJA', 'BOLSA', 'SOBRE'
      ],
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
          name: 'nombre_producto',
          required: true,
          label: 'Nombre del producto',
          align: 'left',
          sortable: true
        },
        {
          name: 'cantidad',
          align: 'center',
          label: 'Cantidad producto',
          field: 'cantidad',
          sortable: true
          // classes: row => row.cantidad === row.fat ? 'bg-teal' : ''
        },
        {
          name: 'cantidad_embalado',
          label: 'Cantidad embalado',
          field: 'cantidad_embalado',
          sortable: true
          // classes: row => row.cantidad === row.fat ? 'bg-teal' : ''
        }
      ],
      /**
       * Data de la tabla de los productos de la factura
       * @type {Array} data de la tabla
       */
      data: [
        {
          name: 'Frozen Yogurt',
          cantidad: 159,
          cantidad_embalado: 159
        },
        {
          name: 'Ice cream sandwich',
          cantidad: 237,
          cantidad_embalado: 9.0
        },
        {
          name: 'Eclair',
          cantidad: 262,
          cantidad_embalado: 16.0
        }
      ]
    }
  },
  mounted () {
    // window.addEventListener('keyup', event => {
    //   this.getCode(event)
    // })
  },
  methods: {
    abrirModal () {
      if (this.factura.length <= 0) {
        this.persistent = true
      } else {
        this.scannerProductos = true
      }
    },
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
    getCode (e) {
      const code = (e.keyCode ? e.keyCode : e.which)
      if (code === 13) {
        if (this.factura.length > 0) {
          this.obtenerProducto(this.barcode)
        }
        this.barcode = ''
      } else {
        this.barcode += e.key
      }
    },
    logIt (data) {
      this.obtenerFactura(data.codeResult.code)
    },
    logItProducto (data) {
      this.obtenerProducto(data.codeResult.code)
    },
    /**
     * Obtener factura
     */
    async obtenerFactura (code) {
      this.codigoFactura = code ?? this.codigoFactura
      try {
        this.loadingFactura = true
        const { response } = await this.$mockData.getOneData('facturas', this.codigoFactura)
        this.factura = response.data.content.detalles.map(product => {
          product.cantidad_embalado = 0
          return product
        })
        this.loadingFactura = false
        this.persistent = false
      } catch (error) {
        this.notify(this, 'Factura no encontrada', 'negative', 'warning')
        this.factura = []
        this.loadingFactura = false
      }
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
        alert('Producto no encontrado ' + codigo)
      }
    }
  }
}
</script>

<style>

</style>
