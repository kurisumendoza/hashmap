import LinkedList from './linked-list.js';

class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.buckets = new Array(this.capacity);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);

    if (!this.buckets[index]) {
      this.buckets[index] = [key, value];
      return;
    }

    if (Array.isArray(this.buckets[index]) && key === this.buckets[index][0]) {
      this.buckets[index][1] = value;
      return;
    }

    if (Array.isArray(this.buckets[index])) {
      const [oldKey, oldValue] = this.buckets[index];
      const list = new LinkedList();
      list.append(oldKey, oldValue);
      list.append(key, value);
      this.buckets[index] = list;
      return;
    }

    if (this.buckets[index].contains(key))
      this.buckets[index].update(key, value);
    else this.buckets[index].append(key, value);
  }

  get(key) {
    const index = this.hash(key);

    if (!this.buckets[index]) return undefined;
    if (Array.isArray(this.buckets[index]) && this.buckets[index][0] === key)
      return this.buckets[index];
    if (this.buckets[index].contains(key)) return this.buckets[index].get(key);
  }

  has(key) {
    return this.get(key) !== undefined;
  }
}

export default HashMap;
