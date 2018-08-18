<template>
  <div class="cavnas-wave page">
    <router-link class="back-to-home" to="/">首页</router-link>
    <div ref="canvasRef" id="canvas-container"  class="canvas-container"></div>
  </div>
</template>

<script>
  // 画水波图
  // 参考链接：https://mp.weixin.qq.com/s/mLNmm-GyXwiXLPB0i9E1_A
  export default {
    name: 'CanvasWave'
  }
</script>

<style scoped>

</style>
