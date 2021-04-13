<template>
  <q-page padding>
    <div class="row">
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
              <q-btn color="primary" :disable="loading" label="Add row" @click="changeTitleForm('Agregar Usuario')" />
              <q-btn class="q-ml-sm" color="primary" :disable="loading" label="Remove row" @click="removeRow" />
              <q-space />
              <q-input dense debounce="300" color="primary" v-model="filter">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <!--<template v-slot:header-selection="scope">
              <q-toggle v-model="scope.selected" />
            </template>-->
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th>
                  <q-toggle v-model="props.selected"/>
                </q-th>
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  {{col.label}}
                </q-th>
                <q-th>
                  Acciones
                </q-th>
              </q-tr>
            </template>
            <!--<template v-slot:body-selection="scope">
             <q-toggle v-model="scope.selected" />
            </template>-->
            <template v-slot:body="props">
              <q-tr :props="props" >
                <q-td>
                  <q-toggle v-model="props.selected"/>
                </q-td>
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
        <q-card-section class='row'>
          <div class='text-h6'>
            {{titleForm}}
          </div>
          <q-space/>
          <q-btn icon="close" flat round dense @click="cleanForm"/>
        </q-card-section>

        <q-card-section class='q-pa-none'>
          <q-stepper
          v-model="step"
          ref="stepper"
          color="primary"
          animated
        >
          <q-step
            :name="1"
            title="Datos Personales"
            icon="settings"
            :done="step > 1"
          >
            <div class="row">
              <div class="col-12">
                <q-input v-model="name" label="Nombre" />
              </div>
              <div class="col-12">
                <q-input v-model="last_name" label="Apellidos" />
              </div>
              <div class="col-3">
                <q-select v-model="document_type" :options="options" label="Tipo de documento" />
              </div>
              <div class="col-9">
                <q-input v-model="document_number" label="Documento" />
              </div>
              <div class="col-12">
                <q-input v-model="address" label="Dirección" />
              </div>
              <div class="col-12">
                <q-input v-model="phone_number" label="Teléfono" />
              </div>
             </div>
          </q-step>

          <q-step
            :name="2"
            title="Datos de la Empresa"
            caption="Optional"
            icon="create_new_folder"
            :done="step > 2"
          >
            <div class="col-12">
                <q-input v-model="rol" label="Cargo" />
              </div>
              <div class="col-12">
                <q-input v-model="branch_office" label="Sucursal" />
              </div>
          </q-step>

          <q-step
            :name="3"
            title="Datos de Cuenta de Usuario"
            icon="assignment"
          >
            <div class="col-12">
              <q-input v-model="email" label="email" />
            </div>
            <div class="col-12">
              <q-input v-model="password" label="Clave" />
            </div>
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn @click="$refs.stepper.next()" color="primary" :label="step === 4 ? 'Finish' : 'Continue'" />
              <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
            </q-stepper-navigation>
          </template>
          </q-stepper>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      titleForm: 'Agregar Usuario',
      visibleColumns: ['name', 'document_number', 'rol', 'branch_office', 'phone_number', 'email'],
      name: '',
      last_name: '',
      document_type: '',
      document_number: '',
      address: '',
      phone_number: '',
      rol: '',
      branch_office: '',
      email: '',
      password: '',
      selector: false,
      selected: [],
      options: ['V', 'P'],
      step: 1,
      inception: false,
      loading: false,
      filter: '',
      rowCount: 10,
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Nombre y Apellidos',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'last_name', align: 'center', label: 'Apellidos', field: 'last_name' },
        { name: 'document_type', align: 'center', label: 'Tipo de Documento', field: 'document_type' },
        { name: 'document_number', align: 'center', label: 'Documento', field: 'document_number', sortable: true },
        { name: 'rol', align: 'center', label: 'Cargo', field: 'rol', sortable: true },
        { name: 'branch_office', align: 'center', label: 'Sucursal', field: 'branch_office', sortable: true },
        { name: 'phone_number', align: 'center', label: 'Teléfono', field: 'phone_number' },
        { name: 'email', align: 'center', label: 'email', field: 'email' },
        { name: 'address', align: 'center', label: 'Dirección', field: 'address' }
        /*
        { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) } */
      ],
      data: [
        {
          id: 1,
          name: 'Luis Palma',
          document_number: '17.222.333',
          rol: 'Supervisor(a)',
          branch_office: 'Puerto La Cruz',
          phone_number: '0414-8324420',
          email: 'palmalu97@gmail.com'
          /* calcium: '14%',
          iron: '1%' */
        },
        {
          id: 2,
          name: 'Carlos Salazar',
          document_number: '20.143.585',
          rol: 'Almacenista',
          branch_office: 'Puerto La Cruz',
          phone_number: '0416-3879568',
          email: 'salazarcarl@hotmail.com'
          /* calcium: '14%',
          iron: '1%' */
        },
        {
          id: 3,
          name: 'Juan Briceño',
          document_number: '5.148.754',
          rol: 'Transportista',
          branch_office: 'Puerto La Cruz',
          phone_number: '0424-521469',
          email: 'bricenojuanman@gmail.com'
          /* calcium: '14%',
          iron: '1%' */
        },
        {
          id: 4,
          name: 'Carlos Pérez',
          document_number: '19.581.680',
          rol: 'Cajero(a)',
          branch_office: 'Puerto La Cruz',
          phone_number: '0412-1927835',
          email: 'carlosperez57@gmail.com'
          /* calcium: '14%',
          iron: '1%' */
        },
        {
          id: 5,
          name: 'Karla Martínez',
          document_number: '19.581.680',
          rol: 'Cajero(a)',
          branch_office: 'Puerto La Cruz',
          phone_number: '0426-5564120',
          email: 'karlapatrici@yahoo.com'
          /* calcium: '14%',
          iron: '1%' */
        },
        {
          id: 6,
          name: 'Pedro Sifontes',
          document_number: '19.581.680',
          rol: 'Supervisor(a)',
          branch_office: 'Tumeremo',
          phone_number: '0412-3205569',
          email: 'pedrosifontespere87@gmail.com'
          /* calcium: '14%',
          iron: '1%' */
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
        }
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
      this.last_name = data.last_name
      this.document_type = data.document_type
      this.document_number = data.document_number
      this.address = data.address
      this.phone_number = data.phone_number
      this.rol = data.rol
      this.branch_office = data.branch_office
      this.email = data.email
      this.changeTitleForm('Modificar Usuario')
    },
    changeTitleForm (title) {
      this.titleForm = title
      this.inception = true
    },
    cleanForm () {
      this.name = ''
      this.last_name = ''
      this.document_type = ''
      this.document_number = ''
      this.address = ''
      this.phone_number = ''
      this.rol = ''
      this.branch_office = ''
      this.email = ''
      this.inception = false
      this.step = 1
    }
  }
}
</script>
