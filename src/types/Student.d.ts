export interface Student {
  id: string;
  familyName: {
    cn: string;
    jp: string;
    en: string;
  };
  name: {
    cn: string;
    jp: string;
    en: string;
  };
  nickname: string[] | number[];
  club: string;
  affiliation: string;
  rarity: number;
  type: string;
  armorType: string;
  weapon: string;
  availability: {
    [key: string]: boolean;
  };
}

export interface StudentAttributes {
  club: string;
  affiliation: string;
  rarity: number;
  type: string;
  armorType: string;
  weapon: string;
}

export interface StudentNames {
  id: string;
  allNames: string[];
}
