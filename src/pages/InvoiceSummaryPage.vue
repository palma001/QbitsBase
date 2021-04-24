<template>
  <q-page padding>
    <div>
        <q-splitter
        v-model="splitterModel"
        style="height: 88vh"
        >

        <template v-slot:before>
            <div class="q-pa-xs">
            <div class="text-h5 q-mb-md">Sucursales</div>
              <div class="q-gutter-md q-mt-xs">
                <q-list bordered padding class="rounded-borders" style="max-width: 350px">
                  <q-item clickable v-ripple v-for="branchOffice in branchOffices" :key="branchOffice.id" @click="filterBranchOffice(branchOffice.id)">
                    <q-item-section avatar top>
                      <q-avatar icon="maps_home_work" color="primary" text-color="white" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label lines="1">{{branchOffice.name}}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar top>
                      <q-avatar icon="language" color="primary" text-color="white" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>General</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
        </template>

        <template v-slot:after>
                <div class="q-pa-xs">
                </div>
                  <div class="row q-col-gutter-x-md">
                    <div class="col-12">
                      <q-table
                        title="Treats"
                        :data="data"
                        :columns="columns"
                        row-key="id"
                        :filter="filter"
                        :loading="loading"
                      >
                        <template v-slot:top>
                          <div class="q-mb-xs q-pb-none">
                            <div class="row">
                              <p class="text-h6">Facturas</p>
                            </div>
                            <div class="row q-col-gutter-x-sm text-left justify-center">
                              <div class="col-3 q-pt-sm">
                                <q-radio v-model="shape" val="Del" label="Del"/>
                              </div>
                              <div class="col-8">
                                <q-select v-model="model" :options="options" label="Filtrar" dense @input="queryTime"/>
                              </div>
                              <div class="col-3 q-pt-sm">
                                <q-radio v-model="shape" val="Rango" label="Rango" />
                              </div>
                              <div class="col-4">
                                <q-input type="date" hint="Desde" v-model="desde" dense class="text-white" @input="range(desde, hasta)"/>
                              </div>
                              <div class="col-4">
                                <q-input type="date" hint="Hasta" v-model="hasta" dense class="text-white" @input="range(desde, hasta)"/>
                              </div>
                            </div>
                          </div>
                          <q-space />
                            <q-input dense debounce="300" color="primary" v-model="filter" label="Buscar">
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
                              <q-btn icon="print" color="primary" rounded size="sm" @click="alert=true" align="center">
                              </q-btn>
                              <q-btn class="q-ml-md" icon="do_not_disturb" color="negative" rounded size="sm" @click="alert=true" align="center">
                              </q-btn>
                            </q-td>
                          </q-tr>
                        </template>
                      </q-table>
                    </div>
                  </div>
            </template>

        </q-splitter>
    </div>
  </q-page>
</template>

<script>
import { date } from 'quasar'
import { mixins } from '../mixins'
export default {
  mixins: [mixins.containerMixin],
  data () {
    return {
      splitterModel: 16, // start at 50%
      params: {
        paginated: false,
        dataFilter: {},
        dateFilter: {
          field: 'created_at',
          to: date.formatDate(new Date(), 'YYYY-MM-DD'),
          from: date.formatDate(new Date(), 'YYYY-MM-DD')
        }
      },
      alert: false,
      branchOffices: [],
      desde: null,
      hasta: null,
      shape: 'Del',
      model: null,
      options: ['Día', 'Día anterior', 'Mes', 'Mes anterior'],
      loading: false,
      filter: '',
      rowCount: 10,
      name: '',
      employee: '',
      columns: [
        {
          name: 'date',
          required: true,
          label: 'Fecha',
          align: 'left',
          field: row => this.formatDate(row.created_at),
          format: val => `${val}`,
          sortable: true
        },
        { name: 'invoiceNumber', align: 'center', label: 'Número de Factura', field: row => row.number, sortable: true },
        { name: 'amount', align: 'center', label: 'Monto ($)', field: row => row.total },
        { name: 'client', align: 'center', label: 'Cliente', field: row => row.sender.full_name, sortable: true },
        { name: 'identificationNumber', align: 'center', label: 'N° de Identificación', field: row => row.sender.document_number, sortable: true }
      ],
      data: [],
      transactions: [
        {
          name: 'date',
          required: true,
          label: 'Fecha',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'invoiceNumber', align: 'center', label: 'Número de Factura', field: 'invoiceNumber', sortable: true },
        { name: 'client', align: 'center', label: 'Cliente', field: 'client', sortable: true },
        { name: 'identificationNumber', align: 'center', label: 'N° de Identificación', field: 'identificationNumber', sortable: true },
        { name: 'amount', align: 'center', label: 'Monto ($)', field: 'amount' }
      ]
    }
  },
  created () {
    this.getBranchOffice()
    this.getBills()
  },
  methods: {
    getBranchOffice () {
      this.$services.getData(['branch-offices'], { paginated: false })
        .then(({ res }) => {
          this.branchOffices = res.data
          this.filterBranchOffice(this.branchOffices[0].id)
        })
    },
    filterBranchOffice (sucursal) {
      this.params.dataFilter.branch_office_id = sucursal
      this.getBills(this.params)
    },
    getBills (params = this.params) {
      this.$services.getData(['bills'], params).then(({ res }) => {
        this.data = res.data
      })
    },
    formatDate (sourceDate) {
      const timeStamp = date.extractDate(sourceDate, 'YYYY-MM-DD')
      return date.formatDate(timeStamp, 'DD-MM-YYYY')
    },
    queryTime () {
      const queryTime = this.unitTime(this.model)
      this.range(queryTime.from, queryTime.to)
    },
    range (desde, hasta) {
      if (desde && hasta) {
        this.params = {
          paginated: false,
          dateFilter: {
            field: 'created_at',
            from: desde,
            to: hasta
          }
        }
        this.getBills(this.params)
      }
    }
  }
}
</script>
