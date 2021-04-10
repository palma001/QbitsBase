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
          :options="senderOptions"
          @filter="filterFn"
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
    <q-dialog
      v-model="dialogSender"
      full-height
      position="right"
      persistent
    >
      <DynamicForm
        module="sender"
        :loading="senderLoadingAdd"
        :buttons="buttonsEntryAndExitOfMoney"
        :config="senderConfig"
        @save="saveSender"
        @cancel="cancelSender"
      />
    </q-dialog>
  </q-page>
</template>

<script>
import { mixins } from '../mixins'
import DialogPackageDeital from '../components/DialogPackageDeital'
import { senderConfig } from '../config-file/sender/senderConfig'
import DynamicForm from '../components/DynamicForm'
export default {
  components: {
    DialogPackageDeital,
    DynamicForm
  },
  mixins: [mixins.containerMixin],
  data () {
    return {
      buttonsEntryAndExitOfMoney: [],
      senderConfig,
      senderLoadingAdd: false,
      dialogPackage: false,
      dialogSender: false,
      model: null,
      senderOptions: [],
      senderAll: [],
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
  created () {
    this.getAllSenders()
  },
  methods: {
    saveSender (data) {
      console.log(data)
    },
    cancelSender () {
      this.dialogSender = false
    },
    /**
     * Filter Sender
    */
    filterFn (val, update, abort) {
      // call abort() at any time if you can't retrieve data somehow

      setTimeout(() => {
        update(
          () => {
            if (val === '') {
              this.senderOptions = this.senderAll
            } else {
              const needle = val.toLowerCase()
              this.senderOptions = this.senderAll.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
            }
          },
          ref => {
            if (val !== '' && ref.options.length > 0) {
              ref.setOptionIndex(-1) // reset optionIndex in case there is something selected
              ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
            }
          }
        )
      }, 300)
    },
    /**
     * Get Senders all
     */
    async getAllSenders () {
      const { res } = await this.$services.getData(['senders'], {})
      this.senderAll = res.data.map(sender => {
        return {
          label: `${sender.name} ${sender.last_name} (${sender.document_type} - ${sender.document_number})`,
          value: sender.id
        }
      })
    }
  }
}
</script>
