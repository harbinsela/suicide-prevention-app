import { useState } from 'react'
import { useChatStore } from '../../store/chatStore'
import { useUiStore } from '../../store/uiStore'

const AGENT_RESPONSES = [
  "I hear you, and I'm really glad you reached out. You don't have to go through this alone.",
  "Thank you for sharing that with me. It takes courage to speak up. How long have you been feeling this way?",
  "I'm here with you. Can you tell me a little more about what's been going on?",
  "That sounds really hard. Your feelings are completely valid, and I want to make sure you feel supported right now.",
  "You matter, and this conversation matters. Take all the time you need — I'm not going anywhere.",
  "I want to understand what you're going through. Would it help to talk about what happened today?",
  "It's okay to feel the way you do. Let's take this one step at a time together.",
  "You reached out, and that was the right thing to do. I'm here, and I'm listening.",
]

let responseIndex = 0
function getNextResponse(): string {
  const response = AGENT_RESPONSES[responseIndex % AGENT_RESPONSES.length]
  responseIndex++
  return response
}

export function InputBar() {
  const [text, setText] = useState('')
  const addMessage = useChatStore((state) => state.addMessage)
  const setLoading = useChatStore((state) => state.setLoading)
  const setAgentIsTyping = useUiStore((state) => state.setAgentIsTyping)
  const incrementUnread = useUiStore((state) => state.incrementUnread)

  const sendMessage = () => {
    const trimmed = text.trim()
    if (!trimmed) return

    addMessage(trimmed, 'user')
    setText('')

    // Simulate agent response
    setLoading(true)
    setAgentIsTyping(true)

    const delay = 1500 + Math.random() * 1000

    setTimeout(() => {
      setAgentIsTyping(false)
      addMessage(getNextResponse(), 'agent')
      setLoading(false)

      if (useUiStore.getState().isChatMinimized) {
        incrementUnread()
      }
    }, delay)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="input-bar">
      <textarea
        id="chat-input"
        className="input-bar__textarea"
        placeholder="Type a message... (Enter to send)"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        maxLength={500}
        aria-label="Type your message"
      />
      <button
        id="chat-send-btn"
        className="input-bar__send"
        onClick={sendMessage}
        type="button"
        disabled={!text.trim()}
        aria-label="Send message"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}
