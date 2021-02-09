<template>
  <div class="q-pa-md q-gutter-y-md row">
    <div class="col-12 row q-gutter-sm q-gutter-x-md">
      <div class="col-sm-3 col-xs-12">
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
        </q-input>
      </div>
      <div class="col-sm-4 col-xs-12">
        <q-input v-model="desde" filled type="date" dense/>
      </div>
      <div class="col-sm-4 col-xs-12">
        <q-input v-model="hasta" filled type="date" dense/>
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
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab color="purple" icon="keyboard_arrow_up" direction="up" label="Opciones" label-position="left" external-label>
        <q-fab-action
          color="amber"
          icon="qr_code"
          glossy
          label="Scanner"
          label-position="left"
          external-label
          @click="scanner = !scanner"
        />
      </q-fab>
    </q-page-sticky>
    <b-scanner :show="scanner" @eventScanner="eventScanner"/>
    <q-dialog v-model="dialogDetallesFactura">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
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
export default {
  mixins: [mixins.containerMixin],
  components: {
    BScanner
  },
  data () {
    return {
      statusFactura: {
        PE: 'Por empaquetar',
        LE: 'Empaquetado',
        ET: 'En transporte',
        ER: 'En ruta',
        EC: 'Entregado',
        PD: 'Devuelto'
      },
      loadingFactura: false,
      loadingTable: false,
      dialogDetallesFactura: false,
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
    /**
     * Obtener todas las facturas del empleado transporte en sesión
     */
    async obtenerFacturas () {
      this.loadingTable = true
      const { res } = await this.$services.getOneData(['factura', 'empleado-transporte', this[GETTERS.GET_USER].codigo])
      this.data = res.data
      this.loadingTable = false
    },
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
          this.loadingFactura = false
          this.dialogDetallesFactura = true
          console.log(res)
        })
        .catch((e) => {
          console.log(e)
          this.notify(this, 'Factura no encontrada', 'negative', 'warning')
        })
    }
  }
}
</script>
