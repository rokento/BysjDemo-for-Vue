import Vue from 'vue'
import Router from 'vue-router'
import Register from "../components/register/Register";
import ErrorPage from "../components/error/ErrorPage";
import EditTouxiang from "../components/user/EditTouxiang";

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home => import('../components/home/Home')
  },
  {
    path: '/edit',
    name: 'Edit',
    component: Editor => import('../components/editor/Editor')
  },
  {
    path: '/toLogin',
    name: 'Login',
    component: Login => import('../components/Login/Login')
  },
  {
    path: '/toRegister',
    name: 'Register',
    component: Register => import('../components/register/Register')
  },
  {
    path: '/err',
    name: 'ErrorPage',
    component: ErrorPage => import('../components/error/ErrorPage')
  },
  {
    path: '/editTouXiang',
    name: 'EditTouxiang',
    component: EditTouXiang => import('../components/user/EditTouxiang')
  },
  {
    path: '/upload',
    name: 'upload',
    component: upload => import('../components/words/upload')
  },
  {
    path: '/preview',
    name: 'Preview',
    component: Preview => import('../components/editor/Preview')
  },
  {
    path: '/myfile',
    name: 'myfile',
    component: myfile => import('../components/words/myfile')
  },
  {
    path: '/filehis',
    name: 'filehis',
    component: filehis => import('../components/editor/his')
  },
  {
    path: '/history',
    name: 'history',
    component: history => import('../components/user/History')
  },
  {
    path: '/find',
    name: 'find',
    component: find => import('../components/words/Find')
  },
  {
    path: '/sc',
    name: 'sc',
    component: sc => import('../components/user/Soucang')
  }

]

export default new Router({
  routes,
  mode:'history'
})
