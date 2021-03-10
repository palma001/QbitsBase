<template>
  <div class="q-pa-md row q-gutter-y-md">
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
        :visible-columns="visibleColumns"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
        <template v-slot:top>
        <div class="col-2 q-table__title">Empaques</div>
        <q-space />
        <q-select
          option-value="name"
          style="min-width: 200px"
          multiple
          outlined
          dense
          options-dense
          emit-value
          map-options
          options-cover
          v-model="visibleColumns"
          :display-value="$q.lang.table.columns"
          :options="columns"
        />
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
  name: 'EmpaquesAdministrador',
  mixins: [mixins.containerMixin],
  data () {
    return {
      visibleColumns: [
        'codigo',
        'fecha_asignado_entregador',
        'fecha_registro',
        'tiempo_alistamiento',
        'fecha_fin_empaque',
        'tiempo_empaque',
        'tiempo_embalaje',
        'tiempo_entrega',
        'monto'
      ],
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
          name: 'fecha_asignado_entregador',
          align: 'left',
          label: 'Fecha de entrega al empacador',
          field: 'fecha_asignado_entregador',
          sortable: true
        },
        {
          name: 'fecha_registro',
          label: 'Fecha de emision',
          field: 'fecha_registro',
          align: 'left',
          sortable: true
        },
        {
          name: 'tiempo_alistamiento',
          label: 'Tiempo de empaque',
          field: 'tiempo_alistamiento',
          align: 'left',
          sortable: true
        },
        {
          name: 'tiempo_confirmacion',
          label: 'Tiempo de confirmación',
          field: 'tiempo_confirmacion',
          align: 'left',
          sortable: true
        },
        {
          name: 'tiempo_embalaje',
          label: 'Tiempo de embalaje',
          field: 'tiempo_embalaje',
          align: 'left',
          sortable: true
        },
        {
          name: 'tiempo_entrega',
          label: 'Tiempo de entrega',
          field: 'tiempo_entrega',
          align: 'left',
          sortable: true
        },
        {
          name: 'monto',
          label: 'Total',
          field: 'monto',
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
      const { res } = await this.$services.getData(['factura'],
        {
          fecha: this.desde,
          entregado: 'N'
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
      return date.formatDate(fecha, format) ?? '-'
    },
    /**
     * Calcula la fecha transcurrida
     * @param {String} desde fecha de inicio
     * @param {String} hasta fecha fin
     * @returns {String} el calculo de la fecha
     */
    dateDiff (desde, hasta) {
      if (desde && hasta) {
        const minutes = date.getDateDiff(hasta, desde, 'minutes')
        const seconds = date.getDateDiff(hasta, desde, 'seconds')
        const hours = date.getDateDiff(hasta, desde, 'hours')
        const days = date.getDateDiff(hasta, desde, 'days')
        return `${days}d : ${this.resetNumber(hours, 24)}h : ${this.resetNumber(minutes, 60)}m : ${this.resetNumber(seconds, 60)}s`
      }
      return '-'
    },
    /**
     * Retear fechas
     * @param {Number} number nume
     * @param {Number} limir fecha fin
     * @returns {Number} el calculo de la fecha
     */
    resetNumber (number, limit) {
      let s = 0
      for (let index = 0; index < number; index++) {
        if (s >= limit) {
          s = 0
        }
        s++
      }
      return s >= 10 ? s : `0${s}`
    }
  }
}
</script>
