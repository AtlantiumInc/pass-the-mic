export enum RoomCategory {
  FINANCE = "finance",
  ENTERTAINMENT = "entertainment",
  FOOD = "food",
  SPORTS = "sports",
  TECHNOLOGY = "technology",
  MUSIC = "music",
  TRAVEL = "travel",
  TAROT = "tarot",
  BETTING = "betting",
}

export const CategoryMeta: Record<RoomCategory, { label: string; emoji: string }> = {
  [RoomCategory.FINANCE]: { label: "Finance", emoji: "\u{1F4B0}" },
  [RoomCategory.ENTERTAINMENT]: { label: "Entertainment", emoji: "\u{1F3AC}" },
  [RoomCategory.FOOD]: { label: "Food", emoji: "\u{1F354}" },
  [RoomCategory.SPORTS]: { label: "Sports", emoji: "\u26BD" },
  [RoomCategory.TECHNOLOGY]: { label: "Technology", emoji: "\u{1F4BB}" },
  [RoomCategory.MUSIC]: { label: "Music", emoji: "\u{1F3B5}" },
  [RoomCategory.TRAVEL]: { label: "Travel", emoji: "\u2708\uFE0F" },
  [RoomCategory.TAROT]: { label: "Tarot", emoji: "\u{1F52E}" },
  [RoomCategory.BETTING]: { label: "Betting", emoji: "\u{1F3B2}" },
}

export interface Participant {
  id: number
  name: string
  avatarUrl?: string
  isModerator: boolean
  isSpeaker: boolean
  isMuted: boolean
}

export interface Room {
  id: number
  name: string
  category: RoomCategory
  moderatorId: number
  currentSpeakerId?: number
  speakerStartTime?: number
  voteKeepCount: number
  votePassCount: number
  isVotingOpen: boolean
  voteRoundId: number
  voteEndTime?: number
  participants: Participant[]
}

export enum VoteType {
  KEEP = "keep",
  PASS = "pass",
}

export interface Vote {
  userId: number
  voteType: VoteType
  voteRoundId: number
  createdAt: number
}

export enum SpeakerPhase {
  TALKING = "talking",
  VOTING = "voting",
  DECIDING = "deciding",
  RESULT_KEEP = "result_keep",
  RESULT_PASS = "result_pass",
  WAITING = "waiting",
}

export interface RoomUiState {
  room: Room
  currentUserId: number
  phase: SpeakerPhase
  timerSeconds: number
  votingCountdown: number
  totalSpeakerSeconds: number
  hasVotedThisRound: boolean
  userVoteType?: VoteType
  lastResult?: SpeakerPhase
  isLoading: boolean
  error?: string
  isModerator: boolean
  showResultBanner: boolean
  resultMessage: string
  nextSpeakerIndex: number
}
