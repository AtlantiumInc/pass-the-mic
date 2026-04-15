import { useNavigate } from "react-router-dom"
import { Users, Clock } from "lucide-react"
import { type Room, CategoryMeta } from "@/types/room"
import { UserAvatar } from "@/components/UserAvatar"
import { getSpeaker } from "@/lib/sample-data"
import {
  DarkCard,
  MicGold,
  VoteKeepGreen,
  TextWhite,
  TextGray,
  TextDimmed,
  DarkCardLight,
} from "@/lib/colors"

function formatDuration(ms: number): string {
  const totalSec = Math.floor(ms / 1000)
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return `${m}:${String(s).padStart(2, "0")}`
}

export function RoomCard({ room }: { room: Room }) {
  const navigate = useNavigate()
  const speaker = getSpeaker(room)
  const meta = CategoryMeta[room.category]
  const elapsed = room.speakerStartTime
    ? Date.now() - room.speakerStartTime
    : 0

  return (
    <button
      onClick={() => navigate(`/room/${room.id}`)}
      className="w-full text-left rounded-2xl p-4 transition-transform active:scale-[0.98]"
      style={{ backgroundColor: DarkCard }}
    >
      {/* Top row: name + category + duration */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <h3
            className="text-base font-semibold truncate"
            style={{ color: TextWhite }}
          >
            {room.name}
          </h3>
          <span
            className="shrink-0 text-xs px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${DarkCardLight}`, color: TextGray }}
          >
            {meta.emoji} {meta.label}
          </span>
        </div>
        {room.speakerStartTime && (
          <div
            className="flex items-center gap-1 text-xs shrink-0"
            style={{ color: TextDimmed }}
          >
            <Clock size={12} />
            {formatDuration(elapsed)}
          </div>
        )}
      </div>

      {/* Speaker row */}
      {speaker && (
        <div className="flex items-center gap-2.5 mb-3">
          <UserAvatar
            name={speaker.name}
            avatarUrl={speaker.avatarUrl}
            size={36}
            userId={speaker.id}
            borderColor={room.isVotingOpen ? MicGold : VoteKeepGreen}
            borderWidth={2}
          />
          <div className="min-w-0">
            <p
              className="text-sm font-medium truncate"
              style={{ color: TextWhite }}
            >
              {speaker.name}
            </p>
            <p className="text-xs" style={{ color: TextDimmed }}>
              Round {room.voteRoundId}{" "}
              {room.speakerStartTime &&
                `\u00B7 ${formatDuration(elapsed)} on stage`}
            </p>
          </div>
        </div>
      )}

      {/* Bottom row: participants + live badge */}
      <div className="flex items-center justify-between">
        <div
          className="flex items-center gap-1 text-xs"
          style={{ color: TextGray }}
        >
          <Users size={14} />
          {room.participants.length}
        </div>

        {room.isVotingOpen ? (
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${MicGold}22`, color: MicGold }}
          >
            VOTE OPEN
          </span>
        ) : room.currentSpeakerId ? (
          <span className="flex items-center gap-1 text-xs font-bold">
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ backgroundColor: VoteKeepGreen }}
            />
            <span style={{ color: VoteKeepGreen }}>LIVE</span>
          </span>
        ) : null}
      </div>
    </button>
  )
}
