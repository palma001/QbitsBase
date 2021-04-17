<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <div class="q-pa-md">
          <data-table
            title="list"
            module="branchOffice"
          />
        </div>
      </div>
    </div>
<!--     <q-dialog v-model="inception">
      </q-card>
    </q-dialog> -->
  </q-page>
</template>
<script>
import DataTable from '../components/DataTable.vue'
export default {
  components: {
    DataTable
  },
  data () {
    return {
      titleForm: "Agregar Sucursal",
      visibleColumns: ['name', 'description', 'city', 'state', 'phone_number', 'phone_number_two', 'in_charge'],
      name: '',
      description: '',
      city: '',
      state: '',
      address: '',
      phone_number: '',
      phone_number_two: '',
      in_charge: '',
      selector: false,
      selected: [],
      options: ['V', 'P'],
      // step: 1,
      inception: false,
      loading: false,
      filter: '',
      rowCount: 10,
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Sucursal',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'description', align: 'center', label: 'Descripción', field: 'description', sortable: true },
        { name: 'city', align: 'center', label: 'Ciudad', field: 'city', sortable: true },
        { name: 'state', align: 'center', label: 'Estado', field: 'state', sortable: true },
        { name: 'address', align: 'center', label: 'Dirección', field: 'address' },
        { name: 'phone_number', align: 'center', label: 'Teléfono (1)', field: 'phone_number' },
        { name: 'phone_number_two', align: 'center', label: 'Teléfono (2)', field: 'phone_number_two' },
        { name: 'in_charge', align: 'center', label: 'Supervisor(a)', field: 'in_charge' }
      ],
      data: [
        {
          id: 1,
          name: 'Puerto La Cruz',
          description: 'Sucursal-101',
          city: 'Puerto La Cruz',
          state: 'Anzoátegui',
          address: 'Av. Intercomunal, Sector Las Garzas, CCMT',
          phone_number: '0281-2862034',
          phone_number_two: '0424-8456912',
          in_charge: 'Luis Palma'
        },
        {
          id: 2,
          name: 'Barcelona',
          description: 'Sucursal-102',
          city: 'Barcelona',
          state: 'Anzoátegui',
          address: 'Av. Intercomunal, Sector Las Garzas, CCMT',
          phone_number: '0281-2652034',
          phone_number_two: '0412-4789127',
          in_charge: 'Amable Salés'
        },
        {
          id: 3,
          name: 'Caracas',
          description: 'Sucursal-001',
          city: 'Caracas',
          state: 'Distrito Capital',
          address: 'Av. Francisco de Miranda, Frente al Parque del Este',
          phone_number: '0212-4283034',
          phone_number_two: '0412-9581752',
          in_charge: 'Carlos Ferreira'
        },
        {
          id: 4,
          name: 'Caracas',
          description: 'Sucursal-001',
          city: 'Caracas',
          state: 'Distrito Capital',
          address: 'Av. Francisco de Miranda, Frente al Parque del Este',
          phone_number: '0212-4283034',
          phone_number_two: '0412-9581752',
          in_charge: 'Carlos Ferreira'
        },
        {
          id: 5,
          name: 'Caracas',
          description: 'Sucursal-001',
          city: 'Caracas',
          state: 'Distrito Capital',
          address: 'Av. Francisco de Miranda, Frente al Parque del Este',
          phone_number: '0212-4283034',
          phone_number_two: '0412-9581752',
          in_charge: 'Carlos Ferreira'
        },
        {
          id: 6,
          name: 'Caracas',
          description: 'Sucursal-001',
          city: 'Caracas',
          state: 'Distrito Capital',
          address: 'Av. Francisco de Miranda, Frente al Parque del Este',
          phone_number: '0212-4283034',
          phone_number_two: '0412-9581752',
          in_charge: 'Carlos Ferreira'
        },
        {
          id: 7,
          name: 'Caracas',
          description: 'Sucursal-001',
          city: 'Caracas',
          state: 'Distrito Capital',
          address: 'Av. Francisco de Miranda, Frente al Parque del Este',
          phone_number: '0212-4283034',
          phone_number_two: '0412-9581752',
          in_charge: 'Carlos Ferreira'
        },
        {
          id: 8,
          name: 'Caracas',
          description: 'Sucursal-001',
          city: 'Caracas',
          state: 'Distrito Capital',
          address: 'Av. Francisco de Miranda, Frente al Parque del Este',
          phone_number: '0212-4283034',
          phone_number_two: '0412-9581752',
          in_charge: 'Carlos Ferreira'
        },
        {
          id: 9,
          name: 'Caracas',
          description: 'Sucursal-001',
          city: 'Caracas',
          state: 'Distrito Capital',
          address: 'Av. Francisco de Miranda, Frente al Parque del Este',
          phone_number: '0212-4283034',
          phone_number_two: '0412-9581752',
          in_charge: 'Carlos Ferreira'
        },
        {
          id: 10,
          name: 'Caracas',
          description: 'Sucursal-001',
          city: 'Caracas',
          state: 'Distrito Capital',
          address: 'Av. Francisco de Miranda, Frente al Parque del Este',
          phone_number: '0212-4283034',
          phone_number_two: '0412-9581752',
          in_charge: 'Carlos Ferreira'
        }
      ],
      original: [
        {
          name: 'Caracas',
          description: 'Sucursal-001',
          city: 'Caracas',
          state: 'Distrito Capital',
          address: 'Av. Francisco de Miranda, Frente al Parque del Este',
          phone_number: '0212-4283034',
          phone_number_two: '0412-9581752',
          in_charge: 'Carlos Ferreira'
        },
        {
          name: 'Caracas',
          description: 'Sucursal-001',
          city: 'Caracas',
          state: 'Distrito Capital',
          address: 'Av. Francisco de Miranda, Frente al Parque del Este',
          phone_number: '0212-4283034',
          phone_number_two: '0412-9581752',
          in_charge: 'Carlos Ferreira'
        },
        {
          name: 'Caracas',
          description: 'Sucursal-001',
          city: 'Caracas',
          state: 'Distrito Capital',
          address: 'Av. Francisco de Miranda, Frente al Parque del Este',
          phone_number: '0212-4283034',
          phone_number_two: '0412-9581752',
          in_charge: 'Carlos Ferreira'
        },
        {
          name: 'Caracas',
          description: 'Sucursal-001',
          city: 'Caracas',
          state: 'Distrito Capital',
          address: 'Av. Francisco de Miranda, Frente al Parque del Este',
          phone_number: '0212-4283034',
          phone_number_two: '0412-9581752',
          in_charge: 'Carlos Ferreira'
        },
        {
          name: 'Caracas',
          description: 'Sucursal-001',
          city: 'Caracas',
          state: 'Distrito Capital',
          address: 'Av. Francisco de Miranda, Frente al Parque del Este',
          phone_number: '0212-4283034',
          phone_number_two: '0412-9581752',
          in_charge: 'Carlos Ferreira'
        },
        {
          name: 'Caracas',
          description: 'Sucursal-001',
          city: 'Caracas',
          state: 'Distrito Capital',
          address: 'Av. Francisco de Miranda, Frente al Parque del Este',
          phone_number: '0212-4283034',
          phone_number_two: '0412-9581752',
          in_charge: 'Carlos Ferreira'
        },
        {
          name: 'Caracas',
          description: 'Sucursal-001',
          city: 'Caracas',
          state: 'Distrito Capital',
          address: 'Av. Francisco de Miranda, Frente al Parque del Este',
          phone_number: '0212-4283034',
          phone_number_two: '0412-9581752',
          in_charge: 'Carlos Ferreira'
        },
        {
          name: 'Caracas',
          description: 'Sucursal-001',
          city: 'Caracas',
          state: 'Distrito Capital',
          address: 'Av. Francisco de Miranda, Frente al Parque del Este',
          phone_number: '0212-4283034',
          phone_number_two: '0412-9581752',
          in_charge: 'Carlos Ferreira'
        },
        {
          name: 'Caracas',
          description: 'Sucursal-001',
          city: 'Caracas',
          state: 'Distrito Capital',
          address: 'Av. Francisco de Miranda, Frente al Parque del Este',
          phone_number: '0212-4283034',
          phone_number_two: '0412-9581752',
          in_charge: 'Carlos Ferreira'
        },
        {
          name: 'Caracas',
          description: 'Sucursal-001',
          city: 'Caracas',
          state: 'Distrito Capital',
          address: 'Av. Francisco de Miranda, Frente al Parque del Este',
          phone_number: '0212-4283034',
          phone_number_two: '0412-9581752',
          in_charge: 'Carlos Ferreira'
        }
      ]
    }
  },

  methods: {
    // emulate fetching data from server
    addRow () {
      this.loading = true
      setTimeout(() => {
        const
          index = Math.floor(Math.random() * (this.data.length + 1)),
          row = this.original[Math.floor(Math.random() * this.original.length)]
        if (this.data.length === 0) {
          this.rowCount = 0
        }
        row.id = ++this.rowCount
        const addRow = { ...row } // extend({}, row, { name: `${row.name} (${row.__count})` })
        this.data = [...this.data.slice(0, index), addRow, ...this.data.slice(index)]
        this.loading = false
      }, 500)
    },

    removeRow () {
      this.loading = true
      setTimeout(() => {
        const index = Math.floor(Math.random() * this.data.length)
        this.data = [...this.data.slice(0, index), ...this.data.slice(index + 1)]
        this.loading = false
      }, 500)
    },
    viewDetail (data) {
      this.name = data.name
      this.description = data.description
      this.city = data.city
      this.state = data.state
      this.address = data.address
      this.phone_number = data.phone_number
      this.phone_number_two = data.phone_number_two
      this.changeTitleForm('Actualizar Datos de la Sucursal ')
    },
    changeTitleForm (title) {
      this.titleForm = title
      this.inception = true
    },
    cleanForm () {
      this.name = ''
      this.description = ''
      this.city = ''
      this.state = ''
      this.address = ''
      this.phone_number = ''
      this.phone_number_two = ''
      this.inception = false
    }
  }
}
</script>
