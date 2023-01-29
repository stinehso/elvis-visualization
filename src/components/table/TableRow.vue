<template>
  <tr>
    <td v-for="data in rowData" :key="data" class="p-2">
      {{ data }}
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    rowData: {
      type: Array,
      default: () => []
    },
  },

}
</script>

<style lang="scss" scoped>

</style>