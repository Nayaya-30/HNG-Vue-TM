<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 dark:bg-gray-800">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-2xl font-bold text-gray-800 dark:text-white">
          {{ editingTicket ? 'Edit Ticket' : 'Create New Ticket' }}
        </h3>
        <button
          @click="$emit('reset')"
          class="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
            <line x1="18" x2="6" y1="6" y2="18"/>
            <line x1="6" x2="18" y1="6" y2="18"/>
          </svg>
        </button>
      </div>

      <form
        @submit.prevent="handleSubmit"
        class="space-y-6">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-300">
            Title <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <input
              type="text"
              :value="formData.title"
              @input="handleFieldChange('title', $event.target.value)"
              @blur="handleBlur('title')"
              class="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white pr-10"
              :class="{
                'border-red-500 bg-red-50 dark:bg-red-900/20': getFieldStatus('title') === 'error',
                'border-green-500 bg-green-50 dark:bg-green-900/20': getFieldStatus('title') === 'success',
                'border-gray-300 dark:border-gray-600': getFieldStatus('title') === 'default'
              }"
              placeholder="Enter ticket title"
            />
            <div v-if="getFieldStatus('title') === 'success'" class="absolute right-3 top-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-green-500">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <div v-if="getFieldStatus('title') === 'error'" class="absolute right-3 top-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-red-500">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" x2="12" y1="8" y2="12"/>
                <line x1="12" x2="12.01" y1="16" y2="16"/>
              </svg>
            </div>
          </div>
          <div v-if="touched.title && errors.title" class="flex items-center gap-2 mt-2 text-red-500 text-sm animate-slide-in">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" x2="12" y1="8" y2="12"/>
              <line x1="12" x2="12.01" y1="16" y2="16"/>
            </svg>
            <span>{{ errors.title }}</span>
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-300">
            Description
          </label>
          <textarea
            :value="formData.description"
            @input="$emit('update:form-data', { ...formData, description: $event.target.value })"
            rows="4"
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Describe the issue..."
          />
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-300">
              Status <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <select
                :value="formData.status"
                @input="handleFieldChange('status', $event.target.value)"
                @blur="handleBlur('status')"
                class="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white pr-10"
                :class="{
                  'border-red-500 bg-red-50 dark:bg-red-900/20': getFieldStatus('status') === 'error',
                  'border-green-500 bg-green-50 dark:bg-green-900/20': getFieldStatus('status') === 'success',
                  'border-gray-300 dark:border-gray-600': getFieldStatus('status') === 'default'
                }">
                <option value="">Select Status</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Resolved</option>
              </select>
              <div v-if="getFieldStatus('status') === 'success'" class="absolute right-3 top-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-green-500">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div v-if="getFieldStatus('status') === 'error'" class="absolute right-3 top-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-red-500">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" x2="12" y1="8" y2="12"/>
                  <line x1="12" x2="12.01" y1="16" y2="16"/>
                </svg>
              </div>
            </div>
            <div v-if="touched.status && errors.status" class="flex items-center gap-2 mt-2 text-red-500 text-sm animate-slide-in">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" x2="12" y1="8" y2="12"/>
                <line x1="12" x2="12.01" y1="16" y2="16"/>
              </svg>
              <span>{{ errors.status }}</span>
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-300">
              Priority
            </label>
            <select
              :value="formData.priority"
              @input="$emit('update:form-data', { ...formData, priority: $event.target.value })"
              class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div class="flex gap-4">
          <button
            type="submit"
            class="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all">
            {{ editingTicket ? 'Update Ticket' : 'Create Ticket' }}
          </button>
          <button
            type="button"
            @click="$emit('reset')"
            class="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch } from 'vue'

export default {
  name: 'TicketForm',
  props: {
    formData: {
      type: Object,
      required: true
    },
    editingTicket: {
      type: Object,
      default: null
    }
  },
  emits: ['update:form-data', 'submit', 'reset'],
  setup(props, { emit }) {
    const errors = reactive({})
    const touched = reactive({})

    const validationRules = {
      title: (value) => {
        if (!value) return 'Title is required'
        if (value.length < 3) return 'Title must be at least 3 characters'
        return ''
      },
      status: (value) => {
        if (!value) return 'Status is required'
        return ''
      }
    }

    const validate = (data, field) => {
      if (field) {
        // Validate single field
        if (validationRules[field]) {
          errors[field] = validationRules[field](data[field])
        }
      } else {
        // Validate all fields
        Object.keys(validationRules).forEach(key => {
          errors[key] = validationRules[key](data[key])
        })
      }
    }

    const handleBlur = (field) => {
      touched[field] = true
      validate(props.formData, field)
    }

    const clearErrors = () => {
      Object.keys(errors).forEach(key => {
        delete errors[key]
      })
    }

    const getFieldStatus = (field) => {
      if (!touched[field]) return 'default'
      if (errors[field]) return 'error'
      if (!errors[field] && props.formData[field]) return 'success'
      return 'default'
    }

    const handleFieldChange = (field, value) => {
      const updated = { ...props.formData, [field]: value }
      emit('update:form-data', updated)
      if (touched[field]) {
        validate(updated, field)
      }
    }

    const handleSubmit = () => {
      validate(props.formData)
      if (Object.values(errors).some(error => error)) {
        return
      }
      emit('submit', props.formData)
    }

    return {
      errors,
      touched,
      handleBlur,
      clearErrors,
      getFieldStatus,
      handleFieldChange,
      handleSubmit
    }
  }
}
</script>