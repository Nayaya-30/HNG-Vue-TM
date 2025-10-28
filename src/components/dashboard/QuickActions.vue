<template>
  <div class="bg-white p-8 rounded-2xl shadow-lg dark:bg-gray-800">
    <h3 class="text-2xl font-bold text-gray-800 mb-4 dark:text-white">Quick Actions</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <button
        @click="$router.push('/tickets')"
        class="flex flex-col items-center justify-center p-6 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all group dark:bg-blue-900/30 dark:hover:bg-blue-900/50"
      >
        <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-white">
            <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
            <path d="M13 5v2"/>
            <path d="M18 5v2"/>
            <path d="M2 9h20"/>
          </svg>
        </div>
        <span class="font-semibold text-gray-800 dark:text-white">Manage Tickets</span>
      </button>
      
      <button
        @click="$router.push('/tickets')"
        class="flex flex-col items-center justify-center p-6 bg-green-50 hover:bg-green-100 rounded-xl transition-all group dark:bg-green-900/30 dark:hover:bg-green-900/50"
      >
        <div class="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-white">
            <line x1="12" x2="12" y1="5" y2="19"/>
            <line x1="5" x2="19" y1="12" y2="12"/>
          </svg>
        </div>
        <span class="font-semibold text-gray-800 dark:text-white">Create Ticket</span>
      </button>
      
      <button
        class="flex flex-col items-center justify-center p-6 bg-purple-50 hover:bg-purple-100 rounded-xl transition-all group dark:bg-purple-900/30 dark:hover:bg-purple-900/50"
      >
        <div class="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-white">
            <line x1="12" x2="12" y1="20" y2="10"/>
            <line x1="18" x2="18" y1="20" y2="4"/>
            <line x1="6" x2="6" y1="20" y2="16"/>
          </svg>
        </div>
        <span class="font-semibold text-gray-800 dark:text-white">View Reports</span>
      </button>
      
      <button
        class="flex flex-col items-center justify-center p-6 bg-yellow-50 hover:bg-yellow-100 rounded-xl transition-all group dark:bg-yellow-900/30 dark:hover:bg-yellow-900/50"
      >
        <div class="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-white">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </div>
        <span class="font-semibold text-gray-800 dark:text-white">View Analytics</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuickActions'
}
</script>