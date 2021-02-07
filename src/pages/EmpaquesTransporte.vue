<template>
  <div class="q-pa-md q-gutter-y-md row">
    <div class="col-12 row q-gutter-sm">
      <div class="col-sm-2 col-xs-12 col-md-1 col-lg-1 col-xl-1 q-mt-md">
        Filtrar por:
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
        :data="data"
        :columns="columns"
        row-key="name"
        :loading="loadingTable"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
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
  </div>
</template>

<script>
import BScanner from '../components/BScanner.vue'
import { GETTERS } from '../store/module-login/name.js'
import { mapGetters } from 'vuex'
export default {
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
      loadingTable: false,
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
    this.obtenerFactura()
  },
  methods: {
    async obtenerFactura () {
      this.loadingTable = true
      const { res } = await this.$services.getOneData(['factura', 'empleado-transporte', this[GETTERS.GET_USER].codigo])
      this.data = res.data
      this.loadingTable = false
    },
    eventScanner (data) {
      console.log(data)
    }
  }
}
</script>
