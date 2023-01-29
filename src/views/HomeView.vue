<template>
  <main>
    <button class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded my-2 mx-1" @click="search('Administrasjon')">
      Søk
    </button>
    <!-- <button class=" bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded my-2 mx-1">
      Button
    </button>
    <button class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded my-2 mx-1">
      Button
    </button> -->
    <Table :table-data="variableData" />
  </main>
</template> 

<script>
import { httpService } from "../httpService";
import { sample } from '../assets/sample'
import Table from "../components/table/Table.vue";

export default {
  components: {
    Table,
  },
  data() {
    return {
      variableData: sample,
    }
  },
  computed: {
    // keys() {
    // return this.variableData.map(item => item.keys())
    // }
  },

  methods: {
    async search(keyword) {
      try {
        const res = await httpService.searchVariables(keyword)
        // console.log(res.data)
        this.variableData = res.data
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
