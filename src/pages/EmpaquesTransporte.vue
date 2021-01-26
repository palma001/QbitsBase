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
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="codigo" :props="props">
              {{ props.row.codigo }}
            </q-td>
            <q-td key="estado" :props="props">
              <q-badge :color="props.row.estado === 'en ruta' ? 'red' : 'green'">
                {{ props.row.estado }}
              </q-badge>
            </q-td>
            <q-td key="fecha" :props="props">
              {{ props.row.fecha }}
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
          name: 'estado',
          align: 'center',
          label: 'Estado',
          field: 'estado',
          sortable: true
        },
        {
          name: 'fecha',
          label: 'Fecha de entrega',
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
          estado: 'entregado',
          fecha: '26/01/2021'
        },
        {
          codigo: 7627362763,
          estado: 'en ruta',
          fecha: '-'
        },
        {
          codigo: 8327483274,
          estado: 'en ruta',
          fecha: '-'
        }
      ]
    }
  }
}
</script>
