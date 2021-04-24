<template>
  <q-page padding>
    <div class="row">
      <div class="col-3 text-left">
        <p class="text-h5">
          Crear Guia
        </p>
      </div>
      <div class="col-9 text-right">
        <q-btn
          push
          round
          color="teal"
          icon="filter_alt"
          v-if="tab === 'alarms'"
          class="q-mr-sm"
        >
          <q-tooltip>
            Filtros
          </q-tooltip>
          <q-popup-proxy>
            <div class="row q-col-gutter-sm q-pa-md text-center">
              <div class="col-6">
                <q-radio
                  name="shape"
                  v-model="shape"
                  val="branch-offices"
                  :label="ucwords($t('voucher.branch-offices'))"
                  @input="getFilter"
                />
              </div>
              <div class="col-6">
                <q-radio
                  name="shape"
                  v-model="shape"
                  val="destinations"
                  :label="ucwords($t('voucher.destinations'))"
                  @input="getFilter"
                />
              </div>
              <div class="col-12">
                <b-search-select
                  dense
                  dataValue="id"
                  :dataLabel="shape === 'destinations' ? 'city' : 'name'"
                  :data="optionsFilter"
                  v-model="valueFilter"
                  :label="ucwords($t(`voucher.${shape}`))"
                  @input="filter"
                />
              </div>
              <div class="col-12">
                <q-btn
                  color="negative"
                  class="full-width"
                  icon="delete"
                  dense
                  size="md"
                  push
                  @click="clearFilter"
                />
              </div>
            </div>
          </q-popup-proxy>
        </q-btn>
        <q-btn
          color="primary"
          icon="save"
          push
          round
          class="q-mr-md"
          @click="openDialogGuide"
        >
          <q-tooltip>
            Guardar Guia
          </q-tooltip>
        </q-btn>
      </div>
      <div class="col-12">
        <q-card>
          <q-tabs
            v-model="tab"
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="left"
            narrow-indicator
          >
            <q-tab name="mails" label="Escanear código del comprobante" />
            <q-tab name="alarms" label="Lista de comprobantes" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="mails">
              <div class="row q-gutter-y-md">
                <div class="col-3">
                  <q-input
                    label="Código"
                    dense
                    autofocus
                    v-model="codeVoucher"
                    @keyup.native.enter="getOneVoucher"
                  />
                </div>
                <div class="col-12">
                  <q-table
                    :title="ucwords($t('voucher.list'))"
                    :data="voucherSelected"
                    :columns="columns"
                    row-key="number"
                    :pagination="{ rowsPerPage: 0 }"
                    hide-bottom
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
                          Accione
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
                        <q-td auto-width class="text-right">
                          <q-btn color="negative" round icon="delete" size="sm" @click="deleteVocuher(props.row)"/>
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </div>
              </div>
            </q-tab-panel>
            <q-tab-panel name="alarms" class="row">
              <div class="col-12">
                <data-table
                  title="list"
                  module="voucher"
                  searchable
                  toggable
                  selection="multiple"
                  :column="voucherConfig"
                  :data="data"
                  :loading="loadingTable"
                  :optionPagination="optionPagination"
                  @search-data="searchData"
                  @on-load-data="loadData"
                  @selected="selected"
                />
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 500px">
        <q-card-section>
          <div class="text-h6">Agregar datos de la guia</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <b-search-select
            label="Vehiculo"
            dataValue="id"
            dataLabel="plate"
            autofocus
            dense
            v-model="vehicle"
            :data="vehicles"
            @keyup.enter="prompt = false"
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <b-search-select
            dense
            label="Transportista"
            dataValue="id"
            dataLabel="full_name"
            v-model="carrier"
            :data="carriers"
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <b-search-select
            dense
            label="Destino"
            v-model="branchOffice"
            :data="branchOffices"
            dataValue="id"
            dataLabel="name"
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <b-search-select
            dense
            label="Asistente"
            v-model="helper"
            :data="helpers"
            dataValue="id"
            dataLabel="full_name"
          />
        </q-card-section>
        <q-card-section
          class="q-pt-none"
          v-for="seal in seals"
          :key="seal.id"
        >
          <q-input
            dense
            label="Precinto"
            v-model="seal.seal_number"
          />
        </q-card-section>
        <q-card-section
          class="q-pt-none"
        >
          <q-input
            dense
            label="Precinto"
            v-model="seal.seal_number"
          >
            <template v-slot:append>
              <q-btn
                size="sm"
                icon="add"
                color="primary"
                round
                @click="addSeal"
              />
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn color="negative" label="Cancelar" v-close-popup />
          <q-btn color="primary" label="Guardar Guia"  @click="saveGuide"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import DataTable from '../components/DataTable.vue'
import { voucherConfig, buttonsTable } from '../config-file/voucher/voucherConfig'
import { mixins } from '../mixins'
import { GETTERS } from '../store/module-login/name.js'
import { mapGetters } from 'vuex'
import BSearchSelect from '../components/BSearchSelect'
export default {
  mixins: [mixins.containerMixin],
  components: {
    DataTable,
    BSearchSelect
  },
  data () {
    return {
      branchOfficeSession: null,
      userSession: null,
      columns: [
        {
          name: 'number',
          required: true,
          label: 'Número',
          align: 'left',
          field: row => row.number,
          sortable: true
        },
        {
          name: 'addresse',
          align: 'center',
          label: 'Destinatario',
          field: row => row.addressee.full_name,
          sortable: true
        },
        {
          name: 'destination',
          label: 'Destino)',
          align: 'center',
          field: row => row.destinable.city ?? row.destinable.name,
          sortable: true
        }
      ],
      buttonsTable,
      codeVoucher: null,
      tab: 'mails',
      seals: [],
      seal: {},
      prompt: false,
      optionsFilter: [],
      valueFilter: null,
      shape: 'branch-offices',
      voucherConfig,
      loadingTable: false,
      data: [],
      /**
       * Params search
       * @type {Object}
       */
      params: {
        paginated: true,
        sortBy: 'id',
        sortOrder: 'desc',
        perPage: 1,
        branch_office_id: 1,
        filterStatus: true,
        dataSearch: {
          id: ''
        }
      },
      /**
       * Options pagination
       * @type {Object}
       */
      optionPagination: {
        rowsPerPage: 20,
        paginate: true,
        rowsNumber: 20,
        sortBy: 'id',
        sortOrder: 'desc'
      },
      vehicles: [],
      vehicle: null,
      branchOffices: [],
      branchOffice: null,
      carriers: [],
      carrier: null,
      voucherSelected: [],
      helpers: [],
      helper: null
    }
  },
  computed: {
    /**
     * Getters Vuex
     */
    ...mapGetters([GETTERS.GET_USER, GETTERS.GET_BRANCH_OFFICE])
  },
  created () {
    this.getVochers()
    this.getFilter(this.shape)
    this.getVehicles()
    this.getCarriers()
    this.getBranchOffices()
    this.$barcodeScanner.init(this.getOneVoucher)
    this.getHelpers()
    this.userSession = this[GETTERS.GET_USER]
    this.branchOfficeSession = this[GETTERS.GET_BRANCH_OFFICE]
  },
  methods: {
    openDialogGuide () {
      if (this.voucherSelected.length > 0) {
        this.prompt = true
      } else {
        this.notify(this, 'guide.voucherEmty', 'negative', 'warning')
      }
    },
    /**
     * Delete voucher selected
     */
    deleteVocuher (data) {
      this.$q.dialog({
        title: 'Alert',
        message: '¿Desea eliminar el comprabante?',
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
        const index = this.voucherSelected.indexOf(data.id)
        this.voucherSelected.splice(index, 1)
      })
    },
    /**
     * Add Seals
    */
    addSeal () {
      if (this.seal.seal_number) {
        this.seals.push({
          seal_number: this.seal.seal_number,
          user_created_id: 1
        })
      }
      this.seal.seal_number = null
    },
    /**
     * clear table filters
    */
    clearFilter () {
      this.params.dataFilter = null
      this.valueFilter = null
      this.getVochers(this.params)
    },
    /**
     * Filter for destination and branch office
     * @param {Object} data value select
     */
    filter (data) {
      const destination = ['App', 'Models', 'Destination']
      const branchOffice = ['App', 'Models', 'BranchOffice']
      this.params.dataFilter = {
        destinable_type: this.shape === 'destinations' ? destination.join('\\') : branchOffice.join('\\'),
        destinable_id: data.value
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
     * Get filters
     * @param {String} data url of petitions
    */
    getFilter (data) {
      this.$services.getData([data], { paginated: false })
        .then(({ res }) => {
          this.optionsFilter = res.data
        })
    },
    /**
     * Get filters
     * @param {String} data url of petitions
    */
    getVehicles () {
      this.$services.getData(['vehicles'], { paginated: false })
        .then(({ res }) => {
          this.vehicles = res.data
        })
    },
    /**
     * Get filters
     * @param {String} data url of petitions
    */
    getCarriers () {
      this.$services.getData(['carriers'], { paginated: false })
        .then(({ res }) => {
          this.carriers = res.data
        })
    },
    /**
     * Get filters
     * @param {String} data url of petitions
    */
    getBranchOffices () {
      this.$services.getData(['branch-offices'], { paginated: false })
        .then(({ res }) => {
          this.branchOffices = res.data
        })
    },
    /**
     * Get filters
     * @param {String} data url of petitions
    */
    getHelpers () {
      this.$services.getData(['helpers'], { paginated: false })
        .then(({ res }) => {
          this.helpers = res.data
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
     * Selected voucher
     * @param {Array} selected vouchers selected
    */
    selected (selected) {
      this.voucherSelected = selected
    },
    /**
     * Model voucher
     * @type {Array} list voucher
     */
    modelVoucher (voucher) {
      return voucher.map(voucher => {
        return {
          voucher_id: voucher.id,
          steerable_type: 'App\\Models\\BranchOffice',
          steerable_id: this.branchOfficeSession.id,
          status: 'in_transit',
          user_created_id: this.userSession.id
        }
      })
    },
    /**
     * Get all vouchers
     */
    getVochers (params = this.params) {
      this.loadingTable = true
      this.$services.getData(['vouchers'], params)
        .then(({ res }) => {
          this.data = res.data.data
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
     * Save guide
    */
    saveGuide () {
      this.addSeal()
      this.$services.postData(['guides'], {
        vehicle_id: this.vehicle.value,
        destination_id: this.branchOffice.value,
        branch_office_id: 1,
        carrier_id: this.carrier.value,
        helper_id: this.helper.value,
        vouchers: this.modelVoucher(this.voucherSelected),
        seals: this.seals,
        user_created_id: 1
      })
        .then(({ res }) => {
          this.notify(this, 'Guia guardad exitosamente', 'primary', 'mood')
          this.getVochers()
          this.clearInputs()
          this.prompt = false
          this.voucherSelected = []
        })
    },
    /**
     * Clear inputs
    */
    clearInputs () {
      this.vehicle = null
      this.branchOffice = null
      this.carrier = null
      this.voucherSelected = []
      this.seals = []
    },
    /**
     * Get one voucher
     */
    getOneVoucher (code) {
      this.codeVoucher = typeof code === 'string' ? code : this.codeVoucher
      this.$services.getOneData(['vouchers', this.codeVoucher])
        .then(({ res }) => {
          this.voucherSelected.push(res.data)
          this.codeVoucher = null
        })
    }
  }
}
</script>

<style>

</style>
