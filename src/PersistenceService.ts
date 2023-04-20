import type { Box } from './core/Box.js'

export class PersistenceService {
  loadBoxes(): Box[] {
    const serializedInfo = localStorage.getItem('boxes')
    if (serializedInfo) {
      const info = JSON.parse(serializedInfo)
      return info
    } else {
      return []
    }
  }

  saveBoxes(boxes: Box[]): void {
    localStorage.setItem('boxes', JSON.stringify(boxes))
  }
}
