/* eslint-disable sort-exports/sort-exports */

export interface Student {
  id: number;
  familyName: StudentName;
  name: StudentName;
  nickname: string[] | number[];
  club: string;
  affiliation: string;
  rarity: number;
  type: string;
  armorType: string;
  weapon: string;
}

export interface StudentName {
  cn: string;
  jp: string;
  en: string;
}

export interface StudentAttributeFilters {
  rarity: number[];
  club: string[];
  affiliation: string[];
  type: string[];
  armorType: string[];
}

export interface StudentAttributes {
  club: string;
  affiliation: string;
  rarity: number;
  type: string;
  armorType: string;
  weapon: string;
}

export interface StudentFilters {
  searchString: string;
  rarity: number[];
  club: string[];
  affiliation: string[];
  type: string[];
  armorType: string[];
}

export interface StudentNames {
  id: number;
  allNames: (string | number)[];
}
