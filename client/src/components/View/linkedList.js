exports.addToTail = (linkedList, component, isDropped, item, head, tail) => {
  linkedList = Object.assign({}, linkedList);
  console.log(linkedList);
  if (tail === null) {
    linkedList[item] = exports.ListNode(component, item, null, null, isDropped);
    tail = linkedList[item];
  } else if (head === null) {
    linkedList[item] = exports.ListNode(component, item, null, tail.key);
    linkedList[tail.key].next = linkedList[item].key;
    head = tail;
    tail = linkedList[item];
  } else {
    linkedList[item] = exports.ListNode(component, item, null, tail.key);
    linkedList[tail.key].next = linkedList[item].key;
    tail = linkedList[item];
  }
  item++;
  return {linkedList, head, tail, item};
};

exports.addToHead = (component, linkedList) => {
  linkedList = Object.assign({}, linkedList);
  if (head === null) {
    linkedList[item] = exports.ListNode(component, item, null, null);
    head = linkedList[item];
  } else if (tail === null) {
    linkedList[item] = exports.ListNode(component, item, head.key, null);
    linkedList[head.key].prev = linkedList[item].key;
    tail = head;
    head = linkedList[item];
  } else {
    linkedList[item] = exports.ListNode(component, item, head.key, null);
    linkedList[head.key].prev = linkedList[item].key;
    head = linkedList[item];
  }
  item++;
  return linkedList;
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

  exports.ListNode = (component, key, next, prev, isDrop) => {
    var ListNode = {};
    ListNode.component = component;
    ListNode.next = next;
    ListNode.prev = prev;
    ListNode.key = key;
    ListNode.isDrop = isDrop;
    return ListNode;
  };
