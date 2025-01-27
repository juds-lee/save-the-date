<template>
	<Home class="" />
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
	background-color: #F6F0E7
}
</style>