<template>
  <q-page padding>
    <div class="row justify-between q-gutter-y-sm">
      <div class="col-xs-12 col-sm-6 col-lg-4">
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
      <div class="col-xs-12 col-sm-6 col-lg-4 text-right">
        <p class="text-h4 float-right">
          ${{ total }}
          <q-tooltip content-class="bg-cyan-10" content-style="font-size: 20px" anchor="bottom left" self="top middle">
            <q-icon name="change_circle"></q-icon>
            {{ change }}
          </q-tooltip>
        </p>
        <q-btn
          icon="fa fa-credit-card"
          class="q-mr-md q-mt-xs"
          color="primary"
          :disable="packages.length <= 0"
          @click="dialogPayment = !dialogPayment"
        />
      </div>
    </div>
    <div class="row q-col-gutter-md">
      <div class="col-sm-5 col-md-5 col-lg-4">
        <dialog-package-deital
          :show="dialogPackage"
          @close="dialogPackage = !dialogPackage"
          @savePackage="savePackage"
        />
      </div>
      <div class="col-sm-7 col-md-7 col-lg-8 row">
        <div class="col-12">
          <q-table
            dense
            hide-bottom
            :title="ucwords($t('newShipment.packages'))"
            :data="packages"
            :columns="columns"
          >
            <template v-slot:header="props">
              <q-tr :props="props">
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
        <div class="col-7">
          <q-btn
            v-for="payment in paymentTypesAll"
            :key="payment.id"
            :label="`${payment.name} (${payment.symbol})`"
            color="negative"
          />
          <!-- <q-select
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
          </q-select> -->
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
    >
      <q-card style="width: 900px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-md bg-primary text-white">
          <div class="text-h6">Pagar factura</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="q-pt-md">
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
            class="row q-col-gutter-sm text-center"
            v-for="(paymentType, index) in paymentTypes"
              :key="paymentType.id"
            >
            <div class="col-xs-5 col-sm-5 col-md-5">
              <q-input
                dense
                label="Monto"
                v-model="paymentType[`amount-${index}`]"
                :hint="paymentType.label"
                @input="calcTotalModalPaid"
                type="number"
              />
            </div>
            <div class="col-xs-5 col-sm-5 col-md-5">
              <q-input
                dense
                label="Codigo de referencia"
                v-model="paymentType[`reference-${index}`]"
                :hint="paymentType.label"
              />
            </div>
            <div class="col-xs-2 col-sm-2 col-md-2 q-mt-md text-center">
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
        <q-card-section class="q-py-xs">
          <q-list bordered separator dense>
            <q-item
              clickable
              v-ripple
              class="text-bold"
              active-class="text-primary"
              :active="true"
            >
              <q-item-section>
                $ {{  total }}
              </q-item-section>
              <q-item-section side>Cuenta</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="text-bold">
              <q-item-section>
                $ {{  totalPayment }}
              </q-item-section>
              <q-item-section side>Aporte</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="text-bold">
              <q-item-section>
                $ {{  total - totalPayment }}
              </q-item-section>
              <q-item-section side v-if="total - totalPayment < 0">
                Cambio
              </q-item-section>
              <q-item-section side v-else>
                Saldo
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-actions class="q-px-md" align="right">
          <q-btn color="primary" label="Pagar" @click="validBill" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mixins } from '../mixins'
import DialogPackageDeital from '../components/DialogPackageDeital'
import { senderConfig, buttonsSender } from '../config-file/sender/senderConfig'
import DynamicForm from '../components/DynamicForm'
import { GETTERS } from '../store/module-login/name.js'
import { mapGetters } from 'vuex'
import { bill } from './DesignBill'
export default {
  components: {
    DialogPackageDeital,
    DynamicForm
  },
  mixins: [mixins.containerMixin],
  data () {
    return {
      contentStyle: {
        backgroundColor: 'white',
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
      total: 0,
      tax: 12,
      exchange: 10000,
      totalPayment: 0,
      userSession: null,
      branchOffice: null,
      change: 0,
      currencyRate: null
    }
  },
  created () {
    this.getAllSenders()
    this.getAllRates()
    this.getAllPaymentTypes()
    this.getAllPaymentTypeDestinations()
    this.printBillAndVoucher(bill)
    this.userSession = this[GETTERS.GET_USER]
    this.branchOffice = this[GETTERS.GET_BRANCH_OFFICE]
    this.getCurrencyRate()
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
      const saldo = this.total - this.totalPayment
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
      this.$refs.sender.validate()
      const params = {
        sender_id: this.sender.value,
        receptionist_id: this[GETTERS.GET_USER].id,
        branch_office_id: this.branchOffice.id,
        vouchers: this.modelVoucher(this.packages),
        billPayments: this.modelPayment(this.paymentTypes),
        user_created_id: this[GETTERS.GET_USER].id
      }
      const { res } = await this.$services.postData(['bills'], params)
      this.notify(this, 'la factura se guardo exitosamente', 'positive', 'mood')
      this.paymentTypes = []
      this.dialogPayment = false
      this.printBillAndVoucher(res.data)
      this.packages = []
      this.total = 0
      this.sender = null
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
          rate: this.modelRate(pack.rate)
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
        if (Object.hasOwnProperty.call(rates, key) && key !== 'amount') {
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
      this.packages = data
      this.calcTotal(data)
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
      data.forEach((data) => {
        total = Number(total) + Number(data.rate.amount)
      })
      this.total = total
      this.change = total * this.currencyRate.amount
    },
    /**
      * Calcula el total
      */
    calcTotalModalPaid () {
      let total = 0
      this.paymentTypes.forEach((data, index) => {
        if (data[`amount-${index}`]) {
          total = Number(total) + Number(data[`amount-${index}`])
        }
      })
      this.totalPayment = total
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
        branch_office_id: this.branchOffice.id
      })
        .then(({ res }) => {
          this.sender = {
            value: res.data.id,
            label: `${res.data.full_name} (${res.data.document_type} - ${res.data.document_number})`
          }
          this.dialogSender = false
          this.senderLoadingAdd = false
          this.getAllSenders()
          this.notify(this, 'sender.saveSuccess', 'positive', 'mood')
        })
        .catch(err => {
          console.log(err.message)
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
          label: `${sender.full_name} (${sender.document_type}-${sender.document_number})`,
          value: sender.id
        }
      })
    },
    /**
     * Get Senders all
     */
    async getAllPaymentTypes () {
      const { res } = await this.$services.getData(['payment-types'], { paginated: false })
      this.paymentTypesAll = res.data
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
    }
  }
}
</script>
