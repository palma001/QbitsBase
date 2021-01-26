<template>
  <div class="q-pa-md row">
    <div class="col-12 row justify-between q-gutter-y-sm">
      <div class="col-sm-3 col-xs-12">
        <q-input
          filled
          dense
          v-model="codigo_factura"
          label="Código Factura"
          @keyup.enter="obtenerFactura"
          :disable="factura.length === 0 ? false : true"
        />
      </div>
      <div class="col-sm-3 col-xs-12">
        <q-select filled dense v-model="tipo_empaque" :options="options" label="Tipos de Empaque" />
      </div>
      <div class="col-sm-5 col-xs-12">
        <q-btn color="teal" text-color="white" label="Finalizar Empaque" size="15px"/>
      </div>
    </div>
    <div class="col-12 q-mt-md" v-if="factura.length > 0">
      <q-table
        title="Productos"
        :data="factura"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:body="props">
          <q-tr :props="props" :class="props.row.cantidad === props.row.cantidad_embalado ? 'bg-teal' : ''">
            <q-td key="nombre_producto" :props="props">
              {{ props.row.nombre_producto }}
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
      barcode: '',
      codeDisable: false,
      factura: [],
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
          name: 'nombre_producto',
          required: true,
          label: 'Nombre del producto',
          align: 'left',
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
  },
  mounted () {
    window.addEventListener('keyup', event => {
      this.getCode(event)
    })
  },
  methods: {
    getCode (e) {
      const code = (e.keyCode ? e.keyCode : e.which)
      if (code === 13) {
        if (this.factura.length > 0) {
          this.obtenerProducto(this.barcode)
        }
        this.barcode = ''
      } else {
        this.barcode += e.key
      }
    },
    /**
     * Obtener factura
     */
    async obtenerFactura () {
      const { response } = await this.$mockData.getOneData('facturas', this.codigo_factura)
      this.factura = response.data.content.detalles.map(product => {
        product.cantidad_embalado = 0
        return product
      })
    },
    /**
     * Obtener producto
     * @param {String} codigo codigo del producto
     */
    obtenerProducto (codigo) {
      const factura = this.factura.filter(row => Number(row.codigo) === Number(codigo))
      if (factura.length > 0) {
        this.factura.map(product => {
          if (Number(product.codigo) === Number(codigo)) {
            if (product.cantidad > product.cantidad_embalado) {
              product.cantidad_embalado += 1
              return product
            } else {
              alert('Producto supero el limite')
            }
          }
        })
      } else {
        alert('Producto no encontrado')
      }
    }
  }
}
</script>

<style>

</style>
