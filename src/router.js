import Vue from 'vue'
import Router from 'vue-router'

const index = r => require.ensure([], () => r(require('./components/index.vue')), 'index');
const bar = r => require.ensure([], () => r(require('./components/bar.vue')), 'bar');
const line = r => require.ensure([], () => r(require('./components/line.vue')), 'line');

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: index,
    },
    {
      path: '/bar',//柱形图
      component: bar
    },
    {
      path: '/line',//线  坐标轴
      component: line
    },
  ]
})
