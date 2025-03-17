<template>
    <div class="w-full max-w-[800px] mx-auto px-10 mb-10">
        <div class="horizontal-line w-full h-[1px]" />
    </div>
    <div
        class="max-w-[800px] mx-auto w-full pb-[60px] md:pb-[100px] flex flex-col md:flex-row justify-between items-center px-10">
        <div>
            <p class="font-plantagenet-cherokee text-center md:text-left mb-4 text-[30px]">Let the countdown begin!</p>
            <div class="flex flex-row gap-4 justify-center fade-up-element">
                <div v-for="(time, index) in timeUnits" :key="index" class="flex flex-col items-center">
                    <div class="flex flex-row gap-2">
                        <p class="text-[37px] sm:text-[48px] rsvp-sm:text-[68px] font-plantagenet-cherokee">
                            {{ time.amount.value.toString().length === 1 ? `0${time.amount.value}` : time.amount.value
                            }}
                        </p>
                        <p v-if="index !== timeUnits.length - 1"
                            class="text-[37px]  sm:text-[48px] rsvp-sm:text-[68px] font-plantagenet-cherokee">:</p>
                    </div>
                    <p class="text-center text-[20px]">{{ time.label }}</p>
                </div>
            </div>
        </div>
        <NuxtLink class="main-rsvp-button flex flex-row items-center justify-center gap-1 mt-10 md:mt-0"
            to="/rsvp fade-up-element">RSVP
            <img src="../assets/svg/arrow-outward.svg" alt="">
        </NuxtLink>
    </div>

</template>
<script lang="ts" setup>
const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const timeUnits = [
    { amount: days, label: 'DAYS' },
    { amount: hours, label: 'HOURS' },
    { amount: minutes, label: 'MINS' },
    { amount: seconds, label: 'SECS' },
];

const updateCountdown = () => {
    const weddingDate = new Date(Date.UTC(2025, 8, 20, 20, 0));
    const now = new Date();
    const nowUTC = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds(),
    ));
    const timeDifference = weddingDate.getTime() - nowUTC.getTime();

    if (timeDifference <= 0) {
        clearInterval(countdownInterval);
        return;
    }
    days.value = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    hours.value = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes.value = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    seconds.value = Math.floor((timeDifference % (1000 * 60)) / 1000);
}
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

</script>
<style lang="postcss" scoped>
.horizontal-line {
    background-color: #E2DED7;
}
</style>
