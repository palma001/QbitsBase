<template>
  <q-page padding>
    <div>
      <q-splitter
        v-model="splitterModel"
        horizontal
        style="height: 88vh"
      >
        <template v-slot:before>
          <div class="q-pa-md">
            <div class="row">
              <p class="text-h6">Métodos de pago</p>
            </div>
            <div class="row q-col-gutter-xs q-mt-md">
              <div class="col-3"
                v-for="paymentType in paymentTypes"
                :key="paymentType.id"
              >
                <q-card dark bordered class="bg-blue-grey-9 my-card" style="height: 83px;">
                  <q-card-section>
                    <div class="text-h6">
                      {{ paymentType.name }}
                    </div>
                    <div class="text-subtitle2">
                      {{ paymentType.acronym }} {{ paymentType.amount }}
                      <input v-money="money" v-model.lazy="paymentType.amount" type="hidden"/>
                    </div>
                  </q-card-section>
                  <q-tooltip v-if="paymentType.acronym === 'BS'">
                    <div class="text-subtitle2">
                      USD {{paymentType.amountds}}
                    </div>
                  </q-tooltip>
                </q-card>
              </div>
              <div class="col-3" v-for="(total, index) in totals" :key="total.id">
                <q-card dark bordered class="bg-cyan-9 my-card" style="height: 83px;">
                  <q-card-section class="row q-pr-xs">
                    <div class="text-h6 col-12 text-bold">Total {{total.acronym}}</div>
                    <div class="text-subtitle2 col-10">{{total.amount}}</div>
                    <input v-money="money" v-model.lazy="total.amount" type="hidden"/>
                    <div class="col-2 text-right" v-if="index === 1">
                      <q-btn
                        color="white"
                        text-color="primary"
                        icon="lock"
                        aria-label="save"
                        size="sm"
                        round
                        type="submit"
                        @click="confirm"
                      >
                        <q-tooltip>
                            Cerrar caja
                        </q-tooltip>
                      </q-btn>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
        </template>
        <template v-slot:after>
          <q-table
              title="Treats"
              :data="bills"
              :columns="columns"
              row-key="id"
              :filter="filter"
              :loading="loading"
              >
              <template v-slot:top>
                  <div class="q-mb-xs q-pb-none">
                      <div class="row">
                          <p class="text-h6">Facturación</p>
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
                      <q-btn icon="visibility" color="primary" rounded size="sm" @click="viewBillDetail(props.row)">
                      </q-btn>
                  </q-td>
                  </q-tr>
              </template>
          </q-table>
        </template>
      </q-splitter>
      </div>
      <q-dialog v-model="alert">
        <q-card style="width: 1300px; max-width: 80vw;">
          <q-card-section class="row items-center q-pb-none">
            <div class="q-mb-xs">
              <p class="text-h6">Detalle de pagos</p>
            </div>
            <q-space/>
            <q-btn icon="close" flat color="primary" v-close-popup/>
          </q-card-section>
            <q-card-section class="q-pt-none">
            <q-table
                title="Treats"
                :data="detailBillPayments"
                :columns="transactions"
                row-key="id"
                :filter="filter"
                :loading="loading"
            >
                <template v-slot:top>
                    <div class="row q-col-gutter-x-sm text-left justify-center">
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
                    <!-- <q-btn icon="visibility" color="primary" rounded size="sm" @click="alert=true"> -->
                    <q-btn icon="person" color="primary" round size="sm" @click="alert=true">
                        <q-popup-proxy>
                        <div class="q-pa-md">
                          <q-input
                                readonly
                                label="Nombre"
                          />
                        </div>
                        </q-popup-proxy>
                        <!-- <q-popup-proxy>
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
                        </q-popup-proxy> -->
                        <q-popup-proxy>
                          <div class="q-pa-md">
                            <!-- <q-input
                              readonly
                              label="Nombre"
                              :value="props.row.addressee.full_name"
                            />
                            <q-input
                              readonly
                              label="Teléfono"
                              :value="props.row.addressee.phone_number"
                            />
                            <q-input
                              readonly
                              label="email"
                              :value="props.row.addressee.email"
                            /> -->
                          </div>
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
import { VMoney } from 'v-money'
export default {
  mixins: [mixins.containerMixin],
  directives: { money: VMoney },
  data () {
    return {
      totals: [],
      splitterModel: 37, // start at 50%
      alert: false,
      money: {
        decimal: ',',
        thousands: '.',
        precision: 0,
        masked: false /* doesn't work with directive */
      },
      address: '',
      paymentTypes: [],
      shape: 'line',
      model: null,
      loading: false,
      filter: '',
      rowCount: 10,
      name: '',
      employee: '',
      total: 0,
      userSession: null,
      branchOffice: null,
      bills: [],
      detailBillPayments: [],
      sourceDate: [],
      columns: [
        {
          name: 'created_at',
          required: true,
          label: 'Fecha',
          align: 'left',
          field: row => row.created_at,
          sortable: true
        },
        { name: 'invoiceNumber', align: 'center', label: 'Número de Factura', field: row => row.number, sortable: true },
        { name: 'total', align: 'center', label: 'Monto ($)', field: 'total' },
        { name: 'sender', align: 'center', label: 'Cliente', field: row => row.sender.full_name, sortable: true },
        { name: 'document_number', align: 'center', label: 'N° de Identificación', field: row => row.sender.document_number, sortable: true }
      ],
      transactions: [
        {
          name: 'created_at',
          required: true,
          label: 'Fecha',
          align: 'left',
          field: row => this.formatDate(row.created_at),
          format: val => `${val}`,
          sortable: true
        },
        { name: 'reference', align: 'center', label: 'Referencia', field: 'reference', sortable: true },
        { name: 'payment_type', align: 'center', label: 'Método de Pago', field: row => row.payment_type.name, sortable: true },
        { name: 'destination', align: 'center', label: 'Destino', field: row => row.payment_type.payment_destination.name, sortable: true },
        { name: 'employee', align: 'center', label: 'Empleado', field: row => row.user.name, sortable: true },
        { name: 'role', align: 'center', label: 'Cargo', field: row => row.user.roles[0].name },
        { name: 'amount', align: 'center', label: 'Monto ($)', field: 'amount' }
      ]
    }
  },
  created () {
    this.getPaymentType()
    this.getBranchOffice()
    this.getBills()
    this.userSession = this[GETTERS.GET_USER]
    this.branchOffice = this[GETTERS.GET_BRANCH_OFFICE]
  },
  computed: {
    /**
     * Getters Vuex
     */
    ...mapGetters([GETTERS.GET_USER, GETTERS.GET_BRANCH_OFFICE])
  },
  methods: {
    calcutate (exchange, value) {
      return Number(exchange) * Number(value)
    },
    sumValues (data, fieldCompare, fieldSum) {
      return data.reduce((acumulador, valorActual) => {
        const elementoYaExiste = acumulador.find(elemento => elemento[fieldCompare] === valorActual[fieldCompare])
        if (elementoYaExiste) {
          return acumulador.map((elemento) => {
            if (elemento[fieldCompare] === valorActual[fieldCompare]) {
              return {
                ...elemento,
                amount: Number(elemento[fieldSum]) + Number(valorActual[fieldSum])
              }
            }
            return elemento
          })
        }
        return [...acumulador, valorActual]
      }, [])
    },
    getPaymentType () {
      this.$services.getData(['reports', 'consolidated-payment-types'], {
        from: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        to: date.formatDate(Date.now(), 'YYYY-MM-DD')
      })
        .then(({ res }) => {
          // console.log(res)
          const totalForName = this.sumValues(res.data, 'name', 'amount').map(element => {
            if (element.acronym === 'BS') {
              element.amountds = element.amount
              element.amount = this.calcutate(element.exchange, element.amount)
              return element
            }
            return element
          })
          this.paymentTypes = totalForName
          this.totals = this.sumValues(totalForName, 'acronym', 'amount')
        })
    },
    getBranchOffice () {
      this.$services.getData(['branch-offices'], { paginated: false })
        .then(({ res }) => {
          this.branchOffices = res.data
        })
    },
    getBills () {
      this.$services.getData(['bills'], {
        paginated: false,
        sortBy: 'id',
        sortOrder: 'desc',
        dateFilter: {
          from: date.formatDate(Date.now(), 'YYYY-MM-DD'),
          to: date.formatDate(Date.now(), 'YYYY-MM-DD'),
          field: 'created_at'
        }
      })
        .then(({ res }) => {
          this.bills = res.data.map(data => {
            data.created_at = this.formatDate(data.created_at)
            return data
          })
        })
    },
    viewBillDetail (data) {
      this.alert = true
      this.detailBillPayments = data.bill_payments
    },
    formatDate (sourceDate) {
      const timeStamp = date.extractDate(sourceDate, 'YYYY-MM-DD')
      return date.formatDate(timeStamp, 'DD-MM-YYYY')
    },
    calcTotalPaymentMethod () {
      if (this.paymentTypes.length > 0) {
        this.paymentTypes.forEach((data) => {
          this.total += Number(data.amount)
        })
      }
    },
    confirm () {
      this.$q.dialog({
        title: 'Confirmación',
        message: '¿Desea cerrar la casa?',
        cancel: {
          label: 'Cancelar',
          color: 'negative'
        },
        ok: {
          label: 'Aceptar',
          color: 'primary'
        },
        persistent: true
      }).onOk(() => {
        this.closeCashRegister()
      })
    },
    closeCashRegister () {
      this.$services.postData(['close-boxs'], {
        branch_office_id: this.branchOffice.id,
        user_id: this.userSession.id,
        user_created_id: this.userSession.id,
        amount: this.total
      }).then(res => {
        this.notify(this, 'Caja cerrada satisfactoriamente', 'positive', 'info')
      })
    }
  }
}
</script>
