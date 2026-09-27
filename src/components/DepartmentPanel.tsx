import type { Department, DepartmentExperience, DepartmentStatus } from '../models/department'
import { STATUS_LABELS } from '../models/department'

type Props = {
  department: Department | undefined
  experience: DepartmentExperience | undefined
  onStatusChange: (id: string, status: DepartmentStatus) => void
  onClose: () => void
}

export function DepartmentPanel({ department, experience, onStatusChange, onClose }: Props) {
  if (!department) return (
    <aside className="detail-panel empty-panel">
      <div className="empty-icon">⌖</div>
      <p className="eyebrow">TU PRÓXIMO DESTINO</p>
      <h2>Elige un departamento</h2>
      <p className="muted">Toca una región del mapa para comenzar a escribir tu historia allí.</p>
      <div className="panel-footnote"><span className="tiny-sparkle">✳</span> Cada viaje empieza con un primer paso.</div>
    </aside>
  )

  const status = experience?.status ?? 'pending'
  return (
    <aside className="detail-panel">
      <div className="panel-topline"><span className="eyebrow">DIARIO DE VIAJE</span><button className="icon-button mobile-close" aria-label="Cerrar detalle" onClick={onClose}>×</button></div>
      <div className={`department-emblem status-${status}`}><span>{department.name.slice(0, 1)}</span><i>✳</i></div>
      <div className="department-heading">
        <p className="eyebrow">DEPARTAMENTO · COLOMBIA</p>
        <h2>{department.name}</h2>
      </div>
      <div className={`status-pill status-${status}`}><span className="status-dot" />{STATUS_LABELS[status]}</div>
      <div className="panel-divider" />
      <p className="field-label">¿Cómo ha sido tu recorrido?</p>
      <div className="status-options" role="group" aria-label="Estado del departamento">
        {(['pending', 'visited', 'explored'] as DepartmentStatus[]).map((option) => (
          <button key={option} onClick={() => onStatusChange(department.id, option)} className={`status-option ${status === option ? 'active' : ''} option-${option}`} aria-pressed={status === option}>
            <span className="option-mark">{option === 'pending' ? '○' : option === 'visited' ? '◒' : '✳'}</span>
            <span>{STATUS_LABELS[option]}</span>
            {status === option && <span className="option-check">✓</span>}
          </button>
        ))}
      </div>
      <div className="note-card">
        <span className="note-icon">✎</span>
        <div><strong>Un lugar para tus recuerdos</strong><p>Pronto podrás guardar fechas, fotografías y momentos especiales.</p></div>
      </div>
      <div className="panel-footnote"><span className="tiny-sparkle">✳</span> Tu historia, a tu ritmo.</div>
    </aside>
  )
}
