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
                    <div class="col-3" v-for="paymentType in paymentTypes" :key="paymentType.id">
                      <q-card dark bordered class="bg-blue-grey-9 my-card" style="height: 83px;">
                       <q-card-section>
                          <div class="text-h6">{{paymentType.name}}</div>
                          <div class="text-subtitle2">${{paymentType.amount}}</div>
                        </q-card-section>
                      </q-card>
                    </div>
                    <div class="col-3">
                      <q-card dark bordered class="bg-cyan-9 my-card" style="height: 83px;">
                        <q-card-section class="row q-pr-xs">
                          <div class="text-h6 col-12 text-bold">Total</div>
                          <div class="text-subtitle2 col-10">${{total}}</div>
                          <div class="col-2 text-right">
                            <q-btn
                              color="white"
                              text-color="primary"
                              icon="lock"
                              aria-label="save"
                              size="sm"
                              round
                              type="submit"
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
                        <p class="text-h6">Detalle de pagos
                        </p>
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
                        <q-btn icon="visibility" color="primary" rounded size="sm" @click="alert=true">
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
export default {
  data () {
    return {
      splitterModel: 37, // start at 50%
      alert: false,
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
        { name: 'role', align: 'center', label: 'Cargo', field: row => row.user.name },
        { name: 'amount', align: 'center', label: 'Monto ($)', field: 'amount' }
      ]
    }
  },
  created () {
    this.getPaymentType()
    this.getBranchOffice()
    this.getBills()
  },
  methods: {
    getPaymentType () {
      this.$services.getData(['reports', 'consolidated-payment-types'], {
        from: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        to: date.formatDate(Date.now(), 'YYYY-MM-DD')
      })
        .then(({ res }) => {
          // console.log(res)
          this.paymentTypes = res.data
          this.calcTotalPaymentMethod()
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
      console.log(data)
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
    }
  }
}
</script>
