import Vue from 'vue'
import Router from 'vue-router'
import Content from '@/components/Content/Content'
//趋势分析
import Survey from '@/components/MenuList/Survey'
import Trend from '@/components/MenuList/Trend'
import ActiveUsers from '@/components/MenuList/ActiveUsers'
import Retained from '@/components/MenuList/Retained'
import Statistics from '@/components/MenuList/Statistics'
import flow from '@/components/MenuList/flow'
//用户
import Users from '@/components/MenuList/Users'
import Map from '@/components/MenuList/Map'
import Terminal from '@/components/MenuList/Terminal'
//埋点
import BuriedPoint from '@/components/MenuList/BuriedPoint'
import Error from '@/components/MenuList/Error'
import AnalysisRegister from '@/components/MenuList/AnalysisRegister'
import ErrorDetail from '@/components/MenuList/ErrorDetail'
import DetailMore from '@/components/MenuList/DetailMore'

import Login from '@/components/Login/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Content/Survey'
    },
    {
      path: '/Content',
      name: 'Content',
      component: Content,
      children: [{
        path: '/Content/Survey',
        component: Survey
      }
        //趋势分析
        , {
          path: '/Content/Trend',
          component: Trend
        },
        {
          path: '/Content/ActiveUsers',
          component: ActiveUsers
        },
        {
          path: '/Content/Retained',
          component: Retained
        },
        {
          path: '/Content/Statistics',
          component: Statistics
        },
        {
          path: '/Content/flow',
          component: flow
        },
        //用户分析
        {
          path: '/Content/Users',
          component: Users
        },
        {
          path: '/Content/Map',
          component: Map
        },
        {
          path: '/Content/Terminal',
          component: Terminal
        },
        {
          path: '/Content/BuriedPoint',
          component: BuriedPoint
        },
        {
          path: '/Content/AnalysisRegister',
          name: 'AnalysisRegister',
          component: AnalysisRegister
        },
        {
          path: '/Content/Error',
          component: Error
        },
        {
          path: '/Content/ErrorDetail',
          name: 'ErrorDetail',
          component: ErrorDetail
        },
        {
          path: '/Content/DetailMore',
          name: 'DetailMore',
          component: DetailMore
        }
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      meta: {
        showComponent: true
      },
      component: Login
    }
  ]
})
