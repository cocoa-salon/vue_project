import Vue from 'vue'
import Router from 'vue-router'
import ContentsList from '@/components/ContentsList'
import ArticleDetail from '@/components/ArticleDetail'

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
      name: 'ArticleDetail',
      component: ArticleDetail,
      props: true
    }
  ]
})
