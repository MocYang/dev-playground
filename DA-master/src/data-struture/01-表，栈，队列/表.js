/**
 * 表
 *  ADT:
 *  printList,
 *  makeEmpty,
 *  find,
 *  insert,
 *  delete,
 *  findIndex
 */

/**
 * Node帮助类
 */
class Node {
  constructor(element, next = null) {
    this.element = element
    this.next = next
  }
}

 /**
  * 表-抽象类
  */
 class List {
  print() {}

  makeEmpty () {}

  find () {}

  insert () {}

  delete () {}

  findIndex () {}
 }

/**
 * 表的数组实现-略
 */


 /**
  * 表的链表实现-同时具有表头和表尾
  */

class LinkedList extends List {
  constructor () {
    super()
    this.list = this.makeEmpty()
  }
  makeEmpty (props) {
    const header = new Node('header', null)
    return { header }
  }

  isEmpty () {
    return this.list.header.next === null
  }

  isLast (node) {
    return node.next === null
  }

  /**
   * 返回给定元素的Node
   * @param {} element
   */
  find (element) {
    const list = this.list
    const header = list.header
    let current = header.next

    // 对空表的查找，直接返回null
    if (!current) {
      return null
    }

    while (current.element !== element && current.next) {
      current = current.next
    }

    // 找到表尾了，没有找到返回null
    if (this.isLast(element) && current.element !== element) {
      return null
    }

    return current
  }

  delete (element) {

  }

  findPrevious (element) {
    const header = this.list.header

    // 空表-返回null
    if (header.next === null) {
      return null
    }

    let current = header.next
  }

  insert (node) {
    const header = this.list.header
    if (header.next === null) {
      header.next = node
      return
    }

    let current = header.next
    while (current.next) {
      current = current.next
    }

    current.next = node
  }

  destroy () {

  }

  getHeader () {

  }

  getFirst () {

  }

  /**
   * ?
   */
  advance () {

  }

  retrieve () {

  }
}

const linkedList = new LinkedList()
linkedList.insert(new Node(1))
linkedList.insert(new Node(2))
linkedList.insert(new Node(3))
linkedList.insert(new Node(4))
linkedList.insert(new Node(5))

console.log(linkedList);

// test find
// console.log(linkedList.find(1))
// console.log(linkedList.find(2))
// console.log(linkedList.find(3))
