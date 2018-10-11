<template>
  <div class="cavnas-wave page">
    <router-link class="back-to-home" to="/">首页</router-link>
    <div ref="canvasRef" id="canvas-container" class="canvas-container">

    </div>
  </div>
</template>

<script>
  import Retina from '../utils/retina-canvas'
  // 画水波图
  // 参考链接：https://mp.weixin.qq.com/s/mLNmm-GyXwiXLPB0i9E1_A

  export default {
    name: 'CanvasWave',
    data () {
      return {
        canvas: null,
        ctx: null,
        xOffset: 0,
        speed: 0.2,
        shapeReady: false,
        progress: 40
      }
    },
    computed: {
      waveCanvas () {
        return this.$refs.canvasRef
      }
    },
    mounted () {
      this.canvas = Retina.create(this.waveCanvas)
      this.ctx = this.canvas.getContext('2d')
      this.draw()
    },
    methods: {
      draw () {
        const {
          canvas,
          ctx
        } = this
        ctx.clearRect(0, 0, canvas.stage.width, canvas.stage.height)

        if (!this.shapeReady) {
          this.drawCoverShape()
        }

        this.xOffset += this.speed
        // this.progress += 1

        if (this.progress >= 100) {
          this.progress = 0
        }

        this.drawWave({
          A: 14,
          B: 0.1,
          color: 'red',
          C: 20,
          D: 0
        })
        // this.drawWave()
        requestAnimationFrame(() => this.draw())
      },

      drawWave (option = {A: 20, B: 0.08, C: 0, D: 0, color: '#C17453'}) {
        const {
          canvas,
          ctx
        } = this
        const w = canvas.stage.width
        const h = canvas.stage.height
        const halfH = h * (1 - this.progress / 100)

        // 正弦曲线 y = A sin(Bx + C) + D

        const paramA = option.A // 振幅, A越大，振幅越大
        const paramB = option.B // 周期2π/B, B大于1时，B越大，周期越短，B大于0小于1时，周期越长
        const paramC = this.xOffset + option.C // 水平位移，-C/B。
        const paramD = 0
        const startX = 0
        ctx.beginPath()
        let newPointY
        for (let x = startX; x < startX + w; x += 100 / w) {
          newPointY = paramA * (Math.sin(paramB * x + paramC)) + paramD
          ctx.lineTo(x, newPointY + halfH)
        }

        let lingrad = ctx.createLinearGradient(0, 0, 0, h)
        lingrad.addColorStop(0, '#ED996D')
        lingrad.addColorStop(1, '#ED996D')

        ctx.strokeStyle = 'transparent'
        ctx.fillStyle = lingrad
        ctx.lineTo(startX + w, h)
        ctx.lineTo(startX, h)
        ctx.lineTo(startX, newPointY + halfH)
        ctx.stroke()
        ctx.fill()
        ctx.closePath()
      },

      drawCoverShape () {
        this.shapeReady = true

        const {
          canvas,
          ctx
        } = this
        const w = canvas.stage.width
        const h = canvas.stage.height
        ctx.beginPath()
        ctx.lineWidth = 2
        ctx.arc(w / 2, h / 2, w / 2 - 2, 0, Math.PI * 2)
        ctx.stroke()
        ctx.clip()
        ctx.closePath()
      }
    }
  }
</script>

<style scoped>

</style>
