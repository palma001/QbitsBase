
<template>
  <q-page padding>
    <div class="row">
      <div class="col-4">
        <p class="text-h5">
          Recepción de guias
        </p>
      </div>
      <div class="col-8 text-right" v-if="guide.helper">
        <q-btn
          push
          color="primary"
          icon="save"
          class="q-mr-sm"
          round
          @click="saveGuide"
        >
          <q-tooltip>
            Guardar guia
          </q-tooltip>
        </q-btn>
        <q-btn
          push
          color="negative"
          icon="close"
          class="q-mr-md"
          round
          @click="cancelRepction"
        >
          <q-tooltip>
            Cancelar
          </q-tooltip>
        </q-btn>
      </div>
    </div>
    <q-splitter
      v-model="splitterModel"
      style="height: 78vh"
    >

      <template v-slot:before>
        <div class="q-pl-none q-pr-md">
          <q-scroll-area
            :thumb-style="thumbStyle"
            :content-style="contentStyle"
            :content-active-style="contentActiveStyle"
            style="height: 78vh;"
          >
            <div class="row q-gutter-y-sm">
              <div class="col-12">
                <q-input
                label="Número de guia"
                dense
                autofocus
                v-model="codeGuide"
                @keyup.native.enter="getOneGuide"
                />
              </div>
              <div class="col-12" v-if="guide.carrier">
                <q-input
                  label="Número de documento"
                  dense
                  v-model="guide.carrier.document_number"
                  readonly
                  hint="Datos del transportista"
                />
              </div>
              <div class="col-12" v-if="guide.carrier">
                <q-input
                  label="Transportista"
                  hint="Datos del transportista"
                  dense
                  v-model="guide.carrier.full_name"
                  readonly
                />
              </div>
              <div class="col-12" v-if="guide.vehicle">
                <q-input
                  label="Marca"
                  dense
                  v-model="guide.vehicle.brand"
                  readonly
                  hint="Datos del vehiculo"
                />
              </div>
              <div class="col-12" v-if="guide.vehicle">
                <q-input
                  label="Placa"
                  dense
                  v-model="guide.vehicle.plate"
                  readonly
                  hint="Datos del vehiculo"
                />
              </div>
              <div class="col-12" v-if="guide.helper">
                <q-input
                  label="Asistente"
                  dense
                  v-model="guide.helper.full_name"
                  readonly
                  hint="Datos del asistente"
                />
              </div>
              <div class="col-12" v-if="guide.helper">
                <q-input
                  label="Número de documento"
                  dense
                  v-model="guide.helper.document_number"
                  readonly
                  hint="Datos del asistente"
                />
              </div>
              <div v-if="guide.seals" class="col-12">
                <div v-for="(seal, index) in guide.seals" :key="seal.id">
                  <q-input
                    :label="`Precinto Nro ${index + 1}`"
                    v-model="seal.seal_number"
                    dense
                    readonly
                  />
                </div>
              </div>
            </div>
          </q-scroll-area>
        </div>
      </template>

      <template v-slot:after>
        <div class="q-pl-md q-pr-md row q-col-gutter-y-sm">
          <div class="col-12">
            <data-table
              title="list"
              module="voucher"
              toggable
              selection="multiple"
              :column="voucherConfig"
              :data="guide.vouchers"
              :loading="loadingTable"
              :optionPagination="optionPagination"
              @selected="selecedVoucher"
            />
          </div>
        </div>
      </template>

    </q-splitter>
  </q-page>
</template>

<script>
import DataTable from '../components/DataTable.vue'
import { voucherConfig } from '../config-file/voucher/voucherConfig'
import { mixins } from '../mixins'
export default {
  mixins: [mixins.containerMixin],
  components: {
    DataTable
  },
  data () {
    return {
      splitterModel: 25,
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
      /**
       * File config
       * @type {Array} file config of table
       */
      voucherConfig,
      /**
       * Code guide
       * @type {Array} Code guide
       */
      codeGuide: null,
      /**
       * Guide search
       * @type {Array} Guide search
       */
      guide: {
        vouchers: []
      },
      /**
       * Voucher selected
       * @type {Array} Voucher selected
       */
      voucherSelected: [],
      /**
       * Loading Table
       * @type {Boolean} Status table
       */
      loadingTable: false,
      /**
       * Options pagination
       * @type {Object}
       */
      optionPagination: {
        rowsPerPage: 200,
        paginate: true,
        sortBy: 'id',
        sortOrder: 'desc'
      }
    }
  },
  created () {
    this.$barcodeScanner.init(this.getOneGuide)
  },
  destroyed () {
    // Remove listener when component is destroyed
    this.$barcodeScanner.destroy()
  },
  methods: {
    /**
     * Selected vocher
     * @param {Array} data voucher selected
     */
    selecedVoucher (data) {
      this.voucherSelected = data.map(voucher => {
        return {
          voucher_id: voucher.id,
          steerable_id: 1,
          steerable_type: 'App\\Models\\BranchOffice',
          status: 'received',
          user_created_id: 1
        }
      })
    },
    /**
     * Save guide
     */
    saveGuide () {
      if (this.voucherSelected.length > 0) {
        this.guide.vouchers = this.voucherSelected
        this.$services.putData(['guides', this.guide.id], this.guide)
          .then(({ res }) => {
            this.notify(this, 'guide.voucherReceptSuccessfull', 'positive', 'mood')
            this.cancelRepction()
          })
          .catch((err) => {
            this.notify(this, err.message, 'negative', 'warning')
          })
      } else {
        this.notify(this, 'guide.voucherEmty', 'negative', 'warning')
      }
    },
    /**
     * Get one voucher
     */
    getOneGuide (code) {
      this.codeGuide = typeof code === 'string' ? code : this.codeGuide
      this.$services.getOneData(['guides', this.codeGuide])
        .then(({ res }) => {
          if (res.data) {
            this.guide = res.data
          } else {
            this.notify(this, 'guide.notFound', 'negative', 'warning')
          }
        })
        .catch(() => {
          this.notify(this, 'guide.notFound', 'negative', 'warning')
        })
    },
    /**
     * Cancel reception
     */
    cancelRepction () {
      this.guide = { vouchers: [] }
      this.codeGuide = null
      this.voucherSelected = []
    }
  }
}
</script>
