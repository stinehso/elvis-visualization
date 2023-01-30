<template>
  <main>
    <div class="mb-4">
      <div class="flex flex-row flex-start">
        <span class="inline-flex flex-row items-center relative">
          <input v-model="searchText" type="text" :placeholder="translations.search_placeholder"
            class="p-2 border rounded border-solid border-slate-800"
            @keypress.enter="search" >
          <button
            class="absolute right-0 inline-flex flex-row items-center p-2 my-2 mx-1 text-slate-500 hover:text-slate-700"
            type="button" @click="resetSearch">
            <i class="material-icons-outlined" aria-hidden="true">clear</i>
          </button>
        </span>
        <button class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded my-2 mx-1"
          @click="search">
          {{ translations.search }}
        </button>
        <button class="inline-flex bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded ml-auto my-2"
          @click="download">
          {{ translations.download_csv }}
          <i class="material-icons-outlined ml-1" aria-hidden="true">download</i>
        </button>
      </div>
      <p v-if="!loading">{{ translations.no_of_rows }}: {{ variableData.length }} </p>
    </div>
    
    <Table v-if="variableData && !loading" 
      :table-data="variableData" 
      :translations="translations"
      :lang="lang"
      ref="table" />
    <p v-else>{{ translations.loading }}</p>

  </main>
</template> 

<script>
import { httpService } from "../httpService"
import Table from "../components/table/Table.vue"

export default {
  components: {
    Table,
  },
  props: {
    translations: {
      type: Object,
      required: true,
    },
    lang: {
      type: String,
      default: 'no',
    }
  },
  data() {
    return {
      variableData: null,
      searchText: '',
      loading: false,
    }
  },
  computed: {
  },
  mounted() {
    this.listAll();
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
  }
}
</script>
