<template>
  <div v-show="snapshotSrc" class="snapshot">
    <img ref="imgRef" :src="snapshotSrc" alt="" class="img" crossorigin="anonymous">
  </div>
</template>

<script>
  import html2canvas from 'html2canvas'

  export default {
    name: 'SnapShot',
    data () {
      return {
        snapshotSrc: null
      }
    },
    computed: {
      snapshotImg () {
        return this.$refs.imgRef
      }
    },
    methods: {
      create (wrapper) {
        if (wrapper.nodeType !== 1) {
          return
        }
        const self = this
        return new Promise((resolve, reject) => {
          html2canvas(wrapper, {
            useCORS: true,
            scale: 2,
            allowTaint: true,
            letterRendering: true,
            onrendered: function (canvas) {
              let ctx = canvas.getContext('2d')
              ctx.webkitImageSmoothingEnabled = false
              ctx.mozImageSmoothingEnabled = false
              ctx.imageSmoothingEnabled = false
            },
            logging: false
          }).then(canvas => {
            const src = canvas.toDataURL("image/jpeg", 0.8)
            self.snapshotSrc = src
            self.snapshotImg.onload = () => {
              resolve(src, canvas)
            }
          }).catch(err => {
            reject(err)
          })
        })
      }
    }
  }
</script>

<style scoped>
  .snapshot {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999999;
  }
</style>
