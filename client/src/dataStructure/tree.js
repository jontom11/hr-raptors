function Tree(component, dropComponent) {
  var node  = new Node(component, dropComponent);
  this._root = node;
}

function Node(component, dropComponent){
  this.component = component;
  this.dropComponent = dropComponent;
  this.parent = null;
  this.children = [];
}


