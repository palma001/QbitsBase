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
              <div class="text-h6 q-mb-xs">Métodos de pagos</div>
                <div class="row q-col-gutter-xs">
                  <div class="col-3" v-for="paymentType in paymentTypes" :key="paymentType.id">
                    <q-card dark bordered class="bg-blue-grey-9 my-card">
                      <q-card-section>
                        <div class="text-h6">{{paymentType.name}}</div>
                        <div class="text-subtitle2">$----</div>
                      </q-card-section>
                    </q-card>
                  </div>
                  <div class="col-3">
                    <q-card dark bordered class="bg-cyan-9 my-card">
                      <q-card-section>
                        <div class="text-h6">Total</div>
                        <div class="text-subtitle2">Por Hacer</div>
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
                              <p class="text-h6">Ventas</p>
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
    <q-dialog v-model="alert">
      <q-card style="width: 1300px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="q-mb-xs">
            <p class="text-h6">Consolidado de operaciones
            </p>
          </div>
          <q-space/>
          <q-btn icon="close" flat color="primary" v-close-popup/>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-table
            title="Treats"
            :data="datat"
            :columns="transactions"
            row-key="id"
            :filter="filter"
            :loading="loading"
          >
            <template v-slot:top>
                <div class="row q-col-gutter-x-sm text-left justify-center">
                <div class="col-3 q-pt-sm">
                  <q-radio v-model="shape" val="Del" label="Del" value="true"/>
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
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      splitterModel: 16, // start at 50%
      insideModel: 32,
      alert: false,
      address: '',
      paymentTypes: [],
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
      employee: '',
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
        { name: 'employee', align: 'center', label: 'Empleado', field: 'employee', sortable: true },
        { name: 'role', align: 'center', label: 'Cargo', field: 'role' },
        { name: 'amount', align: 'center', label: 'Monto ($)', field: 'amount' }
      ],
      data: [
        {
          id: 1,
          name: '15/04/2021',
          employee: 'Carlos Rodríguez',
          role: 'Cajero (a)',
          amount: '1078,00'
        },
        {
          id: 2,
          name: '16/04/2021',
          employee: 'Carlos Rodríguez',
          role: 'Cajero (a)',
          amount: '340,00'
        },
        {
          id: 3,
          name: '17/04/2021',
          employee: 'Carlos Rodríguez',
          role: 'Cajero (a)',
          amount: '$120,00'
        },
        {
          id: 4,
          name: '18/04/2021',
          employee: 'Carlos Rodríguez',
          role: 'Cajero (a)',
          amount: '$287,00'
        },
        {
          id: 5,
          name: '19/04/2021',
          employee: 'Carlos Rodríguez',
          role: 'Cajero (a)',
          amount: '$545,23'
        },
        {
          id: 6,
          name: '20/04/2021',
          employee: 'Carlos Rodríguez',
          role: 'Cajero (a)',
          amount: '$124,00'
        },
        {
          id: 7,
          name: '21/04/2021',
          employee: 'Carlos Rodríguez',
          role: 'Cajero (a)',
          amount: '$478,00'
        },
        {
          id: 8,
          name: '22/04/2021',
          employee: 'Carlos Rodríguez',
          role: 'Cajero (a)',
          amount: '$130,00'
        },
        {
          id: 9,
          name: '23/04/2021',
          employee: 'Carlos Rodríguez',
          role: 'Cajero (a)',
          amount: '$279,00'
        },
        {
          id: 10,
          name: '24/04/2021',
          employee: 'Carlos Rodríguez',
          role: 'Cajero (a)',
          amount: '$780,00'
        }
      ],
      original: [
        {
          id: 1,
          name: '15/04/2021',
          employee: 'Carlos Rodríguez',
          role: 'Cajero (a)',
          amount: '$120.00'
        },
        {
          id: 2,
          name: '15/04/2021',
          employee: 'Carlos Rodríguez',
          role: 'Cajero (a)',
          amount: '$120.00'
        },
        {
          id: 3,
          name: '15/04/2021',
          employee: 'Carlos Rodríguez',
          role: 'Cajero (a)',
          amount: '$120.00'
        },
        {
          id: 4,
          name: '15/04/2021',
          employee: 'Carlos Rodríguez',
          role: 'Cajero (a)',
          amount: '$120.00'
        },
        {
          id: 5,
          name: '15/04/2021',
          employee: 'Carlos Rodríguez',
          role: 'Cajero (a)',
          amount: '$120.00'
        },
        {
          id: 6,
          name: '15/04/2021',
          employee: 'Carlos Rodríguez',
          role: 'Cajero (a)',
          amount: '$120.00'
        },
        {
          id: 7,
          name: '15/04/2021',
          employee: 'Carlos Rodríguez',
          role: 'Cajero (a)',
          amount: '$120.00'
        },
        {
          id: 8,
          name: '15/04/2021',
          employee: 'Carlos Rodríguez',
          role: 'Cajero (a)',
          amount: '$120.00'
        },
        {
          id: 9,
          name: '15/04/2021',
          employee: 'Carlos Rodríguez',
          role: 'Cajero (a)',
          amount: '$120.00'
        },
        {
          id: 10,
          name: '15/04/2021',
          employee: 'Carlos Rodríguez',
          role: 'Cajero (a)',
          amount: '$120.00'
        }
      ],
      transactions: [
        {
          name: 'date',
          required: true,
          label: 'Fecha',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'reference', align: 'center', label: 'Referencia', field: 'reference', sortable: true },
        { name: 'paymentMethod', align: 'center', label: 'Método de Pago', field: 'paymentMethod', sortable: true },
        { name: 'destination', align: 'center', label: 'Destino', field: 'destination', sortable: true },
        { name: 'employee', align: 'center', label: 'Empleado', field: 'employee', sortable: true },
        { name: 'role', align: 'center', label: 'Cargo', field: 'role' },
        { name: 'amount', align: 'center', label: 'Monto ($)', field: 'amount' }
      ],
      datat: [
        {
          id: 1,
          name: '15/04/2021',
          reference: '142459',
          paymentMethod: 'Zelle',
          destination: 'Bank Of America',
          employee: 'María Salazar',
          role: 'Cajero (a)',
          amount: '348.25'
        },
        {
          id: 2,
          name: '15/04/2021',
          reference: '1424248',
          destination: 'Banesco',
          paymentMethod: 'Pago Móvil',
          employee: 'María Salazar',
          role: 'Cajero (a)',
          amount: '120.00'
        },
        {
          id: 3,
          name: '15/04/2021',
          reference: '142459',
          destination: 'Banco de Venezuela',
          paymentMethod: 'Tarjeta de Crédito',
          employee: 'Juan Martínez',
          role: 'Supervisor (a)',
          amount: '85.00'
        },
        {
          name: '15/04/2021',
          reference: '142459',
          paymentMethod: 'Tarjeta de Débito',
          destination: 'Banco de Venezuela',
          employee: 'Juan Martínez',
          role: 'Supervisor (a)',
          amount: '45.00'
        },
        {
          id: 5,
          name: '15/04/2021',
          reference: '-',
          paymentMethod: 'Divisa',
          destination: 'Caja',
          employee: 'María Salazar',
          role: 'Cajero (a)',
          amount: '20.00'
        },
        {
          id: 6,
          name: '15/04/2021',
          reference: '142459',
          paymentMethod: 'Zelle',
          destination: 'Chase',
          employee: 'Juan Martínez',
          role: 'Supervisor (a)',
          amount: '70.00'
        },
        {
          id: 7,
          name: '15/04/2021',
          reference: '458729',
          paymentMethod: 'Transferencia',
          destination: 'Banco de Venezuela',
          employee: 'María Salazar',
          role: 'Cajero (a)',
          amount: '15.00'
        },
        {
          id: 8,
          name: '15/04/2021',
          reference: '142459',
          paymentMethod: 'Efectivo',
          destination: 'Caja',
          employee: 'María Salazar',
          role: 'Cajero (a)',
          amount: '2.40'
        },
        {
          id: 9,
          name: '15/04/2021',
          reference: '142459',
          paymentMethod: 'Zelle',
          destination: 'Chase',
          employee: 'Juan Martínez',
          role: 'Supervisor (a)',
          amount: '90.00'
        },
        {
          id: 10,
          name: '15/04/2021',
          reference: '142459',
          paymentMethod: 'Transferencia',
          destination: 'Banco de Venezuela',
          employee: 'Juan Martínez',
          role: 'Supervisor (a)',
          amount: '280.00'
        }
      ],
      originalt: [
        {
          id: 1,
          name: '15/04/2021',
          reference: '142459',
          paymentMethod: 'Zelle',
          destination: 'Bank Of America',
          employee: 'María Salazar',
          role: 'Cajero (a)',
          amount: '348.25'
        },
        {
          id: 2,
          name: '15/04/2021',
          reference: '1424248',
          destination: 'Banesco',
          paymentMethod: 'Pago Móvil',
          employee: 'María Salazar',
          role: 'Cajero (a)',
          amount: '120.00'
        },
        {
          id: 3,
          name: '15/04/2021',
          reference: '142459',
          destination: 'Banco de Venezuela',
          paymentMethod: 'Tarjeta de Crédito',
          employee: 'Juan Martínez',
          role: 'Supervisor (a)',
          amount: '85.00'
        },
        {
          name: '15/04/2021',
          reference: '142459',
          paymentMethod: 'Tarjeta de Débito',
          destination: 'Banco de Venezuela',
          employee: 'Juan Martínez',
          role: 'Supervisor (a)',
          amount: '45.00'
        },
        {
          id: 5,
          name: '15/04/2021',
          reference: '-',
          paymentMethod: 'Divisa',
          destination: 'Caja',
          employee: 'María Salazar',
          role: 'Cajero (a)',
          amount: '20.00'
        },
        {
          id: 6,
          name: '15/04/2021',
          reference: '142459',
          paymentMethod: 'Zelle',
          destination: 'Chase',
          employee: 'Juan Martínez',
          role: 'Supervisor (a)',
          amount: '70.00'
        },
        {
          id: 7,
          name: '15/04/2021',
          reference: '458729',
          paymentMethod: 'Transferencia',
          destination: 'Banco de Venezuela',
          employee: 'María Salazar',
          role: 'Cajero (a)',
          amount: '15.00'
        },
        {
          id: 8,
          name: '15/04/2021',
          reference: '142459',
          paymentMethod: 'Efectivo',
          destination: 'Caja',
          employee: 'María Salazar',
          role: 'Cajero (a)',
          amount: '2.40'
        },
        {
          id: 9,
          name: '15/04/2021',
          reference: '142459',
          paymentMethod: 'Zelle',
          destination: 'Chase',
          employee: 'Juan Martínez',
          role: 'Supervisor (a)',
          amount: '90.00'
        },
        {
          id: 10,
          name: '15/04/2021',
          reference: '142459',
          paymentMethod: 'Transferencia',
          destination: 'Banco de Venezuela',
          employee: 'Juan Martínez',
          role: 'Supervisor (a)',
          amount: '280.00'
        }
      ]
    }
  },
  created () {
    this.getPaymentType()
    this.getBranchOffice()
  },
  methods: {
    getPaymentType () {
      this.$services.getData(['payment-types'], { paginated: false })
        .then(({ res }) => {
          // console.log(res)
          this.paymentTypes = res.data
        })
    },
    getBranchOffice () {
      this.$services.getData(['branch-offices'], { paginated: false })
        .then(({ res }) => {
          this.branchOffices = res.data
        })
    }
  }
}
</script>
