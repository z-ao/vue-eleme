import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import App from './App';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';

Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [{
		path: '/goods', component: goods
    },
    {
		path: '/seller', component: seller
	},
    {
		path: '/ratings', component: ratings}
];

let router = new VueRouter({
  routes: routes,
  linkActiveClass: 'active',
  hashbang: false,
  redirect: {
	'/dist': '/'
	}
});

new Vue({
	router: router,
	render: h => h(App)
}).$mount('#app');

router.push('/goods');
