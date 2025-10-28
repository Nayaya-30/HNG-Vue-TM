<template>
  <div v-if="isAuthenticated && user">
    <slot />
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h2 class="text-2xl font-bold mb-4">Access Denied</h2>
      <p class="mb-6">You need to be logged in to view this page.</p>
      <router-link to="/login" class="bg-blue-600 text-white px-4 py-2 rounded">
        Go to Login
      </router-link>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { isAuthenticated, getCurrentUser } from '../../utils/auth'

export default {
  name: 'ProtectedRoute',
  setup() {
    const router = useRouter()
    const user = ref(null)
    const authenticated = ref(false)

    onMounted(() => {
      user.value = getCurrentUser()
      authenticated.value = isAuthenticated()
      
      if (!authenticated.value || !user.value) {
        router.push('/login')
      }
    })

    return {
      isAuthenticated: authenticated,
      user
    }
  }
}
</script>