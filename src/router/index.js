import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const mode = 'hash' // hash | history
const router = new Router({
  mode,
  base: '/',
  routes,
})

export default router
