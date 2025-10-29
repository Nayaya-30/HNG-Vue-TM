<script>

export default { name: 'Logo' }
</script>

<template>
  <div className="flex items-center gap-2">
    <div className="bg-blue-600 p-1 rounded-lg">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 text-white h-10">
        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
        <path d="M13 5v2"/>
        <path d="M18 5v2"/>
        <path d="M2 9h20"/>
      </svg>
    </div>
    <span className="text-xl font-bold text-white">TicketFlow</span>
  </div>
</template>
