import Vue from 'vue'
import Router from 'vue-router'
import Content from '@/components/Content/Content'
//趋势分析
import Survey from '@/components/MenuList/Survey'
import Trend from '@/components/MenuList/Trend'
import ActiveUsers from '@/components/MenuList/ActiveUsers'
import Retained from '@/components/MenuList/Retained'
import Statistics from '@/components/MenuList/Statistics'
import Flow from '@/components/MenuList/flow'
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
import CrashQuery from '@/components/MenuList/CrashQuery/CrashQuery'

//系统管理
import UserMan from '@/components/MenuList/Manage/UserMan/UserMan'
import RoleMan from '@/components/MenuList/Manage/RoleMan/RoleMan'
import SourceMan from '@/components/MenuList/Manage/SourceMan/SourceMan'
import RoleManDetail from '@/components/MenuList/Manage/RoleMan/RoleManDetail'
import RoleManConfig from '@/components/MenuList/Manage/RoleMan/RoleManConfig'
import EnumerationMan from '@/components/MenuList/Manage/EnumerationMan/EnumerationMan'

//日志审计
import LogLogin from '@/components/Log/LogLogin'
import AccessLog from '@/components/Log/AccessLog'
import InterfaceLog from '@/components/Log/InterfaceLog'
import MessagePush from '@/components/Log/MessagePush'
import OperationLog from '@/components/Log/OperationLog'

//无权限
import Jurisdiction from '@/components/Jurisdiction/Jurisdiction'

//修改密码
import ChangePwd from '@/components/ChangePwd/ChangePwd'

//404
import notFound from '@/components/404/404'

import Login from '@/components/Login/Login'

import lockr from 'lockr'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/Content/Survey'
    },
    {
      path: '/Login',
      name: 'Login',
      meta: {
        showComponent: true
      },
      component: Login
    },
    {
      path: '*',
      component: notFound,
      name: 'notFound'
    },
    {
      path: '/Jurisdiction',
      component: Jurisdiction,
      name: 'Jurisdiction'
    },
    {
      path: '/Content',
      name: 'Content',
      component: Content,
      children: [{
        path: '/Content/Survey',
        component: Survey,
        name: 'Survey',
      }
        //趋势分析
        , {
          path: '/Content/Trend',
          component: Trend,
          name: 'Trend',
        },
        {
          path: '/Content/ActiveUsers',
          component: ActiveUsers,
          name: 'ActiveUsers',
        },
        {
          path: '/Content/Retained',
          component: Retained,
          name: 'Retained',
        },
        {
          path: '/Content/Statistics',
          component: Statistics,
          name: 'Statistics',
        },
        {
          path: '/Content/Flow',
          component: Flow,
          name: 'Flow',
        },
        //用户分析
        {
          path: '/Content/Users',
          component: Users,
          name: 'Users',
        },
        {
          path: '/Content/Map',
          component: Map,
          name:'Map'
        },
        {
          path: '/Content/Terminal',
          component: Terminal,
          name:'Terminal'
        },
        {
          path: '/Content/BuriedPoint',
          component: BuriedPoint,
          name:'BuriedPoint'
        },
        {
          path: '/Content/AnalysisRegister/:id/:platId',
          component: AnalysisRegister,
          name: 'AnalysisRegister'
        },
        {
          path: '/Content/Error',
          component: Error,
          name: 'Error',
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
        },
      //  系统管理
        {
          path: '/Content/UserMan',
          component: UserMan,
          name: 'UserMan',
        },
        {
          path: '/Content/RoleMan',
          name: 'RoleMan',
          component: RoleMan
        },
        {
          path: '/Content/RoleManDetail/:id',
          name: 'RoleManDetail',
          component: RoleManDetail
        },
        {
          path: '/Content/SourceMan',
          name: 'SourceMan',
          component: SourceMan
        },
        {
          path: '/Content/RoleManConfig/:menuId/:roleId',
          name: 'RoleManConfig',
          component: RoleManConfig
        },
        {
          path: '/Content/LogLogin',
          name: 'LogLogin',
          component: LogLogin
        },
        {
          path: '/Content/AccessLog',
          name: 'AccessLog',
          component: AccessLog
        },
        {
          path: '/Content/InterfaceLog',
          name: 'InterfaceLog',
          component: InterfaceLog
        },
        {
          path: '/Content/MessagePush',
          name: 'MessagePush',
          component: MessagePush
        },
        {
          path: '/Content/OperationLog',
          name: 'OperationLog',
          component: OperationLog
        },
        {
          path: '/Content/EnumerationMan',
          name: 'EnumerationMan',
          component: EnumerationMan
        },
        {
          path: '/Content/ChangePwd',
          name: 'ChangePwd',
          component: ChangePwd
        },
        {
          path: '/Content/CrashQuery',
          name: 'CrashQuery',
          component: CrashQuery
        },
      ]
    },
  ]
})

router.beforeEach ((to, from, next) => {
  var once = true;
  if (to.name === 'Login') {
    next()
  } else {
      const toName = to.name
      let accessMenu = lockr.get('menuArr')
      let hasLogin = router.app.$cookie.get('adoptToken')
      // 查看路径是否在允许的路由内
      let canGo = findName(toName,accessMenu)
      let firstRoute = firstRouteHandle(accessMenu);
      if (canGo) {
        next()
      } else {
        next({name: firstRoute})
      }
  }
})

function findName(name,nameArr) {
  let i = nameArr.length;
  while (i--) {
    if (name === nameArr[i]) {
      return true;
    }
  }
  return false;
}

function firstRouteHandle(nameArr) {
  return nameArr[0]
}

export default router;
