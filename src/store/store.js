import { defineStore } from "pinia";

export const mainStore = defineStore("main", {
  state: () => {
    return {
      settings: {
        lang: "zh",
        theme: "light",
      },
    };
  },
  persist: true,
  getters: {
    getLang: (state) => {
      return state.settings.lang;
    },
  },
  actions: {
    setLang(lang) {
      this.settings.lang = lang;
    },
  },
});
