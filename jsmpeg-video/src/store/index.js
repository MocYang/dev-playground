// 全局store
export default {
  commit (type, data) {
    this.mutations[type].call(this.state, data)
  },
  state: {
    name: 'ABC',
    age: 12
  },
  mutations: {
    setName (name) {
      this.name = name
    },
    setAge (age) {
      this.age = age
    }
  }
}
