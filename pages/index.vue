<template>
	<div class="home">
		<nav class="w-full">
			<ul class="w-full flex flex-row justify-between">
				<span class="flex flex-row justify-center space-x-6 p-4">
					<li class="text-white">
						HOME
					</li>
					<li class="text-white">
						FAQ
					</li>
					<li class="text-white">
						CONTACT
					</li>
				</span>
				<button class="text-white px-7 py-2 border">RSVP</button>
			</ul>

		</nav>
		<div class="flex-1 flex justify-center items-center flex-col">
			<!-- <h1 class="text-white ">THE WEDDING OF <br />JUDY <br />& <br />DUNCAN</h1> -->
			<div v-if="scroll && needsAuth">
				<FormKit type="text" label="Password" v-model="enteredPassword" />
				<button @click="submitPassword">Enter</button>
				<p v-if="setError">{{ errorMessage }}</p>
			</div>
		</div>

	</div>
	<FaqInfo v-if="!needsAuth" />
</template>
<script setup>
const { name } = storeToRefs(useUserStore());
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
const enteredPassword = ref('');
const setError = ref(false);
const errorMessage = ref('');
const correctPassword = 'hello';
const isAuthenticated = ref(false);

const isGuestAuthenticated = () => {
	if (cookie.value === 1) {
		isAuthenticated.value = true;
		needsAuth.value = false;
	}
}
const hasCreds = () => {

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
<style scoped lang="postcss">
@import url('https://fonts.googleapis.com/css2?family=Jacques+Francois&display=swap');

h1 {
	font-family: "Jacques Francois", serif;
	font-size: 15px;
	text-align: center;
}

li,
button {
	cursor: pointer;
	font-family: "Jacques Francois", serif;
}

.rsvp {
	list-style-type: none;
}

.active {
	background-color: green;
}

.disabled {
	background-color: red;
}

.home {
	@apply flex flex-col justify-center items-center p-6;
	position: relative;
	height: 110vh;
	background-image: url("https://res.cloudinary.com/djatkco6m/image/upload/v1727983174/DSC04446_2_i7vqny.jpg");
	background-size: cover;
	background-position: center;

	@media screen and (min-width: 1000px) {
		background-image: none;
		background-color: grey;
		background-size: cover;
		background-position: center;
	}
}

h1 {
	/* center this h1 vertically */
	@apply flex justify-center items-center;
}
</style>