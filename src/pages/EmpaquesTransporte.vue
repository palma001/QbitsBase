<template>
  <div class="q-pa-md q-gutter-y-md row justify-between">
    <div class="col-12 row q-gutter-y-sm q-gutter-x-sm">
      <div class="col-sm-2 col-xs-5">
        <q-select
          label="Vehiculos"
          ref="tipoTransporte"
          filled
          dense
          v-model="tipoTransporte"
          :options="listaTipoTransporte"
        />
      </div>
      <div class="col-sm-2 col-xs-5">
        <q-select
          label="Rutas"
          ref="ruta"
          filled
          dense
          v-model="ruta"
          :options="rutas"
        />
      </div>
      <div class="col-sm-4 col-xs-5">
        <q-select
          label="Auxiliares"
          input-debounce="0"
          filled
          multiple
          use-input
          dense
          v-model="auxiliar"
          @filter="filterFn"
          :options="auxiliaresFilter"
        >
          <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
            <q-item
              v-bind="itemProps"
              v-on="itemEvents"
            >
              <q-item-section>
                <q-item-label v-html="opt.label" ></q-item-label>
                <q-item-label caption>Nit: {{ opt.description }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-toggle :value="selected" @input="toggleOption(opt)" />
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div class="col-sm-2 col-xs-5">
        <q-input
          filled
          dense
          v-model="codigoFactura"
          placeholder="Código"
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
        <template v-slot:append>
          <q-btn
            color="teal"
            text-color="white"
            size="xs"
            icon="qr_code"
            round
            @click="scanner = !scanner"
          >
          <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">
            <strong>Escannear factura</strong>
          </q-tooltip>
          </q-btn>
        </template>
        </q-input>
      </div>
      <div class="col-sm-3 col-xs-5">
        <q-input v-model="desde" filled type="date" dense/>
      </div>
      <div class="col-sm-3 col-xs-5">
        <q-input v-model="hasta" filled type="date" dense/>
      </div>
      <div class="col-sm-2  col-xs-1">
        <q-btn
          color="teal"
          text-color="white"
          icon="search"
          size="15px"
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
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
        <template v-slot:top-right>
          <q-input
            fill
            dense
            debounce="300"
            placeholder="Buscar"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="codigo" :props="props">
              {{ props.row.codigo }}
            </q-td>
            <q-td key="status" :props="props">
              <q-badge :color="props.row.status === 'EC' ? 'green' : 'red'">
                {{ statusFactura[props.row.status] }}
              </q-badge>
            </q-td>
            <q-td key="fecha_emision" :props="props">
              {{ props.row.fecha_emision }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <b-scanner :show="scanner" @eventScanner="eventScanner"/>
    <q-dialog v-model="dialogDetallesFactura">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Detalles de la factura</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pt-md q-gutter-sm row justify-between">
          <div class="col-xs-12 col-sm-2">
            <q-input
              type="text"
              label="Código"
              disable
              filled
              dense
              :value="detalleFactura.codigo"
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              type="text"
              label="Cliente"
              disable
              filled
              dense
              :value="detalleFactura.nombre_cliente"
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              type="date"
              label="Fecha de emisión"
              filled
              disable
              dense
              :value="dateFormat(detalleFactura.fecha_emision, 'YYYY-MM-DD')"
            />
          </div>
          <div class="col-xs-12 col-sm-3">
            <q-input
              type="hours"
              label="Hora de emisión"
              filled
              disable
              dense
              :value="dateFormat(detalleFactura.fecha_emision, 'HH:mm:ss')"
            />
          </div>
        </q-card-section>
        <!-- <q-card-section class="q-pt-md row justify-center">
        </q-card-section> -->
        <q-separator/>
        <q-card-actions align="right">
          <q-btn
            label="Cancelar"
            color="negative"
            v-close-popup />
          <q-btn
            label="Confirmar"
            color="teal"
            @click="confirmar"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mixins } from '../mixins'
import BScanner from '../components/BScanner.vue'
import { GETTERS } from '../store/module-login/name.js'
import { mapGetters } from 'vuex'
import { date } from 'quasar'
export default {
  mixins: [mixins.containerMixin],
  components: {
    BScanner
  },
  data () {
    return {
      /**
       * Lista de estados
       * @type {Object} estatus y sus codigos
       */
      statusFactura: {
        PE: 'Por empaquetar',
        LE: 'Empaquetado',
        ET: 'En transporte',
        ER: 'En ruta',
        EC: 'Entregado',
        PD: 'Devuelto'
      },
      /**
       * Loading al buscar la factura
       * @type {Object} estatus del loading factura
       */
      loadingFactura: false,
      /**
       * Loading de la tabla de facturas
       * @type {Object} estatus del loading de la tabla de facturas
       */
      loadingTable: false,
      /**
       * Dialogo de los detalles de factura
       * @type {Object} estatus dialogo de los detalles de factura
       */
      dialogDetallesFactura: false,
      /**
       * Detalles de la factura
       * @type {Object} detalles de la factura
       */
      detalleFactura: {},
      /**
       * Lista de tipos de transportes
       * @type {Array} Lista de tipos de transportes
       */
      listaTipoTransporte: [],
      /**
       * Tipo de transporte seleccionado
       * @type {Object} Tipo de transporte seleccionado
       */
      tipoTransporte: null,
      /**
       * Auxiliar seleccionado
       * @type {Object} Auxiliar seleccionado
       */
      auxiliar: null,
      /**
       * Lista de auxiliares
       * @type {Object} Lista de auxiliares
       */
      auxiliares: [],
      /**
       * Ruta seleccioanada
       * @type {Object} Ruta seleccioanada
       */
      ruta: null,
      /**
       * Lista de rutas
       * @type {Array} Lista de rutas
       */
      rutas: [],
      /**
       * Codigo de la factura
       * @type {String} Codigo de la factura
       */
      codigoFactura: '',
      /**
       * Status del scanner
       * @type {Boolean} status del scanner
       */
      scanner: false,
      /**
       * Valor de la fecha del empaques
       * @type {String} fecha desde del empaque
       */
      desde: null,
      /**
       * Valor de la fecha del empaques
       * @type {String} fecha hasta del empaque
       */
      hasta: null,
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
          name: 'status',
          align: 'center',
          label: 'Estado',
          field: 'status',
          sortable: true
        },
        {
          name: 'fecha_emision',
          label: 'Fecha de emision',
          field: 'fecha_emision',
          sortable: true
        }
      ],
      /**
       * Data de la tabla
       * @type {Array} data de la tabla
       */
      data: [],
      /**
       * Lista de axuliares filtrados
       * @type {Array} lista de auxiliares
       */
      auxiliaresFilter: []
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
    this.obtenerTipoEntrega()
    this.obtenerAxiliares()
    this.obtenerRutas()
  },
  methods: {
    /**
     * Confirmar factura
     */
    confirmar () {
      console.log('confirmar')
    },
    /**
     * Filtrar axuluares
     * @param {String} val valor a filtrar
     * @param {Function} update modifica la data del select
     */
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.auxiliaresFilter = this.auxiliares

          // with Quasar v1.7.4+
          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.auxiliaresFilter = this.auxiliares.filter(v => v.label.toLowerCase().indexOf(needle) > -1 || v.description.toLowerCase().indexOf(needle) > -1)
      })
    },
    /**
     * Obtener lista de tipos de transporte
     */
    async obtenerTipoEntrega () {
      const { res } = await this.$services.getData(['tipos-transporte', ''])
      this.listaTipoTransporte = res.data.map(element => {
        return {
          label: element.nombre,
          value: element.codigo
        }
      })
    },
    /**
     * Obtener lista de tipos de transporte
     */
    async obtenerRutas () {
      const { res } = await this.$services.getData(['rutas'])
      this.rutas = res.data.map(element => {
        return {
          label: element.nombre,
          value: element.codigo
        }
      })
    },
    /**
     * Obtener lista de tipos de transporte
     */
    async obtenerAxiliares () {
      const { res } = await this.$services.getData(['usuarios'], {
        rol: 'AX'
      })
      this.auxiliares = res.data.map(element => {
        return {
          label: element.nombre,
          value: element.codigo,
          description: element.nit
        }
      })
    },
    /**
     * Obtener todas las facturas del empleado transporte en sesión
     */
    async obtenerFacturas () {
      this.loadingTable = true
      const { res } = await this.$services.getData(['factura', 'empleado-transporte', this[GETTERS.GET_USER].codigo], {
        fecha_ini: this.desde,
        fecha_fin: this.hasta
      })
      this.data = res.data
      this.loadingTable = false
    },
    /**
     * Evento al escanear la factura
     * @param {String} data codigo de la factura
     */
    eventScanner (data) {
      console.log(data)
    },
    /**
     * Obtener factura
     * @param {String} codigo codigo de la factura
     */
    obtenerFactura (codigo) {
      codigo = typeof codigo === 'string' ? codigo : this.codigoFactura
      this.loadingFactura = true
      this.$services.getOneData(['factura', codigo])
        .then(({ res }) => {
          if (res.data) {
            this.loadingFactura = false
            this.dialogDetallesFactura = true
            this.detalleFactura = res.data
          }
        })
        .catch((e) => {
          console.log(e)
          this.notify(this, 'Factura no encontrada', 'negative', 'warning')
        })
    },
    /**
     * Da dormato a la fecha
     * @param {String} fecha fecha con formato por defecto
     * @param {String} format formato de la fecha
     * @returns {String} fecha con formato
     */
    dateFormat (fecha, format) {
      return date.formatDate(fecha, format)
    }
  }
}
</script>
