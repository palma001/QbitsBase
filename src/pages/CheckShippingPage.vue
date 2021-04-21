<template>
    <q-page padding>
        <div class="q-pa-xs"></div>
            <div class="row q-col-gutter-x-md">
                <div class="col-12">
                    <q-table
                        title="Treats"
                        :data="data"
                        :columns="columns"
                        row-key="id"
                        :filter="filter"
                        :loading="loading"
                      >
                        <template v-slot:top>
                          <div class="q-mb-xs q-pb-none">
                            <div class="row">
                              <p class="text-h6">Consolidado de Envíos</p>
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
                                <q-input type="date" hint="Desde" v-model="desde" dense/>
                              </div>
                              <div class="col-4">
                                <q-input type="date" hint="Hasta" v-model="hasta" dense/>
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
                          </q-tr>
                        </template>
                        <template v-slot:body="props">
                          <q-tr :props="props" >
                            <q-td v-for="col in props.cols" :key="col.name" :props="props">
                              {{col.value}}
                            </q-td>
                          </q-tr>
                        </template>
                    </q-table>
                </div>
             </div>
    </q-page>
</template>

<script>
export default {
  data () {
    return {
      splitterModel: 16, // start at 50%
      insideModel: 32,
      alert: false,
      // address: '',
      shippingStatus: [], // Variable para controlar de forma dinámica los estatus de envíos (Recibido, En Tránsito, Entregado)
      branchOffices: [],
      desde: null,
      hasta: null,
      shape: 'line',
      model: null,
      options: ['Día', 'Día anterior', 'Mes', 'Mes anterior'],
      loading: false,
      filter: '',
      rowCount: 10,
      name: '',
      // employee: '',
      columns: [
        {
          name: 'voucherNumber',
          required: true,
          label: 'N° de Comprobante',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'sender', align: 'center', label: 'Remitente', field: 'sender', sortable: true },
        { name: 'phoneNumberSender', align: 'center', label: 'Teléfono', field: 'phoneNumberSender' },
        { name: 'source', align: 'center', label: 'Origen', field: 'source' },
        { name: 'destination', align: 'center', label: 'Destino', field: 'destination' },
        { name: 'addressee', align: 'center', label: 'Destinatario', field: 'addressee' },
        { name: 'phoneNumberAddressee', align: 'center', label: 'Teléfono', field: 'phoneNumberAddressee' },
        { name: 'weight', align: 'center', label: 'Peso (Kg)', field: 'weight' },
        { name: 'status', align: 'center', label: 'Estatus', field: 'status' },
        { name: 'date', align: 'center', label: 'Fecha', field: 'date' }
      ],
      data: [
        {
          id: 1,
          name: '01-0345852',
          sender: 'Carlos Rodríguez',
          phoneNumberSender: '0424-8452314',
          source: 'Puerto La Cruz',
          destination: 'Tumeremo',
          addressee: 'Luis Palma',
          phoneNumberAddressee: '0416-8521328',
          weight: '3,00',
          status: 'Recibido',
          date: '15/04/2021'
        },
        {
          id: 2,
          name: '01-4235852',
          sender: 'Carlos Rodríguez',
          phoneNumberSender: '0424-8452314',
          source: 'Puerto La Cruz',
          destination: 'Tumeremo',
          addressee: 'Luis Palma',
          phoneNumberAddressee: '0416-8521328',
          weight: '3,00',
          status: 'En Trásito',
          date: '16/04/2021'
        },
        {
          id: 3,
          name: '01-5895852',
          sender: 'Carlos Rodríguez',
          phoneNumberSender: '0424-8452314',
          source: 'Puerto La Cruz',
          destination: 'Tumeremo',
          addressee: 'Luis Palma',
          phoneNumberAddressee: '0416-8521328',
          weight: '3,00',
          status: 'Recibido',
          date: '15/04/2021'
        },
        {
          id: 4,
          name: '01-0348852',
          sender: 'Carlos Rodríguez',
          phoneNumberSender: '0424-8452314',
          source: 'Puerto La Cruz',
          destination: 'Tumeremo',
          addressee: 'Luis Palma',
          phoneNumberAddressee: '0416-8521328',
          weight: '3,00',
          status: 'Recibido',
          date: '15/04/2021'
        },
        {
          id: 5,
          name: '01-0545852',
          sender: 'Carlos Rodríguez',
          phoneNumberSender: '0424-8452314',
          source: 'Puerto La Cruz',
          destination: 'Tumeremo',
          addressee: 'Luis Palma',
          phoneNumberAddressee: '0416-8521328',
          weight: '3,00',
          status: 'Entregado',
          date: '20/04/2021'
        },
        {
          id: 6,
          name: '01-3245852',
          sender: 'Carlos Rodríguez',
          phoneNumberSender: '0424-8452314',
          source: 'Puerto La Cruz',
          destination: 'Tumeremo',
          addressee: 'Luis Palma',
          phoneNumberAddressee: '0416-8521328',
          weight: '3,00',
          status: 'Recibido',
          date: '15/04/2021'
        },
        {
          id: 7,
          name: '01-1845852',
          sender: 'Carlos Rodríguez',
          phoneNumberSender: '0424-8452314',
          source: 'Puerto La Cruz',
          destination: 'Tumeremo',
          addressee: 'Luis Palma',
          phoneNumberAddressee: '0416-8521328',
          weight: '3,00',
          status: 'Recibido',
          date: '15/04/2021'
        },
        {
          id: 8,
          name: '01-2045852',
          sender: 'Carlos Rodríguez',
          phoneNumberSender: '0424-8452314',
          source: 'Puerto La Cruz',
          destination: 'Tumeremo',
          addressee: 'Luis Palma',
          phoneNumberAddressee: '0416-8521328',
          weight: '3,00',
          status: 'Recibido',
          date: '15/04/2021'
        },
        {
          id: 9,
          name: '01-0345854',
          sender: 'Carlos Rodríguez',
          phoneNumberSender: '0424-8452314',
          source: 'Puerto La Cruz',
          destination: 'Tumeremo',
          addressee: 'Luis Palma',
          phoneNumberAddressee: '0416-8521328',
          weight: '3,00',
          status: 'Recibido',
          date: '15/04/2021'
        },
        {
          id: 10,
          name: '01-1145822',
          sender: 'Carlos Rodríguez',
          phoneNumberSender: '0424-8452314',
          source: 'Puerto La Cruz',
          destination: 'Tumeremo',
          addressee: 'Luis Palma',
          phoneNumberAddressee: '0416-8521328',
          weight: '3,00',
          status: 'Recibido',
          date: '15/04/2021'
        }
      ],
      original: [
        {
          id: 1,
          name: '01-0345852',
          sender: 'Carlos Rodríguez',
          phoneNumberSender: '0424-8452314',
          source: 'Puerto La Cruz',
          destination: 'Tumeremo',
          addressee: 'Luis Palma',
          phoneNumberAddressee: '0416-8521328',
          weight: '3,00',
          status: 'Recibido',
          date: '15/04/2021'
        },
        {
          id: 2,
          name: '01-4235852',
          sender: 'Carlos Rodríguez',
          phoneNumberSender: '0424-8452314',
          source: 'Puerto La Cruz',
          destination: 'Tumeremo',
          addressee: 'Luis Palma',
          phoneNumberAddressee: '0416-8521328',
          weight: '3,00',
          status: 'Recibido',
          date: '15/04/2021'
        },
        {
          id: 3,
          name: '01-5895852',
          sender: 'Carlos Rodríguez',
          phoneNumberSender: '0424-8452314',
          source: 'Puerto La Cruz',
          destination: 'Tumeremo',
          addressee: 'Luis Palma',
          phoneNumberAddressee: '0416-8521328',
          weight: '3,00',
          status: 'Recibido',
          date: '15/04/2021'
        },
        {
          id: 4,
          name: '01-0348852',
          sender: 'Carlos Rodríguez',
          phoneNumberSender: '0424-8452314',
          source: 'Puerto La Cruz',
          destination: 'Tumeremo',
          addressee: 'Luis Palma',
          phoneNumberAddressee: '0416-8521328',
          weight: '3,00',
          status: 'Recibido',
          date: '15/04/2021'
        },
        {
          id: 5,
          name: '01-0545852',
          sender: 'Carlos Rodríguez',
          phoneNumberSender: '0424-8452314',
          source: 'Puerto La Cruz',
          destination: 'Tumeremo',
          addressee: 'Luis Palma',
          phoneNumberAddressee: '0416-8521328',
          weight: '3,00',
          status: 'Recibido',
          date: '15/04/2021'
        },
        {
          id: 6,
          name: '01-3245852',
          sender: 'Carlos Rodríguez',
          phoneNumberSender: '0424-8452314',
          source: 'Puerto La Cruz',
          destination: 'Tumeremo',
          addressee: 'Luis Palma',
          phoneNumberAddressee: '0416-8521328',
          weight: '3,00',
          status: 'Recibido',
          date: '15/04/2021'
        },
        {
          id: 7,
          name: '01-1845852',
          sender: 'Carlos Rodríguez',
          phoneNumberSender: '0424-8452314',
          source: 'Puerto La Cruz',
          destination: 'Tumeremo',
          addressee: 'Luis Palma',
          phoneNumberAddressee: '0416-8521328',
          weight: '3,00',
          status: 'Recibido',
          date: '15/04/2021'
        },
        {
          id: 8,
          name: '01-2045852',
          sender: 'Carlos Rodríguez',
          phoneNumberSender: '0424-8452314',
          source: 'Puerto La Cruz',
          destination: 'Tumeremo',
          addressee: 'Luis Palma',
          phoneNumberAddressee: '0416-8521328',
          weight: '3,00',
          status: 'Recibido',
          date: '15/04/2021'
        },
        {
          id: 9,
          name: '01-0345854',
          sender: 'Carlos Rodríguez',
          phoneNumberSender: '0424-8452314',
          source: 'Puerto La Cruz',
          destination: 'Tumeremo',
          addressee: 'Luis Palma',
          phoneNumberAddressee: '0416-8521328',
          weight: '3,00',
          status: 'Recibido',
          date: '15/04/2021'
        },
        {
          id: 10,
          name: '01-1145822',
          sender: 'Carlos Rodríguez',
          phoneNumberSender: '0424-8452314',
          source: 'Puerto La Cruz',
          destination: 'Tumeremo',
          addressee: 'Luis Palma',
          phoneNumberAddressee: '0416-8521328',
          weight: '3,00',
          status: 'Recibido',
          date: '15/04/2021'
        }
      ]
    }
  },
  created () {
    // this.getShippingStatus()
    this.getBranchOffice()
  },
  methods: {
    /* Método para consultar las estatus de los envíos
    (Retorna el total de paquetes. de acuerdo a su estatus {Recibido, En Tránsito, Entregado} y el total del peso en Kg)
    getShippingStatus () {
      this.$services.getData(['payment-types'], { paginated: false })
        .then(({ res }) => {
          // console.log(res)
          this.paymentTypes = res.data
        })
    }, */
    getBranchOffice () {
      this.$services.getData(['branch-offices'], { paginated: false })
        .then(({ res }) => {
          this.branchOffices = res.data
        })
    }
  }
}
</script>
