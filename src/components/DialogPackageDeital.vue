<template>
  <q-card class="q-pa-none" flat bordered>
    <q-card-section class="text-white bg-primary q-pa-xs">
      <div class="text-h6">Datos del envio</div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <q-scroll-area
        :thumb-style="thumbStyle"
        :content-style="contentStyle"
        :content-active-style="contentActiveStyle"
        style="height: 70vh;"
      >
        <q-stepper
          ref="stepper"
          color="primary"
          animated
          alternative-labels
          v-model="step"
          vertical
          flat
        >
          <q-step
            title="Datos del paquete"
            icon="settings"
            :name="1"
            :done="step > 1"
            :error="!errorRate"
          >
            <q-card flat bordered>
              <q-form ref="myForm" class="row">
                <q-card-section
                  class="col-12 q-py-xs"
                  v-for="(rate, index) in rates"
                  :key="rate.id"
                >
                  <q-input
                    dense
                    v-model="rateValue[rate.id]"
                    type="number"
                    :autofocus="index === 0"
                    :rules="[val => !!val || 'El campo es requerido']"
                    :label="`${rate.name} (${rate.unit_of_measurement.acronym})`"
                  />
                </q-card-section>
                <q-card-section
                    class="col-12 q-py-xs"
                  >
                    <q-input
                      dense
                      v-model="rateValue.amount"
                      type="number"
                      :rules="[val => !!val || 'El campo es requerido']"
                      label="Costo del paquete"
                    />
                </q-card-section>
                <q-card-section
                    class="col-12 q-py-xs"
                  >
                    <q-input
                      dense
                      v-model="rateValue.cargo_insurance_amount"
                      type="number"
                      :rules="[val => !!val || 'El campo es requerido']"
                      label="Seguro de carga"
                    />
                </q-card-section>
              </q-form>
            </q-card>
          </q-step>
          <q-step
            title="Dirección de envio"
            icon="create_new_folder"
            :name="2"
            :done="step > 2"
            :error="!errorDirection"
          >
            <q-card flat bordered>
              <q-form ref="step2" class="row">
                <q-card-section class="col-12 q-py-xs">
                  <q-select
                    v-model="deliveryType"
                    :options="options"
                    label="Tipo de entrega"
                    dense
                  />
                </q-card-section>
                <q-card-section
                  class="col-12 q-py-xs"
                  v-if="deliveryType === 'Sucursal'"
                >
                  <q-select
                    v-model="branchOffice"
                    dense
                    label="Sucursales"
                    :options="branchOffices"
                    :rules="[myRule]"
                  />
                </q-card-section>
                <q-card-section class="col-12 q-pt-xs row q-col-gutter-md" v-else>
                  <q-select
                    v-model="destination"
                    :options="destinations"
                    label="Destino"
                    dense
                    class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"
                    :rules="[myRule]"
                  />
                  <q-input
                    dense
                    v-model="referencePoin"
                    label="Punto de referencia"
                    class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"
                    :rules="[ val => val && val.length > 0 || `El campo es requerido` ]"
                  />
                  <q-input
                    dense
                    v-model="address"
                    label="Dirección"
                    type="textarea"
                    style="width: 100%"
                    :rules="[ val => val && val.length > 0 || `El campo es requerido` ]"
                  />
                </q-card-section>
              </q-form>
            </q-card>
          </q-step>
          <q-step
            title="Datos del destinatario"
            icon="add_comment"
            :name="3"
            :error="!errorAddress"
          >
            <q-card flat bordered>
              <q-form ref="step3" class="row">
                <q-card-section class="col-12 q-py-none">
                  <q-input
                    autofocus
                    dense
                    v-model="documetntNumber"
                    label="Número de documento"
                    @blur="getAddress"
                    :rules="[val => !!val || 'El campo es requerido']"
                  />
                </q-card-section>
                <q-card-section class="col-xl-12 q-py-none col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-input
                    dense
                    v-model="addressee.name"
                    label="Nombre"
                    :rules="[val => !!val || 'El campo es requerido']"
                  />
                </q-card-section>
                <q-card-section class="q-py-none col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-input
                    dense
                    v-model="addressee.last_name"
                    label="Apellido"
                    :rules="[val => !!val || 'El campo es requerido']"
                  />
                </q-card-section>
                <q-card-section class="q-py-none col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-input
                    dense
                    v-model="addressee.phone_number"
                    label="Telefono"
                    :rules="[val => !!val || 'El campo es requerido']"
                  />
                </q-card-section>
                <q-card-section class="q-pt-none q-pb-md col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-input
                    dense
                    v-model="addressee.email"
                    label="Email"
                  />
                </q-card-section>
              </q-form>
            </q-card>
          </q-step>
        </q-stepper>
      </q-scroll-area>
    </q-card-section>
    <q-separator/>
    <q-card-actions align="right">
      <q-btn
        icon="chevron_left"
        class="q-ml-sm"
        color="negative"
        v-if="step > 1"
        @click="$refs.stepper.previous()"
      />
      <q-btn
        color="primary"
        :label="step === 1 ? 'Destino' : 'Destinatario'"
        v-if="step < 3"
        @click="nextAndBack"
      />
      <q-btn
        label="Guardar"
        color="primary"
        @click="nextAndBack"
        v-else
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { GETTERS } from '../store/module-login/name.js'
import { mapGetters } from 'vuex'
import { mixins } from '../mixins'
export default {
  name: 'DialogPackageDeital',
  mixins: [mixins.containerMixin],
  data () {
    return {
      userSession: null,
      branchOfficeSession: null,
      errorAddress: true,
      errorRate: true,
      errorDirection: true,
      contentStyle: {
        backgroundColor: 'rgba(0,0,0,0.02)',
        color: '#555'
      },
      contentActiveStyle: {
        color: 'black'
      },
      thumbStyle: {
        right: '1px',
        borderRadius: '5px',
        backgroundColor: 'teal',
        width: '7px',
        opacity: 1
      },
      address: '',
      deliveryType: 'Sucursal',
      options: ['Sucursal', 'Entrega a domicilio'],
      destinations: [],
      destination: null,
      referencePoin: '',
      step: 1,
      rates: [],
      rateValue: {},
      documentType: null,
      branchOffices: [],
      branchOffice: null,
      amount: 0,
      documetntNumber: null,
      addressee: {},
      optionsDocumentTypes: [
        {
          label: 'Cedúla',
          value: 'CI'
        },
        {
          label: 'Rif',
          value: 'RIF'
        }
      ],
      dataPackage: []
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    /**
     * Getters Vuex
     */
    ...mapGetters([GETTERS.GET_USER, GETTERS.GET_BRANCH_OFFICE])
  },
  created () {
    this.getAllRates()
    this.getAllBranchOffices()
    this.getAllDestinations()
    this.userSession = this[GETTERS.GET_USER]
    this.branchOfficeSession = this[GETTERS.GET_BRANCH_OFFICE]
  },
  methods: {
    myRule (val) {
      if (val === null) {
        return 'El campo de es requerido'
      }
    },
    async nextAndBack () {
      switch (this.step) {
        case 1:
          await this.validateRate()
          if (this.errorRate) {
            this.step = 2
          }
          break
        case 2:
          await this.validateBranchOffice()
          if (this.errorDirection) {
            this.step = 3
          }
          break
        case 3:
          await this.validateAddressee()
          if (this.errorAddress) {
            this.saveAddresse()
          }
          break
        default:
          break
      }
    },
    validateAddressee () {
      if (this.$refs.step3) {
        this.$refs.step3.validate().then(success => {
          this.errorAddress = success
          return success
        })
      }
    },
    validateRate () {
      if (this.$refs.myForm) {
        this.$refs.myForm.validate().then(success => {
          this.errorRate = success
        })
      }
    },
    validateBranchOffice () {
      if (this.$refs.step2) {
        this.$refs.step2.validate().then(success => {
          this.errorDirection = success
        })
      }
    },
    /**
     * Save vocuher
     */
    async saveDataPackage () {
      this.dataPackage.push({
        rate: this.rateValue,
        addressee: this.addressee,
        destination: {
          branchOffice: this.deliveryType === 'Sucursal' ? this.branchOffice : null,
          referencePoin: this.referencePoin,
          address: this.address,
          destination: this.deliveryType === 'Entrega a domicilio' ? this.destination : null
        }
      })
      this.clearForm()
      this.$emit('savePackage', this.dataPackage)
    },
    /**
     * Clear form
    */
    clearForm () {
      this.rateValue = {}
      this.branchOffice = null
      this.address = ''
      this.destination = ''
      this.referencePoin = ''
      this.documetntNumber = ''
      this.deliveryType = 'Sucursal'
      this.addressee = {}
      this.step = 1
    },
    /**
     * Save Addresse
     */
    async saveAddresse () {
      this.addressee.user_created_id = this.userSession.id
      this.addressee.document_number = this.documetntNumber
      this.$services.postData(['addressees'], this.addressee)
        .then(({ res }) => {
          this.addressee = res.data
          this.saveDataPackage()
        })
        .catch((err) => {
          console.log(err)
          this.notify(this, 'template.error', 'negative', 'warning')
        })
    },
    /**
     * Get Rate all
     */
    async getAllRates () {
      const { res } = await this.$services.getData(['rates'], { paginated: false })
      this.rates = res.data
    },
    /**
     * Get Destinations all
     */
    async getAllDestinations () {
      const { res } = await this.$services.getData(['destinations'], { paginated: false })
      this.destinations = res.data.map(destination => {
        return {
          label: `${destination.state} - ${destination.city}`,
          value: destination.id
        }
      })
    },
    /**
     * Get Branch Office all
     */
    async getAllBranchOffices () {
      const { res } = await this.$services.getData(['branch-offices'], { paginated: false })
      this.branchOffices = res.data.map(branchOffice => {
        return {
          label: branchOffice.name,
          value: branchOffice.id
        }
      })
    },
    /**
     * Get Addresse all
     */
    async getAddress () {
      if (this.documetntNumber) {
        const { res } = await this.$services.getData(['addressees'],
          {
            paginated: false,
            dataFilter: {
              document_number: this.documetntNumber
            }
          }
        )
        this.addressee = res.data.length > 0 ? res.data[0] : {}
      }
    },
    /**
     * Close dialog
     */
    close () {
      this.$emit('close')
    }
  }
}
</script>
