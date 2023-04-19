export class ZIndexService {
  constructor(initialZIndex) {
    this.nextZIndex = initialZIndex || 1
  }

  receiveNextZIndex() {
    const zIndex = this.nextZIndex
    this.nextZIndex++
    localStorage.setItem('nextZIndex', this.nextZIndex)
    return zIndex
  }
}
