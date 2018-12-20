<template>
  <div class="app__content">
    <div v-if="layerShow !== ''" class="layer layer-container">
      <div v-if="layerShow === 'layer-example'" class="layer layer__example">
        <div class="layer__content">
          <span class="layer__close" @click="hideLayer">X</span>
          浮层内容
          <div class="btn btn__confirm" @click="hideLayer">确定</div>
        </div>
      </div>
    </div>

    <g-swiper class="gswiper-container" ref="outerSwiper" :options="swiperOption">
      <g-slider slide-id="page-preload" class="page page-preload">
        <preload @complete="handlePreloadComplete"></preload>
      </g-slider>

      <g-slider slide-id="page1" class="page page1 flex flex-center">
        <button class="btn btn-play" @click="handlePlayVideo">play</button>
      </g-slider>

      <g-slider slide-id="page-video" class="page page-preload">
        <canvas id="canvas"></canvas>
        <!--<video-->
        <!--ref="videoRef"-->
        <!--x5-video-player-type="h5"-->
        <!--x5-video-player-fullscreen="true"-->
        <!--x-webkit-airplay="true"-->
        <!--airplay="allow"-->
        <!--playsinline-->
        <!--webkit-playsinline-->
        <!--preload="metadata"-->
        <!--style="width: 100%; height: 100%; object-fit: cover; display: inline;"-->
        <!--&gt;-->
        <!--<source :src="media.xiangfei.src" type="video/mp4">-->
        <!--</video>-->
      </g-slider>
    </g-swiper>
  </div>
</template>

<script>
  import axios from 'axios'
  import Snapshot from '../components/SnapShot/Index'
  import WindowResizer from './windowResize'
  import media from './mediaConfig'

  export default {
    name: 'Index',
    components: {
      Snapshot
    },
    props: {},
    created () {

    },
    async mounted () {
      WindowResizer.init(() => {
        this.handleFreshGSwiper()
      })

      this.handleFreshGSwiper()

      this.initJSMpeg()
    },
    data () {
      return {
        swiperOption: {
          direction: 'vertical',
          effect: 'fade',
          keyboard: true,
          speed: 20
        },
        layerShow: '',

        media,

        player: null
      }
    },
    computed: {
      gSwiper () {
        return this.$refs.outerSwiper
      },
      video () {
        return this.$refs.videoRef
      },
      snapShopWrapper () {
        return this.$refs.snapShotWrapperRef
      }
    },
    methods: {
      showPage (page) {
        this.gSwiper.gSlideTo(page)
      },

      showLayer (layerId = '') {
        this.layerShow = layerId
      },

      hideLayer () {
        this.layerShow = ''
      },

      async handlePreloadMpgFile () {
        try {
          console.log('get', this.media.main.src)
          await axios.get(this.media.main.src + '?0-1048575', {
            headers: { 'Accept': '*/*' }
          })
        } catch (e) {

        }
      },

      initJSMpeg () {
        let canvas = document.querySelector('#canvas')
        this.player = new window.JSMpeg.Player(this.media.main.src, {
          canvas,
          loop: false,
          autoplay: false,
          // videoBufferSize: 1024 * 1024,
          // audioBufferSize: 1024 * 1024,
          // chunkSize: 1024 * 512,
          // progressive: true,

          // fist receive data
          onSourceEstablished: () => {
            console.log('source established.')
          },
          // receive all data
          // FIXME: 触发过多次
          onSourceCompleted: () => {
            console.log('source completed')
          }
        })
      },

      handlePreloadComplete () {
        this.showPage('page1')
        // this.video.currentTime = 0.5
        // this.video.pause()
      },

      handleFreshGSwiper () {
        this.gSwiper.update()
      },

      handlePlayVideo () {
        // trick 1，为了不让播放开始时，出现瞬间的黑屏，在play事件中才跳到视频页
        // this.video.play()
        // this.video.addEventListener('play', () => {
        //   this.showPage('page-video')
        // })

        this.player.play()

        // 允许播放声音
        this.player.audioOut.unlock()


        this.showPage('page-video')
      },

      handleTakeSnapshot () {
        this.$refs.snapShotRef
          .create(this.$refs.snapShotWrapperRef)
          .then((src, canvas) => {

          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
