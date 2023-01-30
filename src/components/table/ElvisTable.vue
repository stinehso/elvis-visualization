<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="header in tableHeaders"
          class="p-2 text-left font-bold bg-slate-100 hover:bg-slate-200 cursor-pointer"
        >
          <button class="inline-flex" @click="updateSort(header.key)">
            {{ header.label }}
            <i
              v-if="sortKey === header.key && sortDirectionAsc"
              class="material-icons-outlined ml-1"
              aria-hidden="true"
              >keyboard_arrow_up</i
            >
            <i
              v-if="sortKey === header.key && !sortDirectionAsc"
              class="material-icons-outlined ml-1"
              aria-hidden="true"
              >keyboard_arrow_down</i
            >
          </button>
        </th>
      </tr>
    </thead>
    <tbody>
      <TableRow
        v-for="row in tableRows"
        :key="row.id"
        :row-data="row"
        :lang="lang"
      />
    </tbody>
  </table>
</template>

<script>
import TableRow from "./ElvisTableRow.vue";
import moment from "moment";

export default {
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    translations: {
      type: Object,
      required: true,
    },
    lang: {
      type: String,
      default: "no",
    },
  },
  components: {
    TableRow,
  },
  data() {
    return {
      tableKeys: [
        "id",
        "name",
        "category",
        "informationLevel",
        "registrationMethod",
        "dataType",
        "techName",
      ],
      sortKey: "",
      sortDirectionAsc: true,
    };
  },
  computed: {
    tableHeaders() {
      return this.tableKeys.map((key) => {
        return {
          key: key,
          label: this.translations[key],
        };
      });
    },
    tableRows() {
      return this.tableDataSorted.map((entry) => {
        return {
          id: entry.id,
          description: entry.description,
          data: this.tableKeys.map((key) => {
            if (key === "validFrom") return this.formatDate(entry[key]);
            return this.getName(entry[key]);
          }),
        };
      });
    },
    tableDataSorted() {
      if (!this.sortKey) return this.tableData;

      const compare = (a, b) => {
        const varA = this.getName(a[this.sortKey]);
        const varB = this.getName(b[this.sortKey]);
        let result = 0;
        if (varA < varB) result = -1;
        else if (varA > varB) result = 1;
        return this.sortDirectionAsc ? result : result * -1;
      };
      return [...this.tableData].sort(compare);
    },
  },
  methods: {
    getName(data) {
      const nameKey = this.lang === "en" ? "nameEn" : "name";
      return typeof data === "object" ? data[nameKey] : data;
    },
    formatDate(date) {
      if (!date) return "";
      const dateFormat = {
        no: "DD.MM.YYYY",
        en: "MM/DD/YYYY",
      };
      return moment(date, "DD-MM-YYYY").format(dateFormat[this.lang]);
    },
    updateSort(key) {
      if (key === this.sortKey) {
        this.sortDirectionAsc = !this.sortDirectionAsc;
        return;
      }
      this.sortKey = key;
      this.sortDirectionAsc = true;
    },
    formatDownloadData() {
      const headers = this.tableHeaders.map((header) => header.label).join(";");
      const dataRows = this.tableRows.map((row) => {
        return row.data.join(";");
      });
      return `${headers}\n${dataRows.join("\n")}`;
    },
  },
};
</script>
