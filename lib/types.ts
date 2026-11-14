export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface Flashcard {
  id: string;
  tagalog: string;
  tagalogWithStress: string;
  english: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'expression' | 'particle' | 'pronoun';
  pronunciationGuide: string;
  exampleSentenceTagalog: string;
  exampleSentenceEnglish: string;
  culturalNote?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface GrammarQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface GrammarExample {
  tagalog: string;
  english: string;
  breakdown?: string;
}

export interface GrammarExercise {
  id: string;
  topicNumber: number;
  topic: string;
  category: 'Focus System' | 'Verbal Aspects' | 'Particles & Enclitics' | 'Case Markers' | 'Pronouns & Demonstratives' | 'Sentences & Syntax' | 'Adjectives & Modifiers' | 'Colloquial & Everyday';
  title: string;
  tagalogTitle: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  summary?: string;
  formula: string;
  detailedExplanation: string;
  examples: GrammarExample[];
  quiz: GrammarQuizQuestion[];
}

export interface DialogueChoice {
  textTagalog: string;
  textEnglish: string;
  culturalFeedback?: string;
  nextNodeId: string;
  isCorrect?: boolean;
}

export interface DialogueNode {
  id: string;
  speaker: 'npc' | 'user';
  speakerName: string;
  tagalog: string;
  english: string;
  audioText?: string;
  culturalNote?: string;
  choices?: DialogueChoice[];
  isTerminal?: boolean;
}

export interface Scenario {
  id: string;
  scenarioNumber: number;
  title: string;
  titleTagalog: string;
  location: string;
  category: 'Travel' | 'Food & Dining' | 'Daily Life' | 'Community' | 'Family & Social';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  culturalContext: string;
  xpReward: number;
  dialogue: DialogueNode[];
}

export interface UserStats {
  xp: number;
  level: number;
  streakDays: number;
  masteredFlashcards: string[];
  completedGrammarTopics: string[];
  completedScenarios: string[];
  lastStudyDate: string;
}
