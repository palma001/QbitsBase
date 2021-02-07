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
        >
          <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
            <q-item
              v-bind="itemProps"
              v-on="itemEvents"
            >
              <q-item-section>
                <q-item-label v-html="opt.label" ></q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-toggle :value="selected" @input="toggleOption(opt)" />
              </q-item-section>
            </q-item>
          </template>
        </q-select>
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
      <b-markup-table
        title="Lista de productos"
        labelInput="Código del producto"
        :data="factura"
        :header="columns"
        @enter="obtenerProducto"
      />
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
    <q-dialog v-model="product" persistent>
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Producto seleccionado</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pl-lg q-pr-lg">
          <q-input
            type="text"
            label="Nombre del producto"
            disable
            filled
            dense
            :value="productoSelected.descripcion"
          />
        </q-card-section>
        <q-card-actions align="center">
          <q-item class="q-mb-md">
            <q-item-section>
              <q-input
                type="text"
                label="Nombre del producto"
                disable
                filled
                dense
                :value="productoSelected.cantidad"
              />
            </q-item-section>
          </q-item>
          <q-item class="q-mt-xs">
            <q-item-section>
              <q-input
                type="text"
                label="Cantidad a embalar"
                ref="cantidadEmbalar"
                filled
                dense
                v-model="cantidadEmbalar"
                :rules="[val => Number(val) <= Number(productoSelected.cantidad) || 'Cantidad de embalaje es mayor a la factura']"
                @keyup.enter="guardarEmbalaje"
              />
            </q-item-section>
          </q-item>
        </q-card-actions>
        <q-separator />
        <q-card-actions align="right" class="text-primary">
          <q-btn label="Cancelar" color="negative" v-close-popup />
          <q-btn
            label="Aceptar"
            color="teal"
            @click="guardarEmbalaje" :loading="loadingGuardarEmbalaje">
            <template v-slot:loading>
              <q-spinner color="teal" />
            </template>
          </q-btn>
        </q-card-actions>
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
      loadingGuardarEmbalaje: false,
      product: false,
      cantidadEmbalar: 1,
      cantidadEmpaque: {},
      productoSelected: {},
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
    guardarEmbalaje () {
      this.$refs.cantidadEmbalar.validate()
      if (!this.$refs.cantidadEmbalar.hasError) {
        this.loadingGuardarEmbalaje = true
        this.$services.putData(['factura', this.codigoFactura, 'detalles', this.productoSelected.codigo_producto], {
          cantidad_embalada: this.cantidadEmbalar
        })
          .then(({ res }) => {
            this.notify(this, res.data, 'positive', 'thumb_up')
            this.product = false
            this.loadingGuardarEmbalaje = false
            this.obtenerFactura(this.codigoFactura)
            this.cantidadEmbalar = 1
          })
      }
    },
    /**
     * Obtener lista de tipos de empaques
     */
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
      const producto = this.factura.filter(row => Number(row.codigo_producto) === Number(codigo))[0]
      if (producto) {
        this.productoSelected = producto
        this.product = true
      } else {
        this.notify(this, 'Producto no encontrada', 'negative', 'warning')
      }
    }
  }
}
</script>
