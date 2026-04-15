import { useState, useEffect, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Mic,
  MicOff,
  LogOut,
  Shield,
  MoreVertical,
  SkipForward,
  VolumeX,
  DoorOpen,
  Star,
} from "lucide-react"
import { UserAvatar } from "@/components/UserAvatar"
import { sampleRooms, getSpeaker, getModerator } from "@/lib/sample-data"
import { SpeakerPhase, VoteType, type Participant } from "@/types/room"
import {
  DarkBg,
  DarkSurface,
  DarkCard,
  DarkCardLight,
  MicGold,
  VoteKeepGreen,
  VotePassRed,
  ElectricPurple,
  TextWhite,
  TextGray,
  TextDimmed,
  TimerWarning,
} from "@/lib/colors"

const TALK_DURATION = 30
const VOTE_DURATION = 20

export default function Room() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const room = sampleRooms.find((r) => r.id === Number(id))
  if (!room) return <div style={{ color: TextWhite, padding: 24 }}>Room not found</div>

  const speaker = getSpeaker(room)
  const moderator = getModerator(room)
  const currentUserId = room.participants[0]?.id ?? 0 // pretend we're first participant

  const [phase, setPhase] = useState<SpeakerPhase>(
    speaker ? (room.isVotingOpen ? SpeakerPhase.VOTING : SpeakerPhase.TALKING) : SpeakerPhase.WAITING
  )
  const [timer, setTimer] = useState(0)
  const [votingCountdown, setVotingCountdown] = useState(VOTE_DURATION)
  const [hasVoted, setHasVoted] = useState(false)
  const [userVote, setUserVote] = useState<VoteType | null>(null)
  const [keepCount, setKeepCount] = useState(room.voteKeepCount)
  const [passCount, setPassCount] = useState(room.votePassCount)
  const [showResult, setShowResult] = useState(false)
  const [resultMsg, setResultMsg] = useState("")
  const [isMuted, setIsMuted] = useState(false)
  const [showModPanel, setShowModPanel] = useState(false)
  const isModerator = room.moderatorId === currentUserId

  // Timer tick
  useEffect(() => {
    if (phase === SpeakerPhase.WAITING) return

    const interval = setInterval(() => {
      if (phase === SpeakerPhase.TALKING) {
        setTimer((t) => {
          if (t + 1 >= TALK_DURATION) {
            setPhase(SpeakerPhase.VOTING)
            setVotingCountdown(VOTE_DURATION)
            return TALK_DURATION
          }
          return t + 1
        })
      } else if (phase === SpeakerPhase.VOTING) {
        setVotingCountdown((v) => {
          if (v - 1 <= 0) {
            // Decide
            const passed = passCount > keepCount
            setPhase(passed ? SpeakerPhase.RESULT_PASS : SpeakerPhase.RESULT_KEEP)
            setResultMsg(
              passed
                ? `\u{1F504} Pass the Mic! (${passCount}-${keepCount})`
                : `\u{1F389} Keep the Mic! (${keepCount}-${passCount})`
            )
            setShowResult(true)
            setTimeout(() => {
              setShowResult(false)
              setPhase(passed ? SpeakerPhase.WAITING : SpeakerPhase.TALKING)
              setTimer(0)
              setHasVoted(false)
              setUserVote(null)
              setKeepCount(0)
              setPassCount(0)
            }, 2500)
            return 0
          }
          return v - 1
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [phase, keepCount, passCount])

  const handleVote = useCallback(
    (type: VoteType) => {
      if (hasVoted) return
      setHasVoted(true)
      setUserVote(type)
      if (type === VoteType.KEEP) setKeepCount((c) => c + 1)
      else setPassCount((c) => c + 1)
    },
    [hasVoted]
  )

  const phaseColor =
    phase === SpeakerPhase.TALKING
      ? MicGold
      : phase === SpeakerPhase.VOTING
        ? TimerWarning
        : phase === SpeakerPhase.RESULT_KEEP
          ? VoteKeepGreen
          : phase === SpeakerPhase.RESULT_PASS
            ? VotePassRed
            : TextDimmed

  const progress =
    phase === SpeakerPhase.TALKING
      ? timer / TALK_DURATION
      : phase === SpeakerPhase.VOTING
        ? (VOTE_DURATION - votingCountdown) / VOTE_DURATION
        : 0

  const phaseLabel =
    phase === SpeakerPhase.TALKING
      ? "Speaking"
      : phase === SpeakerPhase.VOTING
        ? "Vote now!"
        : phase === SpeakerPhase.RESULT_KEEP
          ? "Keep the Mic!"
          : phase === SpeakerPhase.RESULT_PASS
            ? "Pass the Mic!"
            : "Waiting"

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: DarkBg }}>
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 pt-12 pb-3">
        <button onClick={() => navigate("/")} className="p-1">
          <ArrowLeft size={22} style={{ color: TextWhite }} />
        </button>
        <div className="flex-1 min-w-0">
          <h1
            className="text-base font-semibold truncate"
            style={{ color: TextWhite }}
          >
            {room.name}
          </h1>
          <p className="text-xs" style={{ color: TextDimmed }}>
            {room.participants.length} listeners
          </p>
        </div>
        <span
          className="text-xs font-bold px-2 py-1 rounded-full"
          style={{ backgroundColor: `${MicGold}22`, color: MicGold }}
        >
          Round {room.voteRoundId || 1}
        </span>
        {isModerator && (
          <button
            onClick={() => setShowModPanel(!showModPanel)}
            className="p-1"
          >
            <Shield
              size={20}
              style={{ color: showModPanel ? ElectricPurple : TextGray }}
            />
          </button>
        )}
        <button className="p-1">
          <MoreVertical size={20} style={{ color: TextGray }} />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pb-28">
        {/* Result banner */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              className="rounded-2xl px-4 py-3 mb-4 text-center text-sm font-semibold"
              style={{
                backgroundColor:
                  phase === SpeakerPhase.RESULT_PASS
                    ? `${VotePassRed}26`
                    : `${VoteKeepGreen}26`,
                color:
                  phase === SpeakerPhase.RESULT_PASS
                    ? VotePassRed
                    : VoteKeepGreen,
              }}
            >
              {resultMsg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Moderator badge */}
        {moderator && (
          <div
            className="flex items-center gap-2 rounded-xl px-3 py-2 mb-4"
            style={{ backgroundColor: DarkCard }}
          >
            <UserAvatar
              name={moderator.name}
              userId={moderator.id}
              size={32}
              borderColor={ElectricPurple}
              borderWidth={2}
            />
            <div>
              <p className="text-xs" style={{ color: TextDimmed }}>
                Moderator
              </p>
              <p className="text-sm font-medium" style={{ color: TextWhite }}>
                {moderator.name}
              </p>
            </div>
            <Shield size={14} className="ml-auto" style={{ color: ElectricPurple }} />
          </div>
        )}

        {/* Speaker card */}
        {speaker ? (
          <div
            className="rounded-3xl p-6 mb-6 flex flex-col items-center"
            style={{ backgroundColor: DarkCard }}
          >
            {/* Circular progress + avatar */}
            <div className="relative mb-4" style={{ width: 140, height: 140 }}>
              <svg
                viewBox="0 0 140 140"
                className="absolute inset-0 -rotate-90"
              >
                {/* bg ring */}
                <circle
                  cx="70"
                  cy="70"
                  r="64"
                  fill="none"
                  stroke={DarkCardLight}
                  strokeWidth="6"
                />
                {/* progress ring */}
                <circle
                  cx="70"
                  cy="70"
                  r="64"
                  fill="none"
                  stroke={phaseColor}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 64}`}
                  strokeDashoffset={`${2 * Math.PI * 64 * (1 - progress)}`}
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <UserAvatar
                  name={speaker.name}
                  userId={speaker.id}
                  size={104}
                />
              </div>
            </div>

            {/* Speaker name */}
            <h2
              className="text-xl font-black mb-1"
              style={{ color: TextWhite }}
            >
              {speaker.name}
            </h2>

            {/* Timer */}
            <div className="flex items-baseline gap-2 mb-1">
              <span
                className="text-3xl font-bold tabular-nums"
                style={{ color: phaseColor }}
              >
                {phase === SpeakerPhase.VOTING
                  ? votingCountdown
                  : timer}
              </span>
              <span className="text-xs" style={{ color: phaseColor }}>
                {phaseLabel}
              </span>
            </div>

            {/* Divider */}
            <div
              className="w-3/5 h-px my-4"
              style={{ backgroundColor: DarkCardLight }}
            />

            {/* Vote buttons or results */}
            {phase === SpeakerPhase.VOTING && !hasVoted ? (
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => handleVote(VoteType.KEEP)}
                  className="flex-1 h-14 rounded-xl font-semibold text-sm active:scale-95 transition-transform"
                  style={{ backgroundColor: VoteKeepGreen, color: DarkBg }}
                >
                  {"👍 Keep the Mic"}
                </button>
                <button
                  onClick={() => handleVote(VoteType.PASS)}
                  className="flex-1 h-14 rounded-xl font-semibold text-sm active:scale-95 transition-transform"
                  style={{ backgroundColor: VotePassRed, color: DarkBg }}
                >
                  {"🔄 Pass the Mic"}
                </button>
              </div>
            ) : (phase === SpeakerPhase.VOTING || showResult) ? (
              <div className="flex gap-3 w-full">
                <div
                  className="flex-1 h-14 rounded-xl flex items-center justify-center text-sm font-semibold"
                  style={{
                    backgroundColor:
                      userVote === VoteType.KEEP ? `${VoteKeepGreen}33` : `${DarkCardLight}`,
                    color: VoteKeepGreen,
                    border: userVote === VoteType.KEEP ? `2px solid ${VoteKeepGreen}` : "none",
                  }}
                >
                  {"👍 Keep · "}{keepCount}
                </div>
                <div
                  className="flex-1 h-14 rounded-xl flex items-center justify-center text-sm font-semibold"
                  style={{
                    backgroundColor:
                      userVote === VoteType.PASS ? `${VotePassRed}33` : `${DarkCardLight}`,
                    color: VotePassRed,
                    border: userVote === VoteType.PASS ? `2px solid ${VotePassRed}` : "none",
                  }}
                >
                  {"🔄 Pass · "}{passCount}
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          /* No speaker */
          <div
            className="rounded-3xl p-8 mb-6 flex flex-col items-center"
            style={{ backgroundColor: DarkCard }}
          >
            <Mic size={48} style={{ color: `${MicGold}66` }} className="mb-3" />
            <p className="text-base font-semibold mb-1" style={{ color: TextWhite }}>
              No one on stage
            </p>
            <p className="text-sm" style={{ color: TextDimmed }}>
              Waiting for moderator...
            </p>
          </div>
        )}

        {/* Participants grid */}
        <div className="mb-4">
          <p
            className="text-xs font-bold tracking-wider mb-3"
            style={{ color: TextDimmed }}
          >
            PARTICIPANTS
          </p>
          <div className="grid grid-cols-4 gap-3">
            {room.participants.map((p) => (
              <ParticipantChip
                key={p.id}
                participant={p}
                isSpeaking={p.id === room.currentSpeakerId}
                isMod={p.id === room.moderatorId}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom controls */}
      <div
        className="fixed bottom-0 left-0 right-0 px-4 pb-6 pt-3"
        style={{ backgroundColor: DarkBg }}
      >
        <div
          className="flex items-center justify-center gap-4 rounded-2xl px-4 py-3"
          style={{ backgroundColor: DarkSurface }}
        >
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-colors"
            style={{
              backgroundColor: isMuted ? `${VotePassRed}33` : DarkCardLight,
            }}
          >
            {isMuted ? (
              <MicOff size={20} style={{ color: VotePassRed }} />
            ) : (
              <Mic size={20} style={{ color: TextWhite }} />
            )}
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-6 h-12 rounded-full font-semibold text-sm"
            style={{ backgroundColor: `${VotePassRed}33`, color: VotePassRed }}
          >
            <LogOut size={18} />
            Leave
          </button>
        </div>
      </div>

      {/* Mod panel */}
      <AnimatePresence>
        {showModPanel && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setShowModPanel(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-72 z-50 p-5 overflow-y-auto"
              style={{ backgroundColor: DarkSurface }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Shield size={20} style={{ color: ElectricPurple }} />
                <h2 className="text-lg font-bold" style={{ color: TextWhite }}>
                  Controls
                </h2>
              </div>

              <div
                className="rounded-xl p-3 mb-4 text-xs space-y-1"
                style={{ backgroundColor: DarkCard }}
              >
                <p style={{ color: TextGray }}>
                  Listeners: <span style={{ color: TextWhite }}>{room.participants.length}</span>
                </p>
                <p style={{ color: TextGray }}>
                  Round: <span style={{ color: TextWhite }}>{room.voteRoundId || "-"}</span>
                </p>
                <p style={{ color: TextGray }}>
                  Status: <span style={{ color: phaseColor }}>{phaseLabel}</span>
                </p>
                {speaker && (
                  <p style={{ color: TextGray }}>
                    Speaker: <span style={{ color: TextWhite }}>{speaker.name}</span>
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <button
                  className="w-full flex items-center gap-3 rounded-xl px-3 py-3 text-sm"
                  style={{ backgroundColor: DarkCard, color: VotePassRed }}
                >
                  <SkipForward size={18} /> Force Pass Mic
                </button>
                <button
                  className="w-full flex items-center gap-3 rounded-xl px-3 py-3 text-sm"
                  style={{ backgroundColor: DarkCard, color: TextGray }}
                >
                  <VolumeX size={18} /> Mute All
                </button>
                <button
                  className="w-full flex items-center gap-3 rounded-xl px-3 py-3 text-sm"
                  style={{ backgroundColor: DarkCard, color: VotePassRed }}
                >
                  <DoorOpen size={18} /> End Room
                </button>
              </div>

              <p className="text-xs mt-6" style={{ color: TextDimmed }}>
                Moderator controls are only visible to you
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

function ParticipantChip({
  participant,
  isSpeaking,
  isMod,
}: {
  participant: Participant
  isSpeaking: boolean
  isMod: boolean
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative">
        <UserAvatar
          name={participant.name}
          userId={participant.id}
          size={48}
          borderColor={isSpeaking ? MicGold : undefined}
          borderWidth={isSpeaking ? 2 : 0}
        />
        {isSpeaking && (
          <div
            className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center"
            style={{ backgroundColor: MicGold }}
          >
            <Mic size={10} style={{ color: DarkBg }} />
          </div>
        )}
        {isMod && !isSpeaking && (
          <div
            className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center"
            style={{ backgroundColor: ElectricPurple }}
          >
            <Star size={10} style={{ color: DarkBg }} />
          </div>
        )}
      </div>
      <span
        className="text-[11px] text-center truncate w-full"
        style={{ color: TextGray }}
      >
        {participant.name}
      </span>
    </div>
  )
}
