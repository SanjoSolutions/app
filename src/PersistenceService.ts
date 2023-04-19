import { determineLocalStorageKey } from './determineLocalStorageKey.js'
import type { Box } from './core/Box.js'

export class PersistenceService {
  loadBox(id: string): Box | null {
    const serializedInfo = localStorage.getItem(determineLocalStorageKey(id))
    if (serializedInfo) {
      const info = JSON.parse(serializedInfo)
      return info
    } else {
      return null
    }
  }

  saveBox(box: Box): void {
    localStorage.setItem(
      determineLocalStorageKey(box.id),
      JSON.stringify(box),
    )
  }
}
