<template>
  <main>
    <div class="mb-4">
      <div class="flex flex-row flex-start">
        <span class="inline-flex flex-row items-center relative">
          <input v-model="searchText" type="text" placeholder="Søketekst"
            class="p-2 border rounded border-solid border-slate-800">
          <button
            class="absolute right-0 inline-flex flex-row items-center p-2 my-2 mx-1 text-slate-500 hover:text-slate-700"
            type="button" @click="resetSearch">
            <i class="material-icons-outlined" aria-hidden="true">clear</i>
          </button>
        </span>
        <button class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded my-2 mx-1"
          @click="search">
          Søk
        </button>
        <button class="inline-flex bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded ml-auto my-2"
          @click="download">
          Last ned csv
          <i class="material-icons-outlined ml-1" aria-hidden="true">download</i>
        </button>
      </div>
      <p v-if="!loading">Antall treff: {{ variableData.length }} </p>
    </div>
    <!-- <button class=" bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded my-2 mx-1">
      Button
    </button>
    <button class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded my-2 mx-1">
      Button
    </button> -->
    <Table v-if="variableData && !loading" :table-data="variableData" ref="table" />
    <p v-else>Laster...</p>
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
      searchText: '',
      loading: false,
    }
  },
  computed: {
    dataDownloadFormatted() {

    }
    // keys() {
    // return this.variableData.map(item => item.keys())
    // }
  },
  mounted() {
    // this.listAll();
  },
  methods: {
    resetSearch() {
      this.searchText = ''
      this.listAll()
    },
    async listAll() {
      try {
        this.loading = true
        const res = await httpService.listVariables()
        this.variableData = res.data
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async search() {
      try {
        this.loading = true
        const res = await httpService.searchVariables(this.searchText)
        this.variableData = res.data
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async download() {
      try {
        const data = this.$refs.table.formatDownloadData()
        this.createFileAndDownload(data)
      } catch (error) {
        console.error(error)
      }
    },
    createFileAndDownload(data) {
      const blob = new Blob([data], {type: 'octet-stream'})
      const href = URL.createObjectURL(blob)
      const a = Object.assign(document.createElement('a'), {
        href,
        style: 'display:none',
        download: 'mydata.csv',
      })
      document.body.appendChild(a)
      a.click()
      URL.revokeObjectURL(href)
      a.remove()
    }

//     export const reportService = {
//   getSettlementReport: (merchantId, fromDate, toDate) => {
//     return reportRepository({
//         method: 'get',
//         responseType: 'arraybuffer',
//         url: `merchant/${merchantId}/settlement/csv?fromDate=${fromDate}&toDate=${toDate}`
//     });
//   },
// };
  }
}
</script>
