<template>
    <div class="flex flex-col">
        <label for="passwordInput">Please Enter the Password</label>
        <span>
            <input id="passwordInput" type="text" v-model="enteredPassword" placeholder="Enter password" />
            <button @click="submitPassword">Enter</button>
        </span>

        <p v-if="setError">{{ errorMessage }}</p>
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