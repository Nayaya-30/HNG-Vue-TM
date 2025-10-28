<template>
  <div>
    <!-- Tickets Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-if="tickets.length === 0"
        class="col-span-full text-center py-12"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-16 h-16 text-gray-400 mx-auto mb-4 light:text-gray-500"
        >
          <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
          <path d="M13 5v2"/>
          <path d="M18 5v2"/>
          <path d="M2 9h20"/>
        </svg>

        <h3 class="text-xl font-semibold text-white mb-2 light:text-gray-800">
          No tickets yet
        </h3>

        <p class="text-gray-300 mb-6 light:text-gray-600">
          Create your first ticket to get started
        </p>

        <button
          @click="$emit('start-edit', null)"
          class="bg-blue-700 text-blue-100 px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-all inline-flex items-center gap-2 light:bg-blue-600 light:hover:bg-blue-700 light:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-5 h-5"
          >
            <line x1="12" x2="12" y1="5" y2="19"/>
            <line x1="5" x2="19" y1="12" y2="12"/>
          </svg>
          Create Ticket
        </button>
      </div>

      <TicketCard
        v-else
        v-for="ticket in tickets"
        :key="ticket.id"
        :ticket="ticket"
        @start-edit="$emit('start-edit', ticket)"
        @set-delete-confirm="deleteConfirm = $event"
      />
    </div>

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmation
      v-if="deleteConfirm"
      :delete-confirm="deleteConfirm"
      @handle-delete="handleDelete"
      @set-delete-confirm="deleteConfirm = $event"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import TicketCard from './TicketCard.vue'
import DeleteConfirmation from './DeleteConfirmation.vue'
import { getTickets, saveTickets } from '../../utils/storage'
import { useToast } from '../../composables/useToast'

export default {
  name: 'TicketList',
  components: {
    TicketCard,
    DeleteConfirmation
  },
  props: {
    tickets: {
      type: Array,
      required: true
    }
  },
  emits: ['start-edit', 'set-tickets', 'show-toast'],
  setup(props, { emit }) {
    const toast = useToast()
    const deleteConfirm = ref(null)

    const handleDelete = (id) => {
      const allTickets = getTickets().filter(t => t.id !== id)
      saveTickets(allTickets)
      emit('set-tickets', allTickets)
      deleteConfirm.value = null
      toast.show('🗑️ Ticket deleted successfully!', 'success')
    }

    return {
      deleteConfirm,
      handleDelete
    }
  }
}
</script>