<template>
  <div class="bgm-wrapper" ref="bgmRef"></div>
</template>
<script>
  /* eslint-disable */
  export default {
    name: 'BgmButton',
    props: {
      src: {
        type: String,
        required: true
      },
      volume: {
        type: Number,
        default: 1
      },
      autoplay: {
        type: Boolean,
        default: true
      },
      wechat: {
        type: Boolean,
        default: true
      },
      controls: {
        type: Boolean,
        default: false
      },
      preload: {
        type: String,
        default: 'auto'
      },
      muted: {
        type: Boolean,
        default: false
      },
      interactive: {
        type: Boolean,
        default: false
      }
    },

    mounted () {
      this._insertAudioElement()
      this._handleWindowEvent()
    },

    beforeDestroy () {

    },

    data () {
      return {
        audio: null,
        paused: false
      }
    },
    methods: {
      _insertAudioElement () {
        const self = this
        const audioElem = document.createElement('audio')
        const sourceElem = document.createElement('source')
        audioElem.oncanplay = function () {
          self._autoPlay()
        }

        sourceElem.src = this.src
        sourceElem.type = 'audio/mp3'
        audioElem.appendChild(sourceElem)
        this.audio = audioElem
        this._initParam()
        this.$refs.bgmRef.appendChild(audioElem)

        this._autoPlay()
      },

      // 手机上的普通浏览器（chrome，safari）需要一次用户事件才能播放
      // 微信，PC浏览器可以自动播放
      _handleWindowEvent () {
        if (this.audio.paused && this.interactive) {
          window.addEventListener('touchstart', this._handleWindowInteractivePlay)
          window.addEventListener('click', this._handleWindowInteractivePlay)
          window.addEventListener('mousedown', this._handleWindowInteractivePlay)
        }
      },

      _removeWindowEvent () {
        window.removeEventListener('touchstart', this._handleWindowInteractivePlay)
        window.removeEventListener('click', this._handleWindowInteractivePlay)
        window.removeEventListener('mousedown', this._handleWindowInteractivePlay)
      },

      _handleWindowInteractivePlay () {
        this._autoPlay()
        this._removeWindowEvent()
      },

      _initParam () {
        const {
          volume,
          preload,
          autoplay,
          controls
        } = this

        this.audio.volume = volume
        this.audio.preload = preload

        if (autoplay) {
          this.audio.autoplay = true
        }
        if (controls) {
          this.audio.controls = controls
        }
      },

      _autoPlay () {
        if (!this.autoplay) {
          this.pause()
          return
        }
        if (this.wechat) {
          window.document.addEventListener('WeixinJSBridgeReady', function () {
            this.play()
          }.bind(this))
        }

        this.play()
      },

      reset () {
        this.audio.currentTime = 0
        this.pause()
      },

      play () {
        this.audio.play()
        this.paused = false
      },

      pause () {
        this.audio.pause()
        this.paused = true
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
