<template>
  <div class="min-h-screen">
    <router-view />
    <Toast />
  </div>
</template>

<script>
import Toast from './components/common/Toast.vue'

export default {
  name: 'App',
  components: {
    Toast
  }
}
</script>