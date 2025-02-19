<template>
    <nav class="sticky top-0 w-full z-50 bg-rsvp-cream px-10 text-main">
        <div class="flex justify-between items-center p-4 max-w-[1200px] mx-auto border-b border-[#E2DED7]">
            <NuxtLink to="/" class="flex font-plantagenet-cherokee text-[28px]">J&D</NuxtLink>
            <!-- Mobile menu button -->
            <button class="md:hidden outline-none" @click="isOpen = !isOpen">
                <svg class="w-6 h-6 text-main" fill="none" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>

            <!-- Desktop Menu -->
            <span class="hidden md:flex flex-row justify-center items-center space-x-8">
                <NuxtLink class="font-dm-sans sides-4 page text-[16px]" :to="({ path: '/', hash: '#when-and-where' })"
                    :class="{ 'active-page': route.hash === '#when-and-where' }">
                    When and Where
                </NuxtLink>
                <NuxtLink class="font-dm-sans text-accent sides-4 page" :to="({ path: '/', hash: '#details' })"
                    :class="{ 'active-page': route.hash === '#details' }">
                    Details
                </NuxtLink>
                <NuxtLink class="nav-rsvp-button" to="/rsvp">RSVP</NuxtLink>
            </span>
        </div>

        <!-- Mobile Menu -->
        <transition enter-active-class="transition-all duration-700 ease-in-out" enter-from-class="max-h-0 opacity-0"
            enter-to-class="max-h-[300px] opacity-100" leave-active-class="transition-all duration-700 ease-in-out"
            leave-from-class="max-h-[300px] opacity-100" leave-to-class="max-h-0 opacity-0">
            <div v-if="isOpen" class="md:hidden border-t border-[#E2DED7] overflow-hidden">
                <div class="flex flex-col items-center py-4 space-y-4">
                    <NuxtLink class="font-dm-sans sides-4 page text-[16px]"
                        :to="({ path: '/', hash: '#when-and-where' })"
                        :class="{ 'active-page': route.hash === '#when-and-where' }" @click="isOpen = false">
                        When and Where
                    </NuxtLink>
                    <NuxtLink class="font-dm-sans text-accent sides-4 page" :to="({ path: '/', hash: '#details' })"
                        :class="{ 'active-page': route.hash === '#details' }" @click="isOpen = false">
                        Details
                    </NuxtLink>
                    <NuxtLink class="nav-rsvp-button" to="/rsvp" @click="isOpen = false">
                        RSVP
                    </NuxtLink>
                </div>
            </div>
        </transition>
    </nav>
</template>

<script setup lang="ts">
const route = useRoute()
const isOpen = ref(false)
</script>

<style lang="css" scoped>
.page {
    color: #2B2B2B;
    font-size: 16px;
    font-style: normal;
    line-height: normal;
}

.page::after {
    content: "";
    bottom: 0;
    display: block;
    background: none repeat scroll 0 0 transparent;
    height: 2px;
    width: 0;
    background: #2B2B2B;
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
}

.page:hover::after,
.active-page::after {
    width: 100%;
    left: 0;
}
</style>