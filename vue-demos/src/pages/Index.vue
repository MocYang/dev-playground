<template>
  <div class="app__content">
    <div class="layer hidden"></div>
    <g-swiper class="gswiper-container" ref="outerSwiper" :options="swiperOption">
      <g-slider slide-id="page1" class="page page1">
        <div class="icons">
          <div class="icon icon-q1"></div>
          <div class="icon icon-q2"></div>
          <div class="icon icon-q3"></div>
          <div class="icon icon-q4"></div>
        </div>
      </g-slider>>
    </g-swiper>
  </div>
</template>

<script>
  // 参考链接：https://mp.weixin.qq.com/s/mLNmm-GyXwiXLPB0i9E1_A
  import '@/assets/styles/sprites/sprite.scss'
  import '@/assets/styles/style.scss'

  export default {
    name: 'Index',
    components: {},
    props: {},
    created () {

    },
    mounted () {
      this.showPage('page2')
    },
    data () {
      return {
        swiperOption: {
          direction: 'vertical',
          effect: 'fade',
          keyword: true
        }
      }
    },
    computed: {
      gSwiper () {
        return this.$refs.outerSwiper
      }
    },
    methods: {
      showPage (pageId) {
        this.gSwiper.gSlideTo(pageId)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
