import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import type { Mood } from '../types'

interface SessionState {
  sessionId: string
  alias: string | null
  mood: Mood | null
  sessionStartTime: Date | null
  setAlias: (name: string) => void
  setMood: (mood: Mood) => void
  startSession: () => void
  resetSession: () => void
}

export const useSessionStore = create<SessionState>()(
  devtools(
    persist(
      (set) => ({
        sessionId: '',
        alias: null,
        mood: null,
        sessionStartTime: null,

        setAlias: (name) => set({ alias: name }, false, 'sessionStore/setAlias'),

        setMood: (mood) => set({ mood }, false, 'sessionStore/setMood'),

        startSession: () =>
          set(
            {
              sessionId: crypto.randomUUID(),
              sessionStartTime: new Date(),
            },
            false,
            'sessionStore/startSession'
          ),

        resetSession: () =>
          set(
            {
              sessionId: crypto.randomUUID(),
              alias: null,
              mood: null,
              sessionStartTime: null,
            },
            false,
            'sessionStore/resetSession'
          ),
      }),
      {
        name: 'session-storage',
        partialize: (state) => ({ alias: state.alias, mood: state.mood }),
      }
    ),
    { name: 'sessionStore' }
  )
)
