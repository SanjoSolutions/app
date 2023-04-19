import { determineLocalStorageKey } from './determineLocalStorageKey.js'

export class PersistenceService {
  loadBox(id) {
    const serializedInfo = localStorage.getItem(determineLocalStorageKey(id))
    if (serializedInfo) {
      const info = JSON.parse(serializedInfo)
      return info
    } else {
      return null
    }
  }

  saveBox(box) {
    localStorage.setItem(
      determineLocalStorageKey(box.id),
      JSON.stringify(box),
    )
  }
}
