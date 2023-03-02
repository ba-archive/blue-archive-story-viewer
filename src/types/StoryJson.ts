export interface Section {
  title: string;
  story_id: number;
  description: {
    TextKr: string;
    TextJp: string;
    TextTh: string;
    TextCn: string;
    TextTw: string;
    TextEn: string;
  };
}
export interface Story {
  title: string;
  avatar: string;
  sections: Section[];
}
