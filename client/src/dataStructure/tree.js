import React from 'react';
import Queue from './queue';
import shortid from 'shortid';
import _ from 'lodash';

var Node = function(component, rowObject, isRow) {
  this.component = component;
  this.ID = shortid.generate();
  this.parentID = null;
  this.children = [];
  this.rowObject = rowObject;
  this.isRow = isRow;
};

var Tree = function(component, rowObject, isRow) {
  var node = new Node(component, rowObject, isRow);
  this._root = node;
};

/*=========================================
 // traverses a tree with depth-first search
 ==========================================*/
Tree.prototype.traverseDF = function(callback) {

  // Immediately invoking function, recursing
  (function recurse(currentNode) {
    for (var i = 0, length = currentNode.children.length; i < length; i++) {
      recurse(currentNode.children[i]);
    }
    callback(currentNode);
  })(this._root);

};

/*=========================================
  traverses a tree for rendering
 ==========================================*/
Tree.prototype.traverseRendering = function() {
  var queue = new Queue();

  (function recurse(node, queue) {
    queue.enqueue(node);
    _.forEach(node.children, (child) => {
      queue.enqueue(child);
      if (child.children && child.children.length >= 1) {
        _.forEach(child.children, subchild => {
          recurse(subchild, queue);
        });

      }
    });
  })(this._root, queue);

  return queue._storage;
};

/*=========================================
 traverses a tree with breadth-first search
 ==========================================*/
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

/*=================
Contains
 =================*/
Tree.prototype.contains = function(callback, traversal) {
  traversal.call(this, callback);
};

/*=================
ADD
 =================*/
Tree.prototype.add = function(component, toID, traversal, rowObject, isRow) {
  var child = new Node(component, rowObject, isRow),
    parent = null,
    callback = function(node) {
      if (node.ID === toID) {
        parent = node;
      }
    };

  this.contains(callback, traversal);

  if (parent) {
    parent.children.unshift(child);
    child.parentID = toID;
  } else {
    throw new Error('Cannot add node to a non-existent parent.');
  }
};

/*=================
 UPDATE ROW OBJECT
 =================*/
Tree.prototype.updateRowObject = function(toID, traversal, rowObject) {
  var parent = null,
    callback = function(node) {
      if (node.ID === toID) {
        parent = node;
      }
    };

  this.contains(callback, traversal);

  if (parent) {
    parent.rowObject = rowObject;
  } else {
    throw new Error('Cannot add node to a non-existent parent.');
  }
};

/*=================
 PUSH TO HEAD
 =================*/
Tree.prototype.pushToHead = function(component, rowObject, isRow) {
  var newTree = new Tree(component, rowObject, isRow);
  this._root.parentID = newTree._root.ID;
  newTree._root.children.push(this._root);
  return newTree;
};

/*=================
 REMOVE
 =================*/
Tree.prototype.remove = function(component, nodeID, traversal) {
  var tree = this,
    parent = null,
    childToRemove = null,
    index,
    currentNode = null,
    savedChildren = null;

  // Get current Node
  var callback = function(node) {
    if (node.ID === nodeID) {
      currentNode = node;
    }
  };

  this.contains(callback, traversal);
  
  // Get parent Node
  var callback = function(node) {
    if (node.ID === currentNode.parentID) {
      parent = node;
    }
  };
  this.contains(callback, traversal); 
  
  // save the children
  if (currentNode.children.length > 0) {
    savedChildren = currentNode.children;
  }
  
  // Change the children's parentID to their new parent
  if (savedChildren) {
    savedChildren.forEach((node) => {
      node.parentID = parent.ID;
    }); 
  }
  
  if (parent) {
    console.log('parent', parent);
    index = findIndex(parent.children, currentNode.ID);

    if (index === undefined) {
      throw new Error('Node to remove does not exist.');
    } else {
      childToRemove = parent.children.splice(index, 1);
      if (savedChildren) {
       // add the children of deleted node to new parent
        parent.children = savedChildren; 
      }
    }
  } else {
    throw new Error('Parent does not exist.');
  }

  return childToRemove;
};

/*=================
 FIND INDEX
 =================*/
var findIndex = function(arr, ID) {
  var index;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i].ID === ID) {
      console.log(true);
      index = i;
    }
  }

  return index;
};

module.exports = Tree;
