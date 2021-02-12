<template>
  <div class="q-pa-md q-gutter-y-md row">
    <div class="col-12 row q-gutter-sm">
      <q-table
        title="Reclamos por Facturas"
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
      columns: [
        {
          name: 'CODIGO',
          label: 'Código',
          align: 'left',
          field: row => row.CODIGO,
          sortable: true
        },
        { name: 'NOMBRE_CLIENTE', align: 'center', label: 'Cliente', field: row => row.NOMBRE_CLIENTE, sortable: true },
        { name: 'FECHA_RECLAMO', align: 'center', label: 'Fecha', field: row => row.FECHA_RECLAMO, sortable: true },
        { name: 'DESCRIPCION_RECLAMO', align: 'center', label: 'Descripción', field: row => row.DESCRIPCION_RECLAMO, sortable: true }
      ],
      data: []
    }
  },
  created () {
    this.obtenerreclamo()
  },
  methods: {
    obtenerreclamo () {
      this.$services.getData(['factura', 'reclamo'])
        .then(res => {
          this.data = res.res.data
        })
    }
  }
}
</script>
