export type DepartmentStatus = 'pending' | 'visited' | 'explored'

export interface DepartmentExperience {
  status: DepartmentStatus
}

export interface DepartmentProperties {
  dpto_ccdgo: string
  dpto_cnmbr: string
}

export interface Department {
  id: string
  name: string
  shortName?: string
}

export const STATUS_LABELS: Record<DepartmentStatus, string> = {
  pending: 'Pendiente',
  visited: 'Visitado',
  explored: 'Explorado',
}
