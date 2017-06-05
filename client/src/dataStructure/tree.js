import queue from './queue';

var Tree = function(component, dropComponent) {
  var node = new Node(component, dropComponent);
  this._root = node;
};

//  traverses a tree with depth-first search
Tree.prototype.traverseDF = function(callback) {

  // Immediately invoking function, recursing
  (function recurse(currentNode) {
    for (var i = 0; i < currentNode.children.length; i++) {
      recurse(currentNode.children[i]);
    }
    callback(currentNode);
  })(this._root);
};

// traverses a tree with  breadth-first search
Tree.prototype.traverseBF = function(callback) {
  var queue = new Queue();

  queue.enqueue(this._root);
  currentTree = queue.dequeue();

  while (currentTree) {
    for (var i  = 0; i < currentTree.children.lenght; i++) {
      queue.enqueue(currentTree.children[i]);
    }
    callback(currentTree);
    currentTree = queue.dequeue();
  }
};

var Node = function(component, dropComponent) {
  this.component = component;
  this.dropComponent = dropComponent;
  this.parent = null;
  this.children = [];
};


