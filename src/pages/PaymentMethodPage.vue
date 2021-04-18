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
              <q-btn color="primary" :disable="loading" label="Add row" @click="changeTitleForm('Agregar Método de Pago')" />
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
                <q-th class="text-center">
                  Acciones
                </q-th>
              </q-tr>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props" >
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  {{col.value}}
                </q-td>
                <q-td class="text-center">
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
                <q-input v-model="name" label="Método de Pago" dense/>
              </div>
              <div class="col-12">
                <q-input v-model="date" label="Fecha" dense/>
              </div>
              <div class="col-12">
                <q-select v-model="destination" label="destination" :options="destinations" dense/>
              </div>
              <div class="col-12">
                <q-input v-model="attribute" label="Atributo" dense>
                    <template v-slot:append>
                        <q-btn
                        color="primary"
                        text-color="white"
                        size="sm"
                        icon="add"
                        aria-label="add"
                        round
                        >
                        <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">
                            <strong>Agregar atributo</strong>
                        </q-tooltip>
                        </q-btn>
                    </template>
                </q-input>
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
      titleForm: 'Agregar Método de Pago',
      visibleColumns: ['name', 'date', 'destination'],
      name: '',
      date: '',
      attribute: '',
      destinations: ['Banco de Venezuela', 'Banesco', 'Bank Of Amaerica', 'Chase'],
      destination: null,
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
          label: 'Método de Pago',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'date', align: 'center', label: 'Fecha', field: 'date', sortable: true },
        { name: 'destination', align: 'center', label: 'Destino', field: 'destination', sortable: true }
      ],
      data: [
        {
          id: 1,
          name: 'Zelle',
          date: '10/04/2021',
          destination: 'Bank Of America'
        },
        {
          id: 2,
          name: 'Zelle',
          date: '10/04/2021',
          destination: 'Chase'
        },
        {
          id: 3,
          name: 'Pago Móvil',
          date: '10/04/2021',
          destination: 'Banco de Venezuela'
        },
        {
          id: 4,
          name: 'Punto de Venta',
          date: '10/04/2021',
          destination: 'Banesco'
        },
        {
          id: 5,
          name: 'Transferencia Bancaria',
          date: '10/04/2021',
          destination: 'Banesco'
        },
        {
          id: 6,
          name: 'Transferencia Bancaria',
          date: '15/04/2021',
          destination: 'Banco de Venezuela'
        },
        {
          id: 7,
          name: 'Efectivo Divisa',
          date: '10/04/2021',
          destination: 'Caja'
        },
        {
          id: 8,
          name: 'Efectivo Bs',
          date: '10/04/2021',
          destination: 'Caja'
        }
      ],
      original: [
        {
          id: 1,
          name: 'Zelle',
          date: '10/04/2021',
          destination: 'Bank Of America'
        },
        {
          id: 2,
          name: 'Zelle',
          date: '10/04/2021',
          destination: 'Chase'
        },
        {
          id: 3,
          name: 'Pago Móvil',
          date: '10/04/2021',
          destination: 'Banco de Venezuela'
        },
        {
          id: 4,
          name: 'Punto de Venta',
          date: '10/04/2021',
          destination: 'Banesco'
        },
        {
          id: 5,
          name: 'Transferencia Bancaria',
          date: '10/04/2021',
          destination: 'Banesco'
        },
        {
          id: 6,
          name: 'Transferencia Bancaria',
          date: '15/04/2021',
          destination: 'Banco de Venezuela'
        },
        {
          id: 7,
          name: 'Efectivo Divisa',
          date: '10/04/2021',
          destination: 'Caja'
        },
        {
          id: 8,
          name: 'Efectivo Bs',
          date: '10/04/2021',
          destination: 'Caja'
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
      this.destination = data.destination
      this.date = data.date
      this.changeTitleForm('Actualizar Atributos de Método de Pago')
    },
    changeTitleForm (title) {
      this.titleForm = title
      this.inception = true
    },
    cleanForm () {
      this.name = ''
      this.destination = []
      this.date = ''
      this.inception = false
    }
  }
}
</script>
