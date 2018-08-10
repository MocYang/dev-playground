<template>
  <div class="loading" :style="{background}">
    <slot>
      <div class="sk-fading-circle">
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
      </div>
      <div class="progress">{{ formatProgress }}%</div>
    </slot>
  </div>
</template>

<script>
  import 'static/js/createjs.min'

  export default {
    name: 'Preload',
    props: {
      // 最短加载时间
      timemin: {
        type: Number,
        default: 0
      },

      // 是否请求manifest.json文件
      fetch: {
        type: Boolean,
        required: false,
        default: true
      },

      // 额外加载的资源
      manifest: {
        type: Array,
        required: false
      },

      basePath: {
        type: String,
        default: null
      },

      background: {
        type: String,
        default: 'rgba(0, 0, 0, .66)'
      }
    },
    created () {
      if (this.fetch) {
        this.handleGetManifest()
      } else {
        this.startLoadAssets(this.manifest)
      }
    },
    data () {
      return {
        progress: 0,
        queue: null,
        timer: null
      }
    },
    computed: {
      formatProgress () {
        return Math.floor(this.progress * 10000) / 100
      }
    },
    methods: {
      async handleGetManifest () {
        const app = this.$app
        try {
          const res = await this.$axios.get(app.asset('dist/manifest.json'))
          this.startLoadAssets(res.data)
        } catch (e) {
          throw new Error(e)
        }
      },

      mapManifest (assetsObj) {
        let manifest = {
          images: [],
          fonts: [],
          media: [],
          other: []
        }
        const getFileName = (key) => {
          if (!key.indexOf('/')) {
            return key.split('.')[0]
          }
          const fileFullName = key.slice(key.lastIndexOf('/') + 1)
          return fileFullName.split('.')[0]
        }
        if (this.manifest) {
          manifest['other'] = this.manifest.reduce((acc, item) => {
            if (Object.prototype.toString.call(item) === '[object Object]') {
              acc.push({
                ...item,
                src: `dist/${item.src}`
              })
            } else if (Object.prototype.toString.call(item) === '[object String]') {
              acc.push({
                id: getFileName(item),
                src: `dist/${item}`
              })
            }
            return acc
          }, [])
        }

        for (let key in assetsObj) {
          if (!key.match(/\.(js|map)$/)) {
            const assetItem = {
              id: getFileName(key),
              src: assetsObj[key]
            }
            if (key.match(/\.(png|jpe?g|gif|svg)$/)) {
              manifest['images'].push(assetItem)
            } else if (key.match(/\.(woff2?|eot|ttf|otf)$/)) {
              manifest['fonts'].push(assetItem)
            } else if (key.match(/\.(mp4|webm|ogg|mp3|wav|flac|acc|flv)$/)) {
              manifest['media'].push(assetItem)
            }
          }
        }
        return manifest
      },
      startLoadAssets (assets) {
        const self = this
        const app = this.$app
        const manifest = this.mapManifest(assets)
        const minTime = this.timemin
        const now = +Date.now()

        /* eslint-disable-next-line */
        const queue = new createjs.LoadQueue()

        /* eslint-disable-next-line */
        queue.installPlugin(window.createjs.Sound)

        queue.on('progress', (target) => {
          const progress = target.progress
          this.progress = progress
          this.$emit('progress', progress)
        })

        /* eslint-disable-next-line */
        queue.installPlugin(createjs.Sound)
        queue.on('complete', (target) => {
          queue.close()
          if (minTime && +Date.now() - now < minTime) {
            self.timer = setTimeout(function () {
              self.$emit('complete', target, queue)
            }, minTime - (+Date.now() - now))
          } else {
            self.$emit('complete', target, queue)
          }
        })

        // 加载所有资源，图片，音视频，字体
        queue.loadManifest([
          ...manifest.images,
          ...manifest.media,
          ...manifest.fonts,
          ...manifest.other
        ], false, app.asset(''))

        /* eslint-disable-next-line */
        let items = queue.getItems()
        items = items.map(item => {
          return Object.assign(item, {
            item: Object.assign(item.item, {
              loadTimeout: 999999
            })
          })
        })

        queue.load()
        this.queue = queue
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sk-fading-circle {
    margin: 40vh auto 0;
    width: 40px;
    height: 40px;
    position: relative;
  }

  .sk-fading-circle .sk-circle {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  .sk-fading-circle .sk-circle:before {
    content: '';
    display: block;
    margin: 0 auto;
    width: 15%;
    height: 15%;
    background-color: #fff;
    border-radius: 100%;
    -webkit-animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;
    animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;
  }

  .sk-fading-circle .sk-circle2 {
    -webkit-transform: rotate(30deg);
    -ms-transform: rotate(30deg);
    transform: rotate(30deg);
  }

  .sk-fading-circle .sk-circle3 {
    -webkit-transform: rotate(60deg);
    -ms-transform: rotate(60deg);
    transform: rotate(60deg);
  }

  .sk-fading-circle .sk-circle4 {
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
  }

  .sk-fading-circle .sk-circle5 {
    -webkit-transform: rotate(120deg);
    -ms-transform: rotate(120deg);
    transform: rotate(120deg);
  }

  .sk-fading-circle .sk-circle6 {
    -webkit-transform: rotate(150deg);
    -ms-transform: rotate(150deg);
    transform: rotate(150deg);
  }

  .sk-fading-circle .sk-circle7 {
    -webkit-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  .sk-fading-circle .sk-circle8 {
    -webkit-transform: rotate(210deg);
    -ms-transform: rotate(210deg);
    transform: rotate(210deg);
  }

  .sk-fading-circle .sk-circle9 {
    -webkit-transform: rotate(240deg);
    -ms-transform: rotate(240deg);
    transform: rotate(240deg);
  }

  .sk-fading-circle .sk-circle10 {
    -webkit-transform: rotate(270deg);
    -ms-transform: rotate(270deg);
    transform: rotate(270deg);
  }

  .sk-fading-circle .sk-circle11 {
    -webkit-transform: rotate(300deg);
    -ms-transform: rotate(300deg);
    transform: rotate(300deg);
  }

  .sk-fading-circle .sk-circle12 {
    -webkit-transform: rotate(330deg);
    -ms-transform: rotate(330deg);
    transform: rotate(330deg);
  }

  .sk-fading-circle .sk-circle2:before {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }

  .sk-fading-circle .sk-circle3:before {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  .sk-fading-circle .sk-circle4:before {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }

  .sk-fading-circle .sk-circle5:before {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }

  .sk-fading-circle .sk-circle6:before {
    -webkit-animation-delay: -0.7s;
    animation-delay: -0.7s;
  }

  .sk-fading-circle .sk-circle7:before {
    -webkit-animation-delay: -0.6s;
    animation-delay: -0.6s;
  }

  .sk-fading-circle .sk-circle8:before {
    -webkit-animation-delay: -0.5s;
    animation-delay: -0.5s;
  }

  .sk-fading-circle .sk-circle9:before {
    -webkit-animation-delay: -0.4s;
    animation-delay: -0.4s;
  }

  .sk-fading-circle .sk-circle10:before {
    -webkit-animation-delay: -0.3s;
    animation-delay: -0.3s;
  }

  .sk-fading-circle .sk-circle11:before {
    -webkit-animation-delay: -0.2s;
    animation-delay: -0.2s;
  }

  .sk-fading-circle .sk-circle12:before {
    -webkit-animation-delay: -0.1s;
    animation-delay: -0.1s;
  }

  @-webkit-keyframes sk-circleFadeDelay {
    0%, 39%, 100% {
      opacity: 0;
    }
    40% {
      opacity: 1;
    }
  }

  @keyframes sk-circleFadeDelay {
    0%, 39%, 100% {
      opacity: 0;
    }
    40% {
      opacity: 1;
    }
  }

  .loading {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 99;
  }

  .progress {
    color: #fff;
    text-align: center;
    margin-top: 3vh;
  }
</style>
