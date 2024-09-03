const Error404 = () =>
  import(/* webpackChunkName:'error' */ '@/views/ErrorPage/404.vue')

const Games = () => import(/* webpackChunkName:'Games' */ '@/views/Games')

const routes = [
  {
    path: '/',
    redirect: '/games',
  },
  {
    path: '/games',
    component: Games,
    name: 'games',
  },
  {
    path: '*',
    name: '404',
    component: Error404,
  },
]

export default routes
