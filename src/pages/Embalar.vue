<template>
  <div class="q-pa-md row q-gutter-y-xs">
    <div class="col-12 q-ml-md">
      <p class="text-h6">
        Embalar Empaques
      </p>
    </div>
    <div class="col-12">
      <q-form
        ref="myForm"
        class="row justify-between q-gutter-x-xs"
        @submit="validarEmbalaje"
        @reset="cancelarFactura"
      >
        <div class="col-md-3 col-sm-3 col-xs-5">
          <q-input
            filled
            dense
            autofocus
            label="Código Factura"
            v-model="codigoFactura"
            ref="codigoFactura"
            :disable="factura.length === 0 ? false : true"
            :rules="[val => !!val || 'Agregar codigo de factura']"
            @keyup.enter="obtenerFactura"
          >
            <template v-slot:append>
              <q-btn
                color="teal"
                text-color="white"
                size="xs"
                icon="qr_code"
                round
                @click="persistent = !persistent"
              >
                <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">
                  <strong>Scannear</strong>
                </q-tooltip>
              </q-btn>
            </template>
          </q-input>
        </div>
        <div class="col-md-3 col-sm-3 col-xs-6">
          <q-select
            label="Tipos de entrega"
            ref="tipoEntrega"
            filled
            dense
            v-model="tipoEntrega"
            :options="listaTipoEntrega"
            :rules="[val => !!val || 'El campo es requerido.']"
          />
        </div>
        <div class="col-md-3 col-sm-3 col-xs-6">
          <q-select
            label="Empaque"
            ref="tipoEmpaque"
            filled
            dense
            input-debounce="0"
            v-model="tipoEmpaque"
            :rules="[val => !!val || 'El campo es requerido.']"
            :options="listaTipoEmpaque"
            @input="asignarEmpaque"
          >
            <template v-if="tipoEmpaque" v-slot:append>
              <q-icon name="add_circle" color="teal" @click.stop="asignarEmpaque(tipoEmpaque)" class="cursor-pointer">
                <q-tooltip
                  anchor="center left"
                  self="center right"
                  :offset="[10, 10]"
                >
                  <strong>Agregar {{ tipoEmpaque.label }}</strong>
                </q-tooltip>
              </q-icon>
            </template>
          </q-select>
        </div>
        <div class="col-md-2 col-sm-2 col-xs-5">
          <q-input
            label="Cantidad de empaques"
            ref="cantidadEmpaque"
            filled
            dense
            input-debounce="0"
            disable
            v-model="cantidadEmpaque"
          />
        </div>
        <div class="col-md-12 col-xs-12 text-right q-gutter-x-sm">
          <q-btn
            color="teal"
            text-color="white"
            label="Finalizar"
            size="15px"
            type="submit"
            v-if="factura.length > 0"
            :disable="factura.length === 0 ? true : false"
          >
            <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
              <strong>Finalizar Embalaje</strong>
            </q-tooltip>
          </q-btn>
          <q-btn
            color="negative"
            text-color="white"
            icon="close"
            size="15px"
            type="reset"
            v-if="factura.length === 0 ? false : true"
          >
            <q-tooltip anchor="bottom middle" self="top middle">
              <strong>Cancelar Embalaje</strong>
            </q-tooltip>
          </q-btn>
        </div>
      </q-form>
    </div>
    <div class="col-12 q-mt-sm" v-if="factura.length > 0">
      <b-markup-table
        title="Lista de productos"
        labelInput="Código del producto"
        :data="factura"
        :header="columns"
        @enter="obtenerProducto"
        @clickButton="productoScanner = !productoScanner"
      />
    </div>
    <b-scanner :show="persistent" @eventScanner="obtenerFactura"/>
    <b-scanner :show="productoScanner" @eventScanner="obtenerProducto"/>
    <q-dialog v-model="dialogFinalizarEmpaque" transition-show="scale" transition-hide="scale">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="q-pb-none">
          <p class="text-h6">
            Finalizar empaque
          </p>
        </q-card-section>
        <q-separator/>
        <q-card-section
          class="row justify-between"
          v-for="producto in productosFaltantes"
          :key="producto.id"
        >
          <q-input
            :value="producto.descripcion"
            type="text"
            label="Nombre del producto"
            class="col-4"
            disable
            dense
            filled
          />
          <q-input
            :key="producto.id"
            :value="producto.cantidad"
            type="text"
            label="Cantidad"
            class="col-4 q-pa-xs"
            disable
            dense
            filled
          />
          <q-input
            :key="producto.id"
            :value="producto.cantidad_embalado"
            type="text"
            label="Cantidad embalada"
            class="col-4 q-pa-xs"
            disable
            dense
            filled
          />
        </q-card-section>
        <q-card-section class="q-pt-md">
          <q-input
            label="Observación"
            type="textarea"
            v-model="observacion"
            dense
            filled
          />
        </q-card-section>
         <q-separator/>
        <q-card-actions align="right">
          <q-btn color="negative" v-close-popup clo label="Cancelar" />
          <q-btn color="teal" label="Finalizar" @click="finalizarEmpaque"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="product" persistent>
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Producto seleccionado</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="row">
          <q-item class="col-6">
            <q-item-section>
              <q-input
                type="text"
                label="Nombre del producto"
                disable
                filled
                dense
                :value="productoSelected.descripcion"
              />
            </q-item-section>
          </q-item>
          <q-item class="col-6">
            <q-item-section>
              <q-input
                type="text"
                label="Unidad"
                disable
                filled
                dense
                :value="productoSelected.unidad"
              />
            </q-item-section>
          </q-item>
          <q-item class="col-6 q-mb-md">
            <q-item-section>
              <q-input
                type="text"
                label="Cantidad"
                disable
                filled
                dense
                :value="productoSelected.cantidad"
              />
            </q-item-section>
          </q-item>
          <q-item class="col-6 q-mt-xs">
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
        </q-card-section>
        <q-separator />
        <q-card-actions align="right" class="text-primary">
          <q-btn label="Cancelar" color="negative" v-close-popup />
          <q-btn
            label="Aceptar"
            color="teal"
            @click="guardarEmbalaje"
            :loading="loadingGuardarEmbalaje"
          >
            <template v-slot:loading>
              <q-spinner color="white" />
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn fab icon="receipt" color="teal" @click="show()">
        <q-tooltip
          anchor="center left"
          self="center right"
          :offset="[10, 10]"
        >
          <strong>Facturas asociadas</strong>
        </q-tooltip>
      </q-btn>
    </q-page-sticky>
  </div>
</template>

<script>
import { mixins } from '../mixins'
import BScanner from '../components/BScanner.vue'
import BMarkupTable from '../components/BMarkupTable'
import { GETTERS } from 'src/store/module-login/name'
import { mapGetters } from 'vuex'
import { date, QSpinnerGears } from 'quasar'
export default {
  mixins: [mixins.containerMixin],
  components: {
    BMarkupTable,
    BScanner
  },
  data () {
    return {
      modalFacturasAsociadas: null,
      productoScanner: false,
      /**
       * Fecha inicio del empaque
       * @type {String} fecha de inicio del empaque
       */
      fecha_ini: '',
      /**
       * Loading del boton de guardar embalaje del producto
       * @type {Boolean} Loading embalaje del producto
       */
      loadingGuardarEmbalaje: false,
      /**
       * Modal del producto seleccionado
       * @type {Boolean} Status del modal seleccionado
       */
      product: false,
      /**
       * Variable de la cantidad de embalaje del producto
       * @type {Number} Cantidad del producto
       */
      cantidadEmbalar: 1,
      /**
       * Cantiad de empaque del producto seleccionado
       * @type {Object} Producto seleccionado
       */
      cantidadEmpaque: 0,
      /**
       * Producto seleccionado
       * @type {Object} Producto seleccionado
       */
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
      listaTipoEmpaque: [],
      /**
       * Tipos de entrega
       * @type {Array} datos de los tipo de entrega
       */
      listaTipoEntrega: [],
      /**
       * Dialogo de finalizar empaque
       * @type {Boolean} status del dialogo
       */
      dialogFinalizarEmpaque: false,
      /**
       * Productos faltantes por embalar
       * @type {Array} datos de los productos
       */
      productosFaltantes: [],
      observacion: '',
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
          value: 'unidad',
          label: 'Unidad',
          align: 'right'
        }
      ]
    }
  },
  created () {
    this.$barcodeScanner.init(this.obtenerFactura)
    this.obtenerEmpaques()
    this.obtenerTipoEntrega()
  },
  computed: {
    /**
     * Getters Vuex
     */
    ...mapGetters([GETTERS.GET_USER])
  },
  methods: {
    show () {
      this.modalFacturasAsociadas = this.$q.bottomSheet({
        title: 'Facturas Asociadas',
        actions: [
          {
            label: 'Drive',
            icon: 'receipt',
            id: 'drive'
          }
        ]
      }).onOk(action => {
        // console.log('Action chosen:', action.id)
      })
    },
    asignarEmpaque (data) {
      if (this.$refs.codigoFactura.validate()) {
        this.loadingPage('Asignando empaque...')
        this.$services.postData(['factura', this.codigoFactura, 'asignar-embalaje'], {
          cod_alistador: this[GETTERS.GET_USER].codigo,
          cod_empaque: data.value
        })
          .then(({ res }) => {
            this.cantidadEmpaque = res.data.item
            this.$q.loading.hide()
            this.notify(this, 'Empaque asignado', 'positive', 'thumb_up')
          })
          .catch(e => {
            this.$q.loading.hide()
            this.notify(this, 'algo ha salido mal', 'negative', 'warning')
          })
      }
    },
    loadingPage (message) {
      this.$q.loading.show({
        spinner: QSpinnerGears,
        spinnerSize: 140,
        spinnerColor: 'white',
        messageColor: 'white',
        message: message
      })
    },
    /**
     * Guardar embalaje del producto
     */
    guardarEmbalaje () {
      this.$refs.cantidadEmbalar.validate()
      if (!this.$refs.cantidadEmbalar.hasError) {
        this.loadingGuardarEmbalaje = true
        this.$services.postData(['factura', this.codigoFactura, 'asignar-articulo'], {
          id_embalaje: this.cantidadEmpaque,
          cod_articulo: this.productoSelected.codigo_producto,
          unidad: this.productoSelected.unidad,
          cantidad: this.cantidadEmbalar
        })
          .then(({ res }) => {
            this.notify(this, 'embalado exitosamente', 'positive', 'thumb_up')
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
     * Obtener lista de tipos de entrega
     */
    async obtenerTipoEntrega () {
      const { res } = await this.$services.getData(['tipos-entrega', ''])
      this.listaTipoEntrega = res.data.map(element => {
        return {
          label: element.nombre,
          value: element.codigo
        }
      })
    },
    /**
     * Finalizar embalaje
     */
    validarEmbalaje () {
      const productos = []
      this.factura.forEach(element => {
        if (Number(element.cantidad) > Number(element.cantidad_embalado)) {
          productos.push(element)
        } else if (Number(element.cantidad) < Number(element.cantidad_embalado)) {
          this.notify(
            this,
            `el producto ${element.descripcion} supera la cantidad en la factura`,
            'negative',
            'warning'
          )
        }
      })
      this.dialogFinalizarEmpaque = true
      this.productosFaltantes = productos
    },
    /**
     * Finalizar empaque, guarda los cambios en la factura
     */
    async finalizarEmpaque () {
      const { res } = await this.$services.putData(['factura', this.codigoFactura, 1], {
        codigo_empleado: this[GETTERS.GET_USER].codigo
      })
      if (res.data === 'Empaque Finalizado') {
        this.cancelarFactura()
        this.dialogFinalizarEmpaque = false
        this.notify(this, res.data, 'positive', 'thumb_up')
      }
    },
    /**
     * Cancelar empaquetado
     */
    cancelarFactura () {
      this.factura = []
      this.codigoFactura = null
      this.tipoEmpaque = []
      this.tipoEntrega = null
      this.cantidadEmpaque = 0
      this.resetValidation()
    },
    /**
     * Elimina la validación de los formularios
     */
    resetValidation () {
      setTimeout(() => {
        this.$refs.myForm.resetValidation()
      })
    },
    /**
     * Obtiene la factura
     * @param {String} code codigo de barra o Qr de la factura
     */
    obtenerFactura (code) {
      this.codigoFactura = typeof code !== 'string' ? this.codigoFactura : code
      this.loadingFactura = true
      this.loadingPage('Buscando factura...')
      this.$services.getOneData(['factura', this.codigoFactura, 'detalles'])
        .then(({ res }) => {
          res.data.length <= 0 ? this.notify(this, 'Factura no encontrada', 'negative', 'warning') : this.fecha_ini = date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')
          this.loadingFactura = false
          this.factura = res.data
          this.persistent = false
          this.$barcodeScanner.destroy()
          this.$q.loading.hide()
        })
        .catch((e) => {
          this.$q.loading.hide()
          this.notify(this, 'Factura no encontrada', 'negative', 'warning')
          this.loadingFactura = false
          this.factura = []
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
        this.notify(this, 'Producto no encontrado', 'negative', 'warning')
      }
    }
  }
}
</script>
