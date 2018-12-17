<template>
  <div class="loading" :style="{background}">
    <slot v-bind:progress="formatProgress">
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
  import '../../../static/js/createjs.min'
  const packageConfig = require('../../../package')
  export default {
    name: 'Preload',
    props: {
      // watch模式下，是否指定掉过加载的过程
      mode: {
        type: String,
        default: '',
        validator: function (value) {
          return ['', 'watch'].indexOf(value) !== -1
        }
      },

      // 最短加载时间, 单位毫秒
      min: {
        type: Number,
        default: 1000
      },

      preferXHR: {
        type: Boolean,
        default: false
      },

      // 是否请求manifest.json文件
      fetch: {
        type: Boolean,
        default: true
      },

      // 额外加载的资源
      manifest: {
        type: Array
      },

      exclude: {
        type: Array,
        default: function () {
          return []
        }
      },

      crossOrigin: {
        type: Boolean,
        default: false
      },

      basePath: {
        type: String
      },

      background: {
        type: String,
        default: 'rgba(0, 0, 0, .66)'
      }
    },
    created () {
      const $app = this.$app || {}
      // watch和build模式下，可以决定是否加manifest.json
      if (this.fetch) {
        if ($app.__watch__ || $app.__prod__) {
          this.handleGetManifest()
        }
      } else {
        this.startLoadAssets()
      }
    },
    mounted () {
      const $app = this.$app || {}
      // dev 模式下，不加载manifest.json文件且直接结束加载
      if (($app.__dev__ && !$app.__watch__) || !this.fetch) {
        this._complete()
        return
      }

      // 只有在watch模式下，才可能跳过加载过程，production模式，mode无效
      if ($app.__watch__ && this.mode === 'watch' && !$app.__prod__) {
        this._complete()
      }
    },
    data () {
      return {
        progress: 0,
        queue: null,
        timer: null,
        manifestInternal: {},
        excludeInternal: this._processExcludeFiles(),
        assetPublicPath: this.basePath !== undefined ? this.basePath : this.$app.asset('')
      }
    },
    computed: {
      formatProgress () {
        return Math.floor(this.progress * 100)
      }
    },
    methods: {
      async handleGetManifest () {
        const app = this.$app
        let assetRoot = ''
        if (app.__prod__) {
          assetRoot = packageConfig.assets.publicPath.build
        } else if (app.__watch__) {
          assetRoot = packageConfig.assets.publicPath.watch
        } else {
          assetRoot = 'dist'
        }
        try {
          let params = {}
          if (this.crossOrigin) {
            params['withCredentials'] = true
          }
          let manifestUrl = app.asset(assetRoot + '/manifest.json')
          let randomSeek = (Math.random() * 0xffffff).toString(16).slice(-6)
          const res = await this.$axios.get(`${manifestUrl}?opt=${randomSeek}`, params)
          this.startLoadAssets(res.data)
        } catch (e) {
          this.startLoadAssets()
          console.error(e)
        }
      },

      _complete (p = 1) {
        this.progress = p
        this.$nextTick(function () {
          this.$emit('complete', this.progress)
        })
      },

      _processExcludeFiles () {
        const defaultExclude = ['.js', '.map']

        return Array.from(new Set([...this.exclude, ...defaultExclude]))
      },

      _isAssetImages (ext) {
        return (/\.(png|jpe?g|gif|svg)$/).test(ext)
      },

      _isAssetFonts (ext) {
        return (/\.(woff2?|eot|ttf|otf)$/).test(ext)
      },

      _isAssetMedia (ext) {
        return (/\.(mp4|webm|ogg|mp3|wav|flac|acc|flv)$/).test(ext)
      },

      _isAssetInclude (ext) {
        return this.excludeInternal.indexOf(ext) === -1
      },
      mapManifest (assetsObj) {
        let manifest = {
          images: [],
          fonts: [],
          media: [],
          other: []
        }

        const attachExt = (nameArr) => [nameArr[0], '.' + nameArr[1]]

        const getFullNameArr = (key) => {
          if (!key.indexOf('/')) {
            return attachExt(key.split('.'))
          }

          const fileFullName = key.slice(key.lastIndexOf('/') + 1)
          return attachExt(fileFullName.split('.'))
        }

        if (this.manifest) {
          manifest['other'] = this.manifest.reduce((acc, item) => {
            if (Object.prototype.toString.call(item) === '[object Object]') {
              acc.push({
                ...item,
                id: item.id !== null && item.id !== undefined ? item.id : getFullNameArr(item.src)[0]
              })
            } else if (Object.prototype.toString.call(item) === '[object String]') {
              // 过滤掉base64字符串
              if (!/data:image/.test(item)) {
                acc.push({
                  id: getFullNameArr(item)[0],
                  src: item
                })
              }
            }
            return acc
          }, [])
        }

        for (let key in assetsObj) {
          const fullName = getFullNameArr(key)
          const fileName = fullName[0]
          const ext = fullName[1]
          if (this._isAssetInclude(ext)) {
            const assetItem = {
              id: fileName,
              src: assetsObj[key]
            }
            if (this._isAssetImages(ext)) {
              manifest['images'].push(assetItem)
            } else if (this._isAssetFonts(ext)) {
              manifest['fonts'].push(assetItem)
            } else if (this._isAssetMedia(ext)) {
              manifest['media'].push(assetItem)
            }
          }
        }
        return manifest
      },
      startLoadAssets (assets = {}) {
        const self = this
        const manifest = this.mapManifest(assets)
        const minTime = this.min
        const now = +Date.now()

        // console.log(manifest)
        this.manifestInternal = manifest

        /* eslint-disable-next-line */
        const queue = new window.createjs.LoadQueue(this.preferXHR, this.assetPublicPath, this.crossOrigin)

        queue.on('progress', (target) => {
          const progress = target.progress
          this.progress = progress
          this.$emit('progress', Math.floor(progress * 100))
        })

        queue.on('complete', (target) => {
          this.progress = 1
          queue.close()
          if (this.mode === 'watch' && !this.$app.__prod__ && this.$app.__watch__) {
            return
          }
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
        ], false)

        /* eslint-disable-next-line */
        let items = queue.getItems()
        items = items.map(item => {
          return Object.assign(item, {
            item: Object.assign(item.item, {
              loadTimeout: 999999,
              crossOrigin: self.crossOrigin ? 'Anonymous' : false
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
    /*margin: 40vh auto 0;*/
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
