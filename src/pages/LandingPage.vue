<template>
  <div class="page min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
    <HeroSection />
    <FeaturesSection />
  </div>
</template>

<script>
import HeroSection from '../components/landing/HeroSection.vue'
import FeaturesSection from '../components/landing/FeaturesSection.vue'

export default {
  name: 'LandingPage',
  components: {
    HeroSection,
    FeaturesSection
  }
}
</script>