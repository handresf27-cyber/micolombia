import type { DepartmentExperience } from '../models/department'

const STORAGE_KEY = 'mi-colombia-experiences-v1'

export function loadExperiences(): Record<string, DepartmentExperience> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) as Record<string, DepartmentExperience> : {}
  } catch {
    return {}
  }
}

export function saveExperiences(experiences: Record<string, DepartmentExperience>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(experiences))
}
