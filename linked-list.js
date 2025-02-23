class Node {
  constructor(key = null, value = null, nextNode = null) {
    this.key = key;
    this.value = value;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  constructor() {
    this.list = null;
  }

  append(key, value) {
    if (!this.list) this.list = new Node(key, value);
    else if (this.list.nextNode === null)
      this.list.nextNode = new Node(key, value);
    else this.tail().nextNode = new Node(key, value);
  }

  prepend(key, value) {
    if (!this.list) this.append(key, value);
    else this.list = new Node(key, value, this.head());
  }

  insertAt(key, value, index) {
    if (index >= this.size()) this.append(key, value);
    else if (index <= 0) this.prepend(key, value);
    else this.at(index - 1).nextNode = new Node(key, value, this.at(index));
  }

  update(key, value) {
    if (!this.contains(key)) return;
    this.at(this.find(key)).value = value;
  }

  get(key) {
    if (!this.contains(key)) return;
    const node = this.at(this.find(key));
    return [node.key, node.value];
  }

  size() {
    if (!this.list) return 0;

    let nodeSize = 1;
    let curNode = this.list;
    while (curNode.nextNode !== null) {
      curNode = curNode.nextNode;
      nodeSize++;
    }

    return nodeSize;
  }

  head() {
    if (!this.list) return null;
    else return this.list;
  }

  tail() {
    if (!this.list) return null;

    let curNode = this.list;
    while (curNode.nextNode !== null) {
      curNode = curNode.nextNode;
    }
    return curNode;
  }

  at(index) {
    if (!this.list || this.size() < index || index < 0) return null;

    let curNode = this.list;
    let curIndex = 0;
    while (curIndex < index) {
      curNode = curNode.nextNode;
      curIndex++;
    }

    return curNode;
  }

  pop() {
    if (!this.list) return;
    if (this.size() === 1) this.list = null;
    else this.at(this.size() - 2).nextNode = null;
  }

  removeAt(index) {
    if (index >= this.size() || index < 0) return;
    else if (index === this.size() - 1) this.pop();
    else if (index === 0) this.list = this.at(1);
    else this.at(index - 1).nextNode = this.at(index + 1);
  }

  contains(key) {
    if (!this.list) return false;

    let curNode = this.list;
    while (curNode !== null) {
      if (curNode.key === key) return true;
      else curNode = curNode.nextNode;
    }

    if (curNode === null) return false;
  }

  find(key) {
    if (!this.list) return null;

    let curNode = this.list;
    let curIndex = 0;
    while (curNode !== null) {
      if (key === curNode.key) return curIndex;
      else {
        curNode = curNode.nextNode;
        curIndex++;
      }
    }
    return curNode;
  }

  toString() {
    let listString = '';
    let curNode = this.list;
    while (curNode !== null) {
      if (curNode.key) listString += `( ${curNode.key}: ${curNode.value} ) -> `;
      curNode = curNode.nextNode;
    }
    return (listString += null);
  }
}

export default LinkedList;
