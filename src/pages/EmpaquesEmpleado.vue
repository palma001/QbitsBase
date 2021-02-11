<template>
  <div class="q-pa-md q-gutter-y-md row">
    <div class="col-12 row">
      <div class="col-sm-3 col-xs-5">
        <q-input v-model="desde" filled type="date" dense style="width: 97%"/>
      </div>
      <div class="col-sm-3 col-xs-5">
        <q-input v-model="hasta" filled type="date" dense style="width: 97%"/>
      </div>
      <div class="col-sm-3 col-xs-2">
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
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="codigo" :props="props">
              {{ props.row.codigo }}
            </q-td>
            <q-td key="status" :props="props">
              <q-badge :color="statusFactura[props.row.status].color" class="q-pa-xs">
                {{ statusFactura[props.row.status].text }}
              </q-badge>
            </q-td>
            <q-td key="fecha_emision" :props="props">
              {{ dateFormat(props.row.fecha_emision) }}
            </q-td>
            <q-td key="fecha_inicio_empaque" :props="props">
              {{ dateFormat(props.row.fecha_inicio_empaque) }}
            </q-td>
            <q-td key="fecha_fin_empaque" :props="props">
              {{ dateFormat(props.row.fecha_fin_empaque) }}
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
import { date } from 'quasar'
export default {
  mixins: [mixins.containerMixin],
  data () {
    return {
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
      loadingTable: false,
      /**
       * Valor de la fecha del empaques
       * @type {String} fecha desde del empaque
       */
      desde: date.formatDate(Date.now(), 'YYYY-MM-DD'),
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
          name: 'status',
          align: 'left',
          label: 'Estado',
          field: 'status',
          sortable: true
        },
        {
          name: 'fecha_emision',
          label: 'Fecha de emision',
          field: 'fecha_emision',
          align: 'left',
          sortable: true
        },
        {
          name: 'fecha_inicio_empaque',
          label: 'Inicio del empaque',
          field: 'fecha_inicio_empaque',
          align: 'left',
          sortable: true
        },
        {
          name: 'fecha_fin_empaque',
          label: 'Fin del empaque',
          field: 'fecha_fin_empaque',
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
    /**
     * Obtener todas las facturas del empleado en sesión
     */
    async obtenerFacturas () {
      this.loadingTable = true
      const { res } = await this.$services.getData(['factura', 'empleado-empaque', this[GETTERS.GET_USER].codigo],
        {
          fecha_ini: `${this.desde} 01:00:00`,
          fecha_fin: `${this.hasta} 23:59:59`
        }
      )
      console.log(res.data)
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
    },
    /**
     * Da dormato a la fecha
     * @param {String} fecha fecha con formato por defecto
     * @param {String} format formato de la fecha
     * @returns {String} fecha con formato
     */
    dateFormat (fecha, format = 'DD-MM-YYYY HH:mm:ss') {
      return date.formatDate(fecha, format)
    }
  }
}
</script>
