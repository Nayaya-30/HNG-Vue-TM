<template>
	<div class="page flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
		<form
			@submit.prevent="handleSubmit"
			class="bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md animate-bounce-in"
			>
			<h2 class="text-2xl font-bold text-center mb-4 text-white">
				Welcome Back
			</h2>

			<!-- Email -->
			<div class="mb-3">
				<label class="block text-gray-200 text-sm font-medium mb-1">
					Email
				</label>
				<input
				type="email"
				name="email"
				class="w-full p-2 border rounded-md bg-gray-700 text-white"
				:class="{ 'border-red-500': errors.email }"
				v-model="formData.email"
				@blur="handleBlur"
				@input="clearError('email')"
				/>
			<p v-if="errors.email" class="text-red-500 text-sm mt-1">
				{{ errors.email }}
			</p>
		</div>

		<!-- Password -->
		<div class="mb-3">
			<label class="block text-gray-200 text-sm font-medium mb-1">
				Password
			</label>
			<input
			type="password"
			name="password"
			class="w-full p-2 border rounded-md bg-gray-700 text-white"
			:class="{ 'border-red-500': errors.password }"
			v-model="formData.password"
			@blur="handleBlur"
			@input="clearError('password')"
			/>
		<p v-if="errors.password" class="text-red-500 text-sm mt-1">
			{{ errors.password }}
		</p>
	</div>

	<!-- Buttons -->
	<div class="w-full flex flex-col sm:flex-row justify-between items-center gap-3 mt-5">
		<button
			type="submit"
			class="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition active:scale-95"  <!-- ✅ Added scale -->
			:disabled="isSubmitting"
			>
			{{ isSubmitting ? 'Logging in...': 'Login' }}
		</button>
	</div>

	<p class="text-sm text-center mt-4 text-gray-600 dark:text-gray-300">
		Don't have an account?
		<span
			@click="$router.push('/signup')"
			class="text-indigo-600 hover:underline cursor-pointer"
			>
			Sign up
		</span>
	</p>

	<div class="text-center mt-4">
		<button
			@click="$router.push('/')"
			class="text-indigo-600 hover:text-indigo-800 font-semibold transition btn-bounce"
			>
			← Back to Home
		</button>
	</div>
</form>
</div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '../composables/useToast'
import { loginUser } from '../utils/auth'

export default {
name: 'LoginPage',
setup() {
const router = useRouter()
const toast = useToast()

const formData = ref({
email: '',
password: ''
})

const errors = ref({})
const isSubmitting = ref(false)

const validateField = (name, value) => {
switch (name) {
case 'email':
if (!value.trim()) return 'Email is required'
if (!/\S+@\S+\.\S+/.test(value))
return 'Enter a valid email address'
return ''
case 'password':
if (!value) return 'Password is required'
if (value.length < 6)
return 'Password must be at least 6 characters'
return ''
default:
return ''
}
}

const handleBlur = (event) => {
const { name, value } = event.target
const error = validateField(name, value)
if (error) {
errors.value[name] = error
}
}


const clearError = (field) => {
if (errors.value[field]) {
errors.value[field] = ''
}
}

const handleSubmit = () => {
const newErrors = {}
Object.keys(formData.value).forEach((key) => {
const error = validateField(key, formData.value[key])
if (error) newErrors[key] = error
})

errors.value = newErrors

if (Object.keys(newErrors).length > 0) {
return
}

isSubmitting.value = true

setTimeout(() => {
const { success, user, message } = loginUser(
formData.value.email,
formData.value.password
)

if (success) {
toast.show('Account log in successful', 'success')
router.push('/dashboard')
} else {
toast.show(message, 'error')
}

isSubmitting.value = false
}, 400)
}

return {
formData,
errors,
isSubmitting,
handleBlur,
clearError,
handleSubmit
}
}
}
</script>