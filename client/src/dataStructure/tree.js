import React from 'react';
import Queue from './queue';
import shortid from 'shortid';

var Node = function(component, dropComponent) {
  this.component = component;
  this.dropComponent = dropComponent;
  this.ID = shortid.generate();
  this.parent = null;
  this.parentID = null;
  this.children = [];
};

var Tree = function(component, dropComponent) {
  var node = new Node(component, dropComponent);
  this._root = node;
};

// traverses a tree with depth-first search
Tree.prototype.traverseDF = function(callback) {

  // Immediately invoking function, recursing
  (function recurse(currentNode) {
    for (var i = 0, length = currentNode.children.length; i < length; i++) {
      recurse(currentNode.children[i]);
    }
    callback(currentNode);
  })(this._root);

};

// traverses a tree with  breadth-first search
Tree.prototype.traverseBF = function(callback) {
  var queue = new Queue();

  queue.enqueue(this._root);

  var currentTree = queue.dequeue();

  while (currentTree) {
    for (var i = 0, length = currentTree.children.length; i < length; i++) {
      queue.enqueue(currentTree.children[i]);
    }

    callback(currentTree);
    currentTree = queue.dequeue();
  }
};

Tree.prototype.contains = function(callback, traversal) {
  traversal.call(this, callback);
};

Tree.prototype.add = function(component, dropComponent, toID, traversal) {
  var child = new Node(component, dropComponent),
    parent = null,
    callback = function(node) {
      if (node.ID === toID) {
        parent = node;
      }
    };

  this.contains(callback, traversal);

  if (parent) {
    parent.children.unshift(child);
    child.parent = parent;

  } else {
    throw new Error('Cannot add node to a non-existent parent.');
  }
};

Tree.prototype.pushToHead = function(component, dropComponent, oldTree) {
  var newTree = new Tree(component, dropComponent);
  oldTree._root.parent = component;
  oldTree._root.parentID = newTree._root.ID;
  newTree._root.children.push(oldTree._root);
  return newTree;
};

Tree.prototype.remove = function(component, fromID, traversal) {
  var tree = this,
    parent = null,
    childToRemove = null,
    index;

  var callback = function(node) {
    if (node.component === fromID) {
      parent = node;
    }
  };

  this.contains(callback, traversal);

  if (parent) {
    index = findIndex(parent.children, component);

    if (index === undefined) {
      throw new Error('Node to remove does not exist.');
    } else {
      childToRemove = parent.children.splice(index, 1);
    }
  } else {
    throw new Error('Parent does not exist.');
  }

  return childToRemove;
};

var findIndex = function(arr, component) {
  var index;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i].component === component) {
      index = i;
    }
  }

  return index;
};

module.exports = Tree;
