<template>
  <q-page padding>
    <div class="row q-col-gutter-md relative-position">
      <div class="col-xs-12 col-sm-5 col-xs-12 col-md-4 col-lg-4">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-lg-12 col-md-12">
            <q-select
              v-model="sender"
              clearable
              use-input
              hide-selected
              fill-input
              dense
              ref="sender"
              :label="ucwords($t('newShipment.sender'))"
              :options="senderOptions"
              :rules="[val => !!val || 'El remitente es requerido']"
              @filter="filterFn"
            >
              <template v-slot:append>
                <q-btn
                  color="primary"
                  text-color="white"
                  size="sm"
                  icon="add"
                  aria-label="add"
                  round
                  @click="dialogSender = !dialogSender"
                >
                  <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">
                    <strong>{{ucwords($t('newShipment.addSender'))}}</strong>
                  </q-tooltip>
                </q-btn>
              </template>
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="col-xs-12 col-sm-12 col-lg-12 col-md-12">
            <dialog-package-deital
              :show="dialogPackage"
              @close="dialogPackage = !dialogPackage"
              @savePackage="savePackage"
            />
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-7 col-md-8 col-lg-8">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-lg-12 col-md-12">
            <q-table
              dense
              hide-bottom
              virtual-scroll
              class="my-sticky-dynamic"
              :title="ucwords($t('newShipment.packages'))"
              :data="packages"
              :columns="columns"
              :virtual-scroll-item-size="48"
              :virtual-scroll-sticky-size-start="48"
              :pagination="{ rowsPerPage: 0 }"
              :rows-per-page-options="[0]"
            >
              <template v-slot:header="props">
                <q-tr :props="props">
                  <q-th auto-width>
                   Cobro a destino
                  </q-th>
                  <q-th
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    {{ col.label }}
                  </q-th>
                  <q-th auto-width>
                    Acciones
                  </q-th>
                </q-tr>
              </template>
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td auto-width>
                    <q-toggle
                      @input="calcTotal(packages)"
                      v-model="props.row.type_of_charge"
                      color="primary"
                    />
                  </q-td>
                  <q-td
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    {{ col.value }}
                  </q-td>
                  <q-td auto-width class="q-gutter-x-sm">
                    <!-- <q-btn size="13px" color="primary" round dense @click="props.expand = !props.expand" icon="visibility" /> -->
                    <q-btn size="13px" color="negative" round dense @click="deletePackage(props)" icon="delete" />
                    <!-- <q-btn size="13px" color="positive" round dense @click="props.expand = !props.expand" icon="content_copy" /> -->
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </div>
        <div class="col-12 q-mt-sm">
          <div class="row justify-between q-col-gutter-sm">
            <div class="col-xs-6 col-sm-12 col-md-5 col-lg-4">
              <q-btn icon="toc" color="positive" @click="dialogEntregarPaquete = true" class="q-ml-sm">
                <q-tooltip content-class="bg-positive" content-style="font-size: 16px" :offset="[10, 10]">
                 Entregar paquete
                </q-tooltip>
              </q-btn>
              <q-btn
                class="q-ml-sm"
                icon="save"
                color="orange"
                :disable="packages.length <= 0"
                @click="saveBill"
              >
                <q-tooltip content-class="bg-primary" content-style="font-size: 16px" :offset="[10, 10]">
                  Guardar
                </q-tooltip>
              </q-btn>
              <q-btn
                class="q-ml-sm"
                icon="fa fa-credit-card"
                color="primary"
                :disable="packages.length <= 0"
                @click="dialogPayment = !dialogPayment"
              >
                <q-tooltip content-class="bg-primary" content-style="font-size: 16px" :offset="[10, 10]">
                  Cobrar Factura
                </q-tooltip>
              </q-btn>
            </div>
            <div class="col-xs-6 col-sm-12 col-md-7 col-lg-6">
              <q-list bordered dense separator class="q-pa-none text-h6" style="width: 100%">
                <q-item
                  clickable
                  v-ripple
                  class="text-bold"
                >
                  <q-item-section>
                    Seguro de carga:
                  </q-item-section>
                  <q-item-section side>$ {{ account.cargoInsuranceAmount }}</q-item-section>
                </q-item>
                <q-item clickable v-ripple class="text-bold">
                  <q-item-section>
                    Subtotal
                  </q-item-section>
                  <q-item-section side>$ {{ account.subtotal }}</q-item-section>
                </q-item>
                <q-item clickable v-ripple class="text-bold" :active="true">
                  <q-item-section>
                    Total
                  </q-item-section>
                  <q-item-section side>$ {{ account.total }}</q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </div>
      </div>
    </div>
    <q-dialog
      v-model="dialogSender"
      full-height
      position="right"
      persistent
    >
      <DynamicForm
        module="sender"
        :loading="senderLoadingAdd"
        :buttons="buttonsSender"
        :config="senderConfig"
        @save="saveSender"
        @cancel="cancelSender"
      />
    </q-dialog>
    <q-dialog
      v-model="dialogPayment"
      persistent
      full-height
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card style="width: 1000px; max-width: 90vw;">
        <q-card-section class="row items-center q-pa-sm bg-primary text-white">
          <div class="text-h6">
            Pagar factura
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section v-if="senderDelivered" class="q-py-xs">
          <q-select
            dense
            readonly
            v-model="sender"
            :options="[this.sender]"
            label="Destinatario"
          />
        </q-card-section>
        <q-card-section class="q-py-xs">
          <q-select
            label="Tipos de pago"
            dense
            v-model="paymentType"
            :options="paymentTypesAll"
            @input="selectedPaymnetType"
          >
            <template v-if="paymentType" v-slot:append>
              <q-icon name="add_circle" color="teal" @click.stop="selectedPaymnetType(paymentType)" class="cursor-pointer">
                <q-tooltip
                  anchor="center left"
                  self="center right"
                  :offset="[10, 10]"
                >
                  <strong>Agregar {{ paymentType.label }}</strong>
                </q-tooltip>
              </q-icon>
            </template>
          </q-select>
        </q-card-section>
        <q-scroll-area
          :thumb-style="thumbStyle"
          :content-style="contentStyle"
          :content-active-style="contentActiveStyle"
          style="height: 42vh"
        >
          <q-card-section
            class="row justify-between q-py-xs"
            v-for="(paymentType, index) in paymentTypes"
              :key="paymentType.id"
            >
            <div class="col-xs-3 col-sm-3 col-md-3">
              <q-input
                dense
                label="Monto"
                v-model="paymentType[`amount-${index}`]"
                :hint="paymentType.label"
                @input="calcTotalModalPaid(paymentType, index)"
                type="number"
              />
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3">
              <q-input
                dense
                label="Codigo de referencia"
                v-model="paymentType[`reference-${index}`]"
                :hint="paymentType.label"
              />
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3">
              <input v-money="money" v-model.lazy="paymentType.totalBS" type="hidden"/>
              <q-input
                dense
                label="Cambio"
                v-if="paymentType.coin === 'BS'"
                :value="paymentType.totalBS"
                :hint="paymentType.label"
                readonly
              />
            </div>
            <div class="col-xs-1 col-sm-1 col-md-1 q-mt-md text-center">
              <q-btn
                dense
                icon="delete"
                size="md"
                color="negative"
                round
                @click="deletePayment(index)"
              >
                <q-tooltip>
                  Eliminar metodo de pago
                </q-tooltip>
              </q-btn>
            </div>
          </q-card-section>
        </q-scroll-area>
        <q-card-section class="q-py-xs row">
          <q-list bordered separator dense class="col-7">
            <q-item
              clickable
              v-ripple
              class="text-bold"
              :active="true"
              v-for="(payment, index) in totalPayments"
              :key="payment.id"
            >
              <q-item-section>
                {{ index }}
              </q-item-section>
              <q-item-section side>$ {{ payment }}</q-item-section>
            </q-item>
          </q-list>
          <q-list bordered separator dense class="col-5">
            <q-item
              clickable
              v-ripple
              class="text-bold text-orange"
              :active="true"
            >
              <q-item-section>
                Tasa del dia
              </q-item-section>
              <q-item-section side class="text-orange">{{ exchangeVisible }}</q-item-section>
            </q-item>
            <q-item
              clickable
              v-ripple
              class="text-bold text-negative"
              v-for="(payment, index) in totalPaymentsCoin"
              :key="payment.id"
            >
              <q-item-section>
                {{ index }}
              </q-item-section>
              <q-item-section side>$ {{ payment }}</q-item-section>
            </q-item>
            <q-item
              clickable
              v-ripple
              class="text-bold"
              :active="true"
            >
              <q-item-section>
                Pagado
              </q-item-section>
              <q-item-section side>$ {{ totalPayment }}</q-item-section>
            </q-item>
            <q-item
              clickable
              v-ripple
              class="text-bold text-negative"
              :active="true"
            >
              <q-item-section>
                Saldo
              </q-item-section>
              <q-item-section side class="text-bold text-negative">$ {{ account.total - totalPayment }}</q-item-section>
            </q-item>
            <q-item
              clickable
              v-ripple
              class="text-bold"
              :active="true"
            >
              <q-item-section>
                Total Factura
              </q-item-section>
              <q-item-section side>$ {{ account.total }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-actions class="q-px-md" align="right">
          <q-btn color="primary" label="Pagar" @click="validBill" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="dialogEntregarPaquete"
      persistent
      full-height
    >
      <q-card style="width: 1200px; max-width: 90vw;">
        <q-card-section class="row items-center q-pb-md bg-primary text-white">
          <div class="text-h6">Entregar paquete</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
        <q-scroll-area
          :thumb-style="thumbStyle"
          :content-style="contentStyle"
          :content-active-style="contentActiveStyle"
          style="height: 75vh"
        >
          <data-table
            title="list"
            module="voucher"
            action
            :searchable="true"
            :column="voucherConfig"
            :data="vouchers"
            :loading="loadingTable"
            :buttonsActions="buttonsTable"
            :optionPagination="optionPagination"
            @view-details="confirm"
            @search-data="searchData"
            @on-load-data="loadData"
          />
        </q-scroll-area>
        </q-card-section>
      </q-card>
    </q-dialog>
    <input v-money="money" v-model.lazy="exchangeVisible" type="hidden"/>
  </q-page>
</template>

<script>
import { mixins } from '../mixins'
import DialogPackageDeital from '../components/DialogPackageDeital'
import { senderConfig, buttonsSender, userServices } from '../config-file/sender/senderConfig'
import DynamicForm from '../components/DynamicForm'
import { GETTERS } from '../store/module-login/name.js'
import { voucherConfig, buttonsTable } from '../config-file/voucher/voucherDeliveryConfig'
import { mapGetters } from 'vuex'
import { bill } from './DesignBill'
import DataTable from '../components/DataTable.vue'
import { VMoney } from 'v-money'
export default {
  components: {
    DialogPackageDeital,
    DynamicForm,
    DataTable
  },
  mixins: [mixins.containerMixin],
  directives: { money: VMoney },
  data () {
    return {
      buttonsTable,
      addVoucher: true,
      senderDelivered: false,
      totalBS: 0,
      exchangeVisible: 0,
      money: {
        decimal: ',',
        thousands: '.',
        precision: 0,
        masked: false /* doesn't work with directive */
      },
      /**
       * Params search
       * @type {Object}
       */
      params: {
        paginated: true,
        sortBy: 'id',
        sortOrder: 'desc',
        perPage: 1,
        dataSearch: {
          id: '',
          'addressee.document_number': '',
          'addressee.name': ''
        }
      },
      dialogEntregarPaquete: false,
      /**
       * Options pagination
       * @type {Object}
       */
      optionPagination: {
        rowsPerPage: 200,
        paginate: true,
        sortBy: 'id',
        sortOrder: 'desc',
        rowsNumber: 20
      },
      vouchers: [],
      loadingTable: false,
      userServices,
      voucherConfig,
      contentStyle: {
        color: '#555'
      },
      contentActiveStyle: {
        color: 'black'
      },
      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#02718D',
        width: '7px',
        opacity: 1
      },
      bill,
      buttonsSender,
      senderConfig,
      senderLoadingAdd: false,
      payments: {},
      totalPaymentsCoin: {},
      paymentType: null,
      paymentTypes: [],
      dialogPayment: false,
      paymentTypesAll: [],
      paymentTypesDestinations: [],
      paymentTypesDestination: null,
      dialogPackage: false,
      dialogSender: false,
      sender: null,
      senderOptions: [],
      senderAll: [],
      columns: [
        {
          name: 'destino',
          field: (row) => row.destination.branchOffice ? row.destination.branchOffice.label : row.destination.destination.label,
          label: 'Destino',
          align: 'left',
          sortable: true
        },
        {
          name: 'addressee',
          field: (row) => row.addressee.full_name,
          label: 'Destinatario',
          align: 'left',
          sortable: true
        },
        {
          name: 'amount',
          field: (row) => row.rate.amount,
          label: 'Precio ($)',
          align: 'left',
          sortable: true
        }
      ],
      packages: [],
      account: {
        total: 0,
        subtotal: 0,
        cargoInsuranceAmount: 0
      },
      totalPayments: {},
      total: 0,
      tax: 12,
      exchange: 0,
      totalPayment: 0,
      userSession: null,
      branchOffice: null,
      change: 0,
      currencyRate: null,
      voucherSelected: null
    }
  },
  created () {
    this.userSession = this[GETTERS.GET_USER]
    this.branchOffice = this[GETTERS.GET_BRANCH_OFFICE]
    this.getAllSenders()
    this.getAllRates()
    this.getAllPaymentTypes()
    this.getAllPaymentTypeDestinations()
    this.printBillAndVoucher(bill)
    this.getCurrencyRate()
    this.setRelationalData(this.userServices, [], this)
    this.getVochers(this.params)
  },
  computed: {
    /**
     * Getters Vuex
     */
    ...mapGetters([GETTERS.GET_USER, GETTERS.GET_BRANCH_OFFICE])
  },
  watch: {
    paymentTypes () {
      this.calcTotalModalPaid()
    }
  },
  methods: {
    validateTypeVoucher (data) {
      if (data.status_paid) {
        this.viewDetails(data)
      } else {
        this.calcTotal([{
          rate: {
            amount: data.amount,
            cargo_insurance_amount: data.cargo_insurance_amount,
            type_of_charge: false
          }
        }])
        this.addVoucher = false
        this.dialogPayment = true
        this.senderDelivered = true
        this.voucherSelected = data
        this.sender = {
          label: data.addressee.full_name,
          value: data.id
        }
      }
    },
    confirm (data) {
      if (data.status === this.ucwords(this.$t('voucher.received'))) {
        this.$q.dialog({
          title: 'Alert',
          message: '¿Desea entregar el paquete?',
          cancel: {
            label: 'Cancelar',
            color: 'negative'
          },
          persistent: true,
          ok: {
            label: 'Aceptar',
            color: 'primary'
          }
        }).onOk(() => {
          this.validateTypeVoucher(data)
        })
      } else {
        this.notify(this, `El paquete esta en estado ${data.status}, no puede realizar esta operación`, 'negative', 'warning')
      }
    },
    viewDetails (data) {
      const params = [
        {
          voucher_id: data.id,
          steerable_type: 'App\\Models\\BrachOffice',
          steerable_id: this.branchOffice.id,
          status: 'delivered',
          user_created_id: this.userSession.id,
          bill_id: data.bill_id
        }
      ]
      const guide = data.guides[data.guides.length - 1]
      this.$services.putData(['vouchers', guide.id], {
        vouchers: params,
        status_paid: data.status_paid
      })
        .then((res) => {
          this.notify(this, 'voucher.deliveredSuccessfull', 'positive', 'info')
          // this.dialogEntregarPaquete = false
          this.getVochers(this.params)
        })
    },
    /**
     * Search vouchers
     * @param  {Object}
     */
    searchData (data) {
      for (const dataSearch in this.params.dataSearch) {
        this.params.dataSearch[dataSearch] = data
      }
      this.getVochers(this.params)
    },
    /**
     * Load data sorting
     * @param  {Object}
     */
    loadData (data) {
      this.params.page = data.page
      this.params.sortBy = data.sortBy
      this.params.sortOrder = data.sortOrder
      this.params.perPage = data.rowsPerPage
      this.optionPagination = data
      this.getVochers(this.params)
    },
    /**
     * Get all vouchers
     */
    getVochers (params) {
      this.loadingTable = true
      params.notGuide = true
      this.$services.getData(['vouchers'], params)
        .then(({ res }) => {
          this.vouchers = res.data.data.map(voucher => {
            voucher.status = this.ucwords(this.$t('voucher.' + voucher.status))
            voucher.type_of_charge_status = voucher.type_of_charge ? this.ucwords(this.$t('voucher.paidDestination')) : this.ucwords(this.$t('voucher.paidOrigin'))
            voucher.status_paid_status = voucher.status_paid ? this.ucwords(this.$t('voucher.paid')) : this.ucwords(this.$t('voucher.toPaid'))
            return voucher
          })
          this.optionPagination.rowsNumber = res.data.total
          this.loadingTable = false
        })
        .catch(err => {
          console.log(err)
          this.data = []
          this.loadingTable = false
        })
    },
    /**
     * Total change
     */
    totalChange (payment, index) {
      if (payment) {
        this.money.prefix = this.currencyRate.acronym
        payment.totalBS = Number(payment[`amount-${index}`]) * Number(this.currencyRate.amount)
      }
    },
    /**
     * Print bill
     */
    print () {
      this.$axios.get('http://localhost:5100/print')
    },
    /**
     * Delete payment method
     * @param {Number} index index array
     */
    deletePayment (index) {
      this.paymentTypes.splice(index, 1)
      this.paymentType[`reference-${index}`] = null
      this.paymentType[`amount-${index}`] = null
    },
    /**
     * Set payment method selected
     */
    selectedPaymnetType () {
      this.paymentTypes.push(this.paymentType)
    },
    /**
     * Validate bill
     */
    validBill () {
      const saldo = this.account.total - this.totalPayment
      switch (true) {
        case saldo === 0:
          this.saveBill()
          break
        case saldo > 0:
          this.notify(this, 'Aporte Insuficiente', 'negative', 'warning')
          break
        case saldo < 0:
          this.notify(this, 'Aporte Supera el total de la factura', 'negative', 'warning')
          break
        default:
          break
      }
    },
    /**
     * Save bill
     */
    async saveBill () {
      if (this.$refs.sender.validate()) {
        const params = {
          sender_id: this.sender.value,
          receptionist_id: this[GETTERS.GET_USER].id,
          branch_office_id: this.branchOffice.id,
          vouchers: this.modelVoucher(this.packages),
          billPayments: this.paymentTypes ? this.modelPayment(this.paymentTypes) : [],
          user_created_id: this[GETTERS.GET_USER].id,
          addVoucher: this.addVoucher
        }
        const { res } = await this.$services.postData(['bills'], params)
        this.notify(this, 'la operacion se guardo exitosamente', 'positive', 'mood')
        this.paymentTypes = []
        this.paymentType = {}
        this.dialogPayment = false
        if (!this.addVoucher) {
          this.voucherSelected.bill_id = res.data.id
          this.viewDetails(this.voucherSelected)
        }
        // this.printBillAndVoucher(res.data)
        this.packages = []
        this.total = 0
        this.sender = null
        this.account = { total: 0, subtotal: 0, cargoInsuranceAmount: 0 }
        this.addVoucher = true
        this.senderDelivered = false
      } else {
        this.notify(this, 'Debe seleccionar el campo remitante', 'negative', 'warning')
      }
    },
    /**
     * Print Bill
     */
    async printBillAndVoucher (data) {
      // const { res } = await this.$services.getOneData(['bills', data.id])
      console.log(data)
    },
    /**
      * Set model payment
      * @param {Array} payments data payments
     */
    modelPayment (payments) {
      return payments.map((payment, index) => {
        return {
          payment_type_id: payment.value,
          amount: payment[`amount-${index}`],
          reference: payment[`reference-${index}`],
          exchange: this.exchange,
          user_created_id: this.userSession.id
        }
      })
    },
    /**
      * Set model vouchers
      * @param {Array} packages data vouchers
     */
    modelVoucher (packages) {
      return packages.map(pack => {
        if (!pack.type_of_charge) {
          return {
            addressee_id: pack.addressee.id,
            destinable_type: pack.destination.branchOffice ? 'App\\Models\\BranchOffice' : 'App\\Models\\Destination',
            destinable_id: pack.destination.branchOffice ? pack.destination.branchOffice.value : pack.destination.destination.value,
            address: pack.destination.address,
            reference_point: pack.destination.referencePoin,
            amount: pack.rate.amount,
            tax: this.tax,
            coin_id: 1,
            exchange: this.exchange,
            user_created_id: this.userSession.id,
            rate: this.modelRate(pack.rate),
            type_of_charge: pack.type_of_charge,
            status_paid: !pack.type_of_charge,
            sender_id: this.sender.value,
            cargo_insurance_amount: Number(pack.rate.cargo_insurance_amount)
          }
        }
      })
    },
    /**
      * Set model rates
      * @param {Array} packages data rates
     */
    modelRate (rates) {
      const valueReturn = []
      for (const key in rates) {
        if (Object.hasOwnProperty.call(rates, key) && key !== 'amount' && key !== 'cargo_insurance_amount') {
          valueReturn.push({
            rate_id: key,
            description: rates[key],
            user_created_id: this.userSession.id
          })
        }
      }
      return valueReturn
    },
    /**
     * Get Rate all
     */
    async getAllRates () {
      const { res } = await this.$services.getData(['rates'], { paginated: false })
      this.columns = this.columns.concat(
        res.data.map(rate => {
          return {
            name: rate.id,
            label: `${rate.name} (${rate.unit_of_measurement.acronym})`,
            field: (row) => row.rate[rate.id],
            align: 'left',
            sortable: true
          }
        })
      )
    },
    /**
     * Save package
     * @param {Array} data package
    */
    savePackage (data) {
      this.packages.push(data)
      this.calcTotal(this.packages)
      this.dialogPackage = false
    },
    /**
     * Delete product
     * @param {Object} data data product
     */
    deletePackage (data) {
      this.$q.dialog({
        title: 'Alerta',
        message: '¿Desea eliminar el paquete?',
        persistent: true,
        ok: {
          label: 'Aceptar',
          color: 'primary'
        },
        cancel: {
          color: 'negative',
          label: 'Cancelar'
        }
      }).onOk(() => {
        this.packages.splice(data.rowIndex, 1)
        this.calcTotal(this.packages)
      })
    },
    /**
      * Calcula el total
      */
    calcTotal (data) {
      let total = 0
      let subtotal = 0
      let cargoInsuranceAmount = 0
      data.forEach((data) => {
        if (!data.type_of_charge) {
          if (data.rate.cargo_insurance_amount) {
            cargoInsuranceAmount = Number(cargoInsuranceAmount) + Number(data.rate.cargo_insurance_amount)
          }
          total = Number(total) + Number(data.rate.amount) + Number(cargoInsuranceAmount)
          subtotal = Number(subtotal) + Number(data.rate.amount)
        }
      })
      this.account = {
        total: total,
        subtotal: subtotal,
        cargoInsuranceAmount: cargoInsuranceAmount
      }
      this.change = total * this.currencyRate.amount
    },
    /**
      * Calcula el total
      */
    calcTotalModalPaid (data = {}, index = 0) {
      let total = 0
      this.paymentTypes.forEach((data, index) => {
        if (data[`amount-${index}`]) {
          total = Number(total) + Number(data[`amount-${index}`])
        }
      })
      this.totalPayment = total
      this.calTotalPaid()
      this.totalChange(data, index)
    },
    /**
     * Save sender
     * @param {Object} data data to save
     */
    saveSender (data) {
      this.senderLoadingAdd = true
      this.$services.postData(['senders'], {
        name: data.sender_type.value === 'NAT' ? data.name : null,
        last_name: data.last_name,
        email: data.email,
        user_created_id: this[GETTERS.GET_USER].id,
        business_name: data.sender_type.value === 'NAT' ? null : data.name,
        phone_number: data.phone_number,
        document_number: data.document_number,
        document_type: data.document_type.value,
        branch_office_id: this.branchOffice.id,
        document_type_id: data.document_type.value
      })
        .then(({ res }) => {
          this.sender = {
            value: res.data.id,
            label: `${res.data.full_name} (${data.document_type.label} - ${res.data.document_number})`
          }
          this.dialogSender = false
          this.senderLoadingAdd = false
          this.getAllSenders()
          this.notify(this, 'sender.saveSuccess', 'positive', 'mood')
        })
        .catch(err => {
          console.log(err.message)
          this.notify(this, 'template.error', 'negative', 'warning')
          this.senderLoadingAdd = false
        })
    },
    /**
     * Cancel save
     */
    cancelSender () {
      this.dialogSender = false
    },
    /**
     * Filter Sender
    */
    filterFn (val, update, abort) {
      setTimeout(() => {
        update(
          () => {
            if (val === '') {
              this.senderOptions = this.senderAll
            } else {
              const needle = val.toLowerCase()
              this.senderOptions = this.senderAll.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
            }
          },
          ref => {
            if (val !== '' && ref.options.length > 0) {
              ref.setOptionIndex(-1) // reset optionIndex in case there is something selected
              ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
            }
          }
        )
      }, 300)
    },
    /**
     * Get Senders all
     */
    async getAllSenders () {
      const { res } = await this.$services.getData(['senders'], { paginated: false })
      this.senderAll = res.data.map(sender => {
        return {
          label: `${sender.full_name} (${sender.document_type.name} - ${sender.document_number})`,
          value: sender.id
        }
      })
    },
    /**
     * Get Senders all
     */
    async getAllPaymentTypes () {
      const { res } = await this.$services.getData(['payment-types'], { paginated: false })
      this.paymentTypesAll = res.data.map(payment => {
        return {
          label: payment.name,
          value: payment.id,
          coin: payment.coin.acronym
        }
      })
    },
    /**
     * Get Senders all
     */
    async getAllPaymentTypeDestinations () {
      const { res } = await this.$services.getData(['payment-destinations'], { paginated: false })
      this.paymentTypesDestinations = res.data.map(paymentTypeDestination => {
        return {
          label: paymentTypeDestination.name,
          value: paymentTypeDestination.id
        }
      })
    },
    calTotalPaid () {
      const totalPay = {}
      this.paymentTypesAll.forEach(payAll => {
        this.paymentTypes.forEach((pay, index) => {
          totalPay[pay.label] = isNaN(totalPay[pay.label]) ? 0 : totalPay[pay.label]
          if (payAll.value === pay.value && !isNaN(totalPay[pay.label])) {
            totalPay[pay.label] = Number(totalPay[pay.label]) + Number(pay[`amount-${index}`])
          }
        })
      })
      this.totalPayments = totalPay
      this.calTotalPaidCoin()
    },
    calTotalPaidCoin () {
      const totalPay = {}
      this.paymentTypes.forEach((pay, index) => {
        if (pay[`amount-${index}`]) {
          totalPay[pay.coin] = isNaN(totalPay[pay.coin]) ? 0 : totalPay[pay.coin]
          if (typeof totalPay[pay.coin] === 'number') {
            totalPay[pay.coin] = Number(totalPay[pay.coin]) + Number(pay[`amount-${index}`])
          }
        }
      })
      this.totalPaymentsCoin = totalPay
    },
    /**
     * Get Currency rate all
     */
    async getCurrencyRate () {
      const { res } = await this.$services.getData(['currency-rates'], {
        paginated: false,
        sortBy: 'id',
        sortOrder: 'desc'
      })
      this.currencyRate = res.data[0]
      this.exchange = res.data[0].amount
      this.exchangeVisible = res.data[0].amount
    }
  }
}
</script>
<style lang="sass">
.my-sticky-dynamic
  /* height or max-height is important */
  height: 66vh

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: $primary
    color: white
  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0
</style>
