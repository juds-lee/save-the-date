<template>
    <div class="overlay">
        <div class="flex flex-col modal">
            <label for="passwordInput">Please Enter the Password</label>
            <span>
                <input id="passwordInput" type="text" v-model="enteredPassword" placeholder="Enter password" />
                <button @click="submitPassword">Enter</button>
            </span>

            <p v-if="setError">{{ errorMessage }}</p>
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
        // needsAuth.value = false;
    } else {
        setError.value = true;
        errorMessage.value = "Intruder Alert :)";
    }
};

</script>

<style lang="postcss">
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

.modal {
    position: fixed;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    --tw-text-opacity: 1;
    color: rgba(255, 255, 255, var(--tw-text-opacity));
    background: linear-gradient(180deg, #171d25, #042838);
    border: 1px solid teal;
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
    font-family: "Jacques Francois", serif;
}

.rsvp {
    list-style-type: none;
}

.active {
    background-color: green;
}

.disabled {
    background-color: red;
}
</style>