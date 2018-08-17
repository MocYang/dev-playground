import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Index'
import CanvasWave from '@/pages/CanvasWave'
import VisibleInView from '@/pages/VisibleInView'
import Previewer from '@/pages/Previewer'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/canvas-wave',
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
    }
  ]
})
