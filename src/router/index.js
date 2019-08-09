import Vue from 'vue'
import Router from 'vue-router'
import ArticleListView from '@/components/ArticleListView'
import ArticleDetail from '@/components/Contents/ArticleDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ArticleListView',
      component: ArticleListView
    },
    {
      path: '/detail/article/:no',
      name: 'ArticleDetail',
      component: ArticleDetail,
      props: true
    }
  ]
})
