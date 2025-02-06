<template>
    <div
        class="max-w-[800px] mx-auto pb-[100px] pt-10 border-t border-[#E2DED7] flex flex-row justify-between items-center">
        <div>
            <p class="font-plantagenet-cherokee text-left mb-8 text-[32px]">Let the Countdown begin</p>
            <div class="flex flex-row gap-4">
                <div v-for="(time, index) in timeUnits" :key="index" class="flex flex-col items-center">
                    <div class="flex flex-row gap-2">
                        <p class="text-[68px] font-plantagenet-cherokee">
                            {{ time.amount.value.toString().length === 1 ? `0${time.amount.value}` : time.amount.value
                            }}
                        </p>
                        <p v-if="index !== timeUnits.length - 1" class="text-[68px] font-plantagenet-cherokee">:</p>
                    </div>
                    <p class="text-center text-[20px]">{{ time.label }}</p>
                </div>
            </div>
        </div>
        <button class="main-rsvp-button flex flex-row items-center justify-center gap-1">RSVP
            <img src="../assets/svg/arrow-outward.svg" alt="">
        </button>
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
<style lang="postcss" scoped></style>
