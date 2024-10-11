<template>
	<Home />
</template>
<script setup>
definePageMeta({
	middleware: [
		'verify-user',
	],
});
</script>
