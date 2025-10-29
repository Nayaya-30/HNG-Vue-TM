<template>
	<div class="min-h-screen">
		<router-view />
		<Toast />
		<Footer />
	</div>
</template>

<script>
	import Toast from './components/common/Toast.vue'
	import Footer from './components/common/Footer.vue'

	export default {
		name: 'App',
		components: {
		Toast,
		Footer
		}
	}
	</script>