<template>
  <q-page padding>
    <div classe="row">
      <div class="col-12">
        <div class="q-pa-md">
          <q-table
            title="Treats"
            :data="data"
            :columns="columns"
            row-key="id"
            :filter="filter"
            :loading="loading"
            selection="multiple"
            :selected.sync="selected"
            :visible-columns="visibleColumns"
          >
            <template v-slot:top>
              <q-btn color="primary" :disable="loading" label="Add row" @click="changeTitleForm('Agregar Sucursal')" />
              <q-btn class="q-ml-sm" color="primary" :disable="loading" label="Remove row" @click="removeRow" />
              <q-space />
              <q-input dense debounce="300" color="primary" v-model="filter">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <template v-slot:header="props">
              <q-tr :props="props">
                <!--<q-th>
                  <q-toggle v-model="props.selected"/>
                </q-th>-->
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  {{col.label}}
                </q-th>
                <q-th>
                  Acciones
                </q-th>
              </q-tr>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props" >
                <!--<q-td>
                  <q-toggle v-model="props.selected"/>
                </q-td>-->
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  {{col.value}}
                </q-td>
                <q-td>
                  <q-btn icon="visibility" color="primary" rounded size="sm" @click="viewDetail(props.row)">
                  </q-btn>
                </q-td>
              </q-tr>
            </template>

          </q-table>
        </div>
      </div>
    </div>
    <q-dialog v-model="inception">
      <q-card style="width:1000px; max-width:80vw;">
        <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">
               {{titleForm}}
            </div>
          <q-space />
          <q-btn icon="close" flat round dense @click="cleanForm" />
        </q-card-section>

        <q-card-section>
          <div class="col-12">
                <q-input v-model="name" label="Sucursal" />
              </div>
              <div class="col-12">
                <q-input v-model="description" label="Descripción" />
              </div>
              <div class="col-12">
                <q-input v-model="city" label="Ciudad" />
              </div>
              <div class="col-12">
                <q-input v-model="state" label="Estado" />
              </div>
              <div class="col-12">
                <q-input v-model="address" label="Dirección" />
              </div>
              <div class="col-12">
                <q-input v-model="phone_number" label="Teléfono (1)" />
              </div>
              <div class="col-12">
                <q-input v-model="phone_number_two" label="Teléfono (2)" />
              </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Aceptar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      titleForm: 'Agregar Sucursal',
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
        }/*,
        {
          id: 4,
          name: 'Carlos Pérez',
          document_number: '19.581.680',
          rol: 'Cajero(a)',
          branch_office: 'Puerto La Cruz',
          phone_number: '0412-1927835',
          email: 'carlosperez57@gmail.com'
        },
        {
          id: 5,
          name: 'Karla Martínez',
          document_number: '19.581.680',
          rol: 'Cajero(a)',
          branch_office: 'Puerto La Cruz',
          phone_number: '0426-5564120',
          email: 'karlapatrici@yahoo.com'
        },
        {
          id: 6,
          name: 'Pedro Sifontes',
          document_number: '19.581.680',
          rol: 'Supervisor(a)',
          branch_office: 'Tumeremo',
          phone_number: '0412-3205569',
          email: 'pedrosifontespere87@gmail.com'
        },
        {
          id: 7,
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: '0%',
          iron: '2%'
        },
        {
          id: 8,
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: '0%',
          iron: '45%'
        },
        {
          id: 9,
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: '2%',
          iron: '22%'
        },
        {
          id: 10,
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: '12%',
          iron: '6%'
        } */
      ],
      original: [
        {
          name: 'Luis Palma',
          calories: 'Supervisor',
          fat: 'Puerto La Cruz',
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: '7%',
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: '0%',
          iron: '0%'
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: '0%',
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: '0%',
          iron: '45%'
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: '2%',
          iron: '22%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: '12%',
          iron: '6%'
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
