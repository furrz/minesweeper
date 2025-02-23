export class Observable<T extends (...args: any) => void>  {
  #listeners: T[] = [];

  add(listener: T) {
    this.#listeners.push(listener);
  }

  remove(listener: T) {
    this.#listeners.splice(this.#listeners.indexOf(listener), 1);
  }

  invoke(...args: Parameters<T>) {
    this.#listeners.forEach(listener => listener.apply(null, args));
  }
}