<template>
    <div class="bg-rsvp-green py-[160px]">
        <div class="max-w-[800px] mx-auto">
            <p class="font-plantagenet-cherokee text-rsvp-cream text-center text-[58px]">Our Wedding Day</p>
            <div class="flex flex-row text-rsvp-cream justify-center items-center mt-[56px] pb-[68px]">
                <div class="text-center gap-4 w-[384px]">
                    <p class="uppercase text-[20px]">When</p>
                    <p class="text-[32px] font-plantagenet-cherokee">September 20, 2025</p>
                </div>
                <div class="vertical-line" />
                <div class="w-[384px] text-center gap-4">
                    <p class="uppercase text-[20px] ">Where</p>
                    <a href="https://maps.app.goo.gl/HZjthrFKdfAryhi79" target="_blank" rel="noopener noreferrer"
                        class="text-[32px] font-plantagenet-cherokee link">Toronto Golf Club</a>
                </div>
            </div>
            <div v-for="(item, index) in eventItem" :key="index"
                class="flex flex-col text-rsvp-cream font-plantagenet-cherokee text-[32px]">
                <div class="flex flex-row justify-between w-full py-[48px]">
                    <p>{{ item.time }}</p>
                    <p>{{ item.title }}</p>
                </div>
                <div class="w-full h-[1px] text-[#768777] horizontal-line" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const eventItem = ref([
    {
        title: "Doors Open & Welcome Drinks",
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
</style>
