# 🌿 Hope Line — Suicide Prevention Support Chat

A frontend application built with **React + TypeScript**, designed as both a meaningful cause and a hands-on demonstration of **Zustand** state management in a real-world context.

The app simulates a suicide prevention support platform where users can anonymously connect with a support agent. The entire experience — from landing page to live chat to session management — is driven by a carefully architected **four-store Zustand system**, making it an ideal project for understanding modern React state management beyond useState and useContext.

---

## 🧠 What This Project Demonstrates

This app was built specifically to showcase **Zustand fundamentals in a meaningful, production-like context**. Every interaction the user takes fires a traceable state change across one or more stores — making the data flow visible, intentional, and educational.

- **Global state without prop drilling** — components across the entire tree read and write to shared stores directly, with zero props passed between them
- **Selector-based subscriptions** — every component subscribes only to the exact slice it needs, preventing unnecessary re-renders
- **Separation of concerns** — state is split across four independent stores, each owning a single domain
- **Middleware usage** — the `persist` middleware saves session identity to localStorage, and `devtools` middleware connects all four stores to Redux DevTools for full action logging and time-travel debugging
- **Actions and derived state** — stores handle their own logic, keeping components dumb and stores smart

---

## 🗂️ The Four Zustand Stores

| Store | Responsibility |
|---|---|
| `uiStore` | All visibility state — chat open/minimized, modals, typing indicators, unread badge |
| `chatStore` | Message array, loading state, agent simulation, session reset |
| `sessionStore` | Anonymous alias, mood, session ID — partially persisted to localStorage |
| `resourceStore` | Crisis resources, panel state, mood-based filtering of suggested resources |

---

## ✨ Features

- 🏠 **Calm landing page** with animated background orbs, stats, and a single focused CTA
- 👤 **Anonymous alias flow** — users choose a name or stay anonymous before entering the chat
- 🌱 **Mood check-in** — five mood options that intelligently filter which resources are suggested
- 💬 **Live chat interface** — message bubbles, typing indicator with bounce animation, auto-scroll
- 📋 **Resource panel** — slides in from the chat header, shows crisis lines, therapy, and self-help resources filtered by the user's mood
- 🔔 **Unread badge** — minimizing the chat while an agent response arrives increments a live counter on the floating bubble
- 🔒 **End session flow** — clears all messages and resets session state with a confirmation modal, respecting user privacy
- 💾 **Session persistence** — alias and mood survive page refresh via Zustand's persist middleware

---

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Vite** for development and bundling
- **Zustand** for all state management
- **Vanilla CSS** with CSS custom properties and a warm sage/indigo design palette
- **DM Sans** + **DM Serif Display** typography
- **Redux DevTools** integration via Zustand devtools middleware

---

## 📁 Project Structure

```
src/
├── store/          # Four Zustand stores — the heart of the app
├── components/
│   ├── Chat/       # ChatWindow, MessageList, InputBar, TypingIndicator, ChatHeader
│   ├── LandingPage/# Hero, ResourceBar, OpenChatButton
│   └── Shared/     # AliasModal, MoodCheckIn, EndSessionModal, ResourcePanel
└── types/          # Shared TypeScript interfaces — Message, Resource, Mood
```

---

## 🚀 Getting Started

```bash
git clone https://github.com/harbinsela/suicide-prevention-app.git
cd suicide-prevention-app
npm install
npm run dev
```

---

*Built as a Zustand learning project with a purpose — because good software can start with a meaningful idea.*
