<template>
    <nav class="fixed top-0 left-0 w-full py-6 px-10 bg-bg">
        <ul class="w-full flex flex-row justify-between items-center">
            <NuxtLink to="/" class="text-accent font-greatvibes text-[30px]">J&D</NuxtLink>
            <span class="flex flex-row justify-center space-x-6">
                <NuxtLink class="text-accent sides-4 page" to="/" :class="{ 'active-page': route.path === '/' }">
                    Schedule
                </NuxtLink>
                <NuxtLink class="text-accent sides-4 page" to="/faq" :class="{ 'active-page': route.path === '/faq' }">
                    FAQ
                </NuxtLink>
            </span>
            <NuxtLink class="nav-rsvp-button" to="/rsvp">RSVP</NuxtLink>
        </ul>

    </nav>
</template>
<script setup lang="ts">
const route = useRoute()
</script>
<style lang="css" scoped>
/* .underline-offset-4 {
    text-decoration-thickness: 1px;
    text-underline-offset: 4px;
} */

.page {
    text-transform: uppercase;
    text-decoration: none;
    letter-spacing: 0.15em;
    display: inline-block;
    position: relative;
}

.page::after {
    content: "";
    position: absolute;
    bottom: 0;
    display: block;
    background: none repeat scroll 0 0 transparent;
    height: 2px;
    width: 0;
    background: #411900;
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
}

.page:hover::after,
.active-page::after {
    width: 100%;
    left: 0;
}
</style>