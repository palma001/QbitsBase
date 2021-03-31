<template>
  <div class="q-pa-md q-gutter-y-md row">
    <div class="col-12 row q-gutter-sm">
      <div class="col-sm-4 col-xs-12">
        <q-input v-model="desde" filled type="date" dense label="Desde"/>
      </div>
      <div class="col-sm-4 col-xs-12">
        <q-input v-model="hasta" filled type="date" dense label="Hasta"/>
      </div>
      <div class="col-sm-2 col-xs-12 col-md-1 col-lg-1 col-xl-1">
        <q-btn
          color="teal"
          text-color="white"
          icon="search"
          size="15px"
          aria-label="search"
          @click="obtenerFacturas"
        />
      </div>
    </div>
    <div class="col-12">
      <q-table
        title="Empaques"
        row-key="name"
        :data="data"
        :columns="columns"
        :loading="loadingTable"
        :pagination.sync="pagination"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="codigo" :props="props">
              {{ props.row.codigo }}
            </q-td>
            <q-td key="cantidad_embalaje" :props="props">
                {{ props.row.cantidad_embalaje }}
            </q-td>
            <q-td key="fecha_entrega" :props="props">
              {{ props.row.fecha_entrega }}
            </q-td>
            <q-td key="hora_entrega" :props="props">
              {{ props.row.hora_entrega }}
            </q-td>
            <q-td key="observacion" :props="props">
              {{ props.row.observacion }}
            </q-td>
            <q-td key="total" :props="props">
              {{ props.row.total }}
            </q-td>
            <q-td key="detalles" :props="props">
              <q-btn size="sm"
                color="teal"
                dense
                round
                icon="fullscreen"
                @click="viewDetails(props.row)"
              >
                <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                  Detalles del empaque
                </q-tooltip>
              </q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <q-dialog
      v-model="detallesFactura"
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down">
      <q-card :style="maximizedToggle ? '' : 'width: 700px; max-width: 80vw;'">
        <q-bar class="bg-teal text-white">
          <q-space />
          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup @click="tab = 'mails'">
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <div>
            <q-tabs
              v-model="tab"
              align="justify"
              narrow-indicator
              class="q-mb-lg"
            >
              <q-tab name="mails" label="Detalles del paquete" />
              <q-tab name="alarms" label="Ubicación del paquete" v-if="facturaSeleccionada && facturaSeleccionada.status === 'ET'"/>
              <q-tab name="reclamo" label="Reclamo" />
            </q-tabs>
            <div class="q-gutter-y-sm">
              <q-tab-panels
                v-model="tab"
                animated
                transition-prev="scale"
                transition-next="scale"
                class="text-white text-center"
              >
                <q-tab-panel name="mails">
                  <q-table
                    title="Productos"
                    row-key="name"
                    :data="productos"
                    :columns="columnsProductos"
                    :loading="loadingTableProductos"
                    :pagination.sync="pagination"
                  >
                    <template v-slot:loading>
                      <q-inner-loading showing color="primary" />
                    </template>
                  </q-table>
                </q-tab-panel>
                <q-tab-panel name="alarms">
                  <gmap-map
                    :center="this.coordinates"
                    :zoom="12"
                    map-type-id="roadmap"
                    style="width: 100%; height: 390px"
                  >
                    <gmap-marker
                      :position="this.coordinates"
                      :clickable="true"
                      :draggable="true"
                    />
                  </gmap-map>
                  <q-inner-loading :showing="visibleMap">
                    <q-spinner-gears size="50px" color="primary" />
                  </q-inner-loading>
                </q-tab-panel>

                <q-tab-panel name="reclamo">
                  <q-card class="my-card">
                    <q-form
                      @submit="guardarReclamo"
                    >
                      <q-card-section>
                        <q-input
                          v-model="reclamo"
                          filled
                          label="Escribir reclamo"
                          type="textarea"
                          :disable="facturaSeleccionada && facturaSeleccionada.fecha_reclamo ? true : false"
                        />
                      </q-card-section>
                      <q-card-actions vertical align="right">
                        <q-btn
                          color="teal"
                          label="Guardar"
                          type="submit"
                          :disable="facturaSeleccionada && facturaSeleccionada.fecha_reclamo ? true : false"
                        />
                      </q-card-actions>
                    </q-form>
                  </q-card>
                </q-tab-panel>
              </q-tab-panels>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mixins } from '../mixins'
import { GETTERS } from '../store/module-login/name.js'
import { mapGetters } from 'vuex'
import { date } from 'quasar'
export default {
  mixins: [mixins.containerMixin],
  data () {
    return {
      reclamo: '',
      visibleMap: false,
      pagination: {
        page: 1,
        rowsPerPage: 15
      },
      /**
       * Factura seleccionada
       * @type {Object} factura seleccionada
       */
      facturaSeleccionada: null,
      /**
       * Loading de la tabla de productos
       * @type {Boolean} status del loading de la tabla de productos
       */
      loadingTableProductos: true,
      /**
       * Lista de estados
       * @type {Object} estatus y sus codigos
       */
      statusFactura: {
        PE: {
          text: 'Por embalar'
        },
        LE: {
          text: 'Embalado',
          color: 'info'
        },
        ET: {
          text: 'En transporte',
          color: 'warning'
        },
        ER: {
          text: 'En ruta',
          color: 'warning'
        },
        EC: {
          text: 'Entregado',
          color: 'teal'
        },
        PD: {
          text: 'Devuelto',
          color: 'negative'
        }
      },
      /**
       * Loading table
       * @type {Boolean} status del loading de la tabla de facturas
       */
      loadingTable: false,
      /**
       * Productos del empaque
       * @type {Array} productos del empaque
       */
      productos: [],
      /**
       * Columnas de la tabla de los productos de la factura
       * @type {Array} columnas de la tabla
       */
      columnsProductos: [
        {
          name: 'descripcion',
          required: true,
          label: 'Nombre del producto',
          align: 'left',
          field: 'descripcion',
          sortable: true
        },
        {
          name: 'cantidad',
          label: 'Cantidad producto',
          field: 'cantidad',
          align: 'right',
          sortable: true
        },
        {
          name: 'precio',
          label: 'Precio unidad',
          field: 'precio',
          align: 'right',
          sortable: true
        },
        {
          name: 'observacion',
          label: 'Observación',
          field: 'observacion',
          align: 'right',
          sortable: true
        },
        {
          name: 'Subtotal',
          label: 'Subtotal',
          field: 'subtotal',
          align: 'right',
          sortable: true
        }
      ],
      /**
       * Estado del tipo de ventana de detalles del empaque
       * @type {Boolean} Estado del dialog
       */
      maximizedToggle: false,
      /**
       * Coordenadas de la ubucación de la factura
       * @type {Object} ubicación de la factura
       */
      coordinates: {
        lat: 0,
        lng: 0
      },
      /**
       * Valor del tag
       * @type {String} Valor del tag
       */
      tab: 'mails',
      /**
       * Estado del la ventana detalles
       * @type {Boolean} estado del modal
       */
      detallesFactura: false,
      /**
       * Valor de la fecha del empaques
       * @type {String} fecha desde del empaque
       */
      desde: date.formatDate(date.subtractFromDate(Date.now(), { month: 1 }), 'YYYY-MM-DD'),
      /**
       * Valor de la fecha del empaques
       * @type {String} fecha hasta del empaque
       */
      hasta: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      /**
       * Columnas de la tabla
       * @type {Array} columnas de la tabla
       */
      columns: [
        {
          name: 'codigo',
          label: 'Código de factura',
          align: 'left',
          field: 'codigo',
          sortable: true
        },
        {
          name: 'cantidad_embalaje',
          label: 'Cantidad de embalaje',
          field: 'cantidad_embalaje',
          align: 'left',
          sortable: true
        },
        {
          name: 'fecha_entrega',
          label: 'Fecha de entrega',
          field: 'fecha_entrega',
          align: 'left',
          sortable: true
        },
        {
          name: 'hora_entrega',
          label: 'Hora de entrega',
          field: 'hora_entrega',
          align: 'left',
          sortable: true
        },
        {
          name: 'observacion',
          label: 'Observación',
          field: 'observacion',
          align: 'left',
          sortable: true
        },
        {
          name: 'total',
          align: 'left',
          label: 'Total',
          field: 'total',
          sortable: true
        },
        {
          name: 'detalles',
          label: 'Detalles',
          field: 'detalles',
          align: 'left',
          sortable: true
        }

      ],
      /**
       * Data de la tabla
       * @type {Array} data de la tabla
       */
      data: []
    }
  },
  computed: {
    /**
     * Getters Vuex
     */
    ...mapGetters([GETTERS.GET_USER])
  },
  created () {
    this.obtenerFacturas()
  },
  methods: {
    async guardarReclamo () {
      const res = await this.$services.putData(['factura', this.facturaSeleccionada.codigo, 3], {
        reclamo: this.reclamo
      })
      if (res.status) {
        this.notify(this, 'Reclamo guardado exitosamente', 'positive', 'thumb_up')
      } else {
        this.notify(this, 'A ocurrido un error', 'negative', 'warining')
      }
    },
    /**
     * Obtener todas las facturas del cliente en sesión
     */
    async obtenerFacturas () {
      this.loadingTable = true
      const { res } = await this.$services.getData(['factura', 'cliente', this[GETTERS.GET_USER].nit],
        {
          fecha_ini: this.desde,
          fecha_fin: this.hasta
        }
      )
      this.data = res.data
      this.loadingTable = false
    },
    /**
     * Abrir detalles de la factura
     * @param {Object} data detalle de la factura
     */
    viewDetails (data) {
      this.detallesFactura = true
      this.loadingTableProductos = true
      this.$services.getOneData(['factura', data.codigo, 'detalles'])
        .then(({ res }) => {
          this.productos = res.data.map(detalle => {
            detalle.subtotal = detalle.cantidad * detalle.precio
            return detalle
          })
          this.obtenerCoordenadas(data)
          this.loadingTableProductos = false
          this.facturaSeleccionada = data
          this.reclamo = data.descripcion_reclamo
        })
    },

    obtenerCoordenadas (data) {
      this.visibleMap = true
      var channel = this.$ably.channels.get(data.codigo_empleado_transporte)
      channel.presence.subscribe('update', (presenceMsg) => {
        channel.presence.get((e, members) => {
          members.forEach(mem => {
            this.coordinates = mem.data.position
            this.visibleMap = false
          })
        })
      })
    },
    /**
     * Da dormato a la fecha
     * @param {String} fecha fecha con formato por defecto
     * @param {String} format formato de la fecha
     * @returns {String} fecha con formato
     */
    dateFormat (fecha, format = 'DD-MM-YYYY HH:mm:ss') {
      return date.formatDate(fecha, format) ?? '-'
    }
  }
}
</script>
