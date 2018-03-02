<template>
  <div id="app">
    <div class="counter">
      <div class="counter__number">{{count}}</div>
      <button class="btn__add">add</button>
      <button class="btn__sub">sub</button>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  data: function () {
    return {
      count: 0
    }
  }
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
</style>
