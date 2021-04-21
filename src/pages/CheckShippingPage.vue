<template>
  <q-page padding>
    <div class="row q-col-gutter-x-md">
      <div class="col-12">
        <q-table
          title="Treats"
          :data="shipping"
          :columns="columns"
          row-key="id"
          :filter="filter"
          :loading="loading"
        >
          <template v-slot:top>
            <div class="q-mb-xs q-pb-none">
              <div class="row">
                <p class="text-h6">Consolidado de envíos</p>
              </div>
              <div class="row q-col-gutter-x-sm text-left justify-center">
                <div class="col-3 q-pt-sm">
                  <q-radio v-model="shape" val="Del" label="Del" />
                </div>
                <div class="col-8">
                  <q-select v-model="model" :options="options" label="Filtrar" dense/>
                </div>
                <div class="col-3 q-pt-sm">
                  <q-radio v-model="shape" val="Rango" label="Rango" />
                </div>
                <div class="col-4">
                  <q-input type="date" hint="Desde" v-model="desde" dense @input="range"/>
                </div>
                <div class="col-4">
                  <q-input type="date" hint="Hasta" v-model="hasta" dense @input="range"/>
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
                Medidas del paquete
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
                  icon="search"
                  size="sm"
                  round
                >
                  <q-popup-proxy>
                    <div class="q-pa-md">
                      <q-input
                        readonly
                        v-for="rate in props.row.rates"
                        :key="rate.id" :label="rate.name"
                        :value="rate.pivot.description"
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
  </q-page>
</template>

<script>
import { date } from 'quasar'
export default {
  data () {
    return {
      shape: 'Del',
      params: {
        paginated: false,
        dateFilter: {
          field: 'updated_at',
          to: date.formatDate(new Date(), 'YYYY-MM-DD'),
          from: date.formatDate(new Date(), 'YYYY-MM-DD')
        }
      },
      desde: null,
      hasta: null,
      model: null,
      shipping: [],
      loading: false,
      filter: '',
      options: ['Día', 'Día anterior', 'Mes', 'Mes anterior'],
      columns: [
        {
          name: 'id',
          required: true,
          label: 'N° de Comprobante',
          align: 'left',
          field: row => row.id,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'sender', align: 'center', label: 'Remitente', field: row => row.bill.sender.full_name, sortable: true },
        { name: 'phoneNumberSender', align: 'center', label: 'Teléfono', field: row => row.bill.sender.phone_number },
        { name: 'source', align: 'center', label: 'Origen', field: row => row.bill.branch_office.name },
        { name: 'destination', align: 'center', label: 'Destino', field: row => row.destinable.city },
        { name: 'addressee', align: 'center', label: 'Destinatario', field: row => row.addressee.full_name },
        { name: 'phoneNumberAddressee', align: 'center', label: 'Teléfono', field: row => row.addressee.phone_number },
        { name: 'status', align: 'center', label: 'Estatus', field: row => row.status },
        { name: 'date', align: 'center', label: 'Fecha', field: row => this.formatDate(row.updated_at) } // Falta calcular la fecha del ultimo estatus
      ]
    }
  },
  created () {
    this.getShipping(this.params)
  },
  methods: {
    getShipping (params) {
      this.$services.getData(['vouchers'], params)
        .then(({ res }) => {
          console.log(res)
          this.shipping = res.data
        })
    },
    formatDate (sourceDate) {
      sourceDate = date.addToDate(sourceDate, { days: 1 })
      return date.formatDate(sourceDate, 'DD-MM-YYYY')
    },
    range () {
      if (this.desde && this.hasta) {
        this.params = {
          dateFilter: {
            field: 'updated_at',
            to: this.hasta,
            from: this.desde
          }
        }
        this.getShipping(this.params)
      }
    }
  }
}
</script>
