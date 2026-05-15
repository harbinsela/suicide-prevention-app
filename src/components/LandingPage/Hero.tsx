import { ResourceBar } from './ResourceBar'
import { OpenChatButton } from './OpenChatButton'

export function Hero() {
  return (
    <div className="hero-page">
      <ResourceBar />

      <main className="hero-content" id="main-content">
        <div className="hero-badge">Safe & Confidential</div>

        <h1 className="hero-title">
          You are not alone.
          <br />
          <span className="hero-title--accent">Help is here.</span>
        </h1>

        <p className="hero-subtitle">
          Whatever you're going through, you don't have to face it by yourself.
          <br />
          A compassionate support person is ready to listen — any time, any day.
        </p>

        <OpenChatButton />

        <p className="hero-note">
          Your conversation is anonymous and private. Nothing is stored.
        </p>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat__number">24/7</span>
            <span className="hero-stat__label">Available</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat__number">100%</span>
            <span className="hero-stat__label">Anonymous</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat__number">Free</span>
            <span className="hero-stat__label">Always</span>
          </div>
        </div>
      </main>

      <div className="hero-orb hero-orb--1" aria-hidden="true" />
      <div className="hero-orb hero-orb--2" aria-hidden="true" />
      <div className="hero-orb hero-orb--3" aria-hidden="true" />
    </div>
  )
}
