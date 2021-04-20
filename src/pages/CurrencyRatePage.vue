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
              <q-btn color="primary" :disable="loading" label="Add row" @click="changeTitleForm('Agregar Tasa Cambiaria')" />
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
                <q-input v-model="currencyRate" label="Tasa (Bs/$)" dense/>
            </div>
            <div class="col-12">
                <q-input v-model="fountain" label="Fuente" dense/>
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
      titleForm: 'Agregar Tasa Cambiaria',
      visibleColumns: ['name', 'currencyRate', 'fountain', 'updateDate', 'updateTime', 'responsable'],
      currencyRate: '',
      fountain: '',
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
          label: 'Fecha',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'currencyRate', align: 'center', label: 'Tasa (Bs/$)', field: 'currencyRate', sortable: true },
        { name: 'fountain', align: 'center', label: 'Fuente', field: 'fountain', sortable: true },
        { name: 'updateDate', align: 'center', label: 'Fecha de Actualización', field: 'updateDate', sortable: true },
        { name: 'updateTime', align: 'center', label: 'Hora de Actualización', field: 'updateTime', sortable: true },
        { name: 'responsable', align: 'center', label: 'Responsable', field: 'responsable', sortable: true }
      ],
      data: [
        {
          id: 1,
          name: '10/04/2021',
          currencyRate: '2340,45',
          fountain: 'BCV',
          updateDate: '10/04/2021',
          updateTime: '09:05',
          responsable: 'Josá Martínez'
        },
        {
          id: 2,
          name: '10/04/2021',
          currencyRate: '2340,45',
          fountain: 'Monitor Dolar',
          updateDate: '10/04/2021',
          updateTime: '02:45',
          responsable: 'Carlos Parra'
        },
        {
          id: 3,
          name: '10/04/2021',
          currencyRate: '2340,45',
          fountain: 'BCV',
          updateDate: '10/04/2021',
          updateTime: '09:05',
          responsable: 'Josá Martínez'
        },
        {
          id: 4,
          name: '10/04/2021',
          currencyRate: '2340,45',
          fountain: 'BCV',
          updateDate: '10/04/2021',
          updateTime: '09:05',
          responsable: 'Josá Martínez'
        },
        {
          id: 5,
          name: '10/04/2021',
          currencyRate: '2340,45',
          fountain: 'BCV',
          updateDate: '10/04/2021',
          updateTime: '09:05',
          responsable: 'Josá Martínez'
        },
        {
          id: 6,
          name: '10/04/2021',
          currencyRate: '2340,45',
          fountain: 'Monitor Dolar',
          updateDate: '10/04/2021',
          updateTime: '02:45',
          responsable: 'Carlos Parra'
        },
        {
          id: 7,
          name: '10/04/2021',
          currencyRate: '2340,45',
          fountain: 'Monitor Dolar',
          updateDate: '10/04/2021',
          updateTime: '02:45',
          responsable: 'Carlos Parra'
        },
        {
          id: 8,
          name: '10/04/2021',
          currencyRate: '2340,45',
          fountain: 'Monitor Dolar',
          updateDate: '10/04/2021',
          updateTime: '02:45',
          responsable: 'Carlos Parra'
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
      this.currencyRate = data.currencyRate
      this.fountain = data.fountain
      this.changeTitleForm('Actualizar Tasa Cambiaria')
      console.log(data)
    },
    changeTitleForm (title) {
      this.titleForm = title
      this.inception = true
    },
    cleanForm () {
      this.name = ''
      this.fountain = ''
      this.inception = false
    }
  }
}
</script>
