/**
 * Stack ADT
 *  isEmpty
 *  push
 *  top
 *  pop
 */

class Node {
  constructor (element, next = null) {
    this.element = element
    this.next = next
  }
}


class Stack {
  constructor () {
    this.stack = this.makeEmpty()
  }

  makeEmpty () {
  }

  pop () {
  }

  top () {
  }

  push () {
  }

  isEmpty () {
  }
}

class ArrayStack extends Stack {
  makeEmpty () {
    return []
  }

  pop () {
    if (this.stack.length === 0) {
      throw new Error('empty stack')
    }

    return this.stack.pop()
  }

  push (node) {
    this.stack.push(node)
  }

  top () {
    const stack = this.stack
    return stack[stack.length - 1]
  }

  isEmpty () {
    return Number(this.top) === 0
  }
}

class LinkedListStack extends Stack {
  makeEmpty () {
    const header = new Node(null, null)
    return {header}
  }

  pop () {
    const header = this.stack.header
    if (this.isEmpty()) {
      throw new Error('empty stack')
    }

    const top = this.top()
    header.next = top.next
    return top
  }

  push (node) {
    const header = this.stack.header
    const top = this.top()
    if (!top) {
      header.next = node
      return
    }
    node.next = top
    header.next = node
  }

  top () {
    return this.stack.header.next
  }

  isEmpty () {
    const header = this.stack.header

    return header.next === null
  }
}


module.exports = {
  ArrayStack,
  LinkedListStack
}
