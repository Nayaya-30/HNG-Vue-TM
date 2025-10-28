<template>
  <button @click="toggle" :aria-label="dark ? 'Switch to light' : 'Switch to dark'" class="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
    <svg v-if="!dark" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path></svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="5"></circle></svg>
  </button>
</template>

<script>
import { useTheme } from '../../composables/useTheme'
export default {
  name: 'DarkModeToggle',
  setup(){
    const { dark, toggle } = useTheme()
    return { dark, toggle }
  }
}
</script>
