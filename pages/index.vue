<template>
	<Home />
	<FaqInfo v-if="guestCanAccess" />
</template>
<script setup>
definePageMeta({
	middleware: [
		'verify-user',
	],
	layout: 'default'
});
const { guestCanAccess } = useVerificationCheck();
</script>
<style>
body {
	background-color: black;
}
</style>