export class ZIndexService {
  #nextZIndex: number

  constructor(initialZIndex: number = 1) {
    this.#nextZIndex = initialZIndex
  }

  receiveNextZIndex(): number {
    const zIndex = this.#nextZIndex
    this.#nextZIndex++
    localStorage.setItem("nextZIndex", String(this.#nextZIndex))
    return zIndex
  }
}
