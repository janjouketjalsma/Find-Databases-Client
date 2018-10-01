import Vue from 'vue'
import Router from 'vue-router'
import FindDatabases from '@/components/FindDatabases'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FindDatabases',
      component: FindDatabases
    }
  ]
})
