export function TypingIndicator() {
  return (
    <div className="msg-row msg-row--agent" aria-label="Support person is typing">
      <div className="msg-avatar" aria-hidden="true">💚</div>
      <div className="typing-indicator">
        <span className="typing-dot" style={{ animationDelay: '0ms' }} />
        <span className="typing-dot" style={{ animationDelay: '160ms' }} />
        <span className="typing-dot" style={{ animationDelay: '320ms' }} />
      </div>
    </div>
  )
}
