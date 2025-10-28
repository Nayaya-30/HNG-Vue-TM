<template>
  <div class="relative">
    <input :type="show ? 'text' : 'password'" v-model="modelValue" class="w-full border p-2 rounded" />
    <button type="button" @click="$emit('update:show', !show)" class="absolute right-2 top-2 text-sm">{{ show ? 'Hide' : 'Show' }}</button>
  </div>
</template>
<script>
export default {
  props: ['modelValue','show'],
  emits: ['update:modelValue','update:show']
}
</script>