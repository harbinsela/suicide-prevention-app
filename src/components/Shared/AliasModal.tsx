import { useState } from 'react'
import { useUiStore } from '../../store/uiStore'
import { useSessionStore } from '../../store/sessionStore'

export function AliasModal() {
  const [inputValue, setInputValue] = useState('')
  const isOpen = useUiStore((state) => state.isAliasModalOpen)
  const closeAliasModal = useUiStore((state) => state.closeAliasModal)
  const openMoodCheckIn = useUiStore((state) => state.openMoodCheckIn)
  const setAlias = useSessionStore((state) => state.setAlias)

  if (!isOpen) return null

  const handleConfirm = () => {
    setAlias(inputValue.trim())
    closeAliasModal()
    openMoodCheckIn()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleConfirm()
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="alias-modal-title">
      <div className="modal">
        <div className="modal__icon">👤</div>
        <h2 id="alias-modal-title" className="modal__title">
          What should we call you?
        </h2>
        <p className="modal__desc">
          Choose a name or leave blank to stay anonymous. This is never stored or shared.
        </p>

        <input
          id="alias-input"
          className="modal__input"
          type="text"
          placeholder="e.g. Alex, or leave blank..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={30}
          autoFocus
          autoComplete="off"
        />

        <button
          id="alias-confirm-btn"
          className="modal__btn modal__btn--primary"
          onClick={handleConfirm}
          type="button"
        >
          Continue
          <span className="modal__btn-arrow">→</span>
        </button>
      </div>
    </div>
  )
}
