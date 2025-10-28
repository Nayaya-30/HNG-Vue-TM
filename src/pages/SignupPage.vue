<template>
	<div class="page flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 px-4">
		<form
			@submit.prevent="handleSubmit"
			class="bg-gray-800 p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-md animate-bounce-in"
			>
			<h2 class="text-3xl font-bold text-center mb-6 text-white">
				Create Account
			</h2>

			<!-- Name -->
			<div class="mb-4">
				<label class="block text-gray-200 text-sm font-medium mb-1">Full Name</label>
				<input
				type="text"
				name="name"
				v-model="formData.name"
				@blur="handleBlur"
				@change="handleChange"
				class="w-full p-2 border rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
				/>
			<p v-if="errors.name" class="text-red-500 text-sm">
				{{ errors.name }}
			</p>
		</div>

		<!-- Email -->
		<div class="mb-4">
			<label class="block text-gray-200 text-sm font-medium mb-1">Email</label>
			<input
			type="email"
			name="email"
			v-model="formData.email"
			@blur="handleBlur"
			@change="handleChange"
			class="w-full p-2 border rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
			/>
		<p v-if="errors.email" class="text-red-500 text-sm">
			{{ errors.email }}
		</p>
	</div>

	<!-- Password -->
	<div class="mb-4">
		<label class="block text-gray-200 text-sm font-medium mb-1">Password</label>
		<input
		type="password"
		name="password"
		v-model="formData.password"
		@input="handlePasswordInput"
		@blur="handleBlur"
		@change="handleChange"
		class="w-full p-2 border rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
		/>

	<div v-if="passwordStrength.label" class="mt-2">
		<div class="w-full h-2 rounded-md overflow-hidden">
			<div
				class="h-2"
				:class="passwordStrength.color"
				:style="{ width: passwordStrength.level + '%' }"
				></div>
		</div>
		<p
			class="text-sm mt-1 font-medium"
			:class="{
			'text-red-500': passwordStrength.color.includes('red'),
			'text-yellow-500': passwordStrength.color.includes('yellow'),
			'text-green-500': passwordStrength.color.includes('green') || passwordStrength.color.includes('emerald')
			}"
					>
			{{ passwordStrength.label }}
			</p>
		</div>

		<p v-if="errors.password" class="text-red-500 text-sm">
			{{ errors.password }}
		</p>
	</div>

	<!-- Confirm Password -->
	<div class="mb-6">
		<label class="block text-gray-200 text-sm font-medium mb-1">Confirm Password</label>
		<input
		type="password"
		name="confirmPassword"
		v-model="formData.confirmPassword"
		@blur="handleBlur"
		@change="handleChange"
		class="w-full p-2 border rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
		/>
	<p v-if="errors.confirmPassword" class="text-red-500 text-sm">
		{{ errors.confirmPassword }}
	</p>
</div>

<!-- Buttons -->
<div class="w-full flex flex-col sm:flex-row gap-3">
	<button
		type="submit"
		:disabled="isSubmitting"
		class="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition-transform transform active:scale-95"
		>
		{{ isSubmitting ? 'Creating...': 'Sign Up' }}
	</button>
</div>

<p class="text-sm text-center mt-4 text-gray-300">
	Already have an account?
	<span @click="$router.push('/login')" class="text-indigo-600 hover:underline cursor-pointer">
		Log in
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
import { findUser, registerUser } from '../utils/auth'

export default {
name: 'SignupPage',
setup() {
const router = useRouter()
const toast = useToast()

const formData = ref({
name: '',
email: '',
password: '',
confirmPassword: ''
})

const errors = ref({})
const isSubmitting = ref(false)
const passwordStrength = ref({
label: '',
color: '',
level: 0
})

// Password Strength Checker
const evaluatePasswordStrength = (password) => {
let score = 0
if (password.length >= 6) score++
if (/[A-Z]/.test(password)) score++
if (/[0-9]/.test(password)) score++
if (/[^A-Za-z0-9]/.test(password)) score++

switch (score) {
case 0:
case 1:
return { label: 'Weak', color: 'bg-red-500', level: 25 }
case 2:
return { label: 'Medium', color: 'bg-yellow-500', level: 50 }
case 3:
return { label: 'Strong', color: 'bg-green-500', level: 75 }
case 4:
return { label: 'Very Strong', color: 'bg-emerald-600', level: 100 }
default:
return { label: '', color: '', level: 0 }
}
}

// Validation
const validateField = (name, value) => {
let message = ''

if (name === 'name' && !value.trim()) message = 'Name is required'
if (name === 'email') {
if (!value.trim()) message = 'Email is required'
else if (!/\S+@\S+\.\S+/.test(value)) message = 'Enter a valid email'
else if (findUser(value)) message = 'Email is already registered'
}
if (name === 'password') {
if (!value) message = 'Password is required'
else if (value.length < 6) message = 'Password must be at least 6 characters'
}
if (name === 'confirmPassword') {
if (!value) message = 'Please confirm your password'
else if (value !== formData.value.password) message = 'Passwords do not match'
}
return message
}

const handlePasswordInput = (event) => {
const { name, value } = event.target
formData.value[name] = value
delete errors.value[name]

if (name === 'password') {
passwordStrength.value = evaluatePasswordStrength(value)
}
}

const handleBlur = (event) => {
const { name, value } = event.target
const errorMsg = validateField(name, value)

if (errorMsg) errors.value[name] = errorMsg
else delete errors.value[name]
}

const handleChange = (event) => {
const { name, value } = event.target
const errorMsg = validateField(name, value)

if (errorMsg) errors.value[name] = errorMsg
else delete errors.value[name]
}

const handleSubmit = () => {
const newErrors = {}
Object.keys(formData.value).forEach((key) => {
const msg = validateField(key, formData.value[key])
if (msg) newErrors[key] = msg
})

errors.value = newErrors
if (Object.keys(newErrors).length > 0) return

isSubmitting.value = true

setTimeout(() => {
const newUser = {
id: Date.now(),
name: formData.value.name,
email: formData.value.email,
password: formData.value.password,
createdAt: new Date().toISOString()
}

registerUser(newUser)
toast.show('🎉 Account created successfully! Please log in.', 'success')
router.push('/login')
isSubmitting.value = false
}, 600)
}

return {
formData,
errors,
isSubmitting,
passwordStrength,
handlePasswordInput,
handleBlur,
handleChange,
handleSubmit
}
}
}
</script>