<template>
  <tr>
    <td v-for="data in rowData.data" class="py-2 px-4" @click="goToDetails(data)">
      {{ data }}
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    rowData: {
      type: Object,
      default: () => {}
    },
  },
  methods: {
    goToDetails(row) {
      console.log('table row comp');
      // this.$router.push({name: 'detail', params: {id: row.id}})
    }
  },

}
</script>

<style lang="scss" scoped>

</style>