<template>
  <q-page padding class="q-gutter-lg">
    <div class="row">
      <div class="col-4">
        <q-select
          v-model="sender"
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
          :data="packages"
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
      @savePackage="savePackage"
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
        :buttons="buttonsSender"
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
import { senderConfig, buttonsSender } from '../config-file/sender/senderConfig'
import DynamicForm from '../components/DynamicForm'
export default {
  components: {
    DialogPackageDeital,
    DynamicForm
  },
  mixins: [mixins.containerMixin],
  data () {
    return {
      buttonsSender,
      senderConfig,
      senderLoadingAdd: false,
      dialogPackage: false,
      dialogSender: false,
      sender: null,
      senderOptions: [],
      senderAll: [],
      columns: [
        {
          name: 'destino',
          field: (row) => row.destination.branchOffice ? row.destination.branchOffice.label : row.destination.destination.label,
          label: 'Destino',
          align: 'left',
          sortable: true
        },
        {
          name: 'destinatario',
          field: (row) => row.addressee.full_name,
          label: 'Destinatario',
          align: 'left',
          sortable: true
        },
        {
          name: 'precio',
          field: (row) => row.rate.amount,
          label: 'Precio ($)',
          align: 'left',
          sortable: true
        }
      ],
      data: [
        {
          destino: 'Puerto la cruz',
          destinatario: 'Luis Palma',
          precio: 10
        }
      ],
      packages: []
    }
  },
  created () {
    this.getAllSenders()
  },
  methods: {
    savePackage (data) {
      console.log(data)
      this.addDetailsTable(data.rate)
      this.packages.push(data)
    },
    addDetailsTable (data) {
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          const arr = key.split('-')
          console.log(key, arr)
        }
      }
    },
    /**
     * Save sender
     * @param {Object} data data to save
     */
    saveSender (data) {
      this.$services.postData(['senders'], {
        name: data.sender_type.value === 'NAT' ? data.name : null,
        last_name: data.last_name,
        email: data.email,
        user_created_id: 1,
        business_name: data.sender_type.value === 'NAT' ? null : data.name,
        phone_number: data.phone_number,
        document_number: data.document_number,
        document_type: data.document_type.value,
        branch_office_id: 1
      })
        .then(({ res }) => {
          this.sender = {
            value: res.data.id,
            label: `${res.data.full_name} (${res.data.document_type} - ${res.data.document_number})`
          }
          this.dialogSender = false
          this.getAllSenders()
          this.notify(this, 'sender.saveSuccess', 'positive', 'mood')
        })
    },
    /**
     * Cancel save
     */
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
      const { res } = await this.$services.getData(['senders'], { paginated: false })
      this.senderAll = res.data.map(sender => {
        return {
          label: `${sender.full_name} (${sender.document_type} - ${sender.document_number})`,
          value: sender.id
        }
      })
    }
  }
}
</script>
