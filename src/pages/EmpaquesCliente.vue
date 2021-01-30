<template>
  <div class="q-pa-md q-gutter-y-md row">
    <div class="col-12 row q-gutter-sm">
      <div class="col-sm-2 col-xs-12 col-md-1 col-lg-1 col-xl-1 q-mt-md">
        Filtrar por:
      </div>
      <div class="col-sm-4 col-xs-12">
        <q-input v-model="desde" filled type="date" dense/>
      </div>
      <div class="col-sm-4 col-xs-12">
        <q-input v-model="hasta" filled type="date" dense/>
      </div>
    </div>
    <div class="col-12">
      <q-table
        title="Empaques"
        :data="data"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="codigo" :props="props">
              {{ props.row.codigo }}
            </q-td>
            <q-td key="estado" :props="props">
              <q-badge :color="props.row.estado === 'en ruta' ? 'red' : 'green'">
                {{ props.row.estado }}
              </q-badge>
            </q-td>
            <q-td key="fecha" :props="props">
              {{ props.row.fecha }}
            </q-td>
            <q-td key="detalles" :props="props">
              <q-btn size="sm"
                color="teal"
                dense
                round
                icon="fullscreen"
                @click="viewDetails(props.row)"
              >
                <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                  Detalles del empaque
                </q-tooltip>
              </q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <q-dialog
      v-model="detallesFactura"
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down">
      <q-card :style="maximizedToggle ? '' : 'width: 700px; max-width: 80vw;'">
        <q-bar class="bg-teal text-white">
          <q-space />
          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <div>
            <q-tabs
              v-model="tab"
              align="justify"
              narrow-indicator
              class="q-mb-lg"
            >
              <q-tab name="mails" label="Detalles del paquete" />
              <q-tab name="alarms" label="Ubicación del paquete" />
            </q-tabs>
            <div class="q-gutter-y-sm">
              <q-tab-panels
                v-model="tab"
                animated
                transition-prev="scale"
                transition-next="scale"
                class="text-white text-center"
              >
                <q-tab-panel name="mails">
                  <q-table
                    title="Productos"
                    row-key="name"
                    :data="productos"
                    :columns="columnsProductos"
                  />
                </q-tab-panel>

                <q-tab-panel name="alarms">
                    <gmap-map
                      :center="this.coordinates"
                      :zoom="12"
                      map-type-id="roadmap"
                      style="width: 100%; height: 400px"
                    >
                      <gmap-marker
                        :position="this.coordinates"
                        :clickable="true"
                        :draggable="true"
                      />
                      <gmap-polyline
                        :path.sync="plPath"
                        :draggable="true"
                        :options="{geodesic:true, strokeColor:'#FF0000'}"
                      />
                    </gmap-map>
                </q-tab-panel>
              </q-tab-panels>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      /**
       * Productos del empaque
       * @type {Array} productos del empaque
       */
      productos: [],
      /**
       * Columnas de la tabla de los productos de la factura
       * @type {Array} columnas de la tabla
       */
      columnsProductos: [
        {
          name: 'nombre_producto',
          required: true,
          label: 'Nombre del producto',
          align: 'left',
          sortable: true
        },
        {
          name: 'cantidad',
          align: 'center',
          label: 'Cantidad producto',
          field: 'cantidad',
          sortable: true
          // classes: row => row.cantidad === row.fat ? 'bg-teal' : ''
        },
        {
          name: 'cantidad_embalado',
          label: 'Cantidad embalado',
          field: 'cantidad_embalado',
          sortable: true
          // classes: row => row.cantidad === row.fat ? 'bg-teal' : ''
        }
      ],
      /**
       * Estado del tipo de ventana de detalles del empaque
       * @type {Boolean} Estado del dialog
       */
      maximizedToggle: false,
      /**
       * Coordenadas de la ruta del empaque
       * @type {Array} coordenadas
       */
      plPath: [
        { lat: 37.772, lng: -122.214 },
        { lat: 21.291, lng: -157.821 },
        { lat: -18.142, lng: 178.431 },
        { lat: -27.467, lng: 153.027 }
      ],
      /**
       * Coordenadas de la ubucación de la factura
       * @type {Object} ubicación de la factura
       */
      coordinates: {
        lat: -27.467,
        lng: 153.027
      },
      /**
       * Valor del tag
       * @type {String} Valor del tag
       */
      tab: 'mails',
      /**
       * Estado del la ventana detalles
       * @type {Boolean} estado del modal
       */
      detallesFactura: false,
      /**
       * Valor de la fecha del empaques
       * @type {String} fecha desde del empaque
       */
      desde: null,
      /**
       * Valor de la fecha del empaques
       * @type {String} fecha hasta del empaque
       */
      hasta: null,
      /**
       * Columnas de la tabla
       * @type {Array} columnas de la tabla
       */
      columns: [
        {
          name: 'codigo',
          label: 'Código de factura',
          align: 'left',
          field: 'codigo',
          sortable: true
        },
        {
          name: 'estado',
          align: 'center',
          label: 'Estado',
          field: 'estado',
          sortable: true
        },
        {
          name: 'fecha',
          label: 'Fecha de entrega',
          field: 'fecha',
          sortable: true
        },
        {
          name: 'detalles',
          label: 'Detalles',
          field: 'detalles'
        }
      ],
      /**
       * Data de la tabla
       * @type {Array} data de la tabla
       */
      data: [
        {
          codigo: 9823982938,
          estado: 'entregado',
          fecha: '26/01/2021'
        },
        {
          codigo: 7627362763,
          estado: 'en ruta',
          fecha: '-'
        },
        {
          codigo: 8327483274,
          estado: 'en ruta',
          fecha: '-'
        }
      ]
    }
  },
  methods: {
    viewDetails (data) {
      this.detallesFactura = true
      console.log(data)
    }
  }
}
</script>
