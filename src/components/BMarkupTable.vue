<template>
  <q-card class="my-card">
    <q-card-section>
      <div class="text-h6">{{ title }}</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-markup-table>
        <thead>
          <tr>
            <th v-for="head in header" :key="head.id" :class="`text-${head.align}`">
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
    }
  },
  data () {
    return {}
  }
}
</script>
