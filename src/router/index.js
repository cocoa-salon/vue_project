import Vue from 'vue'
import Router from 'vue-router'
import ContentsList from '@/components/ContentsList'
import ListDetail from '@/components/ListDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ContentsList',
      component: ContentsList
    },
    {
      path: '/detail/article/:no',
      name: 'ListDetail',
      component: ListDetail,
      props: true
    }
  ]
})
