import type { Message } from '../../types'

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const { text, sender, timestamp } = message

  const timeStr = new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  if (sender === 'system') {
    return (
      <div className="msg-system" role="status">
        <span className="msg-system__text">{text}</span>
        <span className="msg-system__time">{timeStr}</span>
      </div>
    )
  }

  return (
    <div className={`msg-row msg-row--${sender}`}>
      {sender === 'agent' && (
        <div className="msg-avatar" aria-hidden="true">
          💚
        </div>
      )}
      <div className={`msg-bubble msg-bubble--${sender}`}>
        <p className="msg-bubble__text">{text}</p>
        <span className="msg-bubble__time">{timeStr}</span>
      </div>
    </div>
  )
}
