<template>
  <div class="q-pa-md q-gutter-y-md row">
    <div class="col-12 row q-gutter-sm">
      <div class="col-sm-4 col-xs-12">
        <q-input v-model="desde" filled type="date" dense/>
      </div>
      <div class="col-sm-4 col-xs-12">
        <q-input v-model="hasta" filled type="date" dense/>
      </div>
      <div class="col-sm-2 col-xs-12 col-md-1 col-lg-1 col-xl-1">
        <q-btn
          color="teal"
          text-color="white"
          icon="search"
          size="15px"
          @click="obtenerReclamo"
        />
      </div>
    </div>
    <div class="col-12">
      <q-table
        title="Lista de reclamos"
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
            <q-td key="nombre_cliente" :props="props">
              {{ props.row.nombre_cliente }}
            </q-td>
            <q-td key="fecha_reclamo" :props="props">
              {{ dateFormat(props.row.fecha_reclamo) }}
            </q-td>
            <q-td key="descripcion_reclamo" :props="props">
              {{ props.row.descripcion_reclamo }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>
<script>
import { date } from 'quasar'
export default {
  data () {
    return {
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
      pagination: {
        page: 1,
        rowsPerPage: 15
      },
      loadingTable: true,
      columns: [
        {
          name: 'codigo',
          label: 'Código',
          align: 'left',
          sortable: true
        },
        {
          name: 'nombre_cliente',
          label: 'Cliente',
          align: 'left',
          sortable: true
        },
        {
          name: 'fecha_reclamo',
          label: 'Fecha',
          align: 'left',
          sortable: true
        },
        {
          name: 'descripcion_reclamo',
          label: 'Descripción',
          align: 'left',
          sortable: true
        }
      ],
      data: []
    }
  },
  created () {
    this.obtenerReclamo()
  },
  methods: {
    obtenerReclamo () {
      this.$services.getData(['factura', 'reclamo'],
        {
          fecha_ini: `${this.desde} 01:00:00`,
          fecha_fin: `${this.hasta} 23:59:59`
        }
      )
        .then(res => {
          this.data = res.res.data
          this.loadingTable = false
        })
        .catch(() => {
          this.loadingTable = false
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
