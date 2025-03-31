<template>
    <div class="py-[110px] md:py-[150px] relative px-10">
        <p
            class="text-[40px] rsvp-sm:text-[50px] md:text-[60px] font-plantagenet-cherokee text-center mb-8 fade-up-element">
            Details</p>
        <div class="max-w-[792px] flex flex-col gap-4 mx-auto md:flex-row flex-wrap">
            <div v-for="(detail, i) in details" :key="i"
                class="bg-[#E7E0D5] p-5 md:p-10 rounded-lg flex-1 min-w-[calc(50%-8px)] min-h-[233px] h-[333px] relative fade-up-element">
                <img src="../assets/svg/star.svg" alt="" class="mb-5 fade-up-element" />
                <p class="text-[25px] md:text-[32px] font-plantagenet-cherokee text-main mb-2 fade-up-element">{{
                    detail.title }}</p>
                <p class="fade-up-element" v-html="detail.description"></p>
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
const details = [
    {
        title: "Invite Only",
        description: "We kindly request that our wedding be an adults-only celebration and that guests attend only with those listed on their invitation."
    },
    {
        title: "Food Options",
        description: "If you have any dietary restrictions or allergies, please let us know in your RSVP so we can accommodate your needs."
    },
    {
        title: "Parking",
        description: "There will be limited parking available at the golf club. We suggest arriving by a rideshare service or taxi to get to the venue."
    },
    {
        title: "Gifts",
        description: "Your presence is the greatest gift we could ask for! However, if you wish to give a gift, we would be grateful for a contribution to our honeymoon fund. Cash gifts are appreciated, or you can send an e-transfer to <i>duncanheeney@gmail.com</i>"
    },
    {
        title: "Black Tie Optional",
        description: "Guests are encouraged to wear suits, tuxedos, dresses, elegant cocktail attire, or other formal evening wear. We ask that you refrain from wearing white, cream, beige, or other similar shades."
    },
]
</script>
<style lang="postcss" scoped>
.vertical-line {
    width: 2px;
    height: 100px;
    background-color: #97A898;
}

.horizontal-line {
    background-color: #97A898;
}

.link {
    text-decoration: underline;
    text-decoration-thickness: 1px;
}

.save-the-date {
    position: absolute;
    z-index: 30;
    top: 250px;
    left: 100px !important;
}
</style>
