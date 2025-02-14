export interface Message {
  id: string;
  content: string;
  isBot: boolean;
}

export type ChatMode = 'deepthink' | 'search'; 