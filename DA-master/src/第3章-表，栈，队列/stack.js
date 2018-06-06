// 栈(LIFO)
// 基本操作集：top,pop,push.

class Node {
  constructor (element) {
    this.element = element
    this.next = null
  }
}
class Stack {
  constructor () {
    this.head = new Node()
    this.length = 0
  }
  isEmpty () {}

  createStack () {}

  disposeStack () {}

  makeEmpty () {}

  push () {}

  top () {}

  pop () {}
}

// 栈的单链表实现
class ListStack extends Stack {
  constructor () {
    super()
    this.head = new Node()
    this.length = 0
  }

  isEmpty () {
    return this.head.next === null
  }

  createStack () {}

  disposeStack () {}

  push (node) {
    let topNode = this.head.next
    if (topNode) {
      node.next = topNode
      this.head.next = node
    } else {
      this.head.next = node
    }
    this.length++
  }

  top () {
    return this.head.next && this.head.next
  }

  pop () {
    let topNode = this.head.next
    let tempNode = null
    if (topNode) {
      tempNode = topNode.next
      this.head.next = tempNode
      tempNode = null
      this.length--
      return
    }
    return new Error('Stack empty.')
  }
}

const listStack = new ListStack()
listStack.push(new Node(11))
listStack.pop()
console.log(listStack)
