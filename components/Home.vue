<template>
    <div :class="{ 'no-scroll': modalOverlay }">
        <HomepageAuth class="flex justify-center items-center fixed w-full h-full z-50" v-if="modalOverlay"
            @close="closeModal" />
        <div
            class="h-[70vh] w-full flex flex-col lg:flex-row mx-auto items-center justify-around lg:justify-between mt-[50px] px-10 rsvp-sm:px-20 gap-2">
            <h1 class="flex items-center text-[75px] text-white max-w-[500px] font-greatvibes">Judy & Duncan
            </h1>
            <NuxtImg
                src="https://res.cloudinary.com/djatkco6m/image/upload/v1736097763/EE072B49-3841-4F3E-91BD-5D18EF2131EA_fgvydh.jpg"
                class="elevator-image" />
        </div>
        <ScheduleInfo />
    </div>
</template>
<script setup>
const { guestCanAccess } = useVerificationCheck();
const scroll = ref(false);
const modalOverlay = ref(false);

const handlePageScroll = () => {
    if (window.scrollY > 6) {
        scroll.value = true;
        if (!guestCanAccess.value) {
            modalOverlay.value = true;
        }
    }
};

const closeModal = () => {
    modalOverlay.value = false;
    console.log("Modal closed:", modalOverlay.value);
};

watch(guestCanAccess, (value) => {
    if (value) {
        modalOverlay.value = false;
    }
});

onMounted(() => {
    window.addEventListener('scroll', handlePageScroll);
});
onUnmounted(() => {
    window.removeEventListener('scroll', handlePageScroll);
});

const { name } = storeToRefs(useUserStore());
definePageMeta({
    middleware: ['verify-user'],
});

</script>
<style lang="postcss">
.no-scroll {
    overflow: hidden;
    height: 100vh;
}

h1 {
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
    /* background-image: url("https://res.cloudinary.com/djatkco6m/image/upload/t_jd-1/v1727984209/DSC04460_2_fqkuyj.jpg"); */
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

.elevator-image {
    width: 100%;
    margin-top: 24px;
    max-width: 600px;

    @media screen and (min-width: 1200px) {
        margin-top: 24px;
    }
}
</style>