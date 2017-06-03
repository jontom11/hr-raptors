var LinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;
  var item = 1;
};


LinkedList.prototype.addToTail = function(value) {
  if (this.tail === null) {
    this[item] = ListNode(value, item, null, null);
    this.tail = this[item];
  } else if (this.head === null) {
    this[item] = ListNode(value, item, null, this.tail.key);
    this[this.tail.key].next = this[item].key;
    this.head = this.tail;
    this.tail = this[item];
  } else {
    this[item] = ListNode(value, item, null, this.tail.key);
    this[this.tail.key].next = this[item].key;
    this.tail = this[item];
  }
  item++;
};

LinkedList.prototype.addToHead = function(value) {
  if (this.head === null) {
    this[item] = ListNode(value, item, null, null);
    this.head = this[item];
  } else if (list.tail === null) {
    this[item] = ListNode(value, item, this.head.key, null);
    this[this.head.key].prev = this[item].key;
    this.tail = this.head;
    this.head = this[item];
  } else {
    this[item] = ListNode(value, item, this.head.key, null);
    this[this.head.key].prev = this[item].key;
    this.head = this[item];
  }
  item++;

};

LinkedList.prototype.removeHead = function() {
  if (this.head === null) {
    var oldTailValue = this.tail.value;
    delete this[this.tail.key];
    return oldTailValue;
  } else {
    var oldHeadValue = this.head.value;
    this.head = this[this.head.next];
    delete this[this.head.prev];
    this.head.prev = null;
    return oldHeadValue;
  }
};

LinkedList.prototype.removeTail = function() {
  if (this.tail === null) {
    var oldHeadValue = this.head.value;
    delete this[this.head.key];
    return oldHeadValue;
  } else {
    var oldTailValue = this.tail.value;
    this.tail = this[this.tail.prev];
    delete this[this.tail.next];
    this.tail.next = null;
    return oldTailValue;
  }
};

LinkedList.prototype.contains = function(target) {
  for (var key in this) {
    if (this[key].value === target) {
      return true;
    }
  }
  return false;
};

var ListNode = function(value, key, next, prev) {
  var ListNode = {};
  ListNode.value = value;
  ListNode.next = next;
  ListNode.prev = prev;
  ListNode.key = key;
  return ListNode;
};

