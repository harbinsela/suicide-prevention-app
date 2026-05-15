import { useResourceStore } from '../../store/resourceStore'

export function ResourceBar() {
  const resources = useResourceStore((state) => state.resources)
  const crisisLines = resources.filter((r) => r.category === 'crisis').slice(0, 2)

  return (
    <div className="resource-bar" role="banner">
      <span className="resource-bar__label">🆘 Crisis support available 24/7:</span>
      {crisisLines.map((r) => (
        <span key={r.id} className="resource-bar__item">
          <strong>{r.title}:</strong>{' '}
          <a href={`tel:${r.phone}`} className="resource-bar__link">
            {r.phone}
          </a>
        </span>
      ))}
    </div>
  )
}
