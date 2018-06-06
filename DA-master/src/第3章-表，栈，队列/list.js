/**
 * 表的实现1-单链表
 */
// 链表节点
class Node {
  constructor (element = null) {
    this.element = element
    this.next = null
    this.previous = null
  }
}

// 链表抽象类
class List {
  constructor () {
    this.head = null // 头结点
    this.end = null  // 尾节点
    this.length = 0  // 链表的长度
  }

  size () {}

  isEmpty () {
  }

  /**
   * 判断给定节点是否是尾节点
   * @param {*} index
   */
  isLast (element) {}

  find (element) {}

  delete (element) {}

  findPrivious (element) {}

  /**
   * 在表尾插入元素
   * @param {*} element
   */
  insert (element) {}

  insertAt () {}

  deleteList () {}
}

// 单链表
class SingleLinkedList extends List {
  constructor () {
    super()
    this.head = null // 头结点
    this.end = null  // 尾节点
    this.length = 0  // 链表的长度
  }

  size () {
    return this.length
  }

  isEmpty () {
    return this.length === 0
  }

  /**
   * 判断给定节点是否是尾节点
   * @param {*} index
   */
  isLast (element) {
    let currentNode = this.head
    while (currentNode && currentNode.element !== element) {
      currentNode = currentNode.next
    }
    return currentNode.next === null
  }

  /**
   * 查找给定元素在list中的索引
   * @param {*} element
   * @return {number}
   */
  find (element) {
    let index = -1
    let currentNode = this.head
    while (currentNode && currentNode.element !== element) {
      currentNode = currentNode.next
      index++
    }
    return index
  }

  delete (element) {
    let previousNode = this.findPrivious(element)
    let currentNode = previousNode.next
    if (previousNode) {
      previousNode.next = currentNode.next
    } else {
      this.head.next = null
    }
    this.length--
  }

  findPrevious (element) {
    let currentNode = this.head
    while (currentNode.next !== null && currentNode.element !== element) {
      currentNode = currentNode.next
    }
    return currentNode
  }

  /**
   * 在表尾插入元素
   * @param {*} element
   */
  insert (element) {
    let newNode = new Node(element)
    if (this.head === null) {
      this.head = newNode
    } else {
      let currentNode = this.head
      while (currentNode.next) {
        currentNode = currentNode.next
      }
      currentNode.next = newNode
    }
    this.length++
  }

  insertAt (element, index) {
    if (index > this.length || index < 0) {
      return false
    }

    let previousNode = null
    let currentNode = this.head
    let newNode = new Node(element)
    let activeIndex = 0
    while (currentNode.next != null && activeIndex !== index) {
      previousNode = currentNode
      currentNode = currentNode.next
      activeIndex++
    }
    newNode.next = currentNode
    previousNode.next = newNode
    this.length++
  }

  deleteList () {
    if (this.head.next === null) {
      return false
    }
    while (this.head.next !== null) {
      let firstNode = this.head.next
      this.head.next = firstNode.next
      firstNode = null
      this.length--
    }
    return true
  }
}

// 双向链表
class DoublyLinkedList extends List {
  constructor () {
    super()
    this.head = new Node() // 头结点
    this.end = new Node() // 尾节点
    this.length = 0 // 链表的长度
  }

  size () {
    return this.length
  }

  isEmpty () {
    return this.head.next !== null
  }

  /**
   * 判断给定节点是否是尾节点
   * @param {*} index
   */
  isLast (element) {
    return this.isLast.length === element
  }

  find (element) {
    let currentNode = this.head
    while (currentNode.next && currentNode.element === element) {
      currentNode = currentNode.next
    }
    return currentNode
  }

  delete (element) {

  }

  findPrevious (node) {
    return node.previous
  }

  /**
   * 在表尾插入元素
   * @param {*} element
   */
  insert (element) {}

  insertAt () {}

  deleteList () {}

  header (list) {}

  first (list) {}
}
