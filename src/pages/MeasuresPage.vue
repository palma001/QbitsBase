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
              <q-btn color="primary" :disable="loading" label="Add row" @click="changeTitleForm('Agregar Medida')" />
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
        <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">
               {{titleForm}}
            </div>
          <q-space />
          <q-btn icon="close" flat round dense @click="cleanForm" />
        </q-card-section>

        <q-card-section>
          <div class="col-12">
                <q-input v-model="name" label="Medida" />
              </div>
              <div class="col-12">
                <q-input v-model="acronym" label="Unidad" />
              </div>
              <div class="col-12">
                <q-input v-model="cost" label="Costo ($)" />
              </div>
              <div class="col-12">
                <q-input v-model="date" label="Fecha" />
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
      titleForm: 'Agregar Medida',
      visibleColumns: ['name', 'acronym', 'cost', 'date'],
      name: '',
      acronym: '',
      cost: '',
      date: '',
      selector: false,
      selected: [],
      options: ['V', 'P'],
      inception: false,
      loading: false,
      filter: '',
      rowCount: 10,
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Descripción',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'acronym', align: 'center', label: 'Unidad', field: 'acronym', sortable: true },
        { name: 'cost', align: 'center', label: 'Costo ($)', field: 'cost', sortable: true },
        { name: 'date', align: 'center', label: 'Fecha', field: 'date', sortable: true }
      ],
      data: [
        {
          id: 1,
          name: 'Peso',
          acronym: 'Kg',
          cost: '1.0',
          date: '10/04/2021'
        },
        {
          id: 2,
          name: 'Largo',
          acronym: 'cm',
          cost: '0.02',
          date: '10/04/2021'
        },
        {
          id: 3,
          name: 'Ancho',
          acronym: 'cm',
          cost: '0.02',
          date: '10/04/2021'
        },
        {
          id: 4,
          name: 'Profundidad',
          acronym: 'cm',
          cost: '0.02',
          date: '10/04/2021'
        },
        {
          id: 5,
          name: 'Tiempo',
          acronym: 'Hr',
          cost: '0.5',
          date: '10/04/2021'
        },
        {
          id: 6,
          name: 'Distancia',
          acronym: 'Km',
          cost: '0.05',
          date: '10/04/2021'
        },
        {
          id: 7,
          name: 'Trayecto',
          acronym: 'Tramo',
          cost: '1.2',
          date: '10/04/2021'
        },
        {
          id: 8,
          name: 'Trayecto',
          acronym: 'Tramo',
          cost: '1.2',
          date: '10/04/2021'
        },
        {
          id: 9,
          name: 'Trayecto',
          acronym: 'Tramo',
          cost: '1.2',
          date: '10/04/2021'
        },
        {
          id: 10,
          name: 'Trayecto',
          acronym: 'Tramo',
          cost: '1.2',
          date: '10/04/2021'
        }
      ],
      original: [
        {
          name: 'Peso',
          acronym: 'Kg',
          cost: '1.0',
          date: '10/04/2021'
        },
        {
          name: 'Largo',
          acronym: 'cm',
          cost: '0.02',
          date: '10/04/2021'
        },
        {
          name: 'Ancho',
          acronym: 'cm',
          cost: '0.02',
          date: '10/04/2021'
        },
        {
          name: 'Profundidad',
          acronym: 'cm',
          cost: '0.02',
          date: '10/04/2021'
        },
        {
          name: 'Tiempo',
          acronym: 'Hr',
          cost: '0.5',
          date: '10/04/2021'
        },
        {
          name: 'Distancia',
          acronym: 'Km',
          cost: '0.05',
          date: '10/04/2021'
        },
        {
          name: 'Trayecto',
          acronym: 'Tramo',
          cost: '1.2',
          date: '10/04/2021'
        },
        {
          name: 'Trayecto',
          acronym: 'Tramo',
          cost: '1.2',
          date: '10/04/2021'
        },
        {
          name: 'Trayecto',
          acronym: 'Tramo',
          cost: '1.2',
          date: '10/04/2021'
        },
        {
          name: 'Trayecto',
          acronym: 'Tramo',
          cost: '1.2',
          date: '10/04/2021'
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
      this.acronym = data.acronym
      this.cost = data.cost
      this.date = data.date
      this.changeTitleForm('Actualizar Atributos de Medida')
    },
    changeTitleForm (title) {
      this.titleForm = title
      this.inception = true
    },
    cleanForm () {
      this.name = ''
      this.acronym = ''
      this.cost = ''
      this.date = ''
      this.inception = false
    }
  }
}
</script>
