// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import store from './store'
import './config/rem'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.config.productionTip = false

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

Vue.use(VueResource);
Vue.use(MintUI);

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
  	components: { App },
	store,
})
