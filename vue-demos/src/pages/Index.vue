<template>
  <div class="app__content">
    <div class="layer hidden"></div>
    <g-swiper class="gswiper-container" ref="outerSwiper" :options="swiperOption">
      <g-slider slide-id="page1" class="page page-list">
        <router-link class="link-elem" to="/wave">水波图</router-link>
        <router-link class="link-elem" to="/wave">问答QA</router-link>
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
      // this.showPage('page2')
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
