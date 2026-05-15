import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { Mood, Resource } from '../types'

type ActiveTopic = 'crisis-lines' | 'therapy' | 'self-help' | null

interface ResourceState {
  resources: Resource[]
  isPanelOpen: boolean
  activeTopic: ActiveTopic
  dismissedBanners: string[]
  suggestedResources: Resource[]
  openPanel: (topic?: ActiveTopic) => void
  closePanel: () => void
  dismissBanner: (id: string) => void
  setSuggestedResources: (mood: Mood) => void
}

const RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'National Suicide Prevention Lifeline',
    phone: '988',
    url: 'https://988lifeline.org',
    category: 'crisis',
  },
  {
    id: '2',
    title: 'Crisis Text Line',
    phone: 'Text HOME to 741741',
    url: 'https://www.crisistextline.org',
    category: 'crisis',
  },
  {
    id: '3',
    title: 'SAMHSA Helpline',
    phone: '1-800-662-4357',
    url: 'https://www.samhsa.gov/find-help/national-helpline',
    category: 'crisis',
  },
  {
    id: '4',
    title: 'BetterHelp Online Therapy',
    url: 'https://www.betterhelp.com',
    category: 'therapy',
  },
  {
    id: '5',
    title: 'Mindfulness & Breathing Exercises',
    url: 'https://www.headspace.com',
    category: 'self-help',
  },
  {
    id: '6',
    title: 'Anxiety & Depression Association of America',
    url: 'https://adaa.org',
    category: 'self-help',
  },
]

export const useResourceStore = create<ResourceState>()(
  devtools(
    (set, get) => ({
      resources: RESOURCES,
      isPanelOpen: false,
      activeTopic: null,
      dismissedBanners: [],
      suggestedResources: [],

      openPanel: (topic = null) =>
        set({ isPanelOpen: true, activeTopic: topic }, false, 'resourceStore/openPanel'),

      closePanel: () => set({ isPanelOpen: false, activeTopic: null }, false, 'resourceStore/closePanel'),

      dismissBanner: (id) =>
        set(
          (state) => ({ dismissedBanners: [...state.dismissedBanners, id] }),
          false,
          'resourceStore/dismissBanner'
        ),

      setSuggestedResources: (mood) => {
        const { resources } = get()
        let filtered: Resource[]

        if (mood === 'crisis') {
          filtered = resources.filter((r) => r.category === 'crisis')
        } else if (mood === 'sad' || mood === 'anxious') {
          filtered = resources.filter(
            (r) => r.category === 'therapy' || r.category === 'self-help'
          )
        } else {
          // 'okay' | 'great'
          filtered = resources.filter((r) => r.category === 'self-help')
        }

        set({ suggestedResources: filtered }, false, 'resourceStore/setSuggestedResources')
      },
    }),
    { name: 'resourceStore' }
  )
)
