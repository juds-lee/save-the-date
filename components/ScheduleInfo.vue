<template>
    <div class="bg-grey px-6 flex flex-col lg:flex-row items-center lg:items-end justify-around">
        <img src="https://res.cloudinary.com/djatkco6m/image/upload/v1734718678/image-asset_pokmct.png" alt="heart"
            class="flower-asset" />
        <div
            class="flex flex-col items-center lg:items-start justify-center w-full max-w-[550px] lg:max-w-[700px] pb-[70px]">
            <h2 class="text-white sub-title text-center lg:text-left text-balance">
                We’re getting married! Join us for a weekend of celebration and love
            </h2>
            <h2 class="date-title">
                9.20.2024
            </h2>
        </div>
    </div>
    <div class="mt-12 px-6">
        <div class="grid grid-cols-2 pb-8 text-white">
            <div class="flex items-end">
                <h3 class="text-[40px]">Schedule</h3>
            </div>
            <div class="flex items-end">
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
        <img src="https://res.cloudinary.com/djatkco6m/image/upload/v1735160398/flower-asset_gv0b6m.png"
            alt="flower image" class="flower-rsvp-asset" />
        <div class="flex flex-col-reverse lg:flex-col">
            <div>
                <p class="mt-12 text-[30px] lg:text-[40px] pb-12 text-center lg:text-left text-balance">Let the
                    countdown
                    begin</p>
                <p
                    class="max-w-[750px] text-[20px] lg:text-[30px] text-white text-center lg:text-left text-balance pb-12">
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
<style>
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
