import React from 'react';
import Queue from './queue';
import shortid from 'shortid';
import _ from 'lodash';

var Node = function(component, rowObject, isRow, componentName) {
  this.component = component;
  this.ID = shortid.generate();
  this.parentID = null;
  this.children = [];
  this.rowObject = rowObject;
  this.isRow = isRow;
  this.componentName = componentName;
};

var Tree = function(component, rowObject, isRow, componentName) {
  var node = new Node(component, rowObject, isRow, componentName);
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
Tree.prototype.add = function(component, toID, traversal, rowObject, isRow, componentName) {
  var child = new Node(component, rowObject, isRow, componentName),
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
  var updateNode = null,
    callback = function(node) {
      if (node.ID === toID) {
        updateNode = node;
      }
    };

  this.contains(callback, traversal);

  if (updateNode) {
    updateNode.rowObject = rowObject;
  } else {
    throw new Error('Cannot add node to a non-existent parent.');
  }
};

/*=================
 UPDATE COMPONENT
 =================*/
Tree.prototype.updateComponent = function(toID, traversal, component) {
  console.log(toID);
  console.log(traversal);
  console.log(component);
  var updateNode = null,
    callback = function(node) {
      if (node.ID === toID) {
        updateNode = node;
      }
    };

  this.contains(callback, traversal);

  if (updateNode) {
    console.log('uppppddddaattenoooooode', updateNode.component);
    updateNode.component = component;
  } else {
    throw new Error('Cannot add node to a non-existent parent.');
  }
};

/*=================
 PUSH TO HEAD
 =================*/
Tree.prototype.pushToHead = function(component, rowObject, isRow, componentName) {
  var newTree = new Tree(component, rowObject, isRow, componentName);
  this._root.parentID = newTree._root.ID;
  newTree._root.children.push(this._root);
  return newTree;
};

/*=====================
 Find Element Type
 ====================*/
Tree.prototype.findType = function(ID, traversal, typeToFind) {
  var valid = false;
  var callback = function(node) {
    if (node.ID === ID && _.includes(typeToFind, node.component.type)) {
      valid = true;
    }
  };
  this.contains(callback, traversal);
  return valid;
};


/*========================
 Replace Node Component
 =========================*/
Tree.prototype.replaceComponent = function(ID, traversal, newComponent) {
  var savedComponent = null;
  var callback = function(node) {
    console.log('nooooooodddddeee', node);
    if (ID === node.ID) {
      savedComponent = node.component;
      node.component = newComponent;
    } else {
      throw new Error('Could not find node, could not replace component');
    }
  };
  this.contains(callback, traversal);
  return savedComponent;
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
