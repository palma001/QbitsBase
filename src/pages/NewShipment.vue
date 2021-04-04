<template>
  <q-page padding class="q-gutter-lg">
    <div class="row">
      <div class="col-4">
        <q-select
          v-model="model"
          clearable
          use-input
          hide-selected
          fill-input
          dense
          :label="ucwords($t('newShipment.sender'))"
          :options="options"
          @filter="filterFn"
          @filter-abort="abortFilterFn"
        >
          <template v-slot:append>
            <q-btn
              color="primary"
              text-color="white"
              size="sm"
              icon="add"
              aria-label="add"
              round
              @click="dialogSender = !dialogSender"
            >
              <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">
                <strong>{{ucwords($t('newShipment.addSender'))}}</strong>
              </q-tooltip>
            </q-btn>
          </template>
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <q-table
          hide-bottom
          :title="ucwords($t('newShipment.packages'))"
          :data="data"
          :columns="columns"
        >
           <template v-slot:top-right>
            <q-btn
              color="primary"
              :label="ucwords($t('newShipment.addPackages'))"
              @click="dialogPackage = !dialogPackage"
            />
          </template>
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
                {{ col.label }}
              </q-th>
              <q-th auto-width>
                Acciones
              </q-th>
            </q-tr>
          </template>
           <template v-slot:body="props">
            <q-tr :props="props">
              <q-td
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
                {{ col.value }}
              </q-td>
              <q-td auto-width class="q-gutter-x-sm">
                <q-btn size="13px" color="primary" round dense @click="props.expand = !props.expand" icon="visibility" />
                <q-btn size="13px" color="negative" round dense @click="props.expand = !props.expand" icon="delete" />
                <q-btn size="13px" color="positive" round dense @click="props.expand = !props.expand" icon="content_copy" />
              </q-td>
            </q-tr>
           </template>
        </q-table>
      </div>
    </div>
    <dialog-package-deital
      :show="dialogPackage"
      @close="dialogPackage = !dialogPackage"
    />
    <dialog-add-sender
      :show="dialogSender"
      @close="dialogSender = !dialogSender"
    />
  </q-page>
</template>

<script>
import { mixins } from '../mixins'
import DialogPackageDeital from '../components/DialogPackageDeital'
import DialogAddSender from '../components/DialogAddSender'
const stringOptions = [
  'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
].reduce((acc, opt) => {
  for (let i = 1; i <= 5; i++) {
    acc.push(opt + ' ' + i)
  }
  return acc
}, [])

export default {
  components: {
    DialogPackageDeital,
    DialogAddSender
  },
  mixins: [mixins.containerMixin],
  data () {
    return {
      dialogPackage: false,
      dialogSender: false,
      model: null,
      options: stringOptions,
      columns: [
        {
          name: 'number',
          field: 'number',
          label: 'Numero de paquete',
          align: 'left',
          sortable: true
        },
        {
          name: 'peso',
          field: 'peso',
          label: 'Peso(Kg)',
          sortable: true
        },
        {
          name: 'ancho',
          field: 'ancho',
          label: 'Ancho (cm)',
          sortable: true
        },
        {
          name: 'largo',
          field: 'largo',
          label: 'Largo (cm)',
          sortable: true
        },
        {
          name: 'destino',
          field: 'destino',
          label: 'Destino',
          sortable: true
        },
        {
          name: 'destinatario',
          field: 'destinatario',
          label: 'Destinatario',
          sortable: true
        },
        {
          name: 'precio',
          field: 'precio',
          label: 'Precio ($)',
          sortable: true
        }
      ],
      data: [
        {
          number: 2131312,
          peso: 5.5,
          ancho: 12,
          largo: 12,
          precio: 10,
          destino: 'Puerto la cruz',
          destinatario: 'Luis Palma'
        }
      ]
    }
  },

  methods: {
    filterFn (val, update, abort) {
      // call abort() at any time if you can't retrieve data somehow

      setTimeout(() => {
        update(
          () => {
            if (val === '') {
              this.options = stringOptions
            } else {
              const needle = val.toLowerCase()
              this.options = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
            }
          },

          // next function is available in Quasar v1.7.4+;
          // "ref" is the Vue reference to the QSelect
          ref => {
            if (val !== '' && ref.options.length > 0) {
              ref.setOptionIndex(-1) // reset optionIndex in case there is something selected
              ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
            }
          }
        )
      }, 300)
    },

    filterFnAutoselect (val, update, abort) {
      // call abort() at any time if you can't retrieve data somehow

      setTimeout(() => {
        update(
          () => {
            if (val === '') {
              this.options = stringOptions
            } else {
              const needle = val.toLowerCase()
              this.options = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
            }
          },

          // next function is available in Quasar v1.7.4+;
          // "ref" is the Vue reference to the QSelect
          ref => {
            if (val !== '' && ref.options.length > 0 && ref.optionIndex === -1) {
              ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
              ref.toggleOption(ref.options[ref.optionIndex], true) // toggle the focused option
            }
          }
        )
      }, 300)
    },

    abortFilterFn () {
      // console.log('delayed filter aborted')
    }
  }
}
</script>
