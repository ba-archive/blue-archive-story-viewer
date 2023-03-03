export interface CommonStoryTextObject {
  TextCn: string;
  TextJp: string;
  TextKr: string;
  TextTh: string;
  TextEn: string;
  TextTw: string;
}

export interface RawStoryUnit {
  GroupId: number;
  SelectionGroup: number;
  BGMId: number;
  Sound: string;
  Transition: number;
  BGName: number;
  BGEffect: number;
  PopupFileName: string;
  ScriptKr: string;
  TextJp: string;
  TextCn?: string;
  TextTw?: string;
  TextEn?: string;
  VoiceJp: string;
}

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

export interface StoryAbstract {
  groupId: number;
  title: CommonStoryTextObject;
  abstract: CommonStoryTextObject;
}

export interface StoryBriefing {
  title: string;
  avatar: string;
  sections: Section[];
}

export interface StoryContent {
  GroupId: number;
  translator: string;
  content: RawStoryUnit[];
}

export interface StoryIndex {
  id: number;
  abstracts: StoryAbstract[];
}
