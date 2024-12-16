<template>
	<div>
		<Home class="max-w-[1500px] border-sky-100" />
		<FaqInfo v-if="guestCanAccess" />
	</div>

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
	background-color: grey;
}
</style>