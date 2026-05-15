import { useUiStore } from '../../store/uiStore'
import { useSessionStore } from '../../store/sessionStore'
import { useResourceStore } from '../../store/resourceStore'
import type { Mood } from '../../types'

const MOODS: { value: Mood; emoji: string; label: string }[] = [
  { value: 'great', emoji: '😊', label: 'Great' },
  { value: 'okay', emoji: '🙂', label: 'Okay' },
  { value: 'sad', emoji: '😔', label: 'Sad' },
  { value: 'anxious', emoji: '😰', label: 'Anxious' },
  { value: 'crisis', emoji: '🆘', label: 'Crisis' },
]

export function MoodCheckIn() {
  const isOpen = useUiStore((state) => state.isMoodCheckInOpen)
  const closeMoodCheckIn = useUiStore((state) => state.closeMoodCheckIn)
  const setMood = useSessionStore((state) => state.setMood)
  const startSession = useSessionStore((state) => state.startSession)
  const setSuggestedResources = useResourceStore((state) => state.setSuggestedResources)

  if (!isOpen) return null

  const handleMoodSelect = (mood: Mood) => {
    setMood(mood)
    setSuggestedResources(mood)
    closeMoodCheckIn()
    startSession()
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="mood-checkin-title">
      <div className="modal modal--wide">
        <div className="modal__icon">🌱</div>
        <h2 id="mood-checkin-title" className="modal__title">
          How are you feeling right now?
        </h2>
        <p className="modal__desc">
          No judgment — just helping us understand how to best support you.
        </p>

        <div className="mood-grid" role="group" aria-label="Mood options">
          {MOODS.map(({ value, emoji, label }) => (
            <button
              key={value}
              id={`mood-btn-${value}`}
              className={`mood-btn ${value === 'crisis' ? 'mood-btn--crisis' : ''}`}
              onClick={() => handleMoodSelect(value)}
              type="button"
              aria-label={`I'm feeling ${label}`}
            >
              <span className="mood-btn__emoji">{emoji}</span>
              <span className="mood-btn__label">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
