
<template>
  <table>
    <thead>
      <tr>
        <th v-for="header in tableHeaders" class="p-2 text-left font-bold bg-slate-100">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <TableRow v-for="row in tableRows" :key="row.id" :row-data="row" class="divide-y" />
    </tbody>
  </table>
</template> 

<script>
import TableRow from './TableRow.vue'

export default {
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    TableRow,
  },
  data() {
    return {
      tableKeys: [
        'id',
        'name',
        'informationLevel',
        'category',
        'dataType',
        'registrationMethod',
        'status',
        'techName',
        'validFrom',
      ]
    }
  },
  computed: {
    tableHeaders() {
      return this.tableKeys.map(key => key.toUpperCase())
    },
    tableRows() {
      return this.tableData.map(entry => {
        return this.tableKeys.map(key => {
          const data = entry[key]
          return typeof data === 'object' 
            ? data.name 
            : data
        })
      })

    }
  },
  methods: {
    
  }
}
</script>
