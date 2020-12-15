import Vue from "vue"
import VueRouter from "vue-router"
import Goods from "../views/Goods.vue"
import Ratings from "../views/Ratings.vue"
import Seller from "../views/Seller.vue"

Vue.use(VueRouter)

const routes = [
	
	{ path: '/', redirect: '/goods' },
	{
		path: '/goods',
		name: 'Goods',
		component: Goods,
    },
    {
		path: '/ratings',
		name: 'Ratings',
		component: Ratings,
    },
    {
		path: '/seller',
		name: 'Seller',
		component: Seller,
	},
	
]

const router = new VueRouter({
	routes,
})

export default router
