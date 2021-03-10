<template>
  <q-card class="my-card">
    <q-card-section class="row justify-between">
      <div class="text-h6 col-auto">
        {{ title }}
      </div>
      <q-input
        v-model="text"
        type="text"
        class="col-6"
        dense
        filled
        autofocus
        v-if="search"
        :label="labelInput"
        @keyup.enter="enter"
      >
        <template v-slot:append>
          <q-btn
            color="teal"
            text-color="white"
            size="xs"
            icon="qr_code"
            round
            @click="clickButton"
          >
            <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">
              <strong>Scannear</strong>
            </q-tooltip>
          </q-btn>
        </template>
      </q-input>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-markup-table>
        <thead>
          <tr>
            <th
              v-for="head in header"
              :key="head.id"
              :class="`text-${head.align}`"
            >
              {{ head.label }}
            </th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="d in data" :key="d.id">
              <td v-for="head in header" :key="head.id" :class="`text-${head.align}`">
                {{ d[head.value] }}
              </td>
            </tr>
        </tbody>
      </q-markup-table>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'BMarkupTable',
  props: {
    header: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    title: {
      type: String
    },
    labelInput: {
      type: String,
      default: 'Label'
    },
    search: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      text: ''
    }
  },
  methods: {
    enter () {
      this.$emit('enter', this.text)
    },
    clickButton () {
      this.$emit('clickButton')
    }
  }
}
</script>
