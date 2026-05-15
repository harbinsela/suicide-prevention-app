import { useUiStore } from '../../store/uiStore'
import { ChatHeader } from './ChatHeader'
import { MessageList } from './MessageList'
import { InputBar } from './InputBar'
import { ResourcePanel } from '../Shared/ResourcePanel'

export function ChatWindow() {
  const isChatOpen = useUiStore((state) => state.isChatOpen)
  const isChatMinimized = useUiStore((state) => state.isChatMinimized)
  const unreadCount = useUiStore((state) => state.unreadCount)
  const maximizeChat = useUiStore((state) => state.maximizeChat)
  const resetUnread = useUiStore((state) => state.resetUnread)

  if (!isChatOpen) return null

  if (isChatMinimized) {
    return (
      <button
        id="chat-bubble-btn"
        className="chat-bubble"
        onClick={() => {
          maximizeChat()
          resetUnread()
        }}
        type="button"
        aria-label={`Open chat${unreadCount > 0 ? `, ${unreadCount} unread messages` : ''}`}
      >
        <span className="chat-bubble__icon">💬</span>
        {unreadCount > 0 && (
          <span className="chat-bubble__badge" aria-live="polite">
            {unreadCount}
          </span>
        )}
      </button>
    )
  }

  return (
    <div className="chat-window" role="main" aria-label="Support chat">
      <ChatHeader />
      <div className="chat-window__body">
        <MessageList />
        <ResourcePanel />
      </div>
      <InputBar />
    </div>
  )
}
