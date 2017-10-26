// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routes from './router'
import FastClick from 'fastclick'
import store from './store'
import './config/rem'
import MintUI from 'mint-ui'

Vue.config.productionTip = false

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(MintUI);

const router = new VueRouter({
	routes,
	mode: 'history'
});

/* eslint-disable no-new */
new Vue({
	router,
	store,
}).$mount('#app')
