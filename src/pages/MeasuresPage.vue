<template>
  <q-page padding>
    <div class="row q-gutter-y-sm">
      <div class="col-12 text-right">
        <q-btn
          color="primary"
          icon="add_circle"
          :label="$q.screen.lt.sm ? '' : $t('rate.add')"
          @click="addDialig = true"
        >
        <q-tooltip
          anchor="center right"
          self="center left"
          :offset="[10, 10]"
          v-if="$q.screen.lt.sm"
        >
          {{
            ucwords($t('rate.add'))
          }}
        </q-tooltip>
      </q-btn>
      </div>
      <div class="col-12">
        <data-table
          title="list"
          module="rate"
          searchable
          action
          :column="rate"
          :data="data"
          :loading="loadingTable"
          :optionPagination="optionPagination"
          @search-data="searchData"
          @view-details="viewDetails"
          @on-load-data="loadData"
        />
      </div>
    </div>
    <q-dialog
      position="right"
      full-height
      persistent
      v-model="editDialog"
    >
      <dynamic-form-edition
        module="rate"
        :propsPanelEdition="propsPanelEdition"
        :config="rate"
        :loading="loadingForm"
        @cancel="editDialog = false"
        @update="update"
      />
    </q-dialog>
    <q-dialog
      position="right"
      full-height
      persistent
      v-model="addDialig"
    >
      <dynamic-form
        module="rate"
        :config="rate"
        :loading="loadingForm"
        @cancel="addDialig = false"
        @save="save"
      />
    </q-dialog>
  </q-page>
</template>
<script>
import DataTable from '../components/DataTable.vue'
import DynamicFormEdition from '../components/DynamicFormEdition.vue'
import DynamicForm from '../components/DynamicForm.vue'
import { rate, propsPanelEdition, rateServices } from '../config-file/rate/rateConfig.js'
import { mixins } from '../mixins'
import { GETTERS } from '../store/module-login/name.js'
import { mapGetters } from 'vuex'
export default {
  mixins: [mixins.containerMixin],
  components: {
    DataTable,
    DynamicFormEdition,
    DynamicForm
  },
  data () {
    return {
      loadingForm: false,
      /**
       * Selected data
       * @type {Object}
       */
      selectedData: null,
      /**
       * Options pagination
       * @type {Object}
       */
      optionPagination: {
        rowsPerPage: 20,
        rowsNumber: 20,
        paginated: true,
        sortBy: 'id',
        sortOrder: 'desc'
      },
      /**
       * Params search
       * @type {Object}
       */
      params: {
        paginated: true,
        sortBy: 'id',
        perPage: 1,
        sortOrder: 'desc',
        dataSearch: {
          cretaed_at: '',
          amount: '',
          source: '',
          'user.name': ''
        }
      },
      rateServices,
      /**
       * Open add dialog
       * @type {Boolean}
       */
      addDialig: false,
      /**
       * Config edition panel
       * @type {Object}
       */
      propsPanelEdition,
      /**
       * File config module
       * @type {Object}
       */
      rate,
      /**
       * Open edit dialog
       * @type {Boolean}
       */
      editDialog: false,
      /**
       * Status loading table
       * @type {Boolean}
       */
      loadingTable: false,
      /**
       * Data of table
       * @type {Array}
       */
      data: []
    }
  },
  created () {
    this.getRates()
    this.setRelationalData(this.rateServices, [], this)
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
    /**
     * Load data sorting
     * @param  {Object}
     */
    loadData (data) {
      this.params.page = data.page
      this.params.sortBy = data.sortBy ?? this.params.sortBy
      this.params.sortOrder = data.sortOrder
      this.params.perPage = data.rowsPerPage
      this.optionPagination = data
      this.getRates(this.params)
    },
    /**
     * Search rate
     * @param  {Object}
     */
    searchData (data) {
      for (const dataSearch in this.params.dataSearch) {
        this.params.dataSearch[dataSearch] = data
      }
      this.getRates()
    },
    /**
     * Save Branch Office
     * @param  {Object}
     */
    save (data) {
      data.unit_of_measurement_id = data.unit_of_measurement.value
      data.user_created_id = this.userSession.id
      this.loadingForm = true
      this.$services.postData(['rates'], data)
        .then(({ res }) => {
          this.addDialig = false
          this.loadingForm = false
          this.getRates(this.params)
        })
        .catch(() => {
          this.loadingForm = false
        })
    },
    /**
     * Update Branch Office
     * @param  {Object}
     */
    update (data) {
      data.unit_of_measurement_id = data.unit_of_measurement.value ?? data.unit_of_measurement.id
      data.user_updated_id = this.userSession.id
      this.loadingForm = true
      this.$services.putData(['rates', this.selectedData.id], data)
        .then(({ res }) => {
          this.editDialog = false
          this.loadingForm = false
          this.getRates(this.params)
        })
        .catch(() => {
          this.loadingForm = false
        })
    },
    /**
     * Set data dialog edition
     * @param  {Object} data selected
     */
    viewDetails (data) {
      this.editDialog = true
      this.propsPanelEdition.data = data
      this.selectedData = data
    },
    /**
     * Get all rate
     */
    getRates (params = this.params) {
      this.loadingTable = true
      this.$services.getData(['rates'], this.params)
        .then(({ res }) => {
          this.data = res.data.data
          this.optionPagination.rowsNumber = res.data.total
          this.loadingTable = false
        })
        .catch(err => {
          console.log(err)
          this.data = []
          this.loadingTable = false
          this.optionPagination.rowsNumber = 0
        })
    }
  }
}
</script>
