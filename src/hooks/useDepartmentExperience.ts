import { useEffect, useState } from 'react'
import type { DepartmentExperience, DepartmentStatus } from '../models/department'
import { loadExperiences, saveExperiences } from '../services/storage'

export function useDepartmentExperience() {
  const [experiences, setExperiences] = useState<Record<string, DepartmentExperience>>(loadExperiences)

  useEffect(() => {
    saveExperiences(experiences)
  }, [experiences])

  function setStatus(id: string, status: DepartmentStatus) {
    setExperiences((current) => ({ ...current, [id]: { status } }))
  }

  return { experiences, setStatus }
}
