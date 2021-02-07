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
        row-key="name"
        :data="data"
        :columns="columns"
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
            <q-td key="fecha_emision" :props="props">
              {{ props.row.fecha_emision }}
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
  </div>
</template>

<script>
import { mixins } from '../mixins'
import { GETTERS } from '../store/module-login/name.js'
import { mapGetters } from 'vuex'
export default {
  mixins: [mixins.containerMixin],
  data () {
    return {
      loadingTable: false,
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
      const { res } = await this.$services.getOneData(['factura', 'empleado-empaque', this[GETTERS.GET_USER].codigo])
      this.data = res.data
      this.loadingTable = false
    },
    /**
     * Abrir detalles de la factura
     * @param {Object} data detalle de la factura
     */
    viewDetails (data) {
      this.detallesFactura = true
      this.oneFactura = data
      this.productos = data.detalles
      console.log(data)
    }
  }
}
</script>
