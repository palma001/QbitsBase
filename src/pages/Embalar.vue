<template>
  <div class="q-pa-md row q-gutter-y-xs">
    <div class="col-12">
      <p class="text-h6">
        Embalar Empaques
      </p>
    </div>
    <div class="col-12 row justify-between">
      <div class="col-md-3 col-sm-3 col-xs-12 q-col-gutter-x-sm">
        <q-input
          filled
          dense
          autofocus
          label="Código Factura"
          v-model="codigoFactura"
          ref="codigoFactura"
          mask="XXXX-########"
          :disable="factura.length === 0 ? false : true"
          :rules="[val => !!val || 'Agregar codigo de factura']"
          @keyup.enter="obtenerFactura"
        >
          <template v-slot:append>
            <q-btn
              color="teal"
              text-color="white"
              size="sm"
              icon="qr_code"
              aria-label="qr_code"
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
      <q-form
        ref="myForm"
        class="col-md-9 col-sm-9 col-xs-12 row q-col-gutter-x-sm"
        @submit="validarEmbalaje"
        @reset="cancelarFactura"
      >
        <div class="col-md-3 col-sm-4 col-xs-6">
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
        <div class="col-md-3 col-sm-4 col-xs-6">
          <q-select
            label="Empaque"
            ref="tipoEmpaque"
            filled
            dense
            input-debounce="0"
            v-model="tipoEmpaque"
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
        <q-space/>
        <div class="col-md-6 col-sm-4 col-xs-12 text-right q-gutter-x-sm">
          <q-btn
            color="teal"
            text-color="white"
            icon="check"
            size="15px"
            aria-label="finalizar"
            type="submit"
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
            aria-label="reset"
          >
            <q-tooltip anchor="bottom middle" self="top middle">
              <strong>Cancelar Embalaje</strong>
            </q-tooltip>
          </q-btn>
        </div>
      </q-form>
    </div>
    <div class="col-12 q-mt-sm">
      <q-tabs
          v-model="tab"
          align="left"
          narrow-indicator
          class="q-mb-lg"
        >
          <q-tab name="productosPorEmbalar" label="Productos por embalar" />
          <q-tab name="detallesDeEmbalaje" label="Detalles de embalaje" />
      </q-tabs>
      <q-tab-panels
          v-model="tab"
          animated
          transition-prev="scale"
          transition-next="scale"
        >
          <q-tab-panel name="productosPorEmbalar" class="q-pa-none">
            <b-markup-table
              title="Lista de productos"
              labelInput="Código del producto"
              :data="factura"
              :header="columns"
              :search="true"
              :loading="loadingProductos"
              :valueText="valueText"
              @enter="obtenerProducto"
              @clickButton="productoScanner = !productoScanner"
              @check="fourth = !fourth"
            />
          </q-tab-panel>
          <q-tab-panel name="detallesDeEmbalaje" class="row q-col-gutter-md">
            <div
              class="col-md-4 col-sm-6 col-xs-12"
              v-for="(empaque, index) in cantidadEmpaque"
              :key="empaque.id"
            >
              <q-list
                class="shadow-3 rounded-borders"
                style="width: 100%;"
              >
                <q-item>
                  <q-item-section avatar>
                    <q-avatar>
                      <q-icon name="archive" size="30px"></q-icon>
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label lines="4">
                      {{ empaque.label }} - {{ index + 1 }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn
                      icon="delete"
                      color="negative"
                      size="sm"
                      @click="eliminarEmbalaje(index)"
                    >
                      <q-tooltip anchor="bottom middle" self="top middle">
                        <strong>Eliminar emppaque</strong>
                      </q-tooltip>
                    </q-btn>
                  </q-item-section>
                  <q-item-section side>
                    <q-badge
                      color="teal"
                      rounded
                      :label="empaque.productos.length"
                    />
                    <q-tooltip anchor="bottom middle" self="top middle">
                      <strong>Cantidad de items</strong>
                    </q-tooltip>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item
                  class="q-ml-md"
                  v-for="(producto, index) in empaque.productos"
                  :key="producto.id"
                >
                  <q-item-section>
                    <q-item-label lines="4">
                      {{ producto.descripcion }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn
                      icon="delete"
                      color="negative"
                      size="sm"
                      style="width: 50px;"
                      @click="eliminarProducto(index, empaque)"
                    >
                      <q-tooltip anchor="bottom middle" self="top middle">
                        <strong>Eliminar producto</strong>
                      </q-tooltip>
                    </q-btn>
                  </q-item-section>
                  <q-item-section side>
                    <q-badge color="teal" :label="producto.cantidad_embalado" rounded/>
                    <q-tooltip anchor="bottom middle" self="top middle">
                      <strong>Cantidad Embalada</strong>
                    </q-tooltip>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
            <p class="text-h5" v-if="cantidadEmpaque.length <= 0">
              No hay empaques seleccionado
            </p>
          </q-tab-panel>
      </q-tab-panels>
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
          <q-btn
            color="teal"
            label="Finalizar"
            :loading="loadingFinalizar"
            @click="finalizarEmpaque"
          >
            <template v-slot:loading>
              <q-spinner color="white" />
            </template>
          </q-btn>
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
      <q-btn
        fab
        icon="receipt"
        color="teal"
        :loading="loadingFacturasAsociadas"
        @click="show()"
        :disable="loadingFacturasAsociadas"
      >
        <q-tooltip
          anchor="center left"
          self="center right"
          :offset="[10, 10]"
        >
          <strong>Facturas asociadas</strong>
        </q-tooltip>
        <q-badge color="red" floating transparent rounded>{{ facturasAsociadas.length }}</q-badge>
        <template v-slot:loading>
          <q-spinner color="white" />
        </template>
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
      fechaInicio: {},
      tab: 'productosPorEmbalar',
      /**
       * Id de la factura
       * @type {Number} id de la factura
       */
      factId: 0,
      /**
       * Estado para el input de agregar cantidad del producto
       * @type {Boolean} estado del input
       */
      fourth: false,
      /**
       * Loading de las facturas asociadas
       * @type {Boolean} loading de facturas asociadas
       */
      loadingFacturasAsociadas: false,
      /**
       * Codigo del producto
       * @type {String} codigo del producto
       */
      valueText: '',
      /**
       * Loadind de la tabla de productos
       * @type {Boolean} loading de productos
       */
      loadingProductos: false,
      /**
       * Modal de facturas
       * @type {Array} modal de facturas asociadas
       */
      modalFacturasAsociadas: null,
      /**
       * Scanner de productos
       * @type {Boolan} estado del escaner de producto
       */
      productoScanner: false,
      /**
       * Loading al finalizar el embalaje
       * @type {Boolean} loading finalizar embalaje
       */
      loadingFinalizar: false,
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
      cantidadEmpaque: [],
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
       * @type {Object} tipo de empaque
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
      /**
       * Observacion del embalaje
       * @type{String}
       */
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
        },
        {
          value: 'cantidad_embalado',
          label: 'Cantidad embalado',
          align: 'right'
        }
      ],
      /**
       * Lista de facturas asociadas
       * @type {String} facturas asociadas
       */
      facturasAsociadas: []
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
    /**
     * Eliminar empaque
     * @type {Number} index empaque
     */
    eliminarProducto (index, empaque) {
      empaque.productos.splice(index, 1)
      if (this.codigoFactura) {
        this.obtenerFactura()
      }
    },
    /**
     * Eliminar producto
     * @type {Number} index producto
     */
    eliminarEmbalaje (index) {
      this.cantidadEmpaque.splice(index, 1)
      if (this.codigoFactura) {
        this.obtenerFactura()
      }
    },
    /**
     * Facturas asociadas
     */
    show () {
      this.modalFacturasAsociadas = this.$q.bottomSheet({
        title: 'Facturas Asociadas',
        actions: (() => {
          return this.facturasAsociadas.map(factura => {
            return {
              label: `${factura.PREFIJO}-${factura.codigo}`,
              icon: 'receipt',
              id: `${factura.PREFIJO}-${factura.codigo}`
            }
          })
        })()
      }).onOk(action => {
        this.obtenerFactura(action.id)
      })
    },
    /**
     * Asignar el empaque a la factura
     */
    asignarEmpaque (data) {
      const product = {
        ...data,
        productos: []
      }
      this.cantidadEmpaque.push(product)
    },
    /**
     * Loading
     * @type {String} mensaje del liading
     */
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
     * Mostar los productos embalados
     */
    mostrarProductosEmbalados () {
      this.factura.map(productsAll => {
        this.cantidadEmpaque.forEach(element => {
          const product = element.productos.reduce((contador, producto) => {
            contador[producto.codigo_producto] = (contador[producto.codigo_producto] || 0) + producto.cantidad_embalado
            return contador
          }, {})

          for (const key in product) {
            if (Object.hasOwnProperty.call(product, key)) {
              if (Number(productsAll.codigo_producto) === Number(key)) {
                productsAll.cantidad_embalado = product[key]
                return productsAll
              }
            }
          }
        })
      })
      this.product = false
      this.productoSelected = {}
      this.loadingGuardarEmbalaje = false
      this.loadingProductos = false
      this.valueText = ''
      this.cantidadEmbalar = 1
      this.factura = this.factura.filter(product => product.cantidad !== product.cantidad_embalado)
    },
    /**
     * Guardar embalaje del producto
     */
    guardarEmbalaje () {
      if (this.cantidadEmpaque.length > 0) {
        this.valueText = null
        this.loadingGuardarEmbalaje = true
        this.loadingProductos = true
        setTimeout(() => {
          if (this.productoSelected.cantidad > this.productoSelected.cantidad_embalado) {
            const product = {
              descripcion: this.productoSelected.descripcion,
              codigo_producto: this.productoSelected.codigo_producto,
              cantidad: this.productoSelected.cantidad,
              cantidad_embalado: Number(this.cantidadEmbalar),
              unidad: this.productoSelected.unidad
            }
            this.cantidadEmpaque[this.cantidadEmpaque.length - 1].productos.push(product)
            this.mostrarProductosEmbalados()
            this.notify(this, 'embalado exitosamente', 'positive', 'thumb_up')
          } else {
            this.notify(this, 'La cantidad a embalar es mayor a la cantidad de la factura', 'negative', 'warning')
            this.loadingGuardarEmbalaje = false
            this.loadingProductos = false
          }
        }, 500)
      } else {
        this.notify(this, 'no a seleccionado un empaque', 'negative', 'warning')
      }
    },
    /**
     * Obtener lista de tipos de empaques
     */
    async obtenerEmpaques () {
      const { res } = await this.$services.getData(['empaques'])
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
    finalizarEmpaque () {
      this.loadingFinalizar = true
      this.$services.putData(['factura', this.factId, 'finalizar'], {
        codigo_empleado: this[GETTERS.GET_USER].codigo,
        codigo_tipo_entrega: this.tipoEntrega.value,
        empaquetado: this.cantidadEmpaque,
        fecha: this.fechaInicio.fecha,
        hora: this.fechaInicio.hora
      })
        .then(({ res }) => {
          if (res.data) {
            this.cancelarFactura()
            this.dialogFinalizarEmpaque = false
            this.notify(this, res.data, 'positive', 'thumb_up')
            this.loadingFinalizar = false
          }
        })
        .catch(e => {
          this.loadingFinalizar = false
          this.notify(this, 'La factura ya fue embalada', 'negative', 'warning')
        })
    },
    /**
     * Cancelar empaquetado
     */
    cancelarFactura () {
      this.factura = []
      this.codigoFactura = null
      this.tipoEntrega = null
      this.tipoEmpaque = null
      this.cantidadEmpaque = []
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
     * Obtener las facturas por clientes
     * @type {String} nit del cliente
     */
    async getFacturaPorCliente (nit) {
      this.loadingFacturasAsociadas = true
      const { res } = await this.$services.getData(['factura', 'cliente', nit], {
        fecha_ini: date.formatDate(date.subtractFromDate(Date.now(), { month: 2 }), 'YYYY-MM-DD'),
        fecha_fin: date.formatDate(Date.now(), 'YYYY-MM-DD')
      })
      this.loadingFacturasAsociadas = false
      this.facturasAsociadas = res.data.filter(element => element.ESTADO === 'POR EMBALAR')
    },
    /**
     * Obtiene la factura
     * @param {String} code codigo de barra o Qr de la factura
     */
    async obtenerFactura (code) {
      this.codigoFactura = typeof code !== 'string' ? this.codigoFactura : code
      this.loadingFactura = true
      this.loadingProductos = true
      const prefijoCodigo = this.codigoFactura.split('-')
      const codigo = prefijoCodigo[1].toString().padStart(8, '0')
      const prefijo = prefijoCodigo[0]
      const { res } = await this.$services.getOneData(['factura', codigo, prefijo])
      this.fechaInicio = { fecha: date.formatDate(Date.now(), 'YYYY-MM-DD'), hora: date.formatDate(Date.now(), 'HH:mm:ss') }
      if (res.data.estado === 'POR EMBALAR') {
        this.getFacturaPorCliente(res.data.nit_cliente)
        this.factId = res.data.fact_id
        this.$services.getOneData(['factura', res.data.fact_id, 'detalles'])
          .then(({ res }) => {
            if (res.data.length <= 0) {
              this.notify(this, 'Factura no encontrada', 'negative', 'warning')
            }
            this.loadingProductos = false
            this.factura = res.data
            this.mostrarProductosEmbalados()
            this.$barcodeScanner.destroy()
          })
          .catch((e) => {
            this.notify(this, 'Factura no encontrada', 'negative', 'warning')
            this.loadingFactura = false
            this.factura = []
            this.loadingProductos = false
          })
      } else {
        this.notify(this, `Factura ${res.data.estado}`, 'negative', 'warning')
      }
    },
    /**
     * Obtener producto
     * @param {String} codigo codigo del producto
     */
    obtenerProducto (codigo) {
      const producto = this.factura.find(row => Number(row.cod_bar) === Number(codigo))
      if (producto) {
        this.productoSelected = producto
        if (this.fourth) {
          this.product = this.fourth
        } else {
          this.guardarEmbalaje()
        }
      } else {
        this.notify(this, 'Producto no encontrado', 'negative', 'warning')
      }
    }
  }
}
</script>
