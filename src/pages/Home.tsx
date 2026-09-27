import { useMemo, useState } from 'react'
import { ColombiaMap } from '../components/ColombiaMap'
import { DepartmentPanel } from '../components/DepartmentPanel'
import { departments } from '../data/departments'
import { useDepartmentExperience } from '../hooks/useDepartmentExperience'
import type { DepartmentStatus } from '../models/department'

const STATUS_CARDS: { key: DepartmentStatus; label: string; tone: string }[] = [
  { key: 'visited', label: 'Visitados', tone: 'gold' }, { key: 'pending', label: 'Pendientes', tone: 'stone' },
]

export function Home() {
  const { experiences, setStatus } = useDepartmentExperience()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const counts = useMemo(() => {
    const visited = Object.values(experiences).filter((item) => item.status === 'visited').length
    return { visited, pending: departments.length - visited, known: visited }
  }, [experiences])
  const percentage = Math.round((counts.known / departments.length) * 100)
  const selected = departments.find((department) => department.id === selectedId)

  return <main className="app-shell">
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Mi Colombia, inicio"><span className="brand-sun">✳</span><span>mi<span className="brand-light">colombia</span></span></a>
      <div className="header-center"><span className="header-line" /> UN DIARIO DE VIAJE PERSONAL <span className="header-line" /></div>
      <div className="header-right"><span className="flag-mark"><i /><i /><i /></span><span>COLOMBIA</span></div>
    </header>
    <section className="hero" id="top">
      <div className="hero-copy"><p className="eyebrow"><span className="eyebrow-star">✳</span> MI MAPA PERSONAL</p><h1>Un país.<br /><em>Mil historias.</em></h1><p className="hero-description">Mi recorrido por Colombia, departamento por departamento.</p></div>
      <div className="hero-progress"><div className="progress-heading"><span>COLOMBIA CONOCIDA</span><span className="progress-number">{percentage}<small>%</small></span></div><div className="progress-track"><div className="progress-fill" style={{ width: `${percentage}%` }} /></div><p><strong>{counts.known} de 32</strong> departamentos en mi historia</p></div>
    </section>
    <section className="stats-row" aria-label="Resumen de departamentos">
      {STATUS_CARDS.map(({ key, label, tone }) => (
        <div className={`stat-card ${tone}`} key={key}>
          <span className="stat-icon">{key === 'visited' ? '⚑' : '○'}</span>
          <div><span className="stat-label">{label}</span><strong>{counts[key].toString().padStart(2, '0')}</strong></div>
          {key !== 'pending' && <span className="stat-caption">departamentos</span>}
        </div>
      ))}
      <div className="quote-card"><span>“</span><p>Cada lugar deja algo<br />de sí en el camino.</p><i>— MI COLOMBIA</i></div>
    </section>
    <section className="explore-section"><div className="section-heading"><div><p className="eyebrow">EXPLORA EL MAPA</p><h2>¿Dónde empieza tu historia?</h2></div><p className="map-hint"><span className="hint-dot" /> Selecciona un departamento</p></div>
      <div className="map-layout"><div className="map-card"><div className="map-card-header"><span>COLOMBIA</span><span>32 DEPARTAMENTOS <i>·</i> 1 HISTORIA</span></div><ColombiaMap experiences={experiences} selectedId={selectedId} onSelect={setSelectedId} /><div className="map-legend"><span className="legend-title">MI LEYENDA</span><span><i className="legend-swatch pending" /> Pendiente</span><span><i className="legend-flag">⚑</i> Visitado · su bandera</span></div><span className="map-watermark">✳</span></div>
        <DepartmentPanel department={selected} experience={selectedId ? experiences[selectedId] : undefined} onStatusChange={setStatus} onClose={() => setSelectedId(null)} /></div>
    </section>
    <footer className="site-footer"><span>HECHO PARA RECORDAR EL CAMINO <i>✳</i></span><span>32 DEPARTAMENTOS · INFINITAS HISTORIAS</span></footer>
  </main>
}
