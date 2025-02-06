<template>
    <nav class="sticky top-0 w-full z-50 bg-rsvp-cream px-10 text-main">
        <div class="flex justify-between items-center p-4 max-w-[1200px] mx-auto border-b border-[#E2DED7]">
            <NuxtLink to="/" class="flex font-plantagenet-cherokee text-[28px]">J&D</NuxtLink>
            <span class="flex flex-row justify-center items-center space-x-8">
                <NuxtLink class="font-dm-sans sides-4 page text-[16px]" to="#when-and-where"
                    :class="{ 'active-page': route.hash === '#when-and-where' }">
                    When and Where
                </NuxtLink>
                <NuxtLink class="font-dm-sans text-accent sides-4 page" to="#details"
                    :class="{ 'active-page': route.hash === '#details' }">
                    Details
                </NuxtLink>
                <NuxtLink class="nav-rsvp-button" to="/rsvp">RSVP</NuxtLink>
            </span>
        </div>
    </nav>
</template>
<script setup lang="ts">
const route = useRoute()
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