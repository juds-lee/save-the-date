<template>
    <div :class="{ 'no-scroll': modalOverlay }">
        <HomepageAuth class="flex justify-center items-center fixed w-full h-full z-50" v-if="modalOverlay"
            @close="closeModal" />
        <div class=" mx-auto px-10 mt-10 max-w-[1500px] mb-[160px]">
            <p class="subtitle fade-up-element">September 20, 2025 • The Toronto
                Golf Club
            </p>
            <p class="title fade-up-element">Judy & Duncan</p>
            <div class="relative">
                <NuxtImg
                    src="https://res.cloudinary.com/djatkco6m/image/upload/v1738010448/DSC04460_2_fqkuyj_9b750c.jpg"
                    class="hero-left-image fade-up-element" />
                <NuxtImg
                    src="https://res.cloudinary.com/djatkco6m/image/upload/c_crop,w_4093,h_5894,x_0,y_244/v1738010139/IMG_8478_zfvh65.jpg"
                    class="hero-main-image fade-up-element" />
                <NuxtImg src="https://res.cloudinary.com/djatkco6m/image/upload/v1727983013/DSC04426_2_io6dfc.jpg"
                    class="hero-right-image fade-up-element" />
                <img src="../assets/svg/save-the-date.svg" class="save-the-date-label fade-up-element" />
            </div>
            <div class="flex justify-center gap-2">
                <NuxtImg
                    src="https://res.cloudinary.com/djatkco6m/image/upload/c_crop,w_4093,h_5894,x_0,y_244/v1738010139/IMG_8478_zfvh65.jpg"
                    class="hero-main-image-med fade-up-element" />
                <div class="flex flex-col relative h-full justify-between gap-2">
                    <NuxtImg src="
                    https://res.cloudinary.com/djatkco6m/image/upload/v1738010448/DSC04460_2_fqkuyj_9b750c.jpg"
                        class="hero-left-image-med fade-up-element" />

                    <NuxtImg src="https://res.cloudinary.com/djatkco6m/image/upload/v1727983013/DSC04426_2_io6dfc.jpg"
                        class="hero-right-image-med fade-up-element" />
                    <img src="../assets/svg/save-the-date.svg" class="save-the-date-label-med fade-up-element   " />
                </div>
            </div>
        </div>
        <ScheduleInfo id="when-and-where" />
        <Details id="details" />
        <Countdown />
    </div>
</template>
<script setup>
const { initFadeUpAnimation } = useFadeUpAnimation();
let observer;
const handlePageScroll = () => {
    if (window.scrollY > 6) {
        scroll.value = true;
        if (!guestCanAccess.value) {
            modalOverlay.value = true;
        }
    }
};

const scroll = ref(false);
const modalOverlay = ref(false);
const closeModal = () => {
    modalOverlay.value = false;
};

const { guestCanAccess } = useVerificationCheck();
watch(guestCanAccess, (value) => {
    if (value) {
        modalOverlay.value = false;
    }
});

onMounted(() => {
    window.addEventListener('scroll', handlePageScroll);
    window.onload = () => {
        // document.getElementById("myDiv").classList.add("slide-up");
    };
    observer = initFadeUpAnimation();

});
onUnmounted(() => {
    window.removeEventListener('scroll', handlePageScroll); if (observer) {
        observer.disconnect();
    }
});

const { name } = storeToRefs(useUserStore());
definePageMeta({
    middleware: ['verify-user'],
});

</script>
<style lang="postcss">
.title {
    @apply font-plantagenet-cherokee text-main text-[40px] text-center;

    @media screen and (min-width: 400px) {
        font-size: 48px;
    }

    @media screen and (min-width: 500px) {
        font-size: 60px;
    }

    @media screen and (min-width: 800px) {
        font-size: 100px;
    }
}

.subtitle {
    @apply font-plantagenet-cherokee text-[#717171] text-center text-[19px];

    @media screen and (min-width: 550px) {
        font-size: 24px;
    }
}

.no-scroll {
    overflow: hidden;
    height: 100vh;
}

.hero-main-image {
    display: none;

    @media screen and (min-width: 1250px) {
        display: block;
        max-width: 450px;
        width: 100%;
        margin: auto;
        max-width: 450px;
    }
}

.hero-left-image {
    display: none;

    @media screen and (min-width: 1250px) {
        display: block;
        width: 310px;
        position: absolute;
        left: 85px;
        bottom: -30px;
    }


}

.hero-right-image {
    display: none;

    @media screen and (min-width: 1250px) {
        display: block;
        width: 405px;
        position: absolute;
        right: -10px;
        top: 100px
    }
}

.save-the-date-label {
    display: none;
    animation: spin 90s linear infinite;

    @media screen and (min-width: 1250px) {
        display: block;
        position: absolute;
        right: 260px;
        top: 10px;
    }

}

.hero-main-image-med {
    display: block;
    width: 100%;
    max-width: 450px;
    height: auto;

    @media screen and (min-width: 1250px) {
        display: none;
    }
}

.hero-left-image-med {
    display: none;

    @media screen and (min-width: 850px) {
        display: block;
        width: 310px;
        height: auto;
        margin: 0;
        position: relative;
        left: 0;
    }

    @media screen and (min-width: 1250px) {
        display: none;
    }
}

.hero-right-image-med {
    display: none;

    @media screen and (min-width: 850px) {
        display: block;
        width: 342px;
        height: auto;
        position: relative;
        right: 0;
        margin: 0;
    }

    @media screen and (min-width: 1250px) {
        display: none;
    }
}

.save-the-date-label-med {
    display: block;
    position: absolute;
    right: -20px;
    top: -10px;
    animation: spin 70s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>