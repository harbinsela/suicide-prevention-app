import { useUiStore } from '../../store/uiStore'
import { useSessionStore } from '../../store/sessionStore'
import { useResourceStore } from '../../store/resourceStore'

export function ChatHeader() {
  const alias = useSessionStore((state) => state.alias)
  const sessionStartTime = useSessionStore((state) => state.sessionStartTime)

  const minimizeChat = useUiStore((state) => state.minimizeChat)
  const openEndSessionModal = useUiStore((state) => state.openEndSessionModal)

  const isPanelOpen = useResourceStore((state) => state.isPanelOpen)
  const openPanel = useResourceStore((state) => state.openPanel)
  const closePanel = useResourceStore((state) => state.closePanel)

  const displayName = alias || 'Anonymous'

  const sessionDuration = sessionStartTime
    ? Math.floor((Date.now() - new Date(sessionStartTime).getTime()) / 60000)
    : 0

  const togglePanel = () => {
    if (isPanelOpen) closePanel()
    else openPanel()
  }

  return (
    <div className="chat-header">
      <div className="chat-header__info">
        <div className="chat-header__avatar" aria-hidden="true">💚</div>
        <div>
          <div className="chat-header__name">{displayName}</div>
          <div className="chat-header__status">
            <span className="chat-header__dot" aria-hidden="true" />
            {sessionDuration < 1
              ? 'Session just started'
              : `${sessionDuration} min${sessionDuration !== 1 ? 's' : ''} active`}
          </div>
        </div>
      </div>

      <div className="chat-header__actions">
        <button
          id="resources-btn"
          className={`chat-header__btn ${isPanelOpen ? 'chat-header__btn--active' : ''}`}
          onClick={togglePanel}
          type="button"
          title="Resources"
          aria-label="Toggle resource panel"
        >
          📋 Resources
        </button>
        <button
          id="minimize-chat-btn"
          className="chat-header__btn"
          onClick={minimizeChat}
          type="button"
          title="Minimize chat"
          aria-label="Minimize chat"
        >
          ─
        </button>
        <button
          id="end-session-btn"
          className="chat-header__btn chat-header__btn--danger"
          onClick={openEndSessionModal}
          type="button"
          title="End session"
          aria-label="End session"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
