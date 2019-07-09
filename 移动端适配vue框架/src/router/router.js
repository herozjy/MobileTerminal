import Vue from 'vue'
//配置路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//1.创建组件
import HelloWorld from '../components/HelloWorld'
import home from '../components/Home'
import news from '../components/News'


//2.配置路由   注意：名字

const routes = [
  {path:"/",component:HelloWorld},
  {path:"/home",component:home},
  {path:"/news",component:news},
];


//3.实例化VueRouter  注意：名字

const router = new VueRouter({
  // mode: 'history',   /*hash模式改为history时有可能出现npm run dev正常显示，npm run build打包之后没有内容*/ 
  routes // （缩写）相当于 routes: routes
})


//5 <router-view></router-view> 放在 App.vue

export default router;






