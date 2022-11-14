import { defineStore } from "pinia";

export const mainStore = defineStore({
  id: "main",
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
    setLang(lang: string) {
      this.settings.lang = lang;
    },
    setTheme(theme: string) {
      this.settings.theme = theme;
    },
  },
});
