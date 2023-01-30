<template>
  <h3 class="text-lg mb-1">{{ item.type }}</h3>
  <div class="flex mb-3">
    <span class="mr-4"> {{ item.name }} </span>
    <span v-if="item.description"> {{ item.description }} </span>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped></style>
