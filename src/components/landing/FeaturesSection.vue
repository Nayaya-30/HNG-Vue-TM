<template>
  <div class="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <h2 class="text-4xl font-bold text-center text-white mb-16">
      Why Choose TicketFlow?
    </h2>

    <div class="grid md:grid-cols-3 gap-8">
      <div
        v-for="(feature, index) in features"
        :key="index"
        class="bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-700"
      >
        <div class="text-5xl mb-4">{{ feature.icon }}</div>
        <h3 class="text-2xl font-bold text-white mb-3">{{ feature.title }}</h3>
        <p class="text-gray-300">{{ feature.desc }}</p>
      </div>
    </div>

    <!-- Decorative Circle -->
    <div class="absolute right-0 top-1/2 w-48 h-48 bg-yellow-400 rounded-full opacity-10 -z-10 blur-3xl"></div>
  </div>
</template>

<script>
export default {
  name: 'FeaturesSection',
  data() {
    return {
      features: [
        { title: 'Easy to Use', desc: 'Intuitive interface designed for speed and efficiency', icon: '🚀' },
        { title: 'Real-time Updates', desc: 'Track ticket status changes instantly', icon: '⚡' },
        { title: 'Secure & Reliable', desc: 'Your data is protected with industry-standard security', icon: '🔒' }
      ]
    }
  }
}
</script>