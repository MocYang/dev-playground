import Vue from 'vue'
import Router from 'vue-router'
import CanvasWave from '@/pages/CanvasWave'
import VisibleInView from '@/pages/VisibleInView'
import Previewer from '@/pages/Previewer'
import Index from '@/pages/Index'
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
      path: '/visible-in-view',
      name: 'VisibleInView',
      component: VisibleInView
    },
    {
      path: '/previewer',
      name: 'Previewer',
      component: Previewer
    },
    {
      path: '/webpack-sprites',
      name: 'WebpackSprites',
      component: WebpackSprites
    }
  ]
})
