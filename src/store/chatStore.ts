import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { Message } from '../types'

interface ChatState {
  messages: Message[]
  isLoading: boolean
  error: string | null
  addMessage: (text: string, sender: Message['sender']) => void
  setLoading: (val: boolean) => void
  setError: (msg: string | null) => void
  clearMessages: () => void
}

const INITIAL_MESSAGE: Message = {
  id: crypto.randomUUID(),
  text: 'You are safe here. A support person will be with you shortly.',
  sender: 'system',
  timestamp: new Date(),
}

export const useChatStore = create<ChatState>()(
  devtools(
    (set) => ({
      messages: [INITIAL_MESSAGE],
      isLoading: false,
      error: null,

      addMessage: (text, sender) =>
        set(
          (state) => ({
            messages: [
              ...state.messages,
              {
                id: crypto.randomUUID(),
                text,
                sender,
                timestamp: new Date(),
              },
            ],
          }),
          false,
          'chatStore/addMessage'
        ),

      setLoading: (val) => set({ isLoading: val }, false, 'chatStore/setLoading'),

      setError: (msg) => set({ error: msg }, false, 'chatStore/setError'),

      clearMessages: () =>
        set(
          {
            messages: [
              {
                id: crypto.randomUUID(),
                text: 'You are safe here. A support person will be with you shortly.',
                sender: 'system',
                timestamp: new Date(),
              },
            ],
            isLoading: false,
            error: null,
          },
          false,
          'chatStore/clearMessages'
        ),
    }),
    { name: 'chatStore' }
  )
)
