<template>
    <div class="overlay">
        <div class="flex flex-col modal relative">
            <button @click="handleClose" class="absolute top-0 right-1 p-2">
                X
                <Icon name="close" />
            </button>
            <p class="font-plantagenet-cherokee mt-4 mb-2">Please enter the password to see details</p>
            <span class="flex flex-row justify-center items-center gap-4">
                <input id="passwordInput" type="text" v-model="enteredPassword" placeholder="password" />
                <button @click="submitPassword">Enter</button>
            </span>
            <p v-if="setError" class="font-plantagenet-cherokee mt-4">{{ errorMessage }}</p>
        </div>
    </div>
</template>
<script setup lang="ts">
const { setAuth } = useVerificationCheck();

const enteredPassword = ref('');
const setError = ref(false);
const errorMessage = ref('');
const correctPassword = 'hello';
const submitPassword = () => {
    if (enteredPassword.value === "") {
        setError.value = true;
        errorMessage.value = "Please enter a valid password";
    } else if (enteredPassword.value === correctPassword) {
        setAuth(1)
        errorMessage.value = "";
    } else {
        setError.value = true;
        errorMessage.value = "Intruder Alert :)";
    }
};
const emit = defineEmits(['close']);
const handleClose = () => {
    emit('close')
}
</script>

<style lang="postcss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Jacques+Francois&display=swap');

.overlay {
    position: fixed;
    z-index: 160;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background-color: rgba(24, 28, 37, 0.9);
    left: auto;
    top: 0;
}

input {
    width: 100%;
    padding: 7px;
    border: 2px solid #7d917e;
    border-radius: 8px;
    font-size: 16px;
    background-color: #F6F0E7;
    color: #333;
    transition: border-color 0.3s, background-color 0.3s;
}

input::placeholder {
    color: #768777 !important;
}

.modal {
    position: fixed;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    --tw-text-opacity: 1;
    color: #E2DED7;
    background: #768777;
    border: 1px solid #768777;
    box-shadow: 0 23px 63px rgba(0, 0, 0, 0.6);
    border-radius: 6px;
    max-width: 615px;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
}

button {
    cursor: pointer;
    font-family: "plantagenet-cherokee", serif;
}

.rsvp {
    list-style-type: none;
}
</style>