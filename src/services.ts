import { PersistenceService } from './PersistenceService.ts'
import { ZIndexService } from './ZIndexService.ts'

let initialZIndex = localStorage.getItem('nextZIndex')
if (initialZIndex) {
  initialZIndex = parseInt(initialZIndex, 10)
}
export const zIndexService = new ZIndexService(initialZIndex)

export const persistenceService = new PersistenceService()
