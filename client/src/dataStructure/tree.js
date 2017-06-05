var Tree = function(component, dropComponent) {
  var node = new Node(component, dropComponent);
  this._root = node;
}

//  traverses a tree with depth-first search.
Tree.prototype.traverseDF = function(callback) {

  // Immediately invoking function, recursing
  (function recurse(currentNode){
    for (var i = 0; i < currentNode.children.length; i++) {
      recurse(currentNode.children[i]);
    }
    callback(currentNode);
  })(this._root);
};

var Node = function(component, dropComponent){
  this.component = component;
  this.dropComponent = dropComponent;
  this.parent = null;
  this.children = [];
}


