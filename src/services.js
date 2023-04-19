import { PersistenceService } from './PersistenceService.js'
import { ZIndexService } from './ZIndexService.js'

let initialZIndex = localStorage.getItem('nextZIndex')
if (initialZIndex) {
  initialZIndex = parseInt(initialZIndex, 10)
}
export const zIndexService = new ZIndexService(initialZIndex)

export const persistenceService = new PersistenceService()
