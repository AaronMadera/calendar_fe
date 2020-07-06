import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../components/Login.vue')
  },
  {
    path: '/',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ '../views/Layout.vue'),
    children: [
      {
        path: '/events',
        name: 'events',
        component: () => import(/* webpackChunkName: "events" */ '../views/Events/index')
      },
      {
        path: '/users',
        name: 'users',
        component: () => import(/* webpackChunkName: "users" */ '../views/Users/index')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const {expires,isLogged} = store.state;
  const now = Date.now();

  if (isLogged && store.getters.getUser && now < expires) { 
    const { isAdmin } = store.getters.getUser;
    if (to.name === 'login')return next({ name: 'home' });
    if (to.meta && to.meta.isAdmin && !isAdmin) return next({ name: 'home' });
    return next();
  } else if (to.name === 'login') return next();
  else return next({name:'login'});
});

export default router
