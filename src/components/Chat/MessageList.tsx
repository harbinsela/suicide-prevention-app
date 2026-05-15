import { useEffect, useRef } from 'react'
import { useChatStore } from '../../store/chatStore'
import { useUiStore } from '../../store/uiStore'
import { MessageBubble } from './MessageBubble'
import { TypingIndicator } from './TypingIndicator'

export function MessageList() {
  const messages = useChatStore((state) => state.messages)
  const agentIsTyping = useUiStore((state) => state.agentIsTyping)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, agentIsTyping])

  return (
    <div className="message-list" role="log" aria-live="polite" aria-label="Chat messages">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      {agentIsTyping && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  )
}
