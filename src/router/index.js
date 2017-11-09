import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const trending = r => require.ensure([], () => r(require('../page/trending/trending')), 'trending')
const subscriptions = r => require.ensure([], () => r(require('../page/subscriptions/subscriptions')), 'subscriptions')
const activity = r => require.ensure([], () => r(require('../page/activity/activity')), 'activity')
const mycontacts = r => require.ensure([], () => r(require('../page/activity/children/mycontacts')), 'mycontacts')
const addcontacts = r => require.ensure([], () => r(require('../page/activity/children/addcontacts')), 'addcontacts')
const library = r => require.ensure([], () => r(require('../page/library/library')), 'library')
const libhistory = r => require.ensure([], () => r(require('../page/library/children/history')), 'history')
const myvideos = r => require.ensure([], () => r(require('../page/library/children/myvideos')), 'myvideos')
const watchlater = r => require.ensure([], () => r(require('../page/library/children/watchlater')), 'watchlater')

export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/home'
        },
        //首页
        {
        	path: '/home',
        	component:home
        },
        //热门、流行趋势
        {
            path: '/trending',
            component: trending
        },
        //订阅
        {
            path: '/subscriptions',
            component: subscriptions
        },
        //活动
        {
            path: '/activity',
            component: activity
        },
        {
            path: '/activity/mycontacts',
            component: mycontacts
        },
        {
            path: '/activity/addcontacts',
            component: addcontacts
        },
        //媒体库
        {
            path: '/library',
            component: library
        },
        {
            path: '/library/history',
            component: libhistory
        },
        {
            path: '/library/watchlater',
            component: watchlater
        },
        {
            path: '/library/myvideos',
            component: myvideos
        }
    ]
}]