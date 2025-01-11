<template>
    <nav class="w-full bg-grey py-6 px-10">
        <ul class="w-full flex flex-row justify-between items-center">
            <NuxtLink to="/" class="text-white">LOGO HERE</NuxtLink>
            <span class="flex flex-row justify-center space-x-6">
                <NuxtLink class="text-white" to="/" :class="{ 'underline underline-offset-4': route.path === '/' }">
                    Schedule
                </NuxtLink>
                <NuxtLink class="text-white" to="/faq"
                    :class="{ 'underline underline-offset-4': route.path === '/faq' }">
                    FAQ
                </NuxtLink>
            </span>
            <NuxtLink class=" text-white px-7 border rounded" to="/rsvp">RSVP</NuxtLink>
        </ul>

    </nav>
</template>
<script setup lang="ts">
const route = useRoute()
</script>
<style lang="css" scoped>
.underline-offset-4 {
    text-decoration-thickness: 1px;
    text-underline-offset: 4px;
}
</style>