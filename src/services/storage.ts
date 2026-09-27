import type { DepartmentExperience } from '../models/department'

const STORAGE_KEY = 'mi-colombia-experiences-v1'

export function loadExperiences(): Record<string, DepartmentExperience> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return {}

    const experiences = JSON.parse(stored) as Record<string, { status?: string }>
    return Object.fromEntries(Object.entries(experiences).map(([id, experience]) => [
      id,
      { ...experience, status: experience.status === 'explored' ? 'visited' : experience.status === 'visited' ? 'visited' : 'pending' },
    ]))
  } catch {
    return {}
  }
}

export function saveExperiences(experiences: Record<string, DepartmentExperience>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(experiences))
}
