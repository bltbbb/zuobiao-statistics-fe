import Vue from 'vue'
import Router from 'vue-router'
import App from '@/components/MenuList/Survey'
import Survey from '@/components/MenuList/Survey'
import TrendAnalysis from '@/components/MenuList/TrendAnalysis'
import Login from '@/components/Login/Login'

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
        },
        {
        path: '/Login',
        name: 'Login',
        meta: {
          showComponent: true
        },
        component: Login
      },
    ]
})
