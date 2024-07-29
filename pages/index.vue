<template>
	<div class="flex justify-center items-center h-screen flex-col">
		<h1>WELCOME TO THE PARTY</h1>
		<FormKit type="text" label="Password" v-model="enteredPassword" />
		<button @click="submitPassword">Enter</button>
		<p v-if="setError">{{ errorMessage }}</p>
	</div>
	<FaqInfo />
</template>
<script setup>

const needsAuth = ref(false)
const handlePageScroll = () => {
	console.log("scrollin")

}
const cookie = useCookie('isAuth');
const enteredPassword = ref('');
const setError = ref(false);
const errorMessage = ref('');
const correctPassword = 'hello';
const isAuthenticated = ref(false);
const isGuestAuthenticated = () => {
	if (cookie.value === 1) {
		isAuthenticated.value = true;
	}
}

const submitPassword = () => {
	if (enteredPassword.value === "") {
		setError.value = true;
		errorMessage.value = "Please enter a valid password";
	} else if (enteredPassword.value === correctPassword) {
		cookie.value = 1;
		errorMessage.value = "";
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
