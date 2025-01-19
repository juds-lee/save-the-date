<template>
    <div class="h-full p-10 rounded-lg shadow-lg">
        <form @submit.prevent="submitGuestInfo">
            <p class="font-greatvibes text-[30px]">{{ guestInfo.name }}</p>
            <div class="flex flex-col items-start space-y-2">
                <!-- Main Guest RSVP -->
                <div v-for="(option, index) in rsvpOptions" :key="index"
                    class="flex justify-between w-full items-center">
                    <label :for="'rsvp' + index" class="custom-label">{{ option.label }}</label>
                    <div class="relative">
                        <input type="radio" :id="'rsvp' + index" :name="'mainRsvp'" :value="option.value"
                            v-model="guestInfo.rsvpOption" @change="handleChange" class="custom-radio" />
                        <svg v-if="guestInfo.rsvpOption === option.value"
                            class="nought absolute top-[-17px] left-[-18px]" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32.02 40.6">
                            <g>
                                <path class="nought-line"
                                    d="M14.74,6.51a5.17,5.17,0,0,0-2.2-.08c-2,.37-3.21,2-4.88,4.27a36.24,36.24,0,0,0-3.43,6.06,21.94,21.94,0,0,0-1.66,4,28.12,28.12,0,0,0-.75,4.65,33.3,33.3,0,0,0-.32,4.1,11.87,11.87,0,0,0,.4,4.23,7.78,7.78,0,0,0,2.22,3.41A8.2,8.2,0,0,0,8.73,39a12.54,12.54,0,0,0,7.15-1.42A19.35,19.35,0,0,0,19.82,35a28,28,0,0,0,5.37-5.1A25,25,0,0,0,29,23a24.91,24.91,0,0,0,1.25-12.42c-.37-2.18-1-6.1-3.91-8a7,7,0,0,0-3.07-1.06,5.85,5.85,0,0,0-3,.48A6.76,6.76,0,0,0,18,3.84a17,17,0,0,0-1.43,2c-.29.44-.49.76-.85,1.35C15,8.45,14.57,9.07,14.34,9.5a12,12,0,0,0-1.07,3.09" />
                            </g>
                        </svg>
                    </div>
                </div>

                <div class="custom-label styled-input">
                    Dietary Restrictions:
                    <input type="text" id="allergies" v-model="guestInfo.allergies" />
                </div>
            </div>
            <!-- Secondary Guest RSVP -->
            <div v-if="guestInfo.hasPlusOne" class="mt-10">
                <p class="font-greatvibes text-[30px]"> {{ guestInfo.secondaryGuest.secondaryName }}</p>

                <div v-for="(option, index) in rsvpOptions" :key="'secondary' + index"
                    class="flex justify-between w-full items-center">
                    <label :for="'secondaryRsvp' + index" class="custom-label">{{ option.label }}</label>
                    <div class="relative">
                        <input type="radio" :id="'secondaryRsvp' + index" :name="'secondaryRsvp'" :value="option.value"
                            v-model="guestInfo.secondaryGuest.secondaryRsvpOption" @change="handleChange"
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

                <div class="custom-label styled-input">
                    Dietary Restrictions:
                    <input type="text" id="allergies" v-model="guestInfo.secondaryGuest.secondaryAllergies" />
                </div>
            </div>
            <button class="mt-10 font-greatvibes text-[30px]" type="submit">Submit</button>
        </form>
        <div v-if="rsvpError" class="text-[#333]">Please let us know if you can make the event</div>
        <div v-else-if="submitSuccess" class="text-[#333]">Thank you for your response.</div>
    </div>
</template>

<script setup lang="ts">
const rsvpOptions = [
    { label: 'Accept', value: 'true' },
    { label: 'Regretfully Decline', value: 'false' }
];
const props = defineProps<{
    guestInfo: GuestInfo;
}>()
const handleChange = () => {
    console.log('Radio button clicked! Current selection:', props.guestInfo.rsvpOption)
}
const submitSuccess = ref(false);
const { updateGuestRsvp } = useFirebase();
const rsvpError = ref(false);
const submitGuestInfo = async () => {
    try {
        if (!props.guestInfo.rsvpOption) {
            rsvpError.value = true;
            return;
        }
        await updateGuestRsvp(props.guestInfo);
        submitSuccess.value = true;
    } catch (error) {
        rsvpError.value = true;
        console.error(error);
    }
}
</script>
<style scoped>
label {
    margin-bottom: 0.5rem;
}

.custom-label {
    color: #333;
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
    border-bottom: 2px solid #333;
    width: 100%;
    background: transparent;
    outline: none;
    font-size: inherit;
    color: #333;
    z-index: 2;
    position: relative;
}

.styled-input input::placeholder {
    color: transparent;
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