export class ZIndexService {
  #nextZIndex: number

  constructor(initialZIndex) {
    this.nextZIndex = initialZIndex || 1
  }

  receiveNextZIndex(): number {
    const zIndex = this.nextZIndex
    this.nextZIndex++
    localStorage.setItem('nextZIndex', this.nextZIndex)
    return zIndex
  }
}
