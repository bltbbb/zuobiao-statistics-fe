import Vue from 'vue'
import Router from 'vue-router'
import Survey from '@/components/MenuList/Survey'
import TrendAnalysis from '@/components/MenuList/TrendAnalysis'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Survey',
      name: 'Hello',
      component: Survey
    },
    {
      path: '/TrendAnalysis',
      name: 'TrendAnalysis',
      component: TrendAnalysis
    }
  ]
})
