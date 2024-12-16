<template>
    <div :class="{ 'no-scroll': modalOverlay }">
        <HomepageAuth class="flex justify-center items-center fixed w-full h-full z-50"
            v-if="scroll && !guestCanAccess" />
        <div
            class="h-[70vh] w-full flex flex-col lg:flex-row mx-auto items-center justify-around lg:justify-between mt-[100px] px-6">
            <h1 class="flex items-center text-[50px] text-white">JUDY & DUNCAN</h1>
            <div class="hero-container h-[70vh]">
                <div class="hero-image">
                </div>
            </div>
        </div>
        <ScheduleInfo />
    </div>
</template>
<script setup>
const { guestCanAccess } = useVerificationCheck();
const scroll = ref(false)
const modalOverlay = ref(false)
const handlePageScroll = () => {
    if (window.scrollY > 6) {
        console.log('scrolling')
        scroll.value = true
        if (!guestCanAccess.value) {
            modalOverlay.value = true
        }
    }
};
watch(guestCanAccess, (value) => {
    if (value) {
        modalOverlay.value = false
    }
})
onMounted(() => {
    window.addEventListener('scroll', handlePageScroll)
})
onUnmounted(() => {
    window.removeEventListener('scroll', handlePageScroll)
})
const { name } = storeToRefs(useUserStore());
definePageMeta({
    middleware: [
        'verify-user',
    ],
});

</script>
<style lang="postcss">
@import url('https://fonts.googleapis.com/css2?family=Jacques+Francois&display=swap');

.no-scroll {
    overflow: hidden;
    height: 100vh;
}

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

.hero-image {
    background-image: url("https://res.cloudinary.com/djatkco6m/image/upload/t_jd-2/v1727984209/DSC04460_2_fqkuyj.jpg");
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
}

.hero-container {
    width: 700px;

    @media screen and (max-width: 737px) {
        width: 100%;
    }

}

@media screen and (max-width: 737px) {}
</style>