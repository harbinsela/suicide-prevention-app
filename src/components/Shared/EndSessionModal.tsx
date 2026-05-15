import { useUiStore } from '../../store/uiStore'
import { useChatStore } from '../../store/chatStore'
import { useSessionStore } from '../../store/sessionStore'
import { useResourceStore } from '../../store/resourceStore'

export function EndSessionModal() {
  const isOpen = useUiStore((state) => state.isEndSessionModalOpen)
  const closeEndSessionModal = useUiStore((state) => state.closeEndSessionModal)
  const closeChat = useUiStore((state) => state.closeChat)

  const clearMessages = useChatStore((state) => state.clearMessages)
  const resetSession = useSessionStore((state) => state.resetSession)
  const closePanel = useResourceStore((state) => state.closePanel)

  if (!isOpen) return null

  const handleConfirm = () => {
    clearMessages()
    resetSession()
    closeChat()
    closePanel()
    closeEndSessionModal()
  }

  const handleCancel = () => {
    closeEndSessionModal()
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="end-session-title">
      <div className="modal">
        <div className="modal__icon">🔒</div>
        <h2 id="end-session-title" className="modal__title">
          End this session?
        </h2>
        <p className="modal__desc">
          Are you sure? Your chat will be cleared for your privacy. You can always start a new conversation.
        </p>

        <div className="modal__actions">
          <button
            id="end-session-cancel-btn"
            className="modal__btn modal__btn--secondary"
            onClick={handleCancel}
            type="button"
          >
            Keep chatting
          </button>
          <button
            id="end-session-confirm-btn"
            className="modal__btn modal__btn--danger"
            onClick={handleConfirm}
            type="button"
          >
            End session
          </button>
        </div>
      </div>
    </div>
  )
}
