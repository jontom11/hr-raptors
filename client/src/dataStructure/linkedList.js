exports.addToTail = (linkedList, component, key, head, tail) => {
  linkedList = Object.assign({}, linkedList);
  if (tail === null) {
    linkedList[key] = exports.ListNode(component, key, null, null);
    tail = linkedList[key];
    head = linkedList[key];
  } else if (head === null) {
    linkedList[key] = exports.ListNode(component, key, null, tail.key);
    linkedList[tail.key].next = linkedList[key].key;
    head = tail;
    tail = linkedList[key];
  } else {
    linkedList[key] = exports.ListNode(component, key, null, tail.key);
    linkedList[tail.key].next = linkedList[key].key;
    tail = linkedList[key];
  }
  key++;
  return {linkedList, head, tail, key};
};

exports.replaceNode = (rowObject, component, key, head, tail, newKey, linkedComponentName) => {
  var oldLinkedListNode = rowObject.linkedList[key];
  rowObject.linkedList[newKey] = {
    component: component,
    key: newKey,
    next: oldLinkedListNode.next,
    prev: oldLinkedListNode.prev,
    linkedComponentName: linkedComponentName
  };

  // Change next node's prev value
  if (oldLinkedListNode.next !== null) {
    rowObject.linkedList[oldLinkedListNode.next].prev = newKey;
  }
  // Change prev node's next value
  if (oldLinkedListNode.prev !== null) {
    rowObject.linkedList[oldLinkedListNode.prev].next = newKey;
  }

  // Change Head
  if (rowObject.head.key === key) {
    rowObject.head = rowObject.linkedList[newKey];
  } else {
    rowObject.head = rowObject.linkedList[rowObject.head.key];
  }
  // Change Tail
  if (rowObject.tail.key === key) {
    rowObject.tail = rowObject.linkedList[newKey];
  } else {
    rowObject.tail = rowObject.linkedList[rowObject.tail.key];
  }

  delete rowObject.linkedList[key];

  return rowObject;
};

exports.addToHead = (linkedList, component, key, head, tail) => {
  linkedList = Object.assign({}, linkedList);
  if (head === null) {
    linkedList[key] = exports.ListNode(component, key, null, null);
    head = linkedList[key];
    tail = linkedList[key];
  } else if (tail === null) {
    linkedList[key] = exports.ListNode(component, key, head.key, null);
    linkedList[head.key].prev = linkedList[key].key;
    tail = head;
    head = linkedList[key];
  } else {
    linkedList[key] = exports.ListNode(component, key, head.key, null);
    linkedList[head.key].prev = linkedList[key].key;
    head = linkedList[key];
  }
  key++;
  return {linkedList, head, tail, key};
};

exports.removeHead = (linkedList) => {
  linkedList = Object.assign({}, linkedList);
  if (head === null) {
    // var oldTailValue = tail.component;
    delete linkedList[tail.key];
    // return oldTailValue;
  } else if (tail === null) {
    delete linkedList[head.key];
    head = null;
  } else {
    var oldHeadValue = head.component;
    head = linkedList[head.next];
    delete linkedList[head.prev];
    head.prev = null;
    // return oldHeadValue;
  }
  return linkedList;
};

exports.removeTail = (linkedList) => {
  linkedList = Object.assign({}, linkedList);
  if (tail === null) {
    // var oldHeadValue = head.component;
    delete linkedList[head.key];
    // return oldHeadValue;
  } else if (head === null) {
    delete linkedList[tail.key];
    tail = null;
  } else{
    // var oldTailValue = tail.component;
    tail = linkedList[tail.prev];
    delete linkedList[tail.next];
    tail.next = null;
    // return oldTailValue;
  }
  return linkedList;
};

exports.contains = (target, linkedList) => {
  linkedList = Object.assign({}, linkedList);
  for (var key in linkedList) {
    if (linkedList[key].component === target) {
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
