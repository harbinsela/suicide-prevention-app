# Suicide Prevention Chat — Zustand Implementation Plan

> This document is the complete briefing for building this project.
> Read this fully before writing any code.

---

## Project Overview

A React + TypeScript frontend for a suicide prevention awareness website.
The primary purpose of this app (beyond the cause) is to **demonstrate Zustand state management** in a meaningful, realistic context.

The site has a calm landing page that leads users directly into a chat interface.
The chat is the main feature — everything on the landing page points toward it.

**Stack:**
- React + TypeScript (Vite)
- Zustand for all state management
- CSS Modules or Tailwind (your choice, Tailwind preferred)
- No backend — simulate agent responses with setTimeout

---

## Project Folder Structure

```
src/
├── store/
│   ├── chatStore.ts
│   ├── sessionStore.ts
│   ├── uiStore.ts
│   └── resourceStore.ts
│
├── components/
│   ├── LandingPage/
│   │   ├── Hero.tsx
│   │   ├── ResourceBar.tsx
│   │   └── OpenChatButton.tsx
│   ├── Chat/
│   │   ├── ChatWindow.tsx
│   │   ├── MessageList.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── TypingIndicator.tsx
│   │   ├── InputBar.tsx
│   │   └── ChatHeader.tsx
│   └── Shared/
│       ├── AliasModal.tsx
│       ├── MoodCheckIn.tsx
│       ├── ResourcePanel.tsx
│       └── EndSessionModal.tsx
│
├── types/
│   └── index.ts
│
├── App.tsx
└── main.tsx
```

---

## Types (types/index.ts)

Define these interfaces before building stores:

```ts
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
```

---

## Zustand Stores

### 1. `chatStore.ts`
Manages all messages and chat loading state.

**State:**
```ts
messages: Message[]
isLoading: boolean
error: string | null
```

**Actions:**
```ts
addMessage: (text: string, sender: Message['sender']) => void
setLoading: (val: boolean) => void
setError: (msg: string | null) => void
clearMessages: () => void
```

**Notes:**
- `addMessage` should auto-generate `id` (use `crypto.randomUUID()`) and `timestamp`
- On mount, initialize with one system message: *"You are safe here. A support person will be with you shortly."*
- Do NOT persist messages (privacy — intentional)

---

### 2. `sessionStore.ts`
Manages the anonymous user session.

**State:**
```ts
sessionId: string
alias: string | null
mood: Mood | null
sessionStartTime: Date | null
```

**Actions:**
```ts
setAlias: (name: string) => void
setMood: (mood: Mood) => void
startSession: () => void
resetSession: () => void
```

**Notes:**
- `sessionId` generated with `crypto.randomUUID()` on `startSession()`
- Persist `alias` and `mood` to localStorage using Zustand `persist` middleware
- `resetSession` wipes alias and mood, generates a new sessionId

---

### 3. `uiStore.ts`
Manages all visual/interaction state.

**State:**
```ts
isChatOpen: boolean
isChatMinimized: boolean
isTyping: boolean
agentIsTyping: boolean
unreadCount: number
isAliasModalOpen: boolean
isMoodCheckInOpen: boolean
isEndSessionModalOpen: boolean
```

**Actions:**
```ts
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
```

---

### 4. `resourceStore.ts`
Manages crisis resources and the resource panel.

**State:**
```ts
resources: Resource[]
isPanelOpen: boolean
activeTopic: 'crisis-lines' | 'therapy' | 'self-help' | null
dismissedBanners: string[]
suggestedResources: Resource[]
```

**Actions:**
```ts
openPanel: (topic?: resourceStore['activeTopic']) => void
closePanel: () => void
dismissBanner: (id: string) => void
setSuggestedResources: (mood: Mood) => void
```

**Notes:**
- Hardcode 4–6 realistic resource objects (fake phone numbers are fine)
- `setSuggestedResources` filters resources based on mood:
  - `crisis` mood → show only crisis-line resources
  - `sad` / `anxious` → show therapy + self-help
  - `okay` / `great` → show self-help only

---

## User Flow (implement in this order)

### Step 1 — Landing Page
- Calm full-screen hero with a soft background (blue/green palette)
- Tagline: *"You are not alone. Help is here."*
- A thin top bar with 1–2 crisis hotline numbers (reads from resourceStore)
- One large centered button: **"Talk to Someone"**
- Clicking it fires: `uiStore.openChat()` → `uiStore.openAliasModal()`

### Step 2 — Alias Modal
- Appears over landing page
- Input field: *"Choose a name or leave blank to stay anonymous"*
- Confirm button fires: `sessionStore.setAlias()` → `uiStore.closeAliasModal()` → `uiStore.openMoodCheckIn()`

### Step 3 — Mood Check-In
- 5 emoji options: 😊 🙂 😔 😰 🆘
- Maps to Mood type values
- Selecting one fires: `sessionStore.setMood()` → `resourceStore.setSuggestedResources()` → `uiStore.closeMoodCheckIn()` → `sessionStore.startSession()` → chat window fully opens

### Step 4 — Chat Window
- Renders over or beside landing page (slide-in from right or centered modal)
- Header: shows alias (or "Anonymous"), session active indicator
- Message list: maps over `chatStore.messages[]`
- Typing indicator: shows animated dots when `uiStore.agentIsTyping === true`
- Input bar: controlled input, on submit calls `chatStore.addMessage()` then simulates agent response

### Step 5 — Simulated Agent Response
After user sends a message:
1. `chatStore.setLoading(true)`
2. `uiStore.setAgentIsTyping(true)`
3. `setTimeout` 1500–2500ms
4. `uiStore.setAgentIsTyping(false)`
5. `chatStore.addMessage(simulatedReply, 'agent')`
6. `chatStore.setLoading(false)`
7. If chat is minimized: `uiStore.incrementUnread()`

Hardcode 5–8 rotating supportive responses. Keep them warm and non-clinical.

### Step 6 — Minimize / Unread Badge
- Minimize button in chat header fires `uiStore.minimizeChat()`
- Minimized state shows a floating bubble bottom-right with unread badge
- Reopening fires `uiStore.maximizeChat()` + `uiStore.resetUnread()`

### Step 7 — Resource Panel
- Button in chat: "Resources" → fires `resourceStore.openPanel()`
- Side panel slides in showing `resourceStore.suggestedResources`
- Each resource card has title, phone, optional link

### Step 8 — End Session
- Button in chat header: "End Session"
- Fires `uiStore.openEndSessionModal()`
- Modal: *"Are you sure? Your chat will be cleared for your privacy."*
- Confirm fires:
  - `chatStore.clearMessages()`
  - `sessionStore.resetSession()`
  - `uiStore.closeChat()`
  - `resourceStore.closePanel()`

---

## Zustand Specific Requirements

- Use `create` from `zustand` for all stores
- Use `persist` middleware from `zustand/middleware` for `sessionStore` only
- Keep stores in separate files — do not combine them
- Use selectors when subscribing in components:
  ```ts
  // Good
  const messages = useChatStore((state) => state.messages)
  
  // Avoid
  const store = useChatStore()
  ```
- This demonstrates that components only re-render when their specific slice changes

---

## Design Guidelines

- Color palette: soft blues and greens, white backgrounds, gentle shadows
- No harsh reds except for the crisis/emergency resource highlights
- Font: Inter or system-ui
- Chat bubbles: user messages right-aligned (blue), agent messages left-aligned (white/gray)
- System messages centered in muted gray italic
- All transitions should be smooth (CSS transitions, not jarring)
- Mobile-aware layout (the chat should work on a narrow screen)

---

## What NOT to build

- No backend, no real API calls
- No authentication
- No routing (single page is fine, or two routes at most: `/` and `/chat`)
- No real personal data storage
- No testing setup needed

---

## Order of Implementation (recommended)

1. Set up types (`types/index.ts`)
2. Build all 4 Zustand stores
3. Build `LandingPage` components
4. Build `AliasModal` + `MoodCheckIn`
5. Build `ChatWindow` shell
6. Build `MessageList` + `MessageBubble`
7. Build `InputBar` + wire up agent simulation
8. Build `TypingIndicator`
9. Build `ChatHeader` + minimize/unread logic
10. Build `ResourcePanel`
11. Build `EndSessionModal`
12. Polish styles and transitions

---

*End of implementation plan.*
