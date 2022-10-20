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
    getTheme: (state) => {
      return state.settings.theme;
    },
  },
  actions: {
    setLang(lang) {
      this.settings.lang = lang;
    },
    setTheme(theme) {
      this.settings.theme = theme;
    },
  },
});
