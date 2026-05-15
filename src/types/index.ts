export type Mood = 'great' | 'okay' | 'sad' | 'anxious' | 'crisis'

export interface Message {
  id: string
  text: string
  sender: 'user' | 'agent' | 'system'
  timestamp: Date
}

export interface Resource {
  id: string
  title: string
  phone?: string
  url?: string
  category: 'crisis' | 'therapy' | 'self-help'
}
