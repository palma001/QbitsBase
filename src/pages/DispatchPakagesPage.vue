<template>
  <q-page padding>
    <!-- <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">{{$t('voucher.number')}}</th>
          <th class="text-left">{{$t('voucher.name')}}</th>
          <th class="text-left">{{$t('voucher.destination')}}</th>
        </tr>
      </thead>
    </q-markup-table> -->
    <div class="row q-col-gutter-sm">
      <div class="col-12 text-right">
        <q-btn
          color="primary"
          icon="save"
          push
          class="q-mr-md"
          @click="prompt = true"
        />
        <q-btn push color="teal" icon="filter_alt">
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
      </div>
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
    </div>
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 500px">
        <q-card-section>
          <div class="text-h6">Your address</div>
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
            @keyup.enter="prompt = false"
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
            @keyup.enter="prompt = false"
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
import { voucherConfig } from '../config-file/voucher/voucherConfig'
import { mixins } from '../mixins'
import BSearchSelect from '../components/BSearchSelect'
export default {
  mixins: [mixins.containerMixin],
  components: {
    DataTable,
    BSearchSelect
  },
  data () {
    return {
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
        sortBy: 'id',
        sortOrder: 'desc'
      },
      vehicles: [],
      vehicle: null,
      branchOffices: [],
      branchOffice: null,
      carriers: [],
      carrier: null,
      voucherSelected: []
    }
  },
  created () {
    this.getVochers()
    this.getFilter(this.shape)
    this.getVehicles()
    this.getCarriers()
    this.getBranchOffices()
  },
  methods: {
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
      this.params.dataFilter = {
        destinable_type: this.shape === 'destinations' ? 'App\\Models\\Destination' : 'App\\Models\\BranchOffice',
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
      this.voucherSelected = selected.map(voucher => {
        return { voucher_id: voucher.id, user_created_id: 1 }
      })
    },
    /**
     * Get all vouchers
     */
    getVochers (params = this.params) {
      this.loadingTable = true
      this.$services.getData(['vouchers'], params)
        .then(({ res }) => {
          this.data = res.data
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
        vouchers: this.voucherSelected,
        seals: this.seals,
        user_created_id: 1
      })
        .then(({ res }) => {
          this.notify(this, 'Guia guardad exitosamente', 'primary', 'mood')
          this.getVochers()
          this.clearInputs()
          this.prompt = false
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
    }
  }
}
</script>

<style>

</style>
