import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';

Vue.use(VueRouter);
Vue.use(VueResource);

/* eslint-disable no-new */
let app = Vue.extend(App);

let router = new VueRouter({
	linkActiveClass: 'active'
});

router.map({
	'/goods': {
		name: goods,
		component: goods
	},
	'/ratings': {
		name: ratings,
		component: ratings
	},
	'/seller': {
		name: seller,
		component: seller
	}
});

router.start(app, '#app');

router.go('/goods');
