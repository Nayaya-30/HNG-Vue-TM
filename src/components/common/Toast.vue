<template>
  <div class="fixed top-4 right-4 z-50">
    <div 
      v-if="toast"
      class="px-6 py-4 rounded-lg shadow-lg text-white font-medium transform transition-all duration-300"
      :class="{
        'bg-green-500': toast.type === 'success',
        'bg-red-500': toast.type === 'error',
        'bg-blue-500': toast.type === 'info',
        'bg-yellow-500': toast.type === 'warning'
      }"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<script>
import { useToast } from '../../composables/useToast'

export default {
  name: 'Toast',
  setup() {
    const { toast } = useToast()
    
    return {
      toast
    }
  }
}
</script>