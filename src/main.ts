import './style.css'
import { forEach2D, getAdjacentValues2D, make2DArray, map2D, pickRandomCell2D } from './array-utils.ts'
import { Tile } from './tile.ts'
import { makeTileView } from './tile-view.ts'

function setup () {
  const fieldSize = 10
  const numMines = 10

  if (numMines > fieldSize * fieldSize) {
    console.error('Too many mines for the field!')
    return
  }

  // Generate a minefield
  const mineField = make2DArray(fieldSize, fieldSize, false)

  // Populate with mines
  for (let i = 0; i < numMines; i++) {
    const [x, y] = pickRandomCell2D(mineField, hasMine => !hasMine)
    mineField[x][y] = true
  }

  // Create tiles from minefield.
  const mineFieldTiles = map2D(mineField, isMine => new Tile(isMine))

  // Hook up all neighbouring tiles.
  forEach2D(mineFieldTiles, (tile, [x, y]) => {
    for (const neighbour of getAdjacentValues2D(mineFieldTiles, x, y)) {
      tile.addAdjacentTile(neighbour)
    }
  })

  let safeCount = fieldSize * fieldSize - numMines

  const mineRevealHandler = () => {
    document.body.classList.add('lost')
    enableReloadOnClick()
  }

  const safeRevealHandler = () => {
    safeCount--
    if (safeCount <= 0) {
      document.body.classList.add('won')
      enableReloadOnClick()
    }
  }

  // Lose when we click a mine.
  forEach2D(mineFieldTiles, tile => tile.onReveal.add(tile.isMine ? mineRevealHandler : safeRevealHandler))

  const root = document.createElement('div')
  root.classList.add('field')

  // Create the actual visual tiles.
  for (let x = 0; x < mineFieldTiles.length; x++) {
    const row = document.createElement('div')
    for (let y = 0; y < mineFieldTiles[x].length; y++) {
      row.appendChild(makeTileView(mineFieldTiles[x][y]))
    }
    root.appendChild(row)
  }

  document.querySelector<HTMLDivElement>('#app')!.appendChild(root)
}

setup()


function enableReloadOnClick() {
  setTimeout(() => document.addEventListener('click', () => window.location.reload()), 10)
}
