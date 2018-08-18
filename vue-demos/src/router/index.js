import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import CanvasWave from '@/pages/CanvasWave'
import WebpackSprites from '@/pages/WebpackSprite'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/wave',
      name: 'CanvasWave',
      component: CanvasWave
    },
    {
      path: '/webpack-sprites',
      name: 'WebpackSprites',
      component: WebpackSprites
    }
  ]
})
