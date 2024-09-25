<template>
	<div class="flex justify-center items-center h-screen flex-col">
		<h1>WELCOME TO THE PARTY</h1>
		<div v-if="scroll && needsAuth">
			<FormKit type="text" label="Password" v-model="enteredPassword" />
			<button @click="submitPassword">Enter</button>
			<p v-if="setError">{{ errorMessage }}</p>
		</div>
	</div>
	<FaqInfo />
</template>
<script setup>
definePageMeta({
	middleware: [
		'verify-user',
	],
});
const needsAuth = ref(true)
const scroll = ref(false)
const handlePageScroll = () => {
	if (window.scrollY > 6) {
		console.log('scrolling')
		scroll.value = true
	}
};
const cookie = useCookie('isAuth');
console.log(cookie.value)
const enteredPassword = ref('');
const setError = ref(false);
const errorMessage = ref('');
const correctPassword = 'hello';
const isAuthenticated = ref(false);
const isGuestAuthenticated = () => {
	console.log(cookie.value)
	if (cookie.value === 1) {
		isAuthenticated.value = true;
		needsAuth.value = false;
	}
}

const submitPassword = () => {
	if (enteredPassword.value === "") {
		setError.value = true;
		errorMessage.value = "Please enter a valid password";
	} else if (enteredPassword.value === correctPassword) {
		cookie.value = 1;
		errorMessage.value = "";
		needsAuth.value = false;
	} else {
		setError.value = true;
		errorMessage.value = "Intruder Alert :)";
	}
};

onMounted(() => {
	isGuestAuthenticated()
	window.addEventListener('scroll', handlePageScroll)
})
onUnmounted(() => {
	window.removeEventListener('scroll', handlePageScroll)
})

</script>
<style scoped>
.rsvp {
	list-style-type: none;
}

.active {
	background-color: green;
}

.disabled {
	background-color: red;
}
</style>