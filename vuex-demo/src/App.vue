<template>
  <div id="app">
    <section class="todo-panel">
      <header>
        <input type="text" v-model="newTodo">
        <button type="button" @click="addTodo()" @keyup.enter="addTodo()">add</button>
      </header>
      <main>
        <p>
          <strong>Filter: </strong>
          <button class="filter__item" @click="filterTodo(0)">All</button>
          <button class="filter__item" @click="filterTodo(1)">Active</button>
          <button class="filter__item" @click="filterTodo(2)">Not Active</button>
        </p>
        <ul class="todo__list">
          <li
            class="todo__item"
            v-for="todo in todos"
            :key="todo.id"
            :class="{
              active: todo.active
            }"
          >
            <button class="btn__toggle" type="button" @click="toggleActive(todo.id)">toggle</button>
            <span class="todo__text">{{ todo.text }}</span>
            <button class="btn__delete" type="button" @click="deleteTodo(todo.id)">delete</button>
          </li>
        </ul>
        <p>
          <span v-if="filter !== 'all'">filter: {{ filter }}. </span>
          <span v-if="filter === 'all'">active: {{activeTodo}}. </span>
          total: {{todos.length || 0}}
        </p>
      </main>
    </section>
  </div>
</template>

<script>

  export default {
    name: 'App',
    data: function () {
      return {
        id: 1,
        newTodo: '',
        todoCache: [],
        todos: [],
        filter: 'all',
      }
    },
    computed: {
      activeTodo () {
        const todos = this.todos
        let activeTodos = 0
        todos.forEach(todo => {
          if (todo.active) {
            activeTodos++
          }
        })

        return activeTodos
      }
    },
    methods: {
      updateCache () {
        this.todoCache = this.todos
      },

      addTodo() {
        const newTodoText = this.newTodo
        if (!newTodoText) {
          return
        }
        const newTodoItem = {
          id: this.id++,
          text: newTodoText,
          active: false,
        }

        this.todos.push(newTodoItem)


        this.newTodo = ''
        this.updateCache()
      },

      deleteTodo (id) {
        this.todos = this.todos.filter(todo => todo.id !== id)
        this.updateCache()
      },

      toggleActive (id) {
        this.todos = this.todos.map(todo => {
          if (todo.id === id) {
            todo.active = !todo.active
          }
          return todo
        })
        this.updateCache()
      },

      filterTodo (show) {
        switch (show) {
          case 0:
            this.showAllTodos()
            this.filter = 'all'
            break

          case 1:
            this.showActiveTodos()
            this.filter = 'active'
            break

          case 2:
            this.showUnActiveTodos()
            this.filter = 'not active'
            break
        }
      },

      showAllTodos () {
        this.todos = this.todoCache.slice()
      },

      showActiveTodos () {
        this.todos = this.todoCache.filter(todo => todo.active)
      },

      showUnActiveTodos () {
        this.todos = this.todoCache.filter(todo => !todo.active)
      }
    },
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  ul, li, ol {
    list-style: none;
  }

  .todo__list {
    padding: 20px 40px;
    overflow: hidden;
  }

  .todo__item {
    position: relative;
    margin-top: 10px;
    text-align: left;
  }

  .todo__item:first-child {
    margin-top: 0;
  }

  .todo__text {
    font-size: 120%;
    font-weight: bold;
  }

  .todo__item.active .todo__text {
    color: #f00;
  }

  .btn__delete {
    position: absolute;
    top: 0;
    right: 0;
  }
</style>
