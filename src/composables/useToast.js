import { ref } from 'vue'

const toast = ref(null)

export function useToast() {
  const show = (message, type = 'success') => {
    toast.value = { message, type }
    
    // Auto-hide toast after 3 seconds
    setTimeout(() => {
      toast.value = null
    }, 3000)
  }
  
  const hide = () => {
    toast.value = null
  }
  
  return {
    toast,
    show,
    hide
  }
}