<template>
  <div class="relative bg-gray-900 rounded-2xl shadow-lg border border-gray-700 p-6 hover:shadow-xl transition-all light:bg-white light:border-gray-200">
    <!-- action icons -->
    <div class="absolute bottom-4 right-4 flex items-center gap-2">
      <button
        @click="$emit('start-edit', ticket)"
        aria-label="Edit ticket"
        class="p-2 rounded-full text-blue-100 bg-blue-700 hover:bg-blue-600 transition-colors light:bg-blue-600 light:hover:bg-blue-700 light:text-blue-50">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round"
             class="w-4 h-4">
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
        </svg>
      </button>

      <button
        @click="$emit('set-delete-confirm', ticket.id)"
        aria-label="Delete ticket"
        class="p-2 rounded-full text-red-100 bg-red-700 hover:bg-red-600 transition-colors light:bg-red-600 light:hover:bg-red-700 light:text-red-50">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round"
             class="w-4 h-4">
          <path d="M3 6h18"/>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
        </svg>
      </button>
    </div>

    <div class="flex items-start gap-4 mb-4">
      <h3 class="text-lg font-bold flex-1 pr-12 text-white light:text-gray-800">
        {{ ticket.title }}
      </h3>

      <span
        class="px-3 py-1 rounded-full text-xs font-semibold border"
        :class="getStatusColor(ticket.status)">
        {{ ticket.status.replace('_', ' ').toUpperCase() }}
      </span>
    </div>

    <p v-if="ticket.description" class="text-sm mb-4 line-clamp-2 text-gray-300 light:text-gray-600">
      {{ ticket.description }}
    </p>

    <div class="flex items-center gap-2 mb-4">
      <span
        class="text-xs px-2 py-1 rounded font-semibold"
        :class="{
          'bg-red-900 text-red-200 light:bg-red-100 light:text-red-700': ticket.priority === 'high',
          'bg-yellow-900 text-yellow-200 light:bg-yellow-100 light:text-yellow-700': ticket.priority === 'medium',
          'bg-blue-900 text-blue-200 light:bg-blue-100 light:text-blue-700': ticket.priority === 'low'
        }">
        {{ ticket.priority.toUpperCase() }}
      </span>

      <span class="text-xs text-gray-400 light:text-gray-500">
        {{ new Date(ticket.createdAt).toLocaleDateString() }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TicketCard',
  props: {
    ticket: { type: Object, required: true }
  },
  emits: ['start-edit', 'set-delete-confirm'],
  setup() {
    const getStatusColor = (status) => {
      switch (status) {
        case 'open':
          return 'bg-green-900 text-green-200 border-green-700 light:bg-green-100 light:text-green-700 light:border-green-300'
        case 'in_progress':
          return 'bg-yellow-900 text-yellow-200 border-yellow-700 light:bg-yellow-100 light:text-yellow-700 light:border-yellow-300'
        case 'closed':
          return 'bg-gray-700 text-gray-200 border-gray-600 light:bg-gray-200 light:text-gray-800 light:border-gray-300'
        default:
          return 'bg-gray-700 text-gray-200 border-gray-600 light:bg-gray-200 light:text-gray-800 light:border-gray-300'
      }
    }

    return { getStatusColor }
  }
}
</script>