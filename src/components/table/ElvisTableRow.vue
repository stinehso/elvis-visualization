<template>
  <tr class="cursor-pointer" @click="goToDetails">
    <td v-for="data in rowData.data" class="py-2 px-4">
      {{ data }}
    </td>
  </tr>
  <tr
    class="cursor-pointer border-bottom border-slate-400"
    @click="goToDetails"
  >
    <td />
    <td :colspan="rowData.data.length - 1" class="pb-2 px-4">
      {{ rowData.description }}
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    rowData: {
      type: Object,
      default: () => {},
    },
    lang: {
      type: String,
      default: "no",
    },
  },
  methods: {
    goToDetails() {
      this.$router.push({ name: "detail", params: { id: this.rowData.id } });
    },
  },
};
</script>

<style scoped></style>
