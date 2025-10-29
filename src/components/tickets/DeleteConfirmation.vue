<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class=" rounded-2xl shadow-2xl max-w-md w-full p-8 bg-gray-900/50">
      <div class="text-center">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-red-900/30">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-red-600 dark:text-red-400">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" x2="12" y1="8" y2="12"/>
            <line x1="12" x2="12.01" y1="16" y2="16"/>
          </svg>
        </div>
        <h3 class="text-2xl font-bold mb-2 text-white">Delete Ticket?</h3>
        <p class=" mb-6 text-gray-300">This action cannot be undone. Are you sure you want to delete this ticket?</p>
        <div class="flex gap-4">
          <button
            @click="$emit('handle-delete', deleteConfirm)"
            class="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-all"
          >
            Yes, Delete
          </button>
          <button
            @click="$emit('set-delete-confirm', null)"
            class="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeleteConfirmation',
  props: {
    deleteConfirm: {
      type: [Number, String],
      required: true
    }
  },
  emits: ['handle-delete', 'set-delete-confirm']
}
</script>