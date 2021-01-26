<template>
  <div class="q-pa-md row">
    <div class="col-12 row justify-between q-gutter-y-sm">
      <div class="col-sm-3 col-xs-12">
        <q-input filled dense v-model="codigo_factura" label="Código Factura" />
      </div>
      <div class="col-sm-3 col-xs-12">
        <q-select filled dense v-model="tipo_empaque" :options="options" label="Tipos de Empaque" />
      </div>
      <div class="col-sm-5 col-xs-12">
        <q-btn color="teal" text-color="white" label="Finalizar Empaque" size="15px"/>
      </div>
    </div>
    <div class="col-12 q-mt-md">
      <q-table
        title="Productos"
        :data="data"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:body="props">
          <q-tr :props="props" :class="props.row.cantidad === props.row.cantidad_embalado ? 'bg-teal' : ''">
            <q-td key="name" :props="props">
              {{ props.row.name }}
            </q-td>
            <q-td key="cantidad" :props="props">
              {{ props.row.cantidad }}
            </q-td>
            <q-td key="cantidad_embalado" :props="props">
              {{ props.row.cantidad_embalado }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
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
        {
          name: 'cantidad',
          align: 'center',
          label: 'Cantidad producto',
          field: 'cantidad',
          sortable: true
          // classes: row => row.cantidad === row.fat ? 'bg-teal' : ''
        },
        {
          name: 'cantidad_embalado',
          label: 'Cantidad embalado',
          field: 'cantidad_embalado',
          sortable: true
          // classes: row => row.cantidad === row.fat ? 'bg-teal' : ''
        }
      ],
      /**
       * Data de la tabla de los productos de la factura
       * @type {Array} data de la tabla
       */
      data: [
        {
          name: 'Frozen Yogurt',
          cantidad: 159,
          cantidad_embalado: 159
        },
        {
          name: 'Ice cream sandwich',
          cantidad: 237,
          cantidad_embalado: 9.0
        },
        {
          name: 'Eclair',
          cantidad: 262,
          cantidad_embalado: 16.0
        }
      ]
    }
  }
}
</script>

<style>

</style>
