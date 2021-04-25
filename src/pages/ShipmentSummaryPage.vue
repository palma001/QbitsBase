<template>
  <q-page padding>
    <div>
        <q-splitter
        v-model="splitterModel"
        style="height: 88vh"
        >

        <template v-slot:before>
            <div class="q-pa-xs">
            <div class="text-h5 q-mb-md">Sucursales</div>
              <div class="q-gutter-md q-mt-xs">
                <q-list bordered padding class="rounded-borders" style="max-width: 350px">
                  <q-item clickable v-ripple v-for="branchOffice in branchOffices" :key="branchOffice.id" @click="filterBranchOffice(branchOffice.id)">
                    <q-item-section avatar top>
                      <q-avatar icon="maps_home_work" color="primary" text-color="white" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label lines="1">{{branchOffice.name}}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar top>
                      <q-avatar icon="language" color="primary" text-color="white" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>General</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
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
              <div class="text-h6 q-mb-xs">Movilidad de paquetes</div>
                <div class="row q-col-gutter-xs">
                    <div class="col-3" v-for="unit in units" :key="unit.id">
                      <q-card dark bordered class="bg-blue-grey-9  my-card">
                        <q-card-section>
                          <div class="text-h6">
                            {{ ucwords($t(`voucher.${unit.status}`)) }}
                          </div>
                          <div class="text-subtitle2">{{ unit.amountvouchers }} Paquetes</div>
                          <div class="text-subtitle2">{{ unit.description }} {{ unit.measurement }}</div>
                        </q-card-section>
                      </q-card>
                    </div>
                    <div class="col-3">
                      <q-card dark bordered class="bg-cyan-9 my-card">
                        <q-card-section>
                            <div class="text-h6">Total</div>
                            <div class="text-subtitle2">{{ total.amountvouchers }} Paquetes</div>
                            <div class="text-subtitle2">{{ total.description }} Kg</div>
                        </q-card-section>
                      </q-card>
                    </div>
                </div>
              </div>
            </template>

            <template v-slot:after>
                <div class="q-pa-xs">
                </div>
                  <div class="row q-col-gutter-x-md">
                    <div class="col-12">
                      <q-table
                        title="Treats"
                        :data="vouchers"
                        :columns="columns"
                        row-key="id"
                        :filter="filter"
                        :loading="loading"
                      >
                        <template v-slot:top>
                          <div class="q-mb-xs q-pb-none">
                            <div class="row">
                              <p class="text-h6">Operaciones</p>
                            </div>
                            <div class="row q-col-gutter-x-sm text-left justify-center">
                              <div class="col-3 q-pt-sm">
                                <q-radio v-model="shape" val="Del" label="Del" />
                              </div>
                              <div class="col-8">
                                <q-select v-model="model" :options="options" label="Filtrar" dense  @input="queryTime"/>
                              </div>
                              <div class="col-3 q-pt-sm">
                                <q-radio v-model="shape" val="Rango" label="Rango" />
                              </div>
                              <div class="col-4">
                                <q-input type="date" hint="Desde" v-model="desde" dense @input="range(desde, hasta)"/>
                              </div>
                              <div class="col-4">
                                <q-input type="date" hint="Hasta" v-model="hasta" dense @input="range(desde, hasta)"/>
                              </div>
                            </div>
                          </div>
                          <q-space />
                            <q-input dense debounce="300" color="primary" v-model="filter" label="Buscar">
                              <template v-slot:append>
                                <q-icon name="search" />
                              </template>
                            </q-input>
                        </template>
                        <template v-slot:header="props">
                          <q-tr :props="props">
                            <q-th v-for="col in props.cols" :key="col.name" :props="props">
                              {{col.label}}
                            </q-th>
                            <q-th>
                              Datos del paquete
                            </q-th>
                            <q-th class="text-center">
                              Destinatario
                            </q-th>
                          </q-tr>
                        </template>
                        <template v-slot:body="props">
                          <q-tr :props="props" >
                            <q-td v-for="col in props.cols" :key="col.name" :props="props">
                              {{col.value}}
                            </q-td>
                            <q-td align="center">
                              <q-btn
                                color="primary"
                                icon="inventory_2"
                                size="sm"
                                round
                              >
                                <q-popup-proxy>
                                  <div class="q-pa-md">
                                    <q-input
                                      readonly
                                      v-for="rate in props.row.rates"
                                      :key="rate.x" :label="rate.name"
                                      :value="`${rate.pivot.description} ${rate.unit_of_measurement.acronym}`"
                                    />
                                  </div>
                                </q-popup-proxy>
                              </q-btn>
                            </q-td>
                            <q-td class="text-center">
                              <q-btn icon="person" color="primary" round size="sm" @click="alert=true">
                                <q-popup-proxy>
                                  <div class="q-pa-md">
                                    <q-input
                                      readonly
                                      label="Nombre"
                                      :value="props.row.addressee.full_name"
                                    />
                                    <q-input
                                      readonly
                                      label="Teléfono"
                                      :value="props.row.addressee.phone_number"
                                    />
                                    <q-input
                                      readonly
                                      label="email"
                                      :value="props.row.addressee.email"
                                    />
                                  </div>
                                </q-popup-proxy>
                              </q-btn>
                            </q-td>
                          </q-tr>
                        </template>
                      </q-table>
                    </div>
                  </div>
            </template>

            </q-splitter>
        </template>

        </q-splitter>
    </div>
  </q-page>
</template>

<script>
import { date } from 'quasar'
import { mixins } from '../mixins'
export default {
  mixins: [mixins.containerMixin],
  data () {
    return {
      splitterModel: 16, // start at 50%
      insideModel: 32,
      alert: false,
      vouchers: [],
      shippingStatus: [],
      branchOffices: [],
      desde: null,
      hasta: null,
      shape: 'line',
      model: null,
      options: ['Día', 'Día anterior', 'Mes', 'Mes anterior'],
      loading: false,
      filter: '',
      units: [],
      total: {
        description: 0
      },
      params: {
        paginated: false,
        sortOrder: 'desc',
        sortBy: 'id',
        dataFilter: {},
        dateFilter: {
          field: 'created_at',
          to: date.formatDate(new Date(), 'YYYY-MM-DD'),
          from: date.formatDate(new Date(), 'YYYY-MM-DD')
        }
      },
      rowCount: 10,
      name: '',
      columns: [
        {
          name: 'date',
          required: true,
          label: 'Fecha',
          align: 'left',
          field: row => this.formatDate(row.created_at),
          format: val => `${val}`,
          sortable: true
        },
        { name: 'voucherNumber', align: 'center', label: 'N° de Comprobante', field: row => row.number, sortable: true },
        { name: 'sender', align: 'center', label: 'Remitente', field: row => row.bill.sender.full_name },
        { name: 'destination', align: 'center', label: 'Destino', field: row => row.destinable.city ?? row.destinable.name },
        { name: 'status', align: 'center', label: 'Estatus', field: row => this.$t('voucher.' + row.status) },
        { name: 'addressee', align: 'center', label: 'Destinatario', field: row => row.addressee.full_name }
      ]
    }
  },
  created () {
    this.getBranchOffice()
    this.getVoucher()
    this.getUnid(this.params.dateFilter.from, this.params.dateFilter.to)
  },
  methods: {
    getUnid (desde, hasta) {
      this.$services.getData(['reports', 'consolidated-packages'], {
        from: desde,
        to: hasta
      })
        .then(({ res }) => {
          this.units = res.data
          this.totalUnit()
        })
    },
    totalUnit () {
      this.total.description = 0
      this.total.amountvouchers = 0
      this.units.map(unit => {
        this.total.description += unit.description
        this.total.amountvouchers += unit.amountvouchers
      })
    },
    getBranchOffice () {
      this.$services.getData(['branch-offices'], { paginated: false })
        .then(({ res }) => {
          this.branchOffices = res.data
          this.filterBranchOffice(this.branchOffices[0].id)
        })
    },
    filterBranchOffice (sucursal) {
      this.params.dataFilter = {
        'bill.branch_office_id': sucursal
      }
      this.getVoucher(this.params)
    },
    getVoucher (params = this.params) {
      this.$services.getData(['vouchers'], params)
        .then(({ res }) => {
          this.vouchers = res.data
        })
    },
    filterVoucher (comprobante) {
      this.params.dataFilter.voucher = comprobante
      this.getBranchOffice6(this.params)
    },
    formatDate (sourceDate) {
      if (sourceDate) {
        const timeStamp = date.extractDate(sourceDate, 'YYYY-MM-DD')
        return date.formatDate(timeStamp, 'DD-MM-YYYY')
      }
      return '-'
    },
    queryTime () {
      const queryTime = this.unitTime(this.model)
      this.range(queryTime.from, queryTime.to)
    },
    range (desde, hasta) {
      if (desde && hasta) {
        this.params = {
          dateFilter: {
            field: 'created_at',
            from: desde,
            to: hasta
          }
        }
        this.getVoucher(this.params)
        this.getUnid(desde, hasta)
      }
    }
  }
}
</script>
