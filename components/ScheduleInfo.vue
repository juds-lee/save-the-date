<template>
    <div class="bg-grey px-20 flex flex-col lg:flex-row items-center lg:items-end justify-around">
        <img src="../assets/svg/flower-2.svg" alt="heart" class="flower-asset" />
        <div
            class="flex flex-col items-center lg:items-start justify-center w-full max-w-[550px] lg:max-w-[700px] pb-[70px]">
            <h2 class="text-[50px] text-center lg:text-left text-balance font-greatvibes">
                We’re getting married! We welcome you to join us for a celebration
            </h2>
            <span class="date-title font-greatvibes text-accent">
                9.20.2024
            </span>
        </div>
    </div>
    <div class="mt-12 px-20">
        <div class="grid grid-cols-2 text-white">
            <div class="flex items-end">
                <h3 class="text-[60px] font-greatvibes">Schedule</h3>
            </div>
            <div class="flex items-end mb-5">
                All events will take place at The Toronto Golf Club
            </div>
        </div>
        <hr class="pb-10">
        <div class="grid grid-cols-2 pb-8 text-white" v-for="(event, i) in eventItem">
            <div>{{ event.time }}</div>
            <div> {{ event.title }}</div>
        </div>
    </div>
    <div class=" bg-grey px-6 flex flex-col lg:flex-row items-center justify-around">
        <img src="../assets/svg/flower-3.svg" alt="flower image" class="flower-rsvp-asset" />
        <div class="flex flex-col-reverse lg:flex-col">
            <div>
                <p
                    class="mt-12 text-[50px] text-main lg:text-[60px] text-center lg:text-left text-balance font-greatvibes">
                    Let the
                    countdown
                    begin</p>
                <p
                    class="max-w-[750px] text-[20px] lg:text-[30px] text-main text-center lg:text-left text-balance pb-12">
                    We hope you
                    can make it, it would be a delight to see you there</p>
            </div>
            <NuxtLink class="text-white px-7 border mx-auto lg:ml-0 rounded text-[40px]" to="/rsvp">RSVP
            </NuxtLink>
        </div>
    </div>
</template>
<script lang="ts" setup>
const eventItem = ref([
    {
        title: "Door Open & Welcome Drinks",
        time: "3:15 PM",
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
.sub-title {
    font-size: 24px;
    word-wrap: break-word;

    @media screen and (min-width: 700px) {
        font-size: 30px
    }

    @media screen and (min-width: 1024px) {
        font-size: 40px
    }
}

.date-title {
    font-size: 35px;

    @media screen and (min-width: 700px) {
        font-size: 40px
    }

    @media screen and (min-width: 1024px) {
        font-size: 50px
    }
}

.flower-rsvp-asset {
    max-height: 600px;
    height: 500px;

    @media screen and (min-width: 450px) {
        max-height: 800px;
        height: 700px;
    }
}

.flower-asset {
    width: 100%;
    max-width: 300px;

    @media screen and (min-width: 450px) {
        max-width: 500px;
    }

    @media screen and (min-width: 1024px) {
        max-width: 600px;
    }
}
</style>
