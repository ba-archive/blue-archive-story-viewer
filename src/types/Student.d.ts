export interface Student {
  id: number;
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
  id: number;
  allNames: (string | number)[];
}
