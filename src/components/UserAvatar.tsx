import { cn } from "@/lib/utils"

const gradients = [
  ["#3B82F6", "#8B5CF6"], // Blue-Purple
  ["#EC4899", "#F43F5E"], // Pink-Rose
  ["#0EA5E9", "#06B6D4"], // Sky-Cyan
  ["#F59E0B", "#EF4444"], // Amber-Red
  ["#10B981", "#14B8A6"], // Emerald-Teal
  ["#8B5CF6", "#EC4899"], // Violet-Pink
  ["#F97316", "#F59E0B"], // Orange-Amber
  ["#06B6D4", "#3B82F6"], // Cyan-Blue
  ["#EF4444", "#F97316"], // Red-Orange
  ["#14B8A6", "#10B981"], // Teal-Emerald
]

interface UserAvatarProps {
  name: string
  avatarUrl?: string
  size?: number
  userId?: number
  borderColor?: string
  borderWidth?: number
  className?: string
}

export function UserAvatar({
  name,
  avatarUrl,
  size = 48,
  userId = 0,
  borderColor,
  borderWidth = 0,
  className,
}: UserAvatarProps) {
  const [from, to] = gradients[userId % gradients.length]
  const initial = name.charAt(0).toUpperCase()
  const fontSize = size * 0.4

  return (
    <div
      className={cn("relative shrink-0 rounded-full overflow-hidden", className)}
      style={{
        width: size,
        height: size,
        border: borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : undefined,
      }}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${from}, ${to})`,
          }}
        >
          <span
            className="font-bold text-white"
            style={{ fontSize }}
          >
            {initial}
          </span>
        </div>
      )}
    </div>
  )
}
