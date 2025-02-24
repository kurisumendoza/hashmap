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
    if (
      this.buckets[index] instanceof LinkedList &&
      this.buckets[index].contains(key)
    )
      return this.buckets[index].get(key);
  }

  has(key) {
    return this.get(key) !== undefined;
  }

  remove(key) {
    if (!this.has(key)) return;

    const index = this.hash(key);

    if (Array.isArray(this.buckets[index])) delete this.buckets[index];
    else if (this.buckets[index].size() === 2) {
      this.buckets[index].removeAt(this.buckets[index].find(key));

      const node = this.buckets[index].head();
      this.buckets[index] = [node.key, node.value];
    } else this.buckets[index].removeAt(this.buckets[index].find(key));
  }

  length() {
    return this.buckets.reduce(
      (num, el) => num + (Array.isArray(el) ? 1 : el.size()),
      0
    );
  }

  clear() {
    this.capacity = 16;
    this.buckets = new Array(this.capacity);
  }

  keys() {
    return this.buckets.reduce((keys, el) => {
      if (Array.isArray(el)) keys.push(el[0]);
      else {
        let current = el.head();
        while (current) {
          keys.push(current.key);
          current = current.nextNode;
        }
      }
      return keys;
    }, []);
  }

  values() {
    return this.buckets.reduce((values, el) => {
      if (Array.isArray(el)) values.push(el[1]);
      else {
        let current = el.head();
        while (current) {
          values.push(current.value);
          current = current.nextNode;
        }
      }
      return values;
    }, []);
  }

  entries() {
    return this.buckets.reduce((entries, el) => {
      if (Array.isArray(el)) entries.push(el);
      else {
        let current = el.head();
        while (current) {
          entries.push([current.key, current.value]);
          current = current.nextNode;
        }
      }
      return entries;
    }, []);
  }
}

export default HashMap;
