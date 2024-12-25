<template>
    <div class="bg-grey px-6 flex flex-col lg:flex-row items-center justify-around">
        <img src="https://res.cloudinary.com/djatkco6m/image/upload/v1734718678/image-asset_pokmct.png" alt="heart"
            class="flower-asset" />
        <div class="flex flex-col items-center lg:items-start justify-center w-full max-w-[550px]">
            <h3 class="text-white sub-title text-center lg:text-left">
                We’re getting married! Join us for a weekend of celebration and love
            </h3>
            <h3 class="date-title">
                9.20.2024
            </h3>
        </div>
    </div>
</template>
<style>
.sub-title {
    font-size: 24px;
    word-wrap: break-word;

    @media screen and (min-width: 700px) {
        font-size: 30px
    }
}

.date-title {
    font-size: 35px;

    @media screen and (min-width: 700px) {
        font-size: 40px
    }
}

.flower-asset {
    width: 100%;
    max-width: 300px;

    @media screen and (min-width: 450px) {
        max-width: 500px;
    }

    @media screen and (min-width: 1024px) {
        max-width: 800px;
    }
}
</style>
