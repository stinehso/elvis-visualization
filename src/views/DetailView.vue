<template>
  <div v-if="detail" class="px-4">
    <h2 class="text-2xl mb-4"> #{{ detail.id }} {{ detail[nameKey] }} </h2>
    <p class="mb-2"> {{ detail[descriptionKey] }} </p>

    <ItemDescription :item="descriptionData('category')" />
    <ItemDescription :item="descriptionData('informationLevel')" />
    <ItemDescription :item="descriptionData('registrationMethod')" />
    <ItemDescription :item="descriptionData('dataType')" />
    <ItemDescription :item="descriptionData('status')" />
    <ItemDescription :item="descriptionDataCompact('descriptionOfQuality')" />

    <div class="border-bottom mt-8" />

    <h2 class="text-2xl mb-4 mt-8"> {{ translations.all_data }} </h2>
    <div v-for="key in Object.keys(detail)">
      <span class="font-bold mr-2"> {{ key }}: </span>

      <span v-if="hasNextLevel(detail[key])">
        <div v-for="next in Object.keys(detail[key])">
          <span class="font-bold ml-8 mr-2"> {{ next }}: </span>
          <span> {{ detail[key][next] }} </span>
        </div>
      </span>
      <span v-else> {{ detail[key].toString() }} </span>

    </div>
  </div>
</template>

<script>
import { httpService } from '../httpService'
import ItemDescription from '../components/detail/ItemDescription.vue'

export default {
  props: {
    id: {
      type: [Number, String],
      default: 0
    },
    translations: {
      type: Object,
      required: true,
    },
    lang: {
      type: String,
      default: 'no',
    },
  },
  components: {
    ItemDescription,
  },
  data() {
    return {
      detail: null,
      descriptiveItems: [
        // {
        //   type: this.translations.category,
        //   name: this.detail.category[nameKey],
        //   description: this.detail.category[descriptionKey]
        // }
      ]
    }
  },
  computed: {
    nameKey() {
      return this.lang === 'en' ? 'nameEn' : 'name'
    },
    descriptionKey() {
      return this.lang === 'en' ? 'descriptionEn' : 'description'
    },
    displayData() {
      if (!this.detail) return '';
      const getData = (data) => {
        if (!typeof data === 'object') return data;
        return Object.keys(data).map(key => data[key])
      }
      return Object.keys(this.detail).map(key => {
        return getData(this.detail[key])
      })
    }
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    async getDetail() {
      try {
        const res = await httpService.getVariableById(this.id)
        this.detail = res.data
      } catch (error) {
        console.error(error)
      }
    },
    descriptionData(key) {
      return {
        type: this.translations[key],
        name: this.detail[key][this.nameKey],
        description: this.detail[key][this.descriptionKey],
      }
    },
    descriptionDataCompact(key) {
      return {
        type: this.translations[key],
        name: this.detail[key],
      }
    },
    hasNextLevel(data) {
      return (typeof data === 'object')
    },
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
