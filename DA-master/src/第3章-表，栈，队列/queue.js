// 队列
class Node {
  constructor (element) {
    this.element = element
    this.next = null
  }
}

// 队列的链表实现
class ListQueue {
  constructor () {
    this.head = new Node()
    this.size = 0
  }

  enqueue (node) {
    let currentNode = this.head
    if (this.head.next === null) {
      this.head.next = node
    } else {
      while (currentNode.next !== null) {
        currentNode = currentNode.next
      }
      currentNode.next = node
    }
    this.size++
  }

  dequeue () {
    let ret = null
    let currentNode = this.head
    if (currentNode.next === null) {
      throw new Error('queue empty!')
    } else {
      ret = currentNode.next
      this.head.next = ret.next
    }
    this.size--
    return ret.element
  }
}

const lq = new ListQueue()
lq.enqueue(new Node(1))
lq.enqueue(new Node(2))
console.log(lq.dequeue())
console.log(lq.dequeue())
console.log(lq)

// 队列的数组实现
class ArrayQueue {
  constructor () {
    this.queue = []
    this.front = 0
    this.rear = this.queue.length > this.front
    ? this.queue.length - 1
    : this.front
  }
  getSize () {
    return this.queue.length
  }
  enqueue (node) {
    this.queue.push(node)
  }
  dequeue () {
    if (this.queue.length <= 0) {
      throw new Error('empry queue.')
    }
    return this.queue.shift()
  }
}
