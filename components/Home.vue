<template>
    <div :class="{ 'no-scroll': modalOverlay }" class="">
        <HomepageAuth class="flex justify-center items-center fixed w-full h-full z-50" v-if="modalOverlay"
            @close="closeModal" />
        <div class=" mx-auto px-10 mt-10 max-w-[1500px] mb-[160px]">
            <p class="font-plantagenet-cherokee text-[#717171] text-center text-[24px]">September 20, 2025 • The Toronto
                Golf Club
            </p>
            <p class="font-plantagenet-cherokee text-main text-[100px] text-center">Judy & Duncan</p>
            <div class="relative">
                <NuxtImg
                    src="https://res.cloudinary.com/djatkco6m/image/upload/v1738010448/DSC04460_2_fqkuyj_9b750c.jpg"
                    class="hero-left-image" />
                <NuxtImg
                    src="https://res.cloudinary.com/djatkco6m/image/upload/c_crop,w_4093,h_5894,x_0,y_244/v1738010139/IMG_8478_zfvh65.jpg"
                    class="hero-main-image" />
                <NuxtImg src="https://res.cloudinary.com/djatkco6m/image/upload/v1727983013/DSC04426_2_io6dfc.jpg"
                    class="hero-right-image" />
                <img src="../assets/svg/save-the-date.svg" class="save-the-date-label" />
            </div>
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

.hero-main-image {
    width: 100%;
    margin: auto;
    max-width: 450px;

    @media screen and (min-width: 1200px) {
        max-width: 450px;
    }
}

.hero-left-image {
    width: 310px;
    position: absolute;
    left: 85px;
    bottom: -30px;
}

.hero-right-image {
    width: 405px;
    position: absolute;
    right: -10px;
    top: 100px
}

.save-the-date-label {
    position: absolute;
    right: 260px;
    top: 10px;

}
</style>