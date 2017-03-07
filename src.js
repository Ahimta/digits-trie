function isValidKey(key) {
  if (typeof (key) !== 'string') {
    return false;
  }
  else {
    for (let i = 0; i < key.length; i++) {
      if (isNaN(parseInt(key[i]))) {
        return false;
      }
    }

    return true;
  }
}

function assertValidKey(key) {
  if (!isValidKey(key)) {
    throw new Error('digits-trie: invalid key "' + key + '" -_-');
  }
}

function isEmptyKey(key) {
  return key.length === 0;
}

function isEmptyNode(node) {
  return !(node && node.key && node.value);
}

class Node {
  constructor() {
    this.children = new Array(9);
  }

  getChild(i) {
    if (i < 0 || i > 9) {
      throw new Error('-_-');
    }
    else if (this.children[i]) {
      return this.children[i];
    }
    else {
      return this.children[i] = new Node();
    }
  }
}

let Nil = new Node();
Nil.isNil = true;
Nil.value = '';
Nil.key = '';

export default class Trie {
  constructor() {
    this.root = new Node();
  }

  set(key, value) {
    assertValidKey(key);

    if (!isEmptyKey(key)) {
      let node = this.root;

      for (let i = 0; i < key.length - 1; i++) {
        let character = key[i];
        let index = parseInt(character);
        node = node.getChild(index);
      }

      let newNode = node.getChild(parseInt(key[key.length - 1]));
      newNode.value = value;
      newNode.key = key;
    }
  }

  get(key) {
    assertValidKey(key);

    if (isEmptyKey(key)) {
      return Nil;
    }
    else {
      let node = this.root;

      for (let i = 0; node && i < key.length; i++) {
        let character = key[i];
        let index = parseInt(character);

        node = node.children[index];
      }

      if (!isEmptyNode(node)) {
        return node;
      }
      else {
        return Nil;
      }
    }
  }

  longestMatchingPrefix(key) {
    assertValidKey(key);

    if (isEmptyKey(key)) {
      return Nil;
    } else {
      let prevNode = null;
      let node = this.root;

      for (let i = 0; node && i < key.length; i++) {
        let character = key[i];
        let index = parseInt(character);

        if (node.value) {
          prevNode = node
        }
        node = node.children[index];
      }

      return !isEmptyNode(node)
        ? node
        : !isEmptyNode(prevNode)
          ? prevNode
          : Nil;
    }
  }
}