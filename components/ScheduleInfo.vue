<template>
    <div class="bg-rsvp-green py-[110px] md:py-[150px]">
        <div class="max-w-[792px] mx-auto px-10">
            <p
                class="font-plantagenet-cherokee text-rsvp-cream text-center text-[35px] rsvp-sm:text-[50px] md:text-[60px] fade-up-element">
                Our
                Wedding Day
            </p>
            <div
                class="flex flex-col md:flex-row text-rsvp-cream justify-center items-center mt-[56px] pb-[40px] md:pb-[68px] fade-up-element">
                <div class="text-center gap-4 md:w-[384px]">
                    <p class="uppercase text-[16px] md:text-[20px]">When</p>
                    <p class="text-[24px] md:text-[32px] font-plantagenet-cherokee">September 20, 2025</p>
                </div>
                <div class="vertical-line hidden md:block" />
                <div class="horizontal-line-mobile  md:hidden" />
                <div class="md:w-[384px] text-center gap-4">
                    <p class="uppercase text-[16px] md:text-[20px]">Where</p>
                    <a href="https://maps.app.goo.gl/HZjthrFKdfAryhi79" target="_blank" rel="noopener noreferrer"
                        class="text-[24px] md:text-[32px]  font-plantagenet-cherokee link">Toronto Golf Club</a>
                </div>
            </div>
            <div v-for="(item, index) in eventItem" :key="index"
                class="flex flex-col text-rsvp-cream font-plantagenet-cherokee text-[20px] md:text-[32px] fade-up-element">
                <div class="flex flex-row justify-between w-full py-[48px] fade-up-element">
                    <p>{{ item.time }}</p>
                    <p class="max-w-[150px] rsvp-sm:max-w-full">{{ item.title }}</p>
                </div>
                <div class="w-full h-[1px] text-[#768777] horizontal-line fade-up-element" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const { initFadeUpAnimation } = useFadeUpAnimation();
let observer;

onMounted(() => {
    observer = initFadeUpAnimation();
});

onUnmounted(() => {
    if (observer) {
        observer.disconnect();
    }
});
const eventItem = ref([
    {
        title: "Doors Open & Welcome Drinks",
        time: "3:00 PM",
    },
    {
        title: "Ceremony",
        time: "4:00 PM",
    },
    {
        title: "Cocktail Hour",
        time: "4:30 PM",
    },
    {
        title: "Dinner",
        time: "6:00 PM",
    },
    {
        title: "Reception",
        time: "8:00 PM",
    }
]);
</script>
<style lang="postcss" scoped>
.vertical-line {
    width: 2px;
    height: 100px;
    background-color: #97A898;
}

.horizontal-line-mobile {
    width: 100px;
    height: 1px;
    background-color: #97A898;
    margin: 20px auto;
}

.horizontal-line {
    background-color: #97A898;
}

.link {
    text-decoration: underline;
    text-decoration-thickness: 1px;
}
</style>
