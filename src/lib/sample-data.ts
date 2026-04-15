import { type Room, type Participant, RoomCategory, SpeakerPhase } from "@/types/room"

const makeParticipant = (
  id: number,
  name: string,
  opts: Partial<Participant> = {}
): Participant => ({
  id,
  name,
  isModerator: false,
  isSpeaker: false,
  isMuted: false,
  ...opts,
})

export const sampleRooms: Room[] = [
  {
    id: 1,
    name: "Friday Night Live",
    category: RoomCategory.ENTERTAINMENT,
    moderatorId: 101,
    currentSpeakerId: 102,
    speakerStartTime: Date.now() - 18_000,
    voteKeepCount: 0,
    votePassCount: 0,
    isVotingOpen: false,
    voteRoundId: 7,
    participants: [
      makeParticipant(101, "DJ Mike", { isModerator: true }),
      makeParticipant(102, "Kendrick", { isSpeaker: true }),
      makeParticipant(103, "Sarah"),
      makeParticipant(104, "Jamal"),
      makeParticipant(105, "Priya"),
      makeParticipant(106, "Marcus"),
      makeParticipant(107, "Aaliyah"),
      makeParticipant(108, "Chen"),
    ],
  },
  {
    id: 2,
    name: "Bull or Bear?",
    category: RoomCategory.FINANCE,
    moderatorId: 201,
    currentSpeakerId: 202,
    speakerStartTime: Date.now() - 35_000,
    voteKeepCount: 5,
    votePassCount: 3,
    isVotingOpen: true,
    voteRoundId: 3,
    voteEndTime: Date.now() + 12_000,
    participants: [
      makeParticipant(201, "WallStWolf", { isModerator: true }),
      makeParticipant(202, "CryptoQueen", { isSpeaker: true }),
      makeParticipant(203, "BondGuy"),
      makeParticipant(204, "ThetaGang"),
    ],
  },
  {
    id: 3,
    name: "Top 5 Albums",
    category: RoomCategory.MUSIC,
    moderatorId: 301,
    currentSpeakerId: 302,
    speakerStartTime: Date.now() - 42_000,
    voteKeepCount: 4,
    votePassCount: 6,
    isVotingOpen: true,
    voteRoundId: 5,
    voteEndTime: Date.now() + 8_000,
    participants: [
      makeParticipant(301, "BeatDrop", { isModerator: true }),
      makeParticipant(302, "VinylHead", { isSpeaker: true }),
      makeParticipant(303, "MelodyMaker"),
      makeParticipant(304, "BassBoost"),
      makeParticipant(305, "Treble"),
      makeParticipant(306, "808Fiend"),
    ],
  },
  {
    id: 4,
    name: "Hot Takes Only",
    category: RoomCategory.SPORTS,
    moderatorId: 401,
    currentSpeakerId: undefined,
    voteKeepCount: 0,
    votePassCount: 0,
    isVotingOpen: false,
    voteRoundId: 0,
    participants: [
      makeParticipant(401, "Coach K", { isModerator: true }),
      makeParticipant(402, "SlamDunk"),
      makeParticipant(403, "GoalKeeper"),
    ],
  },
  {
    id: 5,
    name: "Tarot Tuesday",
    category: RoomCategory.TAROT,
    moderatorId: 501,
    currentSpeakerId: 502,
    speakerStartTime: Date.now() - 10_000,
    voteKeepCount: 0,
    votePassCount: 0,
    isVotingOpen: false,
    voteRoundId: 2,
    participants: [
      makeParticipant(501, "MysticMoon", { isModerator: true }),
      makeParticipant(502, "StarChild", { isSpeaker: true }),
      makeParticipant(503, "Empress"),
      makeParticipant(504, "TowerGuy"),
      makeParticipant(505, "HighPriestess"),
    ],
  },
]

export function getRoomPhase(room: Room): SpeakerPhase {
  if (!room.currentSpeakerId) return SpeakerPhase.WAITING
  if (room.isVotingOpen) return SpeakerPhase.VOTING
  return SpeakerPhase.TALKING
}

export function getSpeaker(room: Room): Participant | undefined {
  return room.participants.find((p) => p.id === room.currentSpeakerId)
}

export function getModerator(room: Room): Participant | undefined {
  return room.participants.find((p) => p.id === room.moderatorId)
}
