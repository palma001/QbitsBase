<template>
  <q-markup-table>
    <thead>
      <tr>
        <th class="text-left" v-for="head in header" :key="head.id">
          {{ head.label }}
        </th>
      </tr>
    </thead>
     <tbody>
        <tr v-for="d in data" :key="d.id">
          <td v-for="head in header" :key="head.id" >
            {{ d[head.value] }}
          </td>
        </tr>
     </tbody>
  </q-markup-table>
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
    }
  },
  data () {
    return {}
  }
}
</script>
