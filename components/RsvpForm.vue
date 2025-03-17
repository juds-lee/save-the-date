<template>
    <div class="container flex items-center justify-center">
        <div class="text-accent card" id="card" :class="[
            { rotate: userHasSubmitted },
            getDimensions
        ]">
            <div class="front flex flex-col px-5 py-4 rounded-lg shadow-lg">
                <div class="mb-6 mt-2">
                    <p class="rsvp-title">Dear {{
                        firstNameOnly
                        }},
                    </p>
                    <p> we would love for you to join us in our celebrations. Please rsvp no later than May 20 2025.</p>
                </div>
                <form @submit.prevent="submitGuestInfo" class="h-full flex flex-col justify-between">
                    <div class="max-h-[150px]">
                        <p class=" rsvp-name" v-if="guestInfo.hasPlusOne">{{ guestInfo.name }}
                        </p>
                        <div class="flex flex-col items-start">
                            <div v-for="(option, index) in rsvpOptions" :key="index" class="rsvp-response">
                                <label :for="'rsvp' + index" class="custom-label">{{ option.label }}</label>
                                <div class="relative">
                                    <input type="radio" :id="'rsvp' + index" :name="'mainRsvp'" :value="option.value"
                                        v-model="guestInfo.rsvpOption" class="custom-radio" />
                                    <svg v-if="guestInfo.rsvpOption === option.value"
                                        class="nought absolute top-[-17px] left-[-18px]"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.02 40.6">
                                        <g>
                                            <path class="nought-line"
                                                d="M14.74,6.51a5.17,5.17,0,0,0-2.2-.08c-2,.37-3.21,2-4.88,4.27a36.24,36.24,0,0,0-3.43,6.06,21.94,21.94,0,0,0-1.66,4,28.12,28.12,0,0,0-.75,4.65,33.3,33.3,0,0,0-.32,4.1,11.87,11.87,0,0,0,.4,4.23,7.78,7.78,0,0,0,2.22,3.41A8.2,8.2,0,0,0,8.73,39a12.54,12.54,0,0,0,7.15-1.42A19.35,19.35,0,0,0,19.82,35a28,28,0,0,0,5.37-5.1A25,25,0,0,0,29,23a24.91,24.91,0,0,0,1.25-12.42c-.37-2.18-1-6.1-3.91-8a7,7,0,0,0-3.07-1.06,5.85,5.85,0,0,0-3,.48A6.76,6.76,0,0,0,18,3.84a17,17,0,0,0-1.43,2c-.29.44-.49.76-.85,1.35C15,8.45,14.57,9.07,14.34,9.5a12,12,0,0,0-1.07,3.09" />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <div class="custom-label styled-input  text-[15px] sm:text-[17px]">
                                Dietary Restrictions:
                                <input type="text" id="allergies" v-model="guestInfo.allergies" />
                            </div>
                        </div>
                    </div>
                    <div v-if="guestInfo.hasPlusOne" class="mt-8 max-h-[150px]">
                        <p class="rsvp-name"> {{ guestInfo.secondaryGuest.secondaryName }}
                        </p>
                        <div v-for="(option, index) in rsvpOptions" :key="'secondary' + index" class="rsvp-response">
                            <label :for="'secondaryRsvp' + index" class="custom-label">{{ option.label }}</label>
                            <div class="relative">
                                <input type="radio" :id="'secondaryRsvp' + index" :name="'secondaryRsvp'"
                                    :value="option.value" v-model="guestInfo.secondaryGuest.secondaryRsvpOption"
                                    class="custom-radio" />
                                <svg v-if="guestInfo.secondaryGuest.secondaryRsvpOption === option.value"
                                    class="nought absolute top-[-17px] left-[-18px]" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 32.02 40.6">
                                    <g>
                                        <path class="nought-line"
                                            d="M14.74,6.51a5.17,5.17,0,0,0-2.2-.08c-2,.37-3.21,2-4.88,4.27a36.24,36.24,0,0,0-3.43,6.06,21.94,21.94,0,0,0-1.66,4,28.12,28.12,0,0,0-.75,4.65,33.3,33.3,0,0,0-.32,4.1,11.87,11.87,0,0,0,.4,4.23,7.78,7.78,0,0,0,2.22,3.41A8.2,8.2,0,0,0,8.73,39a12.54,12.54,0,0,0,7.15-1.42A19.35,19.35,0,0,0,19.82,35a28,28,0,0,0,5.37-5.1A25,25,0,0,0,29,23a24.91,24.91,0,0,0,1.25-12.42c-.37-2.18-1-6.1-3.91-8a7,7,0,0,0-3.07-1.06,5.85,5.85,0,0,0-3,.48A6.76,6.76,0,0,0,18,3.84a17,17,0,0,0-1.43,2c-.29.44-.49.76-.85,1.35C15,8.45,14.57,9.07,14.34,9.5a12,12,0,0,0-1.07,3.09" />
                                    </g>
                                </svg>
                            </div>
                        </div>

                        <div class="custom-label styled-input text-[15px] sm:text-[17px]">
                            Dietary Restrictions:
                            <input type="text" id="allergies" v-model="guestInfo.secondaryGuest.secondaryAllergies" />
                        </div>
                    </div>
                    <button class="rsvp-submit" type="submit">Submit</button>
                    <div v-if="rsvpError" class="text-accent">Please let us know if you can make the event</div>
                </form>
            </div>
            <div class="back" :class="getDimensions">
                Your response
                has been
                noted. <br /> Thank you.
                <img src="../assets/svg/flower-1.svg" alt="heart" class="absolute -z-20"
                    :class="guestInfo.hasPlusOne ? 'h-auto' : 'h-[450px]'" />
            </div>

        </div>
    </div>

</template>

<script setup lang="ts">
const rsvpOptions = [
    { label: 'Accept', value: true },
    { label: 'Regretfully Decline', value: false }
];
const props = defineProps<{
    guestInfo: GuestInfo;
}>()
const { updateGuestRsvp, checkUserSubmission, userHasSubmitted } = useFirebase();
const rsvpError = ref(false);
const submitGuestInfo = async () => {
    try {
        if (!props.guestInfo.rsvpOption) {
            console.log("rsvp error", rsvpError)
            rsvpError.value = true;
            return;
        }
        await updateGuestRsvp(props.guestInfo);
        setTimeout(() => {
            document.getElementById("card")?.classList.add("rotate");
        }, 500);
    } catch (error) {
        rsvpError.value = true;
        console.error(error);
    }
}

const { width: windowWidth } = useWindowSize();
const firstNameOnly = computed(() => {
    if (!props.guestInfo?.name) return '';
    const primaryFirstName = props.guestInfo.name.split(' ')[0] || '';
    if (props.guestInfo.hasPlusOne && props.guestInfo.secondaryGuest?.secondaryName) {
        const secondaryFirstName = props.guestInfo.secondaryGuest.secondaryName.split(' ')[0] || '';
        return `${primaryFirstName} and ${secondaryFirstName}`;
    }

    return primaryFirstName;
});
const getDimensions = computed(() => {
    if (props.guestInfo.hasPlusOne && windowWidth.value >= 1300) {
        return 'w-[600px] h-[600px]';
    }
    else if (props.guestInfo.hasPlusOne && windowWidth.value <= 1299) {
        return 'w-[500px] h-[580px]';
    }
    // if (props.guestInfo.hasPlusOne && windowWidth.value > 1300) {
    //     return 'w-[450px] h-[560px]';
    // }
    else if (!props.guestInfo.hasPlusOne && windowWidth.value > 1300) {
        return 'w-[550px] h-[380px]';
    }
    return 'w-[500px] h-[380px]';
})
onMounted(() => {

    checkUserSubmission()
})
</script>
<style scoped>
.card {
    position: relative;
    transform-style: preserve-3d;
    transition: transform 1s linear;
}

.front,
.back {
    height: 100%;
    width: 100%;
    display: flex;
    position: absolute;
    background: #F6F0E7;

}

.back {
    @apply text-[20px] font-plantagenet-cherokee text-center items-center justify-center rounded-lg shadow-lg;
    background: #F6F0E7;
    z-index: 1;
    transform: rotateY(180deg);

    @media screen and (min-width: 1300px) {
        font-size: 30px;
    }
}

.front {
    z-index: 2;
    backface-visibility: hidden;
}

.rotate {
    transform: rotateY(180deg);
}

.container {
    margin-bottom: 20px;

    @media screen and (min-width: 1150px) {
        perspective: 1000px;
        min-height: 100vh;
        margin-bottom: 0;
    }
}

.rsvp-response {
    @apply flex justify-between w-full items-center;
    font-size: 15px;

    @media screen and (min-width: 400px) {
        font-size: 17px;
    }

}

.rsvp-title {
    @apply font-plantagenet-cherokee text-[25px] text-main max-w-[700px];

    @media screen and (min-width: 400px) {
        font-size: 30px;
    }

    @media screen and (min-width: 1300px) {
        font-size: 40px;
    }
}

.rsvp-name {
    @apply font-plantagenet-cherokee text-[20px];

    @media screen and (min-width: 1300px) {
        font-size: 30px;
    }
}

.rsvp-submit {
    @apply font-plantagenet-cherokee text-[15px];
    color: #F6F0E7;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px 7px;
    border-radius: 10px;
    background: #6B876D;
    transition: background-color 0.3s, color 0.3s, transform 0.2s;
    cursor: pointer;

    @media screen and (min-width: 400px) {
        font-size: 25px;
        padding: 5px 10px;

    }
}

.rsvp-submit:hover {
    background: #5a705b;
    transform: scale(0.95);
}

.rsvp-submit:active {
    background: #4a5d4c;
    transform: scale(0.9);
}

label {
    margin-bottom: 0.5rem;
}

.custom-label {
    cursor: pointer;
}

.custom-radio {
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid #333;
    border-radius: 1px;
    display: inline-block;
    position: relative;
    cursor: pointer;
    outline: none;
    transition: transform 0.2s ease, background-color 0.2s ease;
}


.custom-radio:checked::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    width: 12px;
    height: 12px;
    background-color: none;
    border-radius: 2px;
    transition: transform 0.2s ease;
}

.custom-radio:hover {
    transform: scale(1.1);
}


.styled-input input:focus+span {
    background-color: transparent;
    display: none;
}

.styled-input span {
    position: absolute;
    top: 0;
    left: 0;
    white-space: nowrap;
    pointer-events: none;
    color: #aaa;
    z-index: 1;
}

.styled-input input {
    border: none;
    border-bottom: 2px solid #E2DED7;
    background: #F6F0E7;
    outline: none;
    width: auto;
    font-size: inherit;
    color: #333;
    z-index: 2;
    position: relative;

    @media screen and (min-width: 1300px) {
        width: 300px;
    }
}

.styled-input input::placeholder {
    color: #F6F0E7;
}

.styled-input input:focus+span {
    display: none;
}

@keyframes offset {
    100% {
        stroke-dashoffset: 0;
    }
}

.nought {
    width: 57px;
    stroke-linecap: round;
    fill: none;
    padding: 15px;
}

.nought-line {
    stroke: #333;
    stroke-width: 2;
    stroke-dasharray: 115;
    stroke-dashoffset: 115;
    animation: offset 0.7s ease-in-out forwards;
}

.cross-line-one {
    stroke-dasharray: 110;
    stroke-dashoffset: 110;
}
</style>