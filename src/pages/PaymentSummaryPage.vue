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
            <q-splitter
              v-model="insideModel"
              horizontal
            >
              <template v-slot:before>
                <div class="q-pa-md">
                <div class="text-h6 q-mb-xs">Métodos de pagos</div>
                  <div class="row q-col-gutter-xs">
                    <div class="col-3" v-for="paymentType in paymentTypes" :key="paymentType.id">
                      <q-card dark bordered class="bg-blue-grey-9 my-card">
                        <q-card-section>
                          <div class="text-h6">{{paymentType.name}}</div>
                          <div class="text-subtitle2">${{paymentType.amount}}</div>
                        </q-card-section>
                      </q-card>
                    </div>
                    <div class="col-3">
                      <q-card dark bordered class="bg-cyan-9 my-card">
                        <q-card-section>
                          <div class="text-h6">Total</div>
                          <div class="text-subtitle2">${{total}}</div>
                        </q-card-section>
                      </q-card>
                    </div>
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
                          :data="closeCashRegister"
                          :columns="columns"
                          row-key="id"
                          :filter="filter"
                          :loading="loading"
                        >
                          <template v-slot:top>
                            <div class="q-mb-xs q-pb-none">
                              <div class="row">
                                <p class="text-h6">Ventas</p>
                              </div>
                              <div class="row q-col-gutter-x-sm text-left justify-center">
                                <div class="col-3 q-pt-sm">
                                  <q-radio v-model="shape" val="Del" label="Del" />
                                </div>
                                <div class="col-8">
                                  <q-select v-model="model" :options="options" label="Filtrar" dense @input="queryTime"/>
                                </div>
                                <div class="col-3 q-pt-sm">
                                  <q-radio v-model="shape" val="Rango" label="Rango" />
                                </div>
                                <div class="col-4">
                                  <q-input type="date" hint="Desde" v-model="desde" dense @input="range(desde, hasta)"/>
                                </div>
                                <div class="col-4">
                                  <q-input type="date" hint="Hasta" v-model="hasta" dense @input="range(desde, hasta)"/>
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
                                <q-btn icon="visibility" color="primary" rounded size="sm" @click="viewPaymentsDetail(props.row.created_at)">
                                <!-- <q-btn icon="visibility" color="primary" rounded size="sm" @click="alert=true"> -->
                                </q-btn>
                              </q-td>
                            </q-tr>
                          </template>
                        </q-table>
                      </div>
                    </div>
              </template>

              </q-splitter>
          </template>
        </q-splitter>
    </div>
    <q-dialog v-model="alert">
      <q-card style="width: 1300px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="q-mb-xs">
            <p class="text-h6">Consolidado de operaciones
            </p>
          </div>
          <q-space/>
          <q-btn icon="close" flat color="primary" v-close-popup/>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-table
            row-key="id"
            :data="paymentDate"
            :columns="transactions"
            :filter="filter"
            :loading="loading"
          >
            <template v-slot:top>
                <!-- <div class="row q-col-gutter-x-sm text-left justify-center">
                <div class="col-3 q-pt-sm">
                  <q-radio v-model="shape" val="Del" label="Del" value="true"/>
                </div>
                <div class="col-8">
                  <q-select v-model="model" :options="options" label="Filtrar" dense/>
                </div>
                <div class="col-3 q-pt-sm">
                  <q-radio v-model="shape" val="Rango" label="Rango" />
                </div>
                <div class="col-4">
                  <q-input type="date" hint="Desde" v-model="desde" dense/>
                </div>
                <div class="col-4">
                  <q-input type="date" hint="Hasta" v-model="hasta" dense/>
                </div>
                </div> -->
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
                  <!-- <q-btn icon="visibility" color="primary" rounded size="sm" @click="alert=true"> -->
                  <q-btn icon="visibility" color="primary" rounded size="sm">
                    <q-popup-proxy>
                      <q-banner>
                         <div class="row">
                          <div class="col-12">
                            <q-space/>
                            <q-btn icon="close" flat color="primary" v-close-popup class="float-right"/>
                          </div>
                         </div>
                        <div class="row">
                          <div class="col-12">
                            <p class="h4">Datos adicionales</p>
                            <q-input label="Cliente" dense/>
                            <q-input label="Teléfono" dense/>
                            <q-input label="email" dense/>
                          </div>
                        </div>
                      </q-banner>
                    </q-popup-proxy>
                  </q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { date } from 'quasar'
import { mixins } from '../mixins'
import { GETTERS } from '../store/module-login/name.js'
import { mapGetters } from 'vuex'
export default {
  mixins: [mixins.containerMixin],
  data () {
    return {
      shape: 'Del',
      params: {
        paginated: false,
        dataFilter: {},
        sortBy: 'id',
        sortOrder: 'desc',
        dateFilter: {
          field: 'created_at',
          to: date.formatDate(new Date(), 'YYYY-MM-DD'),
          from: date.formatDate(new Date(), 'YYYY-MM-DD')
        }
      },
      desde: null,
      hasta: null,
      model: null,
      splitterModel: 16, // start at 50%
      insideModel: 32,
      alert: false,
      address: '',
      paymentTypes: [],
      branchOffices: [],
      closeCashRegister: [],
      paymentDate: [],
      options: ['Día', 'Día anterior', 'Mes', 'Mes anterior'],
      loading: false,
      filter: '',
      rowCount: 10,
      name: '',
      employee: '',
      total: 0,
      userSession: null,
      branchOffice: null,
      columns: [
        {
          name: 'create_at',
          required: true,
          label: 'Fecha',
          align: 'left',
          field: row => this.formatDate(row.created_at),
          format: val => `${val}`,
          sortable: true
        },
        { name: 'employee', align: 'center', label: 'Empleado', field: row => row.user.full_name, sortable: true },
        { name: 'role', align: 'center', label: 'Cargo', field: row => row.user.roles[0].name },
        { name: 'amount', align: 'center', label: 'Monto ($)', field: row => row.total_day }
      ],
      transactions: [
        {
          name: 'date',
          required: true,
          label: 'Fecha',
          align: 'left',
          field: row => this.formatDate(row.created_at),
          format: val => `${val}`,
          sortable: true
        },
        { name: 'reference', align: 'center', label: 'Referencia', field: row => row.reference, sortable: true },
        { name: 'paymentMethod', align: 'center', label: 'Método de Pago', field: row => row.payment_type.name, sortable: true },
        { name: 'destination', align: 'center', label: 'Destino', field: row => row.payment_type.payment_destination.name, sortable: true },
        { name: 'employee', align: 'center', label: 'Empleado', field: row => row.user.full_name, sortable: true },
        { name: 'role', align: 'center', label: 'Cargo', field: row => row.user.roles[0].name },
        { name: 'amount', align: 'center', label: 'Monto ($)', field: row => row.amount }
      ]
    }
  },
  created () {
    this.userSession = this[GETTERS.GET_USER]
    this.branchOffice = this[GETTERS.GET_BRANCH_OFFICE]
    this.getPaymentType(this.params.dateFilter.from, this.params.dateFilter.to)
    this.getBranchOffice()
    this.getCloseCashRegister(this.params)
  },
  computed: {
    /**
     * Getters Vuex
     */
    ...mapGetters([GETTERS.GET_USER, GETTERS.GET_BRANCH_OFFICE])
  },
  methods: {
    getPaymentType (desde, hasta) {
      this.$services.getData(['reports', 'consolidated-payment-types'], {
        from: desde,
        to: hasta
      })
        .then(({ res }) => {
          this.paymentTypes = res.data
          this.calcTotalPaymentMethod()
        })
    },
    getBranchOffice () {
      this.$services.getData(['branch-offices'], { paginated: false })
        .then(({ res }) => {
          this.branchOffices = res.data
          // this.filterBranchOffice(this.branchOffices[0].id)
        })
    },
    filterBranchOffice (sucursal) {
      this.params.dataFilter.branch_office_id = sucursal
      this.getCloseCashRegister(this.params)
    },
    calcTotalPaymentMethod () {
      this.total = 0
      if (this.paymentTypes.length > 0) {
        this.paymentTypes.forEach((data) => {
          this.total += Number(data.amount)
        })
      }
    },
    getCloseCashRegister (param = this.params) {
      this.$services.getData(['close-boxs'], param)
        .then(({ res }) => {
          this.closeCashRegister = res.data
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
          dataFilter: {
            branch_office_id: this.params.dataFilter.branch_office_id
          },
          dateFilter: {
            field: 'created_at',
            from: desde,
            to: hasta
          }
        }
        this.getCloseCashRegister(this.params)
        this.getPaymentType(desde, hasta)
      }
    },
    viewPaymentsDetail (fechaDePago) {
      this.alert = true
      fechaDePago = date.formatDate(fechaDePago, 'YYYY-MM-DD')
      this.$services.getData(['bill-payments'],
        {
          dateFilter: {
            to: fechaDePago,
            from: fechaDePago,
            field: 'created_at'
          }
        })
        .then(({ res }) => {
          this.paymentDate = res.data
        })
    }
  }
}
</script>
