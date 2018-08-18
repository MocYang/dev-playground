<template>
  <div class="sprite-wrapper page">
    <router-link class="back-to-home" to="/">首页</router-link>
    <div class="icons">
      <div class="icon icon-q1"></div>
      <div class="icon icon-q2"></div>
      <div class="icon icon-q3"></div>
      <div class="icon icon-q4"></div>
    </div>
  </div>
</template>

<script>
  // 使用webpack插件，自动生成精灵图
  // 自动生成css类，计算大小
  import '@/assets/styles/sprites/sprite.scss'

  export default {
    name: 'WebpackSprite'
  }
</script>

<style scoped>

</style>
