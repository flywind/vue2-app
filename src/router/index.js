import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home/home'
import trending from '@/page/trending/trending'
import subscriptions from '@/page/subscriptions/subscriptions'
import activity from '@/page/activity/activity'
import mycontacts from '@/page/activity/children/mycontacts'
import addcontacts from '@/page/activity/children/addcontacts'
import library from '@/page/library/library'
import libhistory from '@/page/library/children/history'
import myvideos from '@/page/library/children/myvideos'
import watchlater from '@/page/library/children/watchlater'
import signin from '@/page/signin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    //首页
    {
    	path: '/home',
    	name: 'home',
    	component:home
    },
    //热门、流行趋势
    {
	    path: '/trending',
	    name: 'trending',
	    component: trending
    },
    //订阅
    {
	    path: '/subscriptions',
	    name: 'subscriptions',
	    component: subscriptions
    },
    //活动
    {
	    path: '/activity',
	    name: 'activity',
	    component: activity
    },
    {
	    path: '/activity/mycontacts',
	    name: 'mycontacts',
	    component: mycontacts
    },
    {
	    path: '/activity/addcontacts',
	    name: 'addcontacts',
	    component: addcontacts
    },
    //媒体库
    {
	    path: '/library',
	    name: 'library',
	    component: library
    },
    {
	    path: '/library/history',
	    name: 'libhistory',
	    component: libhistory
    },
    {
	    path: '/library/watchlater',
	    name: 'watchlater',
	    component: watchlater
    },
    {
	    path: '/library/myvideos',
	    name: 'myvideos',
	    component: myvideos
    },
    //登录
    {
	    path: '/signin',
	    name: 'signin',
	    component: signin
    }
  ]
})