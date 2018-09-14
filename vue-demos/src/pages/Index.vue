<template>
  <div class="app__content">
    <div class="layer hidden"></div>
    <g-swiper class="gswiper-container" ref="outerSwiper" :options="swiperOption">
      <g-slider slide-id="page1" class="page page-list">
        <router-link class="link-elem" to="/wave">水波图</router-link>
        <router-link class="link-elem" to="/webpack-sprites">webpack-sprites生成精灵图</router-link>
      </g-slider>
      <g-slider slide-id="page2" class="page page2">
        <button @click="showElem1">show elem1</button>
        <button @click="toggleElem2">show elem2</button>
        <div ref="elem1Ref" v-show="elem1Show" class="e1">I am here.</div>
        <div ref="elem2Ref" v-if="elem2Show" class="e2">you cannot see me.</div>
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
      this.showPage('page2')
    },
    data () {
      return {
        swiperOption: {
          direction: 'vertical',
          effect: 'fade',
          keyboard: true
        },

        elem1Show: false,
        elem2Show: false
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
      },

      showElem1 () {
        this.elem1Show = true
      },

      toggleElem2 () {
        this.elem2Show = !this.elem2Show

        this.$nextTick(function () {
          if (this.elem2Show) {
            const elem2Ref = this.$refs.elem2Ref
            console.log(elem2Ref)
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page2 {
  flex-direction: column;
}
</style>
