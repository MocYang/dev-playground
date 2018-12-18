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

      <g-slider slide-id="page-preload" class="page page-preload">
        <canvas id="canvas"></canvas>
      </g-slider>
    </g-swiper>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    components: {},
    props: {},
    created () {

    },
    mounted () {

    },
    data () {
      return {
        swiperOption: {
          direction: 'vertical',
          effect: 'fade',
          keyboard: true
        },
        layerShow: ''
      }
    },
    computed: {
      gSwiper () {
        return this.$refs.outerSwiper
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

      handlePreloadComplete () {
        this.showPage('page1')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
