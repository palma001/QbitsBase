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
export default {
  data () {
    return {
      splitterModel: 24, // start at 50%
      insideModel: 30,
      selected: [],
      selected1: true,
      selected2: true,
      selected3: true,
      selected4: true,
      selected5: false,
      submenu: '',
      visibleColumns: ['rol'],
      loading: false,
      filter: '',
      rowCount: 10,
      columns: [
        {
          name: 'rol',
          required: true,
          label: 'Rol',
          align: 'left',
          field: row => row.rol,
          format: val => `${val}`,
          sortable: true
        }
      ],
      data: [
        {
          id: 1,
          rol: 'cajero(a)'
        },
        {
          id: 2,
          rol: 'administrador'
        },
        {
          id: 3,
          rol: 'transportista'
        },
        {
          id: 4,
          rol: 'almacenista'
        },
        {
          id: 5,
          rol: 'administrador'
        },
        {
          id: 6,
          rol: 'administrador'
        }
      ],
      original: [
        {
          id: 1,
          rol: 'administrador'
        },
        {
          id: 2,
          rol: 'cajero(a)'
        },
        {
          id: 3,
          rol: 'transportista'
        },
        {
          id: 4,
          rol: 'almacenista'
        },
        {
          id: 5,
          rol: 'administrador'
        },
        {
          id: 6,
          rol: 'administrador'
        }
      ]
    }
  },
  methods: {
    editarMenu (data) {
      this.submenu = data
    }
  }
}
</script>
