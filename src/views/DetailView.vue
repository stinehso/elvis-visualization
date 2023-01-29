<template>
  <div v-if="detail">
    <div v-for="key in Object.keys(detail)">

      <span v-if="detail[key]" class="font-bold mr-2"> {{ key }}: </span>
      
      <!-- nested list -->
      <!-- <span> {{ detail[key].toString() }} </span> -->
      <span v-if="hasNextLevel(detail[key])">
        <div v-for="next in Object.keys(detail[key])">
          <span class="font-bold ml-8 mr-2"> {{ next }}: </span>
          <span> {{ detail[key][next] }} </span>
        </div>
      </span>
      <span v-else> {{ detail[key].toString() }} </span>

    </div>
    <br>
  </div>
</template>

<script>
import { httpService } from '../httpService'

export default {
  props: {
    id: {
      type: [Number, String],
      default: 0
    },
  },
  data() {
    return {
      detail: null,
    }
  },
  computed: {
    displayData() {
      if (!this.detail) return '';
      const getData = (data) => {
        if (!typeof data === 'object') return data;
        return Object.keys(data).map(key => data[key])
      }


      // return this.detail
      // const data = Object.keys(this.detail).map(key => {
      //   const data = entry[key]
      //       return typeof data === 'object' 
      //         ? data.name 
      //         : data
      // })
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
        // console.log(res.data)
        this.detail = res.data
        // this.detail = Object.entries(this.detail)
      } catch (error) {
        console.error(error)
      }
    },
    hasNextLevel(data) {
      return (typeof data === 'object')
    }
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
