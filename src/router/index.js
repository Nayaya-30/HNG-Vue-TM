import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../pages/LandingPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import SignupPage from '../pages/SignupPage.vue'
import Dashboard from '../pages/Dashboard.vue'
import Tickets from '../pages/Tickets.vue'
import ProtectedRoute from '../components/common/ProtectedRoute.vue'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/login', component: LoginPage },
  { path: '/signup', component: SignupPage },
  { 
    path: '/dashboard', 
    component: () => import('../pages/Dashboard.vue'),
    beforeEnter: (to, from, next) => {
      // Check if user is authenticated
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('currentUser')
      if (token && user) {
        next()
      } else {
        next('/login')
      }
    }
  },
  { 
    path: '/tickets', 
    component: () => import('../pages/Tickets.vue'),
    beforeEnter: (to, from, next) => {
      // Check if user is authenticated
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('currentUser')
      if (token && user) {
        next()
      } else {
        next('/login')
      }
    }
  }
]

const router = createRouter({ history: createWebHistory(), routes })
export default router