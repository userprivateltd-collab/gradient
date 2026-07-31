export type VideoPlatform = 'youtube' | 'instagram' | 'tiktok' | 'unknown';

export interface VideoMetadata {
  id: string;
  url: string;
  platform: VideoPlatform;
  title: string;
  creator: {
    name: string;
    handle: string;
    avatarUrl?: string;
  };
  thumbnailUrl: string;
  duration: string; // e.g. "01:15"
  durationSeconds: number;
  publishedAt: string;
  viewCount: string;
  likeCount: string;
}

export interface TranscriptItem {
  id: string;
  timestamp: string; // "00:05"
  seconds: number;
  text: string;
}

export interface ResourceItem {
  id: string;
  name: string;
  category: 'website' | 'app' | 'tool' | 'product' | 'language';
  description: string;
  url?: string;
  pricing?: string;
  iconName?: string;
}

export interface TimelineItem {
  id: string;
  timestamp: string;
  seconds: number;
  title: string;
  description: string;
  category?: string;
}

export interface QuestionAnswer {
  question: string;
  answer: string;
  timestamp?: string;
}

export interface ActionStep {
  id: string;
  step: string;
  completed: boolean;
}

export interface AIInsights {
  sentiment: 'Very Positive' | 'Positive' | 'Neutral' | 'Educational' | 'Urgent';
  targetAudience: string;
  hookAnalysis: string;
  contentQualityScore: number; // 1-100
  keyTakeaway: string;
}

export interface CategorizedEntities {
  websites: string[];
  apps: string[];
  tools: string[];
  programmingLanguages: string[];
  products: string[];
  people: string[];
  companies: string[];
  moneyMentioned: string[];
  links: string[];
  emails: string[];
  phoneNumbers: string[];
  hashtags: string[];
  usernames: string[];
  mainTopics: string[];
  keywords: string[];
}

export interface VideoAnalysis {
  id: string;
  analyzedAt: string;
  video: VideoMetadata;
  aiSummary: string;
  transcript: TranscriptItem[];
  resources: ResourceItem[];
  entities: CategorizedEntities;
  learningPoints: string[];
  actionSteps: ActionStep[];
  questionsAnswered: QuestionAnswer[];
  insights: AIInsights;
  timeline: TimelineItem[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
