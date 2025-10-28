<template>
  <ProtectedRoute>
    <div class="page min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <!-- Navbar -->
      <nav class="bg-white shadow-sm border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <Logo />
            <div class="flex items-center gap-4">
              <button
                @click="$router.push('/tickets')"
                class="hidden md:inline-flex items-center text-gray-600 hover:text-gray-800 font-medium dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md">
                Manage Tickets
              </button>

              <button
                @click="$router.push('/tickets')"
                class="inline-flex md:hidden items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                aria-label="Manage tickets">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                  <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
                  <path d="M13 5v2"/>
                  <path d="M18 5v2"/>
                  <path d="M2 9h20"/>
                </svg>
              </button>

              <button
                @click="handleLogout"
                class="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" x2="9" y1="12" y2="12"/>
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="mb-8">
          <h2 class="text-3xl font-bold text-gray-800 mb-2 dark:text-white">
            Welcome, {{ currentUser?.name || 'User' }}
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            Overview of your ticket management
          </p>
        </div>

        <!-- Stat Cards -->
        <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Total Tickets"
            :value="tickets.length"
            icon="bar-chart"
            bgColor="bg-blue-100 dark:bg-blue-900/30"
            textColor="text-blue-600"
          />
          <StatCard
            title="Open Tickets"
            :value="openTickets"
            icon="ticket"
            bgColor="bg-green-100 dark:bg-green-900/30"
            textColor="text-green-600"
          />
          <StatCard
            title="In Progress"
            :value="inProgressTickets"
            icon="bar-chart"
            bgColor="bg-yellow-100 dark:bg-yellow-900/30"
            textColor="text-yellow-600"
          />
          <StatCard
            title="Resolved Tickets"
            :value="closedTickets"
            icon="check"
            bgColor="bg-purple-100 dark:bg-purple-900/30"
            textColor="text-purple-600"
          />
        </div>

        <QuickActions />
        <AnalyticsChart :tickets="tickets" />
      </div>
    </div>
  </ProtectedRoute>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import Logo from '../components/common/Logo.vue'
import StatCard from '../components/dashboard/StatCard.vue'
import QuickActions from '../components/dashboard/QuickActions.vue'
import AnalyticsChart from '../components/dashboard/AnalyticsChart.vue'
import ProtectedRoute from '../components/common/ProtectedRoute.vue'
import { getTickets, getCurrentUser } from '../utils/storage'
import { isAuthenticated, clearSession } from '../utils/auth'

export default {
  name: 'Dashboard',
  components: {
    Logo,
    StatCard,
    QuickActions,
    AnalyticsChart,
    ProtectedRoute
  },
  setup() {
    const router = useRouter()
    const tickets = ref([])
    const currentUser = ref(null)

    // Load user & protect route
    onMounted(() => {
      const user = getCurrentUser()
      if (!isAuthenticated() || !user) {
        router.push('/login')
      } else {
        currentUser.value = user
        tickets.value = getTickets()
      }
    })

    // Logout handler
    const handleLogout = () => {
      clearSession()
      router.push('/login')
    }

    // Ticket stats
    const openTickets = computed(() => {
      return tickets.value.filter(t => t.status === 'open').length
    })

    const inProgressTickets = computed(() => {
      return tickets.value.filter(t => t.status === 'in_progress').length
    })

    const closedTickets = computed(() => {
      return tickets.value.filter(t => t.status === 'closed').length
    })

    return {
      tickets,
      currentUser,
      openTickets,
      inProgressTickets,
      closedTickets,
      handleLogout
    }
  }
}
</script>