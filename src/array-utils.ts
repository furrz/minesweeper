export function make2DArray<T> (width: number, height: number, fillWith: T): T[][] {
  const array: T[][] = []
  for (let x = 0; x < width; x++) {
    array.push(new Array(height).fill(fillWith))
  }
  return array
}

export function pickRandomCell2D<T> (array: T[][], predicate: ((field: T) => boolean)): [x: number, y: number] {
  let x = 0, y = 0
  do {
    x = Math.floor(Math.random() * array.length)
    y = Math.floor(Math.random() * array[x].length)
  } while (!predicate(array[x][y]))
  return [x, y]
}

export function map2D<T, Y> (array: T[][], mapFunc: ((field: T, index: [x: number, y: number]) => Y)): Y[][] {
  return array.map((subArray, x) => subArray.map((item, y) => mapFunc(item, [x, y])))
}

export function forEach2D<T> (array: T[][], forEachFunc: (field: T, index: [x: number, y: number]) => void) {
  return array.forEach((subArray, x) => subArray.forEach((item, y) => forEachFunc(item, [x, y])))
}

export function * getAdjacentValues2D<T> (array: T[][], x: number, y: number): Generator<T> {
  const xMax = Math.min(x + 2, array.length)
  for (let xA = Math.max(x - 1, 0); xA < xMax; xA++) {
    const yMax = Math.min(y + 2, array[xA].length)
    for (let yA = Math.max(y - 1, 0); yA < yMax; yA++) {
      yield array[xA][yA]
    }
  }
}