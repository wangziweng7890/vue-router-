import Vue from 'vue'
import Krouter from './KRouter/krouter'

Vue.config.productionTip = false
Vue.use(Krouter)
export default new Krouter({
  routes:[{
    path:'/',
    component:()=>import('./view/one.vue')
  },
  {
    path:'/two',
    component:()=>import('./view/two.vue')
  }
]
})
