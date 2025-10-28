<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-2xl font-bold text-white">
          {{ editingTicket ? 'Edit Ticket' : 'Create New Ticket' }}
        </h3>
        <button
          @click="$emit('reset')"
          class="text-gray-300 hover:text-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
            <line x1="18" x2="6" y1="6" y2="18" />
            <line x1="6" x2="18" y1="6" y2="18" />
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-sm font-semibold text-gray-300 mb-2">
            Title <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <input
              type="text"
              :value="formData.title"
              @input="handleFieldInput('title', $event.target.value)"
              @blur="handleBlur('title')"
              class="w-full px-4 py-3 rounded-xl border bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
              :class="{
                'border-red-500 bg-red-900/20': getFieldStatus('title') === 'error',
                'border-green-500 bg-green-900/20': getFieldStatus('title') === 'success',
                'border-gray-600': getFieldStatus('title') === 'default'
              }"
              placeholder="Enter ticket title"
            />
            <div v-if="getFieldStatus('title') === 'success'" class="absolute right-3 top-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-green-500">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div v-if="getFieldStatus('title') === 'error'" class="absolute right-3 top-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-red-500">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" x2="12" y1="8" y2="12" />
                <line x1="12" x2="12.01" y1="16" y2="16" />
              </svg>
            </div>
          </div>

          <div v-if="touched.title && errors.title" class="flex items-center gap-2 mt-2 text-red-500 text-sm animate-slide-in">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
            <span>{{ errors.title }}</span>
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-300 mb-2">
            Description
          </label>
          <textarea
            :value="formData.description"
            @input="handleFieldInput('description', $event.target.value)"
            rows="4"
            class="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe the issue..."
          />
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-semibold text-gray-300 mb-2">
              Status <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <select
                :value="formData.status"
                @input="handleFieldInput('status', $event.target.value)"
                @blur="handleBlur('status')"
                class="w-full px-4 py-3 rounded-xl border bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                :class="{
                  'border-red-500 bg-red-900/20': getFieldStatus('status') === 'error',
                  'border-green-500 bg-green-900/20': getFieldStatus('status') === 'success',
                  'border-gray-600': getFieldStatus('status') === 'default'
                }"
              >
                <option value="">Select Status</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Resolved</option>
              </select>
            </div>

            <div v-if="touched.status && errors.status" class="flex items-center gap-2 mt-2 text-red-500 text-sm animate-slide-in">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" x2="12" y1="8" y2="12" />
                <line x1="12" x2="12.01" y1="16" y2="16" />
              </svg>
              <span>{{ errors.status }}</span>
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-300 mb-2">
              Priority
            </label>
            <select
              :value="formData.priority"
              @input="handleFieldInput('priority', $event.target.value)"
              class="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div class="flex gap-4">
          <button
            ref="submitBtn"
            type="submit"
            :class="[
              'flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold transition-all transform',
              isButtonPressed ? 'scale-95' : 'scale-100'
            ]"
          >
            {{ editingTicket ? 'Update Ticket' : 'Create Ticket' }}
          </button>
          <button
            type="button"
            @click="$emit('reset')"
            class="flex-1 bg-gray-700 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'

export default {
  name: 'TicketForm',
  props: {
    formData: { type: Object, required: true },
    editingTicket: { type: Object, default: null }
  },
  emits: ['update:form-data', 'submit', 'reset'],
  setup(props, { emit }) {
    const errors = reactive({})
    const touched = reactive({})
    const isButtonPressed = ref(false)

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

    // Validate single field (used on blur)
    const validate = (data, field) => {
      if (field) {
        if (validationRules[field]) {
          const msg = validationRules[field](data[field])
          if (msg) errors[field] = msg
          else delete errors[field]
        }
      } else {
        Object.keys(validationRules).forEach(key => {
          const msg = validationRules[key](data[key])
          if (msg) errors[key] = msg
          else delete errors[key]
        })
      }
    }

    const handleBlur = (field) => {
      touched[field] = true
      validate(props.formData, field)
    }

    // On input: update value, clear visible error immediately.
    // If field is already touched and becomes valid, keep success state (success only shown after blur).
    const handleFieldInput = (field, value) => {
      const updated = { ...props.formData, [field]: value }
      emit('update:form-data', updated)

      // Immediately clear the error message as user types
      if (errors[field]) delete errors[field]

      // If the field was already blurred (touched) we re-validate and show/hide error accordingly.
      // This will *not* set "success" explicitly here; success is derived in getFieldStatus (requires touched + no error + value).
      if (touched[field] && validationRules[field]) {
        const msg = validationRules[field](updated[field])
        if (msg) {
          // keep showing the error if validation fails after typing stopped (we update it)
          errors[field] = msg
        } else {
          // remove error to allow success state (success will appear because touched[field] is true and no errors[field])
          delete errors[field]
        }
      }
    }

    const getFieldStatus = (field) => {
      if (!touched[field]) return 'default'
      if (errors[field]) return 'error'
      if (!errors[field] && props.formData[field]) return 'success'
      return 'default'
    }

    const handleSubmit = () => {
      // brief press animation (200ms)
      isButtonPressed.value = true
      setTimeout(() => isButtonPressed.value = false, 200)

      // validate all fields on submit
      validate(props.formData)
      // if any errors exist -> don't submit
      if (Object.values(errors).some(error => error)) {
        return
      }
      emit('submit', props.formData)
    }

    return {
      errors,
      touched,
      handleBlur,
      getFieldStatus,
      handleFieldInput,
      handleSubmit,
      isButtonPressed
    }
  }
}
</script>