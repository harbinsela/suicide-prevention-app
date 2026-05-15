import './index.css'
import { Hero } from './components/LandingPage/Hero'
import { ChatWindow } from './components/Chat/ChatWindow'
import { AliasModal } from './components/Shared/AliasModal'
import { MoodCheckIn } from './components/Shared/MoodCheckIn'
import { EndSessionModal } from './components/Shared/EndSessionModal'

function App() {
  return (
    <>
      <Hero />
      <ChatWindow />
      <AliasModal />
      <MoodCheckIn />
      <EndSessionModal />
    </>
  )
}

export default App
