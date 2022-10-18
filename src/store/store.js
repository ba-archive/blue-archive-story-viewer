import { defineStore } from "pinia";

export const mainStore = defineStore("main", {
  state: () => {
    return {
      lang: "zh",
    };
  },
  persist: true,
  getters: {
    getLang: (state) => {
      return state.lang;
    },
  },
  actions: {
    setLang(lang) {
      this.lang = lang;
    },
  },
});
