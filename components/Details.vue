<template>
    <div class="py-[110px] md:py-[150px] relative px-10">
        <p class="text-[40px] rsvp-sm:text-[50px] md:text-[60px] font-plantagenet-cherokee text-center mb-8">Details</p>
        <div class="max-w-[792px] flex flex-col gap-4 mx-auto md:flex-row flex-wrap">
            <div v-for="(detail, i) in details" :key="i"
                class="bg-[#E7E0D5] p-5 md:p-10 rounded-lg flex-1 min-w-[calc(50%-8px)] min-h-[233px] h-[333px] relative">
                <img src="../assets/svg/star.svg" alt="" class="mb-5" />
                <p class="text-[25px] md:text-[32px] font-plantagenet-cherokee text-main mb-2">{{ detail.title }}</p>
                <p>{{ detail.description }}</p>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const details = [
    {
        title: "Black Tie Optional",
        description: "Guests are encouraged to wear suits, dresses, elegant cocktail attire, or other formal evening wear. We ask that you refrain from wearing white, cream, beige, or similar light shades"
    },
    {
        title: "Gifts",
        description: "Your presence is the best gift we could ask for. If you would like to give a gift, we have a registry at The Bay."
    },
    {
        title: "No children",
        description: "We kindly ask that our wedding remain an adults-only event. We appreciate your understanding!"
    },
    {
        title: "Food Options",
        description: "If you have any dietary restrictions or allergies, please let us know in your RSVP so we can accommodate your needs."
    }
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
