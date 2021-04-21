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
                  <q-item clickable v-ripple v-for="branchOffice in branchOffices" :key="branchOffice.id">
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
              <div class="text-h6 q-mb-xs">Mobilidad de Paquetes</div>
                <div class="row q-col-gutter-xs">
                    <div class="col-3">
                        <q-card dark bordered class="bg-blue-grey-9  my-card">
                        <q-card-section>
                            <div class="text-h6">Recibidos</div>
                            <div class="text-subtitle2">120 Paquetes</div>
                            <div class="text-subtitle2">2300,30 Kg</div>
                        </q-card-section>
                        </q-card>
                    </div>
                    <div class="col-3">
                    <q-card dark bordered class="bg-blue-grey-9  my-card">
                        <q-card-section>
                        <div class="text-h6">En tránsito</div>
                        <div class="text-subtitle2">34 Paquetes</div>
                        <div class="text-subtitle2">920,30 Kg</div>
                        </q-card-section>
                    </q-card>
                    </div>
                    <div class="col-3">
                        <q-card dark bordered class="bg-blue-grey-9  my-card">
                        <q-card-section>
                            <div class="text-h6">Entregados</div>
                            <div class="text-subtitle2">300 Paquetes</div>
                            <div class="text-subtitle2">8421,00 Kg</div>
                        </q-card-section>
                        </q-card>
                    </div>
                    <div class="col-3">
                        <q-card dark bordered class="bg-grey-14 my-card">
                        <q-card-section>
                            <div class="text-h6">Total</div>
                            <div class="text-subtitle2">454 Paquetes</div>
                            <div class="text-subtitle2">3200,40 Kg</div>
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
                        :data="data"
                        :columns="columns"
                        row-key="id"
                        :filter="filter"
                        :loading="loading"
                      >
                        <template v-slot:top>
                          <div class="q-mb-xs q-pb-none">
                            <div class="row">
                              <p class="text-h6">Consolidado de operaciones</p>
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
                            <q-th class="text-center">
                              Acciones
                            </q-th>
                          </q-tr>
                        </template>
                        <template v-slot:body="props">
                          <q-tr :props="props" >
                            <q-td v-for="col in props.cols" :key="col.name" :props="props">
                              {{col.value}}
                            </q-td>
                            <q-td class="text-center">
                              <q-btn icon="visibility" color="primary" rounded size="sm" @click="alert=true">
                                <q-popup-proxy>
                                    <q-banner>
                                    <div class="row">
                                    <div class="col-12">
                                        <q-space/>
                                        <q-btn icon="close" flat color="primary" v-close-popup class="float-right"/>
                                    </div>
                                    </div>
                                    <div class="row">
                                    <div class="col-12">
                                        <p class="h4">Datos adicionales</p>
                                        <q-input label="Cliente" dense/>
                                        <q-input label="Teléfono" dense/>
                                        <q-input label="email" dense/>
                                    </div>
                                    </div>
                                    </q-banner>
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
          name: 'date',
          required: true,
          label: 'Fecha',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'voucherNumber', align: 'center', label: 'N° de Comprobante', field: 'voucherNumber', sortable: true },
        { name: 'sender', align: 'center', label: 'Remitente', field: 'sender' },
        { name: 'destination', align: 'center', label: 'Destino', field: 'destination' },
        { name: 'weight', align: 'center', label: 'Peso (Kg)', field: 'weight' },
        { name: 'status', align: 'center', label: 'Estatus', field: 'status' },
        { name: 'addressee', align: 'center', label: 'Destinatario', field: 'addressee' }
      ],
      data: [
        {
          id: 1,
          name: '15/04/2021',
          voucherNumber: '01-0345852',
          sender: 'Carlos Rodríguez',
          destination: 'Tumeremo',
          weight: '3,00',
          status: 'Recibido',
          addressee: 'Luis Palma'
        },
        {
          id: 2,
          name: '15/04/2021',
          voucherNumber: '01-0345852',
          sender: 'Carlos Rodríguez',
          destination: 'Caracas',
          weight: '3,00',
          status: 'Recibido',
          addressee: 'Luis Palma'
        },
        {
          id: 3,
          name: '15/04/2021',
          voucherNumber: '01-0345852',
          sender: 'Carlos Rodríguez',
          destination: 'Caracas',
          weight: '3,00',
          status: 'Recibido',
          addressee: 'Luis Palma'
        },
        {
          id: 4,
          name: '15/04/2021',
          voucherNumber: '01-0345852',
          sender: 'Carlos Rodríguez',
          destination: 'Puerto La Cruz',
          weight: '3,00',
          status: 'Recibido',
          addressee: 'Luis Palma'
        },
        {
          id: 5,
          name: '15/04/2021',
          voucherNumber: '01-0345852',
          sender: 'Carlos Rodríguez',
          destination: 'Píritu',
          weight: '3,00',
          status: 'Recibido',
          addressee: 'Luis Palma'
        },
        {
          id: 6,
          name: '15/04/2021',
          voucherNumber: '01-0345852',
          sender: 'Carlos Rodríguez',
          destination: 'El Tigre',
          weight: '3,00',
          status: 'Recibido',
          addressee: 'Luis Palma'
        },
        {
          id: 7,
          name: '15/04/2021',
          voucherNumber: '01-0345852',
          sender: 'Carlos Rodríguez',
          destination: 'El Callao',
          weight: '3,00',
          status: 'Recibido',
          addressee: 'Luis Palma'
        },
        {
          id: 8,
          name: '15/04/2021',
          voucherNumber: '01-0345852',
          sender: 'Carlos Rodríguez',
          destination: 'Santa Elena de Guairén',
          weight: '3,00',
          status: 'Recibido',
          addressee: 'Luis Palma'
        },
        {
          id: 9,
          name: '15/04/2021',
          voucherNumber: '01-0345852',
          sender: 'Carlos Rodríguez',
          destination: 'Cumaná',
          weight: '3,00',
          status: 'Recibido',
          addressee: 'Luis Palma'
        },
        {
          id: 10,
          name: '15/04/2021',
          voucherNumber: '01-0345852',
          sender: 'Carlos Rodríguez',
          destination: 'Carúpano',
          weight: '3,00',
          status: 'Recibido',
          addressee: 'Luis Palma'
        }
      ],
      original: [
        {
          id: 1,
          name: '15/04/2021',
          voucherNumber: '01-0345852',
          sender: 'Carlos Rodríguez',
          destination: 'Tumeremo',
          weight: '3,00',
          status: 'Recibido',
          addressee: 'Luis Palma'
        },
        {
          id: 2,
          name: '15/04/2021',
          voucherNumber: '01-0345852',
          sender: 'Carlos Rodríguez',
          destination: 'Caracas',
          weight: '3,00',
          status: 'Recibido',
          addressee: 'Luis Palma'
        },
        {
          id: 3,
          name: '15/04/2021',
          voucherNumber: '01-0345852',
          sender: 'Carlos Rodríguez',
          destination: 'Caracas',
          weight: '3,00',
          status: 'Recibido',
          addressee: 'Luis Palma'
        },
        {
          id: 4,
          name: '15/04/2021',
          voucherNumber: '01-0345852',
          sender: 'Carlos Rodríguez',
          destination: 'Puerto La Cruz',
          weight: '3,00',
          status: 'Recibido',
          addressee: 'Luis Palma'
        },
        {
          id: 5,
          name: '15/04/2021',
          voucherNumber: '01-0345852',
          sender: 'Carlos Rodríguez',
          destination: 'Píritu',
          weight: '3,00',
          status: 'Recibido',
          addressee: 'Luis Palma'
        },
        {
          id: 6,
          name: '15/04/2021',
          voucherNumber: '01-0345852',
          sender: 'Carlos Rodríguez',
          destination: 'El Tigre',
          weight: '3,00',
          status: 'Recibido',
          addressee: 'Luis Palma'
        },
        {
          id: 7,
          name: '15/04/2021',
          voucherNumber: '01-0345852',
          sender: 'Carlos Rodríguez',
          destination: 'El Callao',
          weight: '3,00',
          status: 'Recibido',
          addressee: 'Luis Palma'
        },
        {
          id: 8,
          name: '15/04/2021',
          voucherNumber: '01-0345852',
          sender: 'Carlos Rodríguez',
          destination: 'Santa Elena de Guairén',
          weight: '3,00',
          status: 'Recibido',
          addressee: 'Luis Palma'
        },
        {
          id: 9,
          name: '15/04/2021',
          voucherNumber: '01-0345852',
          sender: 'Carlos Rodríguez',
          destination: 'Cumaná',
          weight: '3,00',
          status: 'Recibido',
          addressee: 'Luis Palma'
        },
        {
          id: 10,
          name: '15/04/2021',
          voucherNumber: '01-0345852',
          sender: 'Carlos Rodríguez',
          destination: 'Carúpano',
          weight: '3,00',
          status: 'Recibido',
          addressee: 'Luis Palma'
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
