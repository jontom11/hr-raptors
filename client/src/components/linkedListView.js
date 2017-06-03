exports.addToTail = (component, linkedList) => {
  linkedList = Object.assign({}, linkedList);
  if (linkedList.tail === null) {
    linkedList.list[linkedList.item] = exports.ListNode(component, linkedList.item, null, null);
    linkedList.tail = linkedList.list[linkedList.item];
  } else if (linkedList.head === null) {
    linkedList.list[linkedList.item] = exports.ListNode(component, linkedList.item, null, linkedList.tail.key);
    linkedList.list[linkedList.tail.key].next = linkedList.list[linkedList.item].key;
    linkedList.head = linkedList.tail;
    linkedList.tail = linkedList.list[linkedList.item];
  } else {
    linkedList.list[linkedList.item] = exports.ListNode(component, linkedList.item, null, linkedList.tail.key);
    linkedList.list[linkedList.tail.key].next = linkedList.list[linkedList.item].key;
    linkedList.tail = linkedList.list[linkedList.item];
  }
  linkedList.item++;
  return linkedList;
};

exports.addToHead = (component, linkedList) => {
  linkedList = Object.assign({}, linkedList);
  if (linkedList.head === null) {
    linkedList.list[linkedList.item] = exports.ListNode(component, linkedList.item, null, null);
    linkedList.head = linkedList.list[linkedList.item];
  } else if (linkedList.tail === null) {
    linkedList.list[linkedList.item] = exports.ListNode(component, linkedList.item, linkedList.head.key, null);
    linkedList.list[linkedList.head.key].prev = linkedList.list[linkedList.item].key;
    linkedList.tail = linkedList.head;
    linkedList.head = linkedList.list[linkedList.item];
  } else {
    linkedList.list[linkedList.item] = exports.ListNode(component, linkedList.item, linkedList.head.key, null);
    linkedList.list[linkedList.head.key].prev = linkedList.list[linkedList.item].key;
    linkedList.head = linkedList.list[linkedList.item];
  }
  linkedList.item++;
  return linkedList;
};

exports.removeHead = (linkedList) => {
  linkedList = Object.assign({}, linkedList);
  if (linkedList.head === null) {
    // var oldTailValue = linkedList.tail.component;
    delete linkedList.list[linkedList.tail.key];
    // return oldTailValue;
  } else if (linkedList.tail === null) {
    delete linkedList.list[linkedList.head.key];
    linkedList.head = null;
  } else {
    var oldHeadValue = linkedList.head.component;
    linkedList.head = linkedList.list[linkedList.head.next];
    delete linkedList.list[linkedList.head.prev];
    linkedList.head.prev = null;
    // return oldHeadValue;
  }
  return linkedList;
};

exports.removeTail = (linkedList) => {
  linkedList = Object.assign({}, linkedList);
  if (linkedList.tail === null) {
    // var oldHeadValue = linkedList.head.component;
    delete linkedList.list[linkedList.head.key];
    // return oldHeadValue;
  } else if (linkedList.head === null) {
    delete linkedList.list[linkedList.tail.key];
    linkedList.tail = null;
  } else{
    // var oldTailValue = linkedList.tail.component;
    linkedList.tail = linkedList.list[linkedList.tail.prev];
    delete linkedList.list[linkedList.tail.next];
    linkedList.tail.next = null;
    // return oldTailValue;
  }
  return linkedList;
};

exports.contains = (target, linkedList) => {
  linkedList = Object.assign({}, linkedList);
  for (var key in linkedList) {
    if (linkedList.list[key].component === target) {
      return true;
    }
  }
  return false;
},

exports.ListNode = (component, key, next, prev) => {
  var ListNode = {};
  ListNode.component = component;
  ListNode.next = next;
  ListNode.prev = prev;
  ListNode.key = key;
  return ListNode;
};

