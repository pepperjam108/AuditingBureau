import { createRouter, createWebHistory } from 'vue-router'

import menu from '../views/menu.vue'
import FoRm1 from '../views/FoRm1.vue';
import FoRm2 from '../views/FoRm2.vue';
import FoRm3 from '../views/FoRm3.vue';
import FoRm4 from '../views/FoRm4.vue';
import FoRm5 from '../views/FoRm5.vue';
import FoRm6 from '../views/FoRm6.vue';
import FoRm7 from '../views/FoRm7.vue';
import FoRm8 from '../views/FoRm8.vue';
import FoRm9 from '../views/FoRm9.vue';
import FoRm10 from '../views/FoRm10.vue';
import FoRm11 from '../views/FoRm11.vue';
import FoRm12 from '../views/FoRm12.vue';
import FoRm13 from '../views/FoRm13.vue';
import FoRm14 from '../views/FoRm14.vue';
import FoRm15 from '../views/FoRm15.vue';
import FoRm16 from '../views/FoRm16.vue';
import FoRm17 from '../views/FoRm17.vue';
import FoRm18 from '../views/FoRm18.vue';
import FoRm19 from '../views/FoRm19.vue';
import FoRm20 from '../views/FoRm20.vue';
import FoRm21 from '../views/FoRm21.vue';
import FoRm22 from '../views/FoRm22.vue';
import FoRm23 from '../views/FoRm23.vue';
import FoRm24 from '../views/FoRm24.vue';
import IF from '../views/SimplifyInterface.vue';
const routes = [
  {
    path:'/',
    redirect:'/1',
    name: 'menu',
    component: menu,
    children: [
      { path: '/1', component: FoRm1 },
      { path: '/2', component: FoRm2 },
      { path: '/3', component: FoRm3 },
      { path: '/4', component: FoRm4 },
      { path: '/5', component: FoRm5 },
      { path: '/6', component: FoRm6 },
      { path: '/7', component: FoRm7 },
      { path: '/8', component: FoRm8 },
      { path: '/9', component: FoRm9 },
      { path: '/10', component: FoRm10 },
      { path: '/11', component: FoRm11 },
      { path: '/12', component: FoRm12 },
      { path: '/13', component: FoRm13 },
      { path: '/14', component: FoRm14 },
      { path: '/15', component: FoRm15 },
      { path: '/16', component: FoRm16},
      { path: '/17', component: FoRm17 },
      { path: '/18', component: FoRm18 },
      { path: '/19', component: FoRm19 },
      { path: '/20', component: FoRm20 },
      { path: '/21', component: FoRm21 },
      { path: '/22', component: FoRm22 },
      { path: '/23', component: FoRm23 },
      { path: '/24', component: FoRm24 },
      {path:  '/25',component: IF}
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
