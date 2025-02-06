const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  #root = null;

  #add(node, data) {
    if (!node) return new Node(data);
    if (node.data === data) return node;
    if (node.data > data) {
      node.left = this.#add(node.left, data);
    } else {
      node.right = this.#add(node.right, data);
    }
    return node;
  }

  #find(current, data) {
    if (!current) return null;
    if (current.data === data) return current;
    return this.#find(current.data > data ? current.left : current.right, data);
  }

  #min(current = this.#root) {
    if (!current) return null;
    let node = current;
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  #remove(current, data) {
    if (!current) return null;
    if (data < current.data) {
      current.left = this.#remove(current.left, data);
      return current;
    } else if (data > current.data) {
      current.right = this.#remove(current.right, data);
      return current;
    } else {
      if (!current.left && !current.right) {
        return null;
      }
      if (!current.left) return current.right;
      if (!current.right) return current.left;
      const min = this.#min(current.right);
      current.data = min.data;
      current.right = this.#remove(current.right, min.data);
      return current;
    }
  }

  root() {
    return this.#root;
  }

  add(data) {
    this.#root = this.#add(this.#root, data);
  }

  has(data) {
    return this.find(data) ? true : false;
  }

  find(data) {
    return this.#find(this.#root, data);
  }

  remove(data) {
    this.#root = this.#remove(this.#root, data);
  }

  min() {
    return this.#min()?.data ?? null;
  }

  max() {
    if (!this.#root) return null;
    let node = this.#root;
    while (node.right) node = node.right;
    return node.data;
  }
}

module.exports = {
  BinarySearchTree,
};
