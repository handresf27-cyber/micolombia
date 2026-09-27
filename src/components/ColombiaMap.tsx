import { useEffect, useState } from 'react'
import { geoMercator, geoPath } from 'd3-geo'
import type { FeatureCollection, Geometry } from 'geojson'
import { departments } from '../data/departments'
import type { DepartmentExperience, DepartmentProperties, DepartmentStatus } from '../models/department'

type Props = {
  experiences: Record<string, DepartmentExperience>
  selectedId: string | null
  onSelect: (id: string) => void
}

const WIDTH = 760
const HEIGHT = 650
const departmentById = Object.fromEntries(departments.map((department) => [department.id, department]))
const SAN_ANDRES_ID = '88'
type DrawnDepartment = { id: string; name: string; flagCode: string; path: string }

export function ColombiaMap({ experiences, selectedId, onSelect }: Props) {
  const [features, setFeatures] = useState<DrawnDepartment[]>([])
  const [sanAndres, setSanAndres] = useState<DrawnDepartment | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/geo/colombia-departamentos.geojson')
      .then((response) => {
        if (!response.ok) throw new Error('No se pudo cargar el mapa')
        return response.json() as Promise<FeatureCollection<Geometry, DepartmentProperties>>
      })
      .then((data) => {
        const mainland = data.features.filter((feature) => feature.properties.dpto_ccdgo !== SAN_ANDRES_ID)
        const archipelago = data.features.find((feature) => feature.properties.dpto_ccdgo === SAN_ANDRES_ID)
        const collection: FeatureCollection<Geometry, DepartmentProperties> = { type: 'FeatureCollection', features: mainland }
        // Keep a dedicated left column for the archipelago inset.
        const projection = geoMercator().fitExtent([[205, 26], [WIDTH - 24, HEIGHT - 24]], collection)
        const makePath = geoPath(projection)
        setFeatures(mainland.flatMap((feature) => {
          const department = departmentById[feature.properties.dpto_ccdgo]
          return department ? [{ ...department, path: makePath(feature) ?? '' }] : []
        }))

        if (archipelago) {
          // Enlarge the remote islands so they remain legible at the same scale as the mainland.
          const islandProjection = geoMercator().fitExtent([[30, 68], [184, 238]], archipelago)
          const department = departmentById[SAN_ANDRES_ID]
          setSanAndres({ ...department, path: geoPath(islandProjection)(archipelago) ?? '' })
        }
      })
      .catch(() => setError(true))
  }, [])

  if (error) return <div className="map-message">No se pudo cargar el mapa local. Recarga la página para intentarlo de nuevo.</div>

  return (
    <div className="map-wrap">
      {!features.length && <div className="map-loading">Preparando el mapa…</div>}
      <svg className="colombia-map" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="group" aria-label="Mapa interactivo de los departamentos de Colombia">
        <defs>
        <pattern id="map-dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#d7e4d7" />
        </pattern>
        {departments.map((department) => (
          <pattern key={department.flagCode} id={`flag-${department.flagCode}`} patternUnits="objectBoundingBox" patternContentUnits="objectBoundingBox" width="1" height="1">
            <image href={`${import.meta.env.BASE_URL}flags/${department.flagCode}.svg`} x="0" y="0" width="1" height="1" preserveAspectRatio="none" />
          </pattern>
        ))}
        </defs>
        <rect width={WIDTH} height={HEIGHT} fill="url(#map-dots)" opacity=".45" />
        {features.map((feature) => {
          const status: DepartmentStatus = experiences[feature.id]?.status ?? 'pending'
          return (
            <path
              key={feature.id}
              d={feature.path}
              fill={status === 'visited' ? `url(#flag-${feature.flagCode})` : undefined}
              className={`department-shape status-${status}${selectedId === feature.id ? ' is-selected' : ''}`}
              onClick={() => onSelect(feature.id)}
              tabIndex={0}
              role="button"
              aria-label={`${feature.name}, ${status === 'visited' ? 'visitado' : 'pendiente'}`}
              onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onSelect(feature.id) }}
            >
              <title>{feature.name.replace('ARCHIPIÉLAGO DE ', '').replace(', PROVIDENCIA Y SANTA CATALINA', '')}</title>
            </path>
          )
        })}
        {sanAndres && <g className="island-inset">
          <rect className="island-inset-frame" x="14" y="16" width="190" height="250" rx="9" />
          <text className="island-inset-label" x="26" y="38">SAN ANDRÉS · PROVIDENCIA</text>
          <text className="island-inset-note" x="26" y="53">AMPLIADO · NO A ESCALA</text>
          <path
            d={sanAndres.path}
            fill={experiences[SAN_ANDRES_ID]?.status === 'visited' ? `url(#flag-${sanAndres.flagCode})` : undefined}
            className={`department-shape status-${experiences[SAN_ANDRES_ID]?.status ?? 'pending'}${selectedId === SAN_ANDRES_ID ? ' is-selected' : ''}`}
            onClick={() => onSelect(SAN_ANDRES_ID)}
            tabIndex={0}
            role="button"
            aria-label={`Archipiélago de San Andrés, Providencia y Santa Catalina, ${experiences[SAN_ANDRES_ID]?.status === 'visited' ? 'visitado' : 'pendiente'}`}
            onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onSelect(SAN_ANDRES_ID) }}
          >
            <title>Archipiélago de San Andrés, Providencia y Santa Catalina</title>
          </path>
        </g>}
      </svg>
    </div>
  )
}
