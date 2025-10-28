<template>
  <div class="relative bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all dark:bg-gray-800 dark:border-gray-700">
    <!-- action icons - positioned top-right -->
    <div class="absolute bottom-4 right-4 flex items-center gap-2">
      <button
        @click="$emit('start-edit', ticket)"
        aria-label="Edit ticket"
        class="p-2 rounded-full text-blue-50 bg-blue-600 hover:bg-blue-700 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
        </svg>
      </button>
      <button
        @click="$emit('set-delete-confirm', ticket.id)"
        aria-label="Delete ticket"
        class="p-2 rounded-full text-red-50 bg-red-600 hover:bg-red-700 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
          <path d="M3 6h18"/>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
        </svg>
      </button>
    </div>

    <div class="flex items-start gap-4 mb-4">
      <h3 class="text-lg font-bold text-gray-800 flex-1 pr-12 dark:text-white">
        {{ ticket.title }}
      </h3>
      <span
        class="px-3 py-1 rounded-full text-xs font-semibold border"
        :class="getStatusColor(ticket.status)">
        {{ ticket.status.replace('_', ' ').toUpperCase() }}
      </span>
    </div>

    <p v-if="ticket.description" class="text-gray-600 text-sm mb-4 line-clamp-2 dark:text-gray-300">
      {{ ticket.description }}
    </p>

    <div class="flex items-center gap-2 mb-4">
      <span
        class="text-xs px-2 py-1 rounded"
        :class="{
          'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200': ticket.priority === 'high',
          'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200': ticket.priority === 'medium',
          'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200': ticket.priority === 'low'
        }">
        {{ ticket.priority.toUpperCase() }}
      </span>
      <span class="text-xs text-gray-500 dark:text-gray-400">
        {{ new Date(ticket.createdAt).toLocaleDateString() }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TicketCard',
  props: {
    ticket: {
      type: Object,
      required: true
    }
  },
  emits: ['start-edit', 'set-delete-confirm'],
  setup() {
    const getStatusColor = (status) => {
      switch (status) {
        case 'open':
          return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700'
        case 'in_progress':
          return 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700'
        case 'closed':
          return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600'
        default:
          return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
      }
    }

    return {
      getStatusColor
    }
  }
}
</script>