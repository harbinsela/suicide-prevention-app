import { useUiStore } from '../../store/uiStore'

export function OpenChatButton() {
  const openChat = useUiStore((state) => state.openChat)
  const openAliasModal = useUiStore((state) => state.openAliasModal)

  const handleClick = () => {
    openChat()
    openAliasModal()
  }

  return (
    <button
      id="open-chat-btn"
      className="open-chat-btn"
      onClick={handleClick}
      type="button"
    >
      <span className="open-chat-btn__icon">💬</span>
      Talk to Someone
    </button>
  )
}
