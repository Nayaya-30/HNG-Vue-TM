<template>
  <div class=" p-6 rounded-2xl shadow-lg border bg-gray-800 border-gray-700">
    <div class="flex items-center justify-between mb-4">
      <div :class="`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center`">
        <svg v-if="icon === 'bar-chart'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="`w-6 h-6 ${textColor.replace('text-', 'text-')}`">
          <line x1="12" x2="12" y1="20" y2="10"/>
          <line x1="18" x2="18" y1="20" y2="4"/>
          <line x1="6" x2="6" y1="20" y2="16"/>
        </svg>
        <svg v-else-if="icon === 'ticket'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="`w-6 h-6 ${textColor.replace('text-', 'text-')}`">
          <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
          <path d="M13 5v2"/>
          <path d="M18 5v2"/>
          <path d="M2 9h20"/>
        </svg>
        <svg v-else-if="icon === 'check'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="`w-6 h-6 ${textColor.replace('text-', 'text-')}`">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <span :class="`font-semibold ${textColor}`">
        {{ title.includes('Open')
          ? 'Open'
          : title.includes('In Progress')
          ? 'In Progress'
          : title.includes('Resolved')
          ? 'Resolved'
          : 'Total' }}
      </span>
    </div>
    <h3 class="text-4xl font-bold text-white">
      {{ value }}
    </h3>
    <p class=" mt-2 text-gray-300">{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: 'StatCard',
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    bgColor: {
      type: String,
      required: true
    },
    textColor: {
      type: String,
      required: true
    }
  }
}
</script>