<template>
  <q-card class="my-card">
    <q-card-section class="row justify-between">
      <div class="text-h6 col-4">
        {{ title }}
      </div>
      <q-input
        v-model="text"
        type="text"
        :label="labelInput"
        class="col-4"
        dense
        filled
        @keyup.enter="enter"
      />
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
    }
  }
}
</script>
