<template>
    <div class="home px-4">
        <div class="flex-1 flex justify-center items-center flex-col">
            <HomepageAuth />
        </div>

    </div>
</template>
<script setup>

const { name } = storeToRefs(useUserStore());
definePageMeta({
    middleware: [
        'verify-user',
    ],
});

</script>
<style lang="postcss">
@import url('https://fonts.googleapis.com/css2?family=Jacques+Francois&display=swap');

h1 {
    font-family: "Jacques Francois", serif;
    font-size: 15px;
    text-align: center;
}

li,
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

.home {
    @apply flex flex-col justify-center items-center p-6;
    position: relative;
    height: 110vh;
    /* background-image: url("https://res.cloudinary.com/djatkco6m/image/upload/v1727983174/DSC04446_2_i7vqny.jpg"); */
    background-size: cover;
    background-position: center;

    /* @media screen and (min-width: 1000px) {
        background-image: none;
        background-color: grey;
        background-size: cover;
        background-position: center;
    } */
}

h1 {
    /* center this h1 vertically */
    @apply flex justify-center items-center;
}
</style>