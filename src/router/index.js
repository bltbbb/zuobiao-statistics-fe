import Vue from 'vue'
import Router from 'vue-router'
import Content from '@/components/Content/Content'
import Survey from '@/components/MenuList/Survey'
import Login from '@/components/Login/Login'

Vue.use(Router)

export default new Router({
    routes: [
        {
          path: '/',
          redirect: '/Content/Survey'
        },
        {
          path: '/',
          name: 'root',
          component: Content
        },
        {
            path: '/Content',
            name: 'Content',
            component: Content,
            children: [{
              path: '/Content/Survey',
              component: Survey
            }]
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
