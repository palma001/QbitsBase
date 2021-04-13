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
              <q-btn color="primary" :disable="loading" label="Add row" @click="changeTitleForm('Agregar Transporte')" />
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
      <q-card style="width:600px; max-width:80vw;">
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
            title="Datos Básicos del Transporte"
            icon="settings"
            :done="step > 1"
          >
            <div class="row">
              <div class="col-12">
                <q-input v-model="transport_identifier" label="Unidad N°" />
              </div>
              <div class="col-4">
                <q-input v-model="model" label="Modelo" />
              </div>
              <div class="col-4">
                <q-input v-model="brand" label="Marca" />
              </div>
              <div class="col-4">
                <q-input v-model="year" label="Año" />
              </div>
              <div class="col-12">
                <q-input v-model="license_plate" label="¨Placa" />
              </div>
              <div class="col-12">
                <q-input v-model="vehicle_type" label="Tipo" />
              </div>
             </div>
          </q-step>

          <q-step
            :name="2"
            title="Datos Adicionales del Transporte"
            caption="Optional"
            icon="create_new_folder"
            :done="step > 2"
          >
            <div class="col-12">
                <q-input v-model="body_serial" label="Serial de carrocería" />
              </div>
              <div class="col-12">
                <q-input v-model="loading_capacity" label="Capacidad de carga" />
              </div>
              <div class="col-12">
                <q-input v-model="number_of_axles" label="Número de ejes" />
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
      selected: [],
      titleForm: 'Agregar Unidad de Transporte',
      visibleColumns: ['transport_identifier', 'license_plate', 'model', 'colour', 'vehicle_type', 'loading_capacity'],
      transport_identifier: '',
      license_plate: '',
      model: '',
      brand: '',
      colour: '',
      year: '',
      vehicle_type: '',
      body_serial: '',
      loading_capacity: '',
      number_of_axles: '',
      step: 1,
      inception: false,
      loading: false,
      filter: '',
      rowCount: 10,
      columns: [
        {
          name: 'transport_identifier',
          required: true,
          label: 'Unidad N°',
          align: 'left',
          field: row => row.transport_identifier,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'model', align: 'center', label: 'Modelo', field: 'model' },
        { name: 'brand', align: 'center', label: 'Marca', field: 'brand' },
        { name: 'colour', align: 'center', label: 'Color', field: 'colour' },
        { name: 'year', align: 'center', label: 'Año', field: 'year' },
        { name: 'license_plate', align: 'center', label: 'Placa', field: 'license_plate' },
        { name: 'vehicle_type', align: 'center', label: 'Tipo', field: 'vehicle_type', sortable: true },
        { name: 'body_serial', align: 'center', label: 'Serial Carrocería', field: 'body_serial' },
        { name: 'loading_capacity', align: 'center', label: 'Capacidade de Carga (Kg)', field: 'loading_capacity' },
        { name: 'number_of_axles', align: 'center', label: 'N° de Ejes', field: 'number_of_axles' }
      ],
      data: [
        {
          id: 1,
          transport_identifier: 'U-001',
          model: 'Panel  L300',
          brand: 'Mitsubishi',
          colour: 'blanco',
          year: '2009',
          license_plate: 'AA053BU',
          vehicle_type: 'Utilitario',
          body_serial: 'XPZ423D456SD2387K1',
          loading_capacity: '1000',
          number_of_axles: '2'
        },
        {
          id: 2,
          transport_identifier: 'U-001',
          model: 'Panel  L300',
          brand: 'Mitsubishi',
          colour: 'blanco',
          year: '2009',
          license_plate: 'AA053BU',
          vehicle_type: 'Utilitario',
          body_serial: 'XPZ423D456SD2387K1',
          loading_capacity: '1000',
          number_of_axles: '2'
        },
        {
          id: 3,
          transport_identifier: 'U-001',
          model: 'Panel  L300',
          brand: 'Mitsubishi',
          colour: 'blanco',
          year: '2009',
          license_plate: 'AA053BU',
          vehicle_type: 'Utilitario',
          body_serial: 'XPZ423D456SD2387K1',
          loading_capacity: '1000',
          number_of_axles: '2'
        },
        {
          id: 4,
          transport_identifier: 'U-001',
          model: 'Panel  L300',
          brand: 'Mitsubishi',
          colour: 'blanco',
          year: '2009',
          license_plate: 'AA053BU',
          vehicle_type: 'Utilitario',
          body_serial: 'XPZ423D456SD2387K1',
          loading_capacity: '1000',
          number_of_axles: '2'
        },
        {
          id: 5,
          transport_identifier: 'U-001',
          model: 'Panel  L300',
          brand: 'Mitsubishi',
          colour: 'blanco',
          year: '2009',
          license_plate: 'AA053BU',
          vehicle_type: 'Utilitario',
          body_serial: 'XPZ423D456SD2387K1',
          loading_capacity: '1000',
          number_of_axles: '2'
        },
        {
          id: 6,
          transport_identifier: 'U-001',
          model: 'Panel  L300',
          brand: 'Mitsubishi',
          colour: 'blanco',
          year: '2009',
          license_plate: 'AA053BU',
          vehicle_type: 'Utilitario',
          body_serial: 'XPZ423D456SD2387K1',
          loading_capacity: '1000',
          number_of_axles: '2'
        },
        {
          id: 7,
          transport_identifier: 'U-001',
          model: 'Panel  L300',
          brand: 'Mitsubishi',
          colour: 'blanco',
          year: '2009',
          license_plate: 'AA053BU',
          vehicle_type: 'Utilitario',
          body_serial: 'XPZ423D456SD2387K1',
          loading_capacity: '1000',
          number_of_axles: '2'
        },
        {
          id: 8,
          transport_identifier: 'U-001',
          model: 'Panel  L300',
          brand: 'Mitsubishi',
          colour: 'blanco',
          year: '2009',
          license_plate: 'AA053BU',
          vehicle_type: 'Utilitario',
          body_serial: 'XPZ423D456SD2387K1',
          loading_capacity: '1000',
          number_of_axles: '2'
        },
        {
          id: 9,
          transport_identifier: 'U-001',
          model: 'Panel  L300',
          brand: 'Mitsubishi',
          colour: 'blanco',
          year: '2009',
          license_plate: 'AA053BU',
          vehicle_type: 'Utilitario',
          body_serial: 'XPZ423D456SD2387K1',
          loading_capacity: '1000',
          number_of_axles: '2'
        },
        {
          id: 10,
          transport_identifier: 'U-001',
          model: 'Panel  L300',
          brand: 'Mitsubishi',
          colour: 'blanco',
          year: '2009',
          license_plate: 'AA053BU',
          vehicle_type: 'Utilitario',
          body_serial: 'XPZ423D456SD2387K1',
          loading_capacity: '1000',
          number_of_axles: '2'
        }
      ],
      original: [
        {
          transport_identifier: 'U-001',
          model: 'Panel  L300',
          brand: 'Mitsubishi',
          colour: 'blanco',
          year: '2009',
          license_plate: 'AA053BU',
          vehicle_type: 'Utilitario',
          body_serial: 'XPZ423D456SD2387K1',
          loading_capacity: '1000',
          number_of_axles: '2'
        },
        {
          transport_identifier: 'U-001',
          model: 'Panel  L300',
          brand: 'Mitsubishi',
          colour: 'blanco',
          year: '2009',
          license_plate: 'AA053BU',
          vehicle_type: 'Utilitario',
          body_serial: 'XPZ423D456SD2387K1',
          loading_capacity: '1000',
          number_of_axles: '2'
        },
        {
          transport_identifier: 'U-001',
          model: 'Panel  L300',
          brand: 'Mitsubishi',
          colour: 'blanco',
          year: '2009',
          license_plate: 'AA053BU',
          vehicle_type: 'Utilitario',
          body_serial: 'XPZ423D456SD2387K1',
          loading_capacity: '1000',
          number_of_axles: '2'
        },
        {
          transport_identifier: 'U-001',
          model: 'Panel  L300',
          brand: 'Mitsubishi',
          colour: 'blanco',
          year: '2009',
          license_plate: 'AA053BU',
          vehicle_type: 'Utilitario',
          body_serial: 'XPZ423D456SD2387K1',
          loading_capacity: '1000',
          number_of_axles: '2'
        },
        {
          transport_identifier: 'U-001',
          model: 'Panel  L300',
          brand: 'Mitsubishi',
          colour: 'blanco',
          year: '2009',
          license_plate: 'AA053BU',
          vehicle_type: 'Utilitario',
          body_serial: 'XPZ423D456SD2387K1',
          loading_capacity: '1000',
          number_of_axles: '2'
        },
        {
          transport_identifier: 'U-001',
          model: 'Panel  L300',
          brand: 'Mitsubishi',
          colour: 'blanco',
          year: '2009',
          license_plate: 'AA053BU',
          vehicle_type: 'Utilitario',
          body_serial: 'XPZ423D456SD2387K1',
          loading_capacity: '1000',
          number_of_axles: '2'
        },
        {
          transport_identifier: 'U-001',
          model: 'Panel  L300',
          brand: 'Mitsubishi',
          colour: 'blanco',
          year: '2009',
          license_plate: 'AA053BU',
          vehicle_type: 'Utilitario',
          body_serial: 'XPZ423D456SD2387K1',
          loading_capacity: '1000',
          number_of_axles: '2'
        },
        {
          transport_identifier: 'U-001',
          model: 'Panel  L300',
          brand: 'Mitsubishi',
          colour: 'blanco',
          year: '2009',
          license_plate: 'AA053BU',
          vehicle_type: 'Utilitario',
          body_serial: 'XPZ423D456SD2387K1',
          loading_capacity: '1000',
          number_of_axles: '2'
        },
        {
          transport_identifier: 'U-001',
          model: 'Panel  L300',
          brand: 'Mitsubishi',
          colour: 'blanco',
          year: '2009',
          license_plate: 'AA053BU',
          vehicle_type: 'Utilitario',
          body_serial: 'XPZ423D456SD2387K1',
          loading_capacity: '1000',
          number_of_axles: '2'
        },
        {
          transport_identifier: 'U-001',
          model: 'Panel  L300',
          brand: 'Mitsubishi',
          colour: 'blanco',
          year: '2009',
          license_plate: 'AA053BU',
          vehicle_type: 'Utilitario',
          body_serial: 'XPZ423D456SD2387K1',
          loading_capacity: '1000',
          number_of_axles: '2'
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
      this.transport_identifier = data.transport_identifier
      this.model = data.model
      this.brand = data.brand
      this.colour = data.colour
      this.year = data.year
      this.license_plate = data.license_plate
      this.vehicle_type = data.vehicle_type
      this.body_serial = data.body_serial
      this.loading_capacity = data.loading_capacity
      this.number_of_axles = data.number_of_axles
      this.changeTitleForm('Modificar Datos de Transporte')
    },
    changeTitleForm (title) {
      this.titleForm = title
      this.inception = true
    },
    cleanForm () {
      this.transport_identifier = ''
      this.model = ''
      this.brand = ''
      this.colour = ''
      this.year = ''
      this.license_plate = ''
      this.vehicle_type = ''
      this.body_serial = ''
      this.loading_capacity = ''
      this.number_of_axles = ''
      this.inception = false
      this.step = 1
    }
  }
}
</script>
