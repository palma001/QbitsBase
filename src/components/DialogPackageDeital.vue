<template>
  <q-dialog v-model="show" persistent :maximized="$q.screen.lt.sm" full-height>
    <q-card :style="$q.screen.lt.sm ? '' : 'width: 900px; max-width: 80vw;'">
      <q-card-section class="row items-center text-white bg-primary">
        <div class="text-h6">Agregar paquete</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup @click="close"/>
      </q-card-section>
      <q-card-section class="q-pa-none" style="min-height: 420px;'">
        <q-scroll-area
            :thumb-style="thumbStyle"
            :content-style="contentStyle"
            :content-active-style="contentActiveStyle"
            style="height: 72vh;"
          >
          <q-stepper
            ref="stepper"
            color="primary"
            animated
            header-nav
            v-model="step"
            alternative-labels
            :vertical="$q.screen.lt.md"
            style="border-style: none !important; border-width: 0px; !important"
          >
            <q-step
              title="Datos del paquete"
              icon="settings"
              :name="1"
              :done="step > 1"
            >
              <q-card class="row">
                <!-- <q-form ref="myForm" class="row"> -->
                  <q-card-section
                    class="col-12"
                    v-for="(rate, index) in rates"
                    :key="rate.id"
                  >
                    <q-input
                      dense
                      v-model="rateValue[rate.id]"
                      type="number"
                      :autofocus="index === 0"
                      :label="`${rate.name} (${rate.unit_of_measurement.acronym})`"
                    />
                  </q-card-section>
                  <q-card-section
                      class="col-12"
                    >
                      <q-input
                        dense
                        v-model="rateValue.amount"
                        type="number"
                        label="Costo del paquete"
                      />
                  </q-card-section>
                <!-- </q-form> -->
              </q-card>
              </q-step>
              <q-step
                title="Dirección de envio"
                icon="create_new_folder"
                :name="2"
                :done="step > 2"
              >
                <q-card class="row">
                  <!-- <q-form ref="step2" class="row"> -->
                    <q-card-section class="col-12">
                      <q-select
                        v-model="deliveryType"
                        :options="options"
                        label="Tipo de entrega"
                        dense
                        :rules="[ val => val && val.length > 0 || `El campo tipo de entrega es requerido` ]"
                      />
                      </q-card-section>
                      <q-card-section class="col-12" v-if="deliveryType === 'Sucursal'">
                        <q-select
                          v-model="branchOffice"
                          dense
                          label="Sucursales"
                          :options="branchOffices"
                        />
                      </q-card-section>
                      <q-card-section class="col-12 q-pt-none row q-col-gutter-md" v-else>
                        <q-select
                          v-model="destination"
                          :options="destinations"
                          label="Destino"
                          dense
                          class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12"
                        />
                        <q-input
                          dense
                          v-model="referencePoin"
                          label="Punto de referencia"
                          class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12"
                        />
                        <q-input
                          dense
                          v-model="address"
                          label="Dirección"
                          type="textarea"
                        />
                      </q-card-section>
                  <!-- </q-form> -->
                </q-card>
              </q-step>
              <q-step
                :name="3"
                title="Datos del destinatario"
                icon="add_comment"
              >
                <q-card class="row">
                  <q-card-section class="col-12">
                    <q-input
                      autofocus
                      dense
                      v-model="documetntNumber"
                      label="Número de documento"
                      @blur="getAddress"
                    />
                  </q-card-section>
                  <q-card-section class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <q-input
                      dense
                      v-model="addressee.name"
                      label="Nombre"
                    />
                  </q-card-section>
                  <q-card-section class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <q-input
                      dense
                      v-model="addressee.last_name"
                      label="Apellido"
                    />
                  </q-card-section>
                  <q-card-section class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <q-input
                      dense
                      v-model="addressee.phone_number"
                      label="Telefono"
                    />
                  </q-card-section>
                  <q-card-section class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <q-input
                      dense
                      v-model="addressee.email"
                      label="Email"
                    />
                  </q-card-section>
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
          icon="navigate_next"
          color="primary"
          v-if="step < 3"
          @click="$refs.stepper.next()"
        />
        <q-btn
          label="Guardar"
          color="primary"
          @click="saveDataPackage"
          v-else
        />
      </q-card-actions>
    </q-card>
</q-dialog>
</template>

<script>
export default {
  name: 'DialogPackageDeital',
  data () {
    return {
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
        backgroundColor: '#02718D',
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
  created () {
    this.getAllRates()
    this.getAllBranchOffices()
    this.getAllDestinations()
  },
  methods: {
    // async nextAndBack () {
    //   if (this.step === 1) {
    //     await this.validateRate()
    //     if (this.errorRate) {
    //       this.$refs.stepper.next()
    //     }
    //   }
    //   if (this.step === 2) {
    //     await this.validateBranchOffice()
    //     if (this.errorDirection) {
    //       this.$refs.stepper.next()
    //     }
    //   }
    // },
    // validateRate () {
    //   if (this.$refs.myForm) {
    //     this.$refs.myForm.validate().then(success => {
    //       this.errorRate = success
    //     })
    //   }
    // },
    // validateBranchOffice () {
    //   if (this.$refs.step2) {
    //     this.$refs.step2.validate().then(success => {
    //       this.errorDirection = success
    //     })
    //   }
    // },
    /**
     * Save vocuher
     */
    async saveDataPackage () {
      await this.saveAddresse()
      this.dataPackage.push({
        rate: this.rateValue,
        addressee: this.addressee,
        destination: {
          branchOffice: this.branchOffice,
          referencePoin: this.referencePoin,
          address: this.address,
          destination: this.destination
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
      this.addressee.user_created_id = 1
      this.addressee.document_number = this.documetntNumber
      const { res } = await this.$services.postData(['addressees'], this.addressee)
      this.addressee = res.data
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
