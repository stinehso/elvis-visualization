<template>
  <header class="relative">
    <div class="flex flex-row">
      <RouterLink
        to="/"
        v-if="notHome"
        class="flex flex-row items-center py-2 px-4 my-0 mx-1 rounded text-slate-500 hover:text-slate-700"
        >{{ translations.home }}</RouterLink
      >
      <button
        class="flex flex-row items-center ml-auto p-2 my-0 mx-1 text-slate-500 hover:text-slate-700"
        type="button"
        @click="switchLanguage"
      >
        <i class="material-icons-outlined">language</i>
      </button>
    </div>
    <h1 class="text-3xl font-bold text-center">ELVIS visualization</h1>
  </header>

  <RouterView :translations="translations" :lang="lang" />
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import texts from "./assets/translations.json";

export default {
  data() {
    return {
      lang: "no",
    };
  },
  computed: {
    translations() {
      return texts[this.lang];
    },
    notHome() {
      return this.$route.path !== "/";
    },
  },
  methods: {
    switchLanguage() {
      if (this.lang === "no") this.lang = "en";
      else this.lang = "no";
    },
  },
};
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  padding-bottom: 2rem;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
