<template>
  <div class="page min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
    <!-- Navbar -->
       <nav class=" shadow-sm border-b bg-gray-800 border-gray-600">
        <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <Logo />
            <div class="flex items-center gap-4">
              <button
                @click="$router.push('/dashboard')"
                class="hidden md:inline-flex items-center font-medium text-gray-300 hover:text-white px-3 py-2 rounded-md">
                Dashboard
              </button>

              <button
                @click="$router.push('/dashboard')"
                class="inline-flex md:hidden items-center justify-center w-10 h-10 rounded-full bg-gray-700 text-gray-200 hover:bg-gray-600"
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
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 class="text-4xl font-bold mb-2 text-white">
            Ticket Management
          </h2>
          <p class="text-gray-300">
            Create, view, edit, and delete tickets
          </p>
        </div>

        <div class="flex gap-2 w-full md:w-auto">
          <!-- Search Box -->
          <div class="relative flex-1 md:w-64">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-gray-400">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search tickets..."
              v-model="searchTerm"
              class="block w-full pl-10 pr-3 py-2 border rounded-lg  bg-gray-800 :border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <!-- New Ticket Button -->
          <button
            @click="showForm = true"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center gap-2 whitespace-nowrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
              <line x1="12" x2="12" y1="5" y2="19"/>
              <line x1="5" x2="19" y1="12" y2="12"/>
            </svg>
            <span class="hidden sm:inline">New Ticket</span>
            <span class="sm:hidden">New</span>
          </button>
        </div>
      </div>

      <!-- Ticket Form -->
      <TicketForm 
        v-if="showForm"
        :form-data="formData"
        :editing-ticket="editingTicket"
        @update:form-data="formData = $event"
        @submit="handleSubmit"
        @reset="resetForm"
      />

      <!-- Ticket List -->
      <TicketList 
        :tickets="filteredTickets"
        @start-edit="startEdit"
        @set-tickets="tickets = $event"
        @show-toast="showToast"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Logo from '../components/common/Logo.vue'
import TicketList from '../components/tickets/TicketList.vue'
import TicketForm from '../components/tickets/TicketForm.vue'
import { getTickets, saveTickets, getCurrentUser } from '../utils/storage'
import { clearSession } from '../utils/auth'
import { useToast } from '../composables/useToast'

export default {
  name: 'Tickets',
  components: {
    Logo,
    TicketList,
    TicketForm
  },
  setup() {
    const router = useRouter()
    const toast = useToast()
    
    const tickets = ref([])
    const showForm = ref(false)
    const editingTicket = ref(null)
    const formData = ref({
      title: '',
      description: '',
      status: 'open',
      priority: 'medium',
    })
    const searchTerm = ref('')

    const filteredTickets = computed(() => {
      return tickets.value.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          (ticket.description &&
            ticket.description
              .toLowerCase()
              .includes(searchTerm.value.toLowerCase()))
      )
    })

    const validate = (data) => {
      const newErrors = {}
      if (!data.title) newErrors.title = 'Title is required'
      if (!data.status) newErrors.status = 'Status is required'
      if (!['open', 'in_progress', 'closed'].includes(data.status)) {
        newErrors.status = 'Status must be open, in_progress, or closed'
      }
      return newErrors
    }

    const handleSubmit = (formPayload) => {
      const validationErrors = validate(formPayload)
      if (Object.keys(validationErrors).length > 0) {
        toast.show('Please fix the validation errors', 'error')
        return
      }

      const user = getCurrentUser()
      if (!user) {
        toast.show('User not found. Please login again.', 'error')
        handleLogout()
        return
      }

      const allTickets = getTickets()

      if (editingTicket.value) {
        const index = allTickets.findIndex(
          (t) => t.id === editingTicket.value.id
        )
        if (index !== -1) {
          allTickets[index] = {
            ...formPayload,
            id: editingTicket.value.id,
            userId: user.id,
            createdAt: editingTicket.value.createdAt,
            updatedAt: new Date().toISOString(),
          }
          saveTickets(allTickets)
          tickets.value = allTickets
          toast.show('✅ Ticket updated successfully!', 'success')
        }
      } else {
        const newTicket = {
          ...formPayload,
          id: Date.now(),
          userId: user.id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        allTickets.push(newTicket)
        saveTickets(allTickets)
        tickets.value = allTickets
        toast.show('✅ Ticket created successfully!', 'success')
      }

      resetForm()
    }

    const resetForm = () => {
      formData.value = {
        title: '',
        description: '',
        status: 'open',
        priority: 'medium',
      }
      editingTicket.value = null
      showForm.value = false
    }

    const startEdit = (ticket) => {
      formData.value = { ...ticket }
      editingTicket.value = ticket
      showForm.value = true
    }

    const handleLogout = () => {
      clearSession()
      router.push('/login')
    }

    const showToast = (message, type = 'success') => {
      toast.show(message, type)
    }

    onMounted(() => {
      const allTickets = getTickets()
      tickets.value = allTickets
    })

    return {
      tickets,
      showForm,
      editingTicket,
      formData,
      searchTerm,
      filteredTickets,
      handleSubmit,
      resetForm,
      startEdit,
      handleLogout,
      showToast
    }
  }
}
</script>