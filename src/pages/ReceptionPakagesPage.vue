<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
        <q-input
        label="Código de guia"
        dense
        autofocus
        v-model="codeGuide"
        @keyup.native.enter="getOneGuide"
        />
      </div>
      <div class="col-lg-2 col-md-2 col-md-2 col-sm-2 col-xs-12" v-if="guide.carrier">
        <q-input
          label="Transportista"
          dense
          v-model="guide.carrier.full_name"
          readonly
        />
      </div>
      <div class="col-lg-2 col-md-2 col-md-2 col-sm-2 col-xs-12" v-if="guide.vehicle">
        <q-input
          label="Marca"
          dense
          v-model="guide.vehicle.brand"
          readonly
          hint="Datos del vehiculo"
        />
      </div>
      <div class="col-lg-2 col-md-2 col-md-2 col-sm-2 col-xs-12" v-if="guide.vehicle">
        <q-input
          label="Placa"
          dense
          v-model="guide.vehicle.plate"
          readonly
          hint="Datos del vehiculo"
        />
      </div>
      <div class="col-lg-2 col-md-2 col-md-2 col-sm-2 col-xs-12" v-if="guide.vehicle">
        <q-btn
          push
          color="primary"
          icon="save"
          @click="saveGuide"
        />
      </div>
      <div v-if="guide.seals" class="col-12 row q-col-gutter-md">
        <div class="col-3" v-for="(seal, index) in guide.seals" :key="seal.id">
          <q-input
            :label="`Precinto Nro ${index + 1}`"
            v-model="seal.seal_number"
            dense
            readonly
          />
        </div>
      </div>
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
      voucherConfig,
      codeGuide: null,
      guide: {
        vouchers: []
      },
      voucherSelected: [],
      loadingTable: false,
      /**
       * Options pagination
       * @type {Object}
       */
      optionPagination: {
        rowsPerPage: 20,
        paginate: true,
        sortBy: 'id',
        sortOrder: 'desc'
      }
    }
  },
  methods: {
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
    saveGuide () {
      this.guide.vouchers = this.voucherSelected
      this.$services.putData(['guides', this.guide.id], this.guide)
        .then(({ res }) => {
          console.log(res)
        })
        .catch((err) => {
          this.notify(this, err.message, 'negative', 'warning')
        })
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
          }
        })
        .catch(() => {
          this.notify(this, 'Guia no contrada', 'negative', 'warning')
        })
    }
  }
}
</script>

<style>

</style>
