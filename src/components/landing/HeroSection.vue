<template>
  <section class="relative overflow-hidden text-white bg-gradient-to-b from-gray-900 via-gray-800 to-black">
    <!-- Decorative Background Circles -->
    <div class="absolute top-[-6rem] right-[-8rem] w-[400px] h-[400px] bg-yellow-400 opacity-10 blur-3xl rounded-full"></div>
    <div class="absolute bottom-[-5rem] left-[-6rem] w-[300px] h-[300px] bg-indigo-500 opacity-10 blur-3xl rounded-full"></div>
    <div class="absolute bottom-[8rem] right-[10rem] w-[150px] h-[150px] bg-yellow-300 opacity-20 blur-2xl rounded-full"></div>

    <!-- Hero Content -->
    <div class="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-24 md:py-32">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div class="text-center md:text-left">
          <h1 class="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Manage Your Tickets with <span class="text-yellow-400">Ease</span>
          </h1>
          <p class="text-xl mb-8 text-gray-300">
            Streamline your workflow with our elegant ticket management system. 
            Track, prioritize, and resolve with confidence — all in one place.
          </p>

          <div class="flex flex-wrap justify-center md:justify-start gap-4">
            <router-link
              to="/signup"
              class="bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get Started
            </router-link>
            <router-link
              to="/login"
              class="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all border-2 border-white/30"
            >
              Login
            </router-link>
          </div>
        </div>

        <!-- Illustration -->
        <div class="hidden md:flex justify-center relative">
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-[380px] h-[380px] bg-white/5 backdrop-blur-sm rounded-full"></div>
          </div>
          <div class="relative z-10 bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-[200px] h-[200px] text-yellow-300 opacity-30 mx-auto">
              <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
              <path d="M13 5v2"/>
              <path d="M18 5v2"/>
              <path d="M2 9h20"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Dual Wavy Layers -->
    <div class="absolute bottom-0 w-full">
      <svg
        class="w-full"
        viewBox="0 0 1440 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Upper gentle wave -->
        <path
          d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V200H0Z"
          fill="#1F2937"
        />
        <!-- Lower contrasting wave -->
        <path
          d="M0 150L80 130C160 110 320 70 480 60C640 50 800 70 960 90C1120 110 1280 130 1360 140L1440 150V200H0Z"
          fill="#111827"
        />
      </svg>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection'
}
</script>