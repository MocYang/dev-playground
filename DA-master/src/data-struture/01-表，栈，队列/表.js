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
  constructor (element, next = null) {
    this.element = element
    this.next = next
  }
}

/**
 * 表-抽象类
 */
class List {
  print () {
  }

  makeEmpty () {
  }

  find () {
  }

  insert () {
  }

  delete () {
  }

  findIndex () {
  }
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
    return {header}
  }

  isEmpty () {
    return this.list.header.next === null
  }

  isLast (node) {
    return node && node.next === null
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

    while (current.next && current.element !== element) {
      current = current.next
    }

    // 找到表尾了，没有找到返回null
    if (current.element !== element) {
      return null
    }

    return current
  }

  /**
   * 删除给定元素
   * @param element
   */
  delete (element) {
    let previous = this.findPrevious(element)

    if (!previous) {
      return null
    }

    let tempNode = previous.next
    previous.next = tempNode.next
    tempNode.next = null

    return tempNode
  }

  findPrevious (element) {
    let current = this.list.header

    // 空表-返回null
    if (current.next === null) {
      return null
    }

    while (current.next && current.next.element !== element) {
      current = current.next
    }

    // TODO: 如果previous是header指针，决定是否返回

    return current
  }

  /**
   * 在指定节点前，插入给定元素
   * @param element
   * @param node
   */
  insert (element, node) {
    const nodeForInsert = new Node(element)

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
// console.log(linkedList.find(6))


// test delete
// console.log(linkedList.delete(3))
// console.log(linkedList.delete(1))
// console.log(linkedList.delete(5))
// console.log(linkedList.delete(4))
// console.log(linkedList.delete(2))
// console.log(linkedList.delete(2))

// test findPrevious
// console.log(linkedList.findPrevious(1))
// console.log(linkedList.findPrevious(2))
// console.log(linkedList.findPrevious(4))
// console.log(linkedList.findPrevious(5))
// console.log(linkedList)
