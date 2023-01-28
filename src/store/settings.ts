import { defineStore } from 'pinia';
import { StudentAttributeFilters, StudentFilters } from '../types/Student';

export const useSettingsStore = defineStore({
  id: 'ba-main-storage',
  state: () => {
    return {
      settings: {
        lang: 'cn',
        theme: 'light' as 'light' | 'dark',
        username: 'Sensei' as string,
      },
      studentFilters: {
        searchString: '',
        rarity: [] as number[],
        club: [] as string[],
        affiliation: [] as string[],
        type: [] as ('Striker' | 'Special')[],
        armorType: [] as ('LightArmor' | 'HeavyArmor' | 'Unarmed')[],
        bulletType: [] as ('Pierce' | 'Explode' | 'Mystic')[],
      },
    };
  },
  persist: true,
  getters: {
    getLang: state => state.settings.lang,
    getTheme: state => state.settings.theme,
    getUsername: state => state.settings.username,
    getSearchStringFilter: state => state.studentFilters.searchString,
    getRarityFilter: state => state.studentFilters.rarity,
    getClubFilter: state => state.studentFilters.club,
    getAffiliationFilter: state => state.studentFilters.affiliation,
    getTypeFilter: state => state.studentFilters.type,
    getArmorTypeFilter: state => state.studentFilters.armorType,
    getBulletTypeFilter: state => state.studentFilters.bulletType || [],
  },
  actions: {
    setLang(lang: string) {
      this.settings.lang = lang;
    },
    setTheme(theme: 'light' | 'dark') {
      this.settings.theme = theme;
    },
    setUsername(username: string) {
      this.settings.username = username;
    },
    setStudentFilters(filters: StudentFilters) {
      this.studentFilters.searchString = filters.searchString;
      this.studentFilters.rarity = filters.rarity;
      this.studentFilters.club = filters.club;
      this.studentFilters.affiliation = filters.affiliation;
      this.studentFilters.type = filters.type;
      this.studentFilters.armorType = filters.armorType;
      this.studentFilters.bulletType = filters.bulletType || [];
    },
    clearStudentFilters() {
      this.studentFilters.searchString = '';
      this.studentFilters.rarity = [];
      this.studentFilters.club = [];
      this.studentFilters.affiliation = [];
      this.studentFilters.type = [];
      this.studentFilters.armorType = [];
      this.studentFilters.bulletType = [];
    },
    clearStudentFilter(property: keyof StudentAttributeFilters) {
      this.studentFilters[property] = [];
    },
  },
});
