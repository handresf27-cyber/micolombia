import { useEffect, useState } from 'react'
import { geoMercator, geoPath } from 'd3-geo'
import type { FeatureCollection, Geometry } from 'geojson'
import type { DepartmentExperience, DepartmentProperties, DepartmentStatus } from '../models/department'

type Props = {
  experiences: Record<string, DepartmentExperience>
  selectedId: string | null
  onSelect: (id: string) => void
}

const WIDTH = 760
const HEIGHT = 650

export function ColombiaMap({ experiences, selectedId, onSelect }: Props) {
  const [features, setFeatures] = useState<{ id: string; name: string; path: string }[]>([])
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/geo/colombia-departamentos.geojson')
      .then((response) => {
        if (!response.ok) throw new Error('No se pudo cargar el mapa')
        return response.json() as Promise<FeatureCollection<Geometry, DepartmentProperties>>
      })
      .then((data) => {
        const collection: FeatureCollection<Geometry, DepartmentProperties> = { type: 'FeatureCollection', features: data.features }
        const projection = geoMercator().fitExtent([[28, 28], [WIDTH - 28, HEIGHT - 28]], collection)
        const makePath = geoPath(projection)
        setFeatures(data.features.map((feature) => ({
          id: feature.properties.dpto_ccdgo,
          name: feature.properties.dpto_cnmbr,
          path: makePath(feature) ?? '',
        })))
      })
      .catch(() => setError(true))
  }, [])

  if (error) return <div className="map-message">No se pudo cargar el mapa local. Recarga la página para intentarlo de nuevo.</div>

  return (
    <div className="map-wrap">
      {!features.length && <div className="map-loading">Preparando el mapa…</div>}
      <svg className="colombia-map" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label="Mapa interactivo de los departamentos de Colombia">
        <defs>
          <pattern id="map-dots" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#d7e4d7" />
          </pattern>
        </defs>
        <rect width={WIDTH} height={HEIGHT} fill="url(#map-dots)" opacity=".45" />
        {features.map((feature) => {
          const status: DepartmentStatus = experiences[feature.id]?.status ?? 'pending'
          return (
            <path
              key={feature.id}
              d={feature.path}
              className={`department-shape status-${status}${selectedId === feature.id ? ' is-selected' : ''}`}
              onClick={() => onSelect(feature.id)}
              tabIndex={0}
              role="button"
              aria-label={`${feature.name}, ${status === 'pending' ? 'pendiente' : status === 'visited' ? 'visitado' : 'explorado'}`}
              onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onSelect(feature.id) }}
            >
              <title>{feature.name.replace('ARCHIPIÉLAGO DE ', '').replace(', PROVIDENCIA Y SANTA CATALINA', '')}</title>
            </path>
          )
        })}
      </svg>
    </div>
  )
}
