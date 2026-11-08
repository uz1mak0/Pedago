import { CEFRLevel } from './types';

export interface LevelInfo {
  level: number;
  title: string;
  cefrLevel: CEFRLevel;
  currentLevelXp: number;
  nextLevelXp: number;
  progressPercent: number;
}

/**
 * Calculates current level, Tagalog honorific title, CEFR level, and progression percentage.
 */
export function calculateXpAndLevel(totalXp: number): LevelInfo {
  const safeXp = Math.max(0, totalXp);

  // Level thresholds: Level 1 = 0, Level 2 = 100, Level 3 = 250, Level 4 = 450, Level 5 = 700...
  // Formula: XP for level L = 50 * L * (L - 1)
  let level = 1;
  while (50 * (level + 1) * level <= safeXp) {
    level++;
  }

  const currentLevelBaseXp = 50 * level * (level - 1);
  const nextLevelXp = 50 * (level + 1) * level;
  const xpInLevel = safeXp - currentLevelBaseXp;
  const xpNeeded = nextLevelXp - currentLevelBaseXp;
  const progressPercent = Math.min(100, Math.round((xpInLevel / xpNeeded) * 100));

  let title = 'Baguhan (Novice)';
  let cefrLevel: CEFRLevel = 'A1';

  if (level >= 15) {
    title = 'Dalubhasa (Fluent Master)';
    cefrLevel = 'B2';
  } else if (level >= 10) {
    title = 'Marunong (Proficient Speaker)';
    cefrLevel = 'B1';
  } else if (level >= 5) {
    title = 'Matiyaga (Dedicated Learner)';
    cefrLevel = 'A2';
  }

  return {
    level,
    title,
    cefrLevel,
    currentLevelXp: safeXp,
    nextLevelXp,
    progressPercent,
  };
}

/**
 * Calculates streak updates given last activity date string ('YYYY-MM-DD')
 * and today's date string ('YYYY-MM-DD').
 */
export function calculateStreak(
  lastActivityDate: string | undefined,
  currentStreak: number,
  todayStr: string,
  hasStreakFreeze: boolean = false
): { newStreak: number; streakSavedByFreeze: boolean; isSameDay: boolean } {
  if (!lastActivityDate) {
    return { newStreak: 1, streakSavedByFreeze: false, isSameDay: false };
  }

  if (lastActivityDate === todayStr) {
    return { newStreak: Math.max(1, currentStreak), streakSavedByFreeze: false, isSameDay: true };
  }

  const lastDate = new Date(lastActivityDate + 'T00:00:00');
  const today = new Date(todayStr + 'T00:00:00');
  const diffDays = Math.round((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    // Consecutive day
    return { newStreak: currentStreak + 1, streakSavedByFreeze: false, isSameDay: false };
  } else if (diffDays === 2 && hasStreakFreeze) {
    // Missed 1 day, saved by streak freeze
    return { newStreak: currentStreak + 1, streakSavedByFreeze: true, isSameDay: false };
  } else {
    // Streak reset to 1
    return { newStreak: 1, streakSavedByFreeze: false, isSameDay: false };
  }
}

/**
 * Spaced repetition algorithm (SuperMemo SM-2 inspired interval).
 * Returns new mastery level (0-5) and days until next review.
 */
export function calculateNextReview(
  currentMastery: number,
  isCorrect: boolean
): { newMastery: number; daysUntilNextReview: number } {
  let newMastery = currentMastery;

  if (isCorrect) {
    newMastery = Math.min(5, currentMastery + 1);
  } else {
    newMastery = Math.max(0, currentMastery - 1);
  }

  const intervalsByMastery = [0, 1, 3, 7, 14, 30];
  const daysUntilNextReview = intervalsByMastery[newMastery] ?? 1;

  return {
    newMastery,
    daysUntilNextReview,
  };
}

/**
 * Formats syllables with uppercase stress guide (e.g. ['sa', 'la', 'mat'] with index 1 => "sa-LA-mat")
 */
export function formatTagalogPhonetics(syllables: string[], stressedIndex: number): string {
  if (!syllables || syllables.length === 0) return '';
  return syllables
    .map((syl, idx) => (idx === stressedIndex ? syl.toUpperCase() : syl.toLowerCase()))
    .join('-');
}

/**
 * Determines competitive league tier based on XP.
 */
export function calculateLeague(xp: number): 'Tanso (Bronze)' | 'Pilak (Silver)' | 'Ginto (Gold)' | 'Diyamante (Diamond)' {
  if (xp >= 3000) return 'Diyamante (Diamond)';
  if (xp >= 1500) return 'Ginto (Gold)';
  if (xp >= 600) return 'Pilak (Silver)';
  return 'Tanso (Bronze)';
}

/**
 * Formats seconds into human-readable minutes and seconds.
 */
export function formatStudyTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
}
