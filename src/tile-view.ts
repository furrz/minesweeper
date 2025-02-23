import { Tile } from './tile.ts'

export function makeTileView (tile: Tile): HTMLElement {
  const element = document.createElement('div')
  element.classList.add('tile')

  element.classList.add('neighbours-' + tile.adjacentMineCount.toString())
  element.innerText = tile.isMine ? '💣' : (tile.adjacentMineCount == 0 ? '' : tile.adjacentMineCount.toString());

  element.addEventListener('click', e => {
    e.preventDefault()
    tile.reveal()
    return false
  })

  element.addEventListener('contextmenu', e => {
    e.preventDefault()
    tile.isFlagged = !tile.isFlagged
    return false
  })

  tile.onReveal.add(() => {
    element.classList.add('revealed')
  })

  tile.onFlagStateChanged.add(() =>
    tile.isFlagged ? element.classList.add('flagged')
      : element.classList.remove('flagged'))

  return element
}
