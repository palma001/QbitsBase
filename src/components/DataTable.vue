<template>
  <div style="width: 100%">
    <q-table class="primary"
      :data="data"
      :columns="columnData"
      :title="ucwords($t(`${module}.${title}`))"
      :pagination="paginationConfig"
      :loading="loading"
      :selection="selection"
      :selected.sync="selected"
      @update:pagination="setPagination">
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-if="toggable" align="left">
            <q-toggle
              v-model="props.selected"
              size="xs"
              @input="selectionToggleAll"
            />
          </q-th>
          <q-th v-for="col in props.cols"
            :key="col.name"
            :props="props"
            :class="col.class">
            {{ ucwords((col.label) ? $t(`${module}.${col.label}`) : $t(`${module}.${col.name}`)) }}
          </q-th>
          <q-th align="center" v-if="action">
            {{ ucwords($t('template.actions')) }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:top-right v-if="searchable">
        <q-input dense
          debounce="300"
          @input="search"
          v-model="filter"
          :placeholder="ucwords($t('template.search'))">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-if="toggable">
            <q-toggle
              v-model="props.selected"
              size="xs"
              @input="selectionToggle(props.row)"
            />
          </q-td>
          <q-td v-for="col in props.cols"
            :key="col.name"
            :props="props">
            {{ col.value ? col.value : '-' }}
          </q-td>
          <q-td v-if="action" align="center"
          >
            <q-btn
              dense
              round
              v-for="buttonAction in buttonsActions"
              :key="buttonAction.id"
              :size="buttonAction.size"
              :color="buttonAction.color"
              :icon="buttonAction.icon"
              :class="buttonAction.class"
              @click="emitEvent(buttonAction.event, props.row)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script>
import { mixins } from '../mixins'
export default {
  name: 'DataTable',
  mixins: [mixins.containerMixin],
  props: {
    /**
     * Actions buttons
     * @type {Array} array buttons
     */
    buttonsActions: {
      type: Array,
      default: () => {
        return [
          {
            color: 'primary',
            icon: 'fullscreen',
            size: 'sm',
            event: 'view-details'
          }
        ]
      }
    },
    /**
     * Visibility toggle
     * @type {Boolean} status toggle
     */
    toggable: {
      type: Boolean,
      default: false
    },
    /**
     * Selection type
     * @type {String} selection type
     */
    selection: {
      type: String,
      default: 'single'
    },
    /**
     * Actions
     * @type {Boolean} status
     */
    action: {
      type: Boolean,
      required: false
    },
    /**
     * Searchable
     * @type {Boolean} status
     */
    searchable: {
      type: Boolean,
      required: false
    },
    /**
     * Loading status
     * @type {Boolean} status
     */
    loading: {
      type: Boolean,
      required: false
    },
    /**
     * The module name
     *
     * @type {String} module name
     */
    module: {
      type: String,
      required: false
    },
    /**
     * The table title
     *
     * @type {String} table title
     */
    title: {
      type: String,
      required: false
    },
    /**
     * The column definitions (Array of Objects)
     *
     * @type {Array} list columns
     */
    column: {
      type: Array,
      required: true
    },
    /**
     * The data table
     *
     * @type {Array} data table
     */
    data: {
      type: Array,
      required: true
    },
    /**
     * The pagination options
     *
     * @type {Object} pagination options
     */
    optionPagination: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      confirm: false,
      filter: '',
      /**
       * Content the column
       * @type {Array}
       */
      columnData: [],
      selected: []
    }
  },
  computed: {
    paginationConfig () {
      return this.optionPagination
    }
  },
  created () {
    this.setHeaders()
  },
  methods: {
    /**
     * Selected all data
     */
    selectionToggleAll () {
      this.$emit('selected', this.selected)
    },
    /**
     * Selected one data
     * @param {Object} Data selected
     */
    selectionToggle (data) {
      this.$emit('selected', this.selected, data)
    },
    /**
     * Details data
     * @param  {Object} data
     */
    emitEvent (event, data) {
      this.$emit(event, data)
    },
    /**
     * Set data pagination emit event
     * @param  {Object} data value pagination
     */
    setPagination (data) {
      this.$emit('on-load-data', data)
    },
    /**
     * setHeaders gets headers of table
     */
    setHeaders () {
      this.column.map(element => {
        element.children.map(tag => {
          if (tag.tabulated && tag.tabulated.visible) {
            this.columnData.push(tag.tabulated)
          }
        })
      })
    },
    /**
     * search emit event for search
     * @param  {String} data value of search input
     */
    search (data) {
      this.paginationConfig.page = 1
      this.$emit('search-data', data)
    }
  }
}
</script>
