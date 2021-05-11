<template>
  <q-page padding>
    <q-splitter
      v-model="splitterModel"
      style="height: 88vh"
    >
      <template v-slot:before>
        <div class="q-pa-md">
          <div class="text-h4 q-mb-md">
            Roles
          </div>
          <div class="q-pa-none">
            <data-table
              title="list"
              module="role"
              searchable
              action
              :column="roleConfig"
              :data="dataRoles"
              :loading="loadingTable"
              :optionPagination="optionPagination"
              @search-data="searchData"
              @view-details="viewDetails"
              @on-load-data="loadData"
            />
          </div>
        </div>
      </template>
      <template v-slot:after>
        <q-splitter
          v-model="insideModel"
          horizontal
        >
          <template v-slot:before>
            <div class="q-pa-md">
              <div class="text-h4 q-mb-md">Permisos Habilitados Menú</div>
                <div class="row">
                  <div class="col-12">
                    <q-btn
                          color="orange"
                          text-color="white"
                          size="md"
                          icon="save"
                          aria-label="save"
                          round
                        >
                        </q-btn>
                  </div>
                </div>
                <div class="row q-mt-md">
                  <div class="col-12 q-gutter-md">
                    <q-toggle v-model="selected1" size="xs" label="Menu-1"/>
                    <q-btn
                          color="green"
                          text-color="white"
                          size="xs"
                          icon="edit"
                          aria-label="edit_location"
                          round
                          @click="editarMenu('Menu-1')"
                          >
                    </q-btn>
                    <q-toggle v-model="selected2" size="xs" label="Menu-2"/>
                    <q-btn
                          color="green"
                          text-color="white"
                          size="xs"
                          icon="edit"
                          aria-label="edit_location"
                          round
                          @click="editarMenu('Menu-2')"
                          >
                    </q-btn>
                     <q-toggle v-model="selected4" size="xs" label="Menu-3"/>
                    <q-btn
                          color="green"
                          text-color="white"
                          size="xs"
                          icon="edit"
                          aria-label="edit_location"
                          round
                          @click="editarMenu('Menu-3')"
                          >
                    </q-btn>
                    <q-toggle v-model="selected5" size="xs" label="Menu-4"/>
                    <q-btn
                          color="green"
                          text-color="white"
                          size="xs"
                          icon="edit"
                          aria-label="edit_location"
                          round
                          @click="editarMenu('Menu-4')"
                          >
                    </q-btn>
                    <q-toggle v-model="selected5" size="xs" label="Menu-5"/>
                    <q-btn
                          color="green"
                          text-color="white"
                          size="xs"
                          icon="edit"
                          aria-label="edit_location"
                          round
                          @click="editarMenu('Menu-5')"
                          >
                    </q-btn>
                    <q-toggle v-model="selected5" size="xs" label="Menu-6"/>
                    <q-btn
                          color="green"
                          text-color="white"
                          size="xs"
                          icon="edit"
                          aria-label="edit_location"
                          round
                          @click="editarMenu('Menu-6')"
                          >
                    </q-btn>
                  </div>
                </div>
            </div>
          </template>
          <template v-slot:after>
            <div class="q-pa-md">
              <div class="text-h4 q-mb-md">
                Permisos Habilitados Submenu {{submenu}}
              </div>
            </div>
          </template>
        </q-splitter>
      </template>
    </q-splitter>
  </q-page>
</template>

<script>
import DataTable from '../components/DataTable.vue'
import { mixins } from '../mixins'
import { roleConfig } from '../config-file/role/roleConfig.js'
import { GETTERS } from '../store/module-login/name.js'
import { mapGetters } from 'vuex'
export default {
  mixins: [mixins.containerMixin],
  components: {
    DataTable
  },
  data () {
    return {
      /**
       * Options pagination
       * @type {Object}
       */
      optionPagination: {
        rowsPerPage: 20,
        paginate: true,
        sortBy: 'id',
        sortOrder: 'desc',
        rowsNumber: 20
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
          name: ''
        }
      },
      branchOffice: null,
      userSession: null,
      roleConfig,
      splitterModel: 24, // start at 50%
      insideModel: 30,
      selected: [],
      selected1: true,
      selected2: true,
      selected3: true,
      selected4: true,
      selected5: false,
      submenu: '',
      loading: false,
      rowCount: 10,
      dataRoles: [],
      loadingTable: false
    }
  },
  computed: {
    /**
     * Getters Vuex
     */
    ...mapGetters([GETTERS.GET_USER, GETTERS.GET_BRANCH_OFFICE])
  },
  created () {
    this.userSession = this[GETTERS.GET_USER]
    this.branchOffice = this[GETTERS.GET_BRANCH_OFFICE]
  },
  methods: {
    editarMenu (data) {
      this.submenu = data
    },
    /**
     * Load data sorting
     * @param  {Object}
     */
    loadData (data) {
      console.log(data)
      this.params.page = data.page
      this.params.sortBy = data.sortBy
      this.params.sortOrder = data.sortOrder
      this.params.perPage = data.rowsPerPage
      this.optionPagination = data
      this.getRoles(this.params)
    },
    /**
     * Search branch offices
     * @param  {Object}
     */
    searchData (data) {
      for (const dataSearch in this.params.dataSearch) {
        this.params.dataSearch[dataSearch] = data
      }
      this.getRoles()
    },
    /**
     * Set data dialog edition
     * @param  {Object} data selected
     */
    viewDetails (data) {
      console.log(data)
      this.selectedData = data
    },
    /**
     * Get all branch offices
     */
    getRoles (params = this.params) {
      this.loadingTable = true
      this.$services.getData(['roles'], this.params)
        .then(({ res }) => {
          console.log(res.data)
          this.dataRoles = res.data.data
          this.optionPagination.rowsNumber = res.data.total
          this.loadingTable = false
        })
        .catch(err => {
          console.log(err)
          this.dataRoles = []
          this.loadingTable = false
          this.optionPagination.rowsNumber = 0
        })
    }
  }
}
</script>
