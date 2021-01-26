<template>
  <div class="q-pa-md q-gutter-y-md row">
    <div class="col-12 row">
      <div class="col-1 q-mt-sm">
        Filtrar por:
      </div>
      <div class="col-3">
        <q-input v-model="desde" filled type="date" dense/>
      </div>
      <div class="col-3 q-ml-md">
        <q-input v-model="hasta" filled type="date" dense/>
      </div>
    </div>
    <div class="col-12">
      <q-table
        title="Empaques"
        :data="data"
        :columns="columns"
        row-key="name"
      />
    </div>
  </div>
</template>

<script>
import { mixins } from '../mixins'
export default {
  mixins: [mixins.containerMixin],
  data () {
    return {
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
          name: 'fecha',
          align: 'center',
          label: 'Fecha emitida',
          field: 'fecha',
          sortable: true
        }
      ],
      /**
       * Data de la tabla
       * @type {Array} data de la tabla
       */
      data: [
        {
          codigo: 9823982938,
          fecha: '01/26/2021 10:00 am'
        },
        {
          codigo: 7627362763,
          fecha: '01/26/2021 11:00 am'
        },
        {
          codigo: 'Eclair',
          fecha: '01/26/2021 12:00 am'
        }
      ]
    }
  }
}
</script>
