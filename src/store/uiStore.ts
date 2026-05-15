import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface UiState {
  isChatOpen: boolean
  isChatMinimized: boolean
  isTyping: boolean
  agentIsTyping: boolean
  unreadCount: number
  isAliasModalOpen: boolean
  isMoodCheckInOpen: boolean
  isEndSessionModalOpen: boolean
  openChat: () => void
  closeChat: () => void
  minimizeChat: () => void
  maximizeChat: () => void
  setIsTyping: (val: boolean) => void
  setAgentIsTyping: (val: boolean) => void
  incrementUnread: () => void
  resetUnread: () => void
  openAliasModal: () => void
  closeAliasModal: () => void
  openMoodCheckIn: () => void
  closeMoodCheckIn: () => void
  openEndSessionModal: () => void
  closeEndSessionModal: () => void
}

export const useUiStore = create<UiState>()(
  devtools(
    (set) => ({
      isChatOpen: false,
      isChatMinimized: false,
      isTyping: false,
      agentIsTyping: false,
      unreadCount: 0,
      isAliasModalOpen: false,
      isMoodCheckInOpen: false,
      isEndSessionModalOpen: false,

      openChat: () => set({ isChatOpen: true, isChatMinimized: false }, false, 'uiStore/openChat'),
      closeChat: () => set({ isChatOpen: false, isChatMinimized: false }, false, 'uiStore/closeChat'),
      minimizeChat: () => set({ isChatMinimized: true }, false, 'uiStore/minimizeChat'),
      maximizeChat: () => set({ isChatMinimized: false }, false, 'uiStore/maximizeChat'),

      setIsTyping: (val) => set({ isTyping: val }, false, 'uiStore/setIsTyping'),
      setAgentIsTyping: (val) => set({ agentIsTyping: val }, false, 'uiStore/setAgentIsTyping'),

      incrementUnread: () =>
        set((state) => ({ unreadCount: state.unreadCount + 1 }), false, 'uiStore/incrementUnread'),
      resetUnread: () => set({ unreadCount: 0 }, false, 'uiStore/resetUnread'),

      openAliasModal: () => set({ isAliasModalOpen: true }, false, 'uiStore/openAliasModal'),
      closeAliasModal: () => set({ isAliasModalOpen: false }, false, 'uiStore/closeAliasModal'),

      openMoodCheckIn: () => set({ isMoodCheckInOpen: true }, false, 'uiStore/openMoodCheckIn'),
      closeMoodCheckIn: () => set({ isMoodCheckInOpen: false }, false, 'uiStore/closeMoodCheckIn'),

      openEndSessionModal: () => set({ isEndSessionModalOpen: true }, false, 'uiStore/openEndSessionModal'),
      closeEndSessionModal: () => set({ isEndSessionModalOpen: false }, false, 'uiStore/closeEndSessionModal'),
    }),
    { name: 'uiStore' }
  )
)
