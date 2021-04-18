<template>
  <q-page padding>
    <div class="row q-gutter-y-sm">
      <div class="col-12 text-right">
        <q-btn
          color="primary"
          icon="add_circle"
          :label="$q.screen.lt.sm ? '' : $t('branchOffice.add')"
          @click="addDialig = true"
        >
        <q-tooltip
          anchor="center right"
          self="center left"
          :offset="[10, 10]"
          v-if="$q.screen.lt.sm"
        >
          {{
            ucwords($t('branchOffice.add'))
          }}
        </q-tooltip>
      </q-btn>
      </div>
      <div class="col-12">
        <data-table
          title="list"
          module="branchOffice"
          selection="multiple"
          searchable
          action
          toggable
          :column="branchOffice"
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
        module="branchOffice"
        :propsPanelEdition="propsPanelEdition"
        :config="branchOffice"
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
        module="branchOffice"
        :config="branchOffice"
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
import { branchOffice, propsPanelEdition, branchOfficeServices } from '../config-file/branchOffice/branchOfficeConfig.js'
import { mixins } from '../mixins'
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
        paginate: true,
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
        sortOrder: 'desc',
        dataSearch: {
          name: '',
          phone_number: '',
          phone_number_two: '',
          address: '',
          description: ''
        }
      },
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
      branchOffice,
      /**
       * RelationalData description
       * @type {Object}
       */
      branchOfficeServices,
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
    this.getBanchOffices()
    this.setRelationalData(this.branchOfficeServices, [], this)
  },
  methods: {
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
      this.getBanchOffices(this.params)
    },
    /**
     * Search branch offices
     * @param  {Object}
     */
    searchData (data) {
      for (const dataSearch in this.params.dataSearch) {
        this.params.dataSearch[dataSearch] = data
      }
      this.getBanchOffices()
    },
    /**
     * Save Branch Office
     * @param  {Object}
     */
    save (data) {
      data.destination_id = data.destination.value
      data.in_charge_id = data.in_charge.value
      data.user_created_id = 1
      this.loadingForm = true
      this.$services.postData(['branch-offices'], data)
        .then(({ res }) => {
          this.addDialig = false
          this.loadingForm = false
          this.getBanchOffices(this.params)
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
      data.destination_id = data.destination.value ?? data.destination.id
      data.in_charge_id = data.in_charge.value ?? data.in_charge.id
      data.user_created_id = 1
      this.loadingForm = true
      this.$services.putData(['branch-offices', this.selectedData.id], data)
        .then(({ res }) => {
          this.editDialog = false
          this.loadingForm = false
          this.getBanchOffices(this.params)
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
     * Open formulary
     * @param  {String}
     */
    changeTitleForm (title) {
      this.titleForm = title
    },
    /**
     * Get all branch offices
     */
    getBanchOffices (params = this.params) {
      this.loadingTable = true
      this.$services.getData(['branch-offices'], this.params)
        .then(({ res }) => {
          this.data = res.data
          this.loadingTable = false
        })
        .catch(err => {
          console.log(err)
          this.data = []
          this.loadingTable = false
        })
    }
  }
}
</script>
