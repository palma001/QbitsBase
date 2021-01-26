<template>
  <div class="q-pa-md row">
    <div class="col-12 row">
      <div class="col-3">
        <q-input style="width:200px" v-model="codigo_factura" label="Código Factura" />
      </div>
      <div class="col-3">
        <q-select style="width:200px" v-model="tipo_empaque" :options="options" label="Tipos de Empaque" />
      </div>
      <div class="col-3">
        <q-btn color="teal" text-color="white" label="Finalizar Empaque" class="q-mt-md"/>
      </div>
    </div>
    <div class="col-12 q-mt-md">
      <q-table
        title="Productos"
        :data="data"
        :columns="columns"
        row-key="name"
      />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      /**
       * Código de la factura
       * @type {String} código de la factura
       */
      codigo_factura: null,
      /**
       * Valor del tipo de empaque
       * @type {String} tipo de empaque
       */
      tipo_empaque: null,
      /**
       * Tipos de empaque
       * @type {Array} datos de los tipo de empaque
       */
      options: [
        'CAJA', 'BOLSA', 'SOBRE'
      ],
      /**
       * Columnas de la tabla de los productos de la factura
       * @type {Array} columnas de la tabla
       */
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Nombre del producto',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'cantidad', align: 'center', label: 'Cantidad producto', field: 'cantidad', sortable: true },
        { name: 'fat', label: 'Cantidad embalado', field: 'fat', sortable: true }
      ],
      /**
       * Data de la tabla de los productos de la factura
       * @type {Array} data de la tabla
       */
      data: [
        {
          name: 'Frozen Yogurt',
          cantidad: 159,
          fat: 6.0
        },
        {
          name: 'Ice cream sandwich',
          cantidad: 237,
          fat: 9.0
        },
        {
          name: 'Eclair',
          cantidad: 262,
          fat: 16.0
        }
      ]
    }
  }
}
</script>

<style>

</style>
