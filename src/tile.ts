import { Observable } from './observable.ts'

export class Tile {
  readonly isMine: boolean = false
  readonly adjacentTiles: Tile[] = []
  #adjacentMineCount: number = 0
  #isRevealed: boolean = false
  #isFlagged: boolean = false

  readonly onReveal = new Observable<() => void>();
  readonly onFlagStateChanged = new Observable<() => void>();

  constructor (isMine: boolean) {
    this.isMine = isMine
  }

  get adjacentMineCount () {
    return this.#adjacentMineCount
  }

  get isRevealed () {
    return this.#isRevealed
  }

  get isFlagged () {
    return this.#isFlagged
  }

  set isFlagged (value: boolean) {
    if (!this.canBeFlagged) return
    this.#isFlagged = value
    this.onFlagStateChanged.invoke()
  }

  get canBeFlagged () {
    return !this.isRevealed
  }

  get canBeRevealed () {
    return !this.isRevealed && !this.isFlagged
  }

  get canBeAutoRevealed () {
    return this.canBeRevealed && !this.isMine
  }

  get canAutoRevealOthers () {
    return !this.isMine && this.adjacentMineCount === 0
  }

  addAdjacentTile (tile: Tile) {
    this.adjacentTiles.push(tile)
    if (tile.isMine) this.#adjacentMineCount++
  }

  reveal () {
    if (!this.canBeRevealed) return

    this.#isRevealed = true

    this.onReveal.invoke()

    if (!this.canAutoRevealOthers) return;

    this.adjacentTiles
      .filter(tile => tile.canBeAutoRevealed)
      .forEach(tile => tile.reveal())
  }

}