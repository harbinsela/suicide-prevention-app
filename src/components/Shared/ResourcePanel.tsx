import { useResourceStore } from '../../store/resourceStore'

export function ResourcePanel() {
  const isPanelOpen = useResourceStore((state) => state.isPanelOpen)
  const suggestedResources = useResourceStore((state) => state.suggestedResources)
  const resources = useResourceStore((state) => state.resources)
  const activeTopic = useResourceStore((state) => state.activeTopic)
  const closePanel = useResourceStore((state) => state.closePanel)

  if (!isPanelOpen) return null

  // Show suggested or all resources based on activeTopic
  const displayResources = suggestedResources.length > 0 ? suggestedResources : resources

  const filtered = activeTopic
    ? resources.filter((r) => {
        if (activeTopic === 'crisis-lines') return r.category === 'crisis'
        if (activeTopic === 'therapy') return r.category === 'therapy'
        if (activeTopic === 'self-help') return r.category === 'self-help'
        return true
      })
    : displayResources

  const categoryLabel = {
    crisis: '🆘 Crisis',
    therapy: '🧠 Therapy',
    'self-help': '🌿 Self-Help',
  }

  return (
    <aside className="resource-panel" aria-label="Support resources">
      <div className="resource-panel__header">
        <h3 className="resource-panel__title">Support Resources</h3>
        <button
          id="close-panel-btn"
          className="resource-panel__close"
          onClick={closePanel}
          type="button"
          aria-label="Close resource panel"
        >
          ✕
        </button>
      </div>

      {suggestedResources.length > 0 && (
        <p className="resource-panel__hint">
          ✨ Based on how you're feeling, here are some resources that may help:
        </p>
      )}

      <div className="resource-panel__list">
        {filtered.map((resource) => (
          <div key={resource.id} className={`resource-card resource-card--${resource.category}`}>
            <div className="resource-card__category">
              {categoryLabel[resource.category]}
            </div>
            <h4 className="resource-card__title">{resource.title}</h4>
            {resource.phone && (
              <a
                href={`tel:${resource.phone.replace(/\D/g, '')}`}
                className="resource-card__phone"
              >
                📞 {resource.phone}
              </a>
            )}
            {resource.url && (
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card__link"
              >
                Visit website →
              </a>
            )}
          </div>
        ))}
      </div>
    </aside>
  )
}
