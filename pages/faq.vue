<template>
    <div class="px-10 rsvp-sm:px-20 max-w-[1500px] flex flex-col mx-auto text-center">
        <h1 class="font-greatvibes text-[50px] lg:text-[100px]">Important Information</h1>
        <div class=" flex justify-center items-center">
            <NuxtImg src="https://res.cloudinary.com/djatkco6m/image/upload/v1727983013/DSC04426_2_io6dfc.jpg"
                class="lg:h-[300px] " />
        </div>
        <div class="flex flex-col xl:flex-row lg:px-20 justify-between mt-10">
            <h3 class="text-[50px] font-greatvibes">Venue</h3>
            <div class="flex-col justify-center mx-auto xl:mx-0 xl:max-w-[600px]">
                <p class="text-[20px] font-bold mt-[30px] xl:text-left">The Toronto Golf Club</p>
                <div class="flex text-[17px] xl:text-left justify-center xl:justify-start">
                    <p>1305 Dixie Rd<br>Mississauga, ON<br>L5E 2P5
                    </p>

                </div>
                <p class="flex text-[17px] xl:text-left justify-center xl:justify-start mb-5">**There will be limited
                    parking available so
                    please arrange rides beforehand</p>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.599049143956!2d-79.55079340000002!3d43.5940672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b4876b0587f71%3A0xd8d88abb73269038!2sToronto%20Golf%20Club!5e0!3m2!1sen!2sca!4v1736963073215!5m2!1sen!2sca"
                    style="border:0;" allowfullscreen="" loading="lazy"
                    class="mx-auto xl:mx-0 sm:w-[400px] sm:h-[400px]"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
        <div class="flex flex-col xl:flex-row lg:px-20 justify-between mt-10">
            <h3 class="text-[50px] font-greatvibes">Faq</h3>
            <div class="flex-col justify-center  mx-auto xl:mx-0 xl:max-w-[600px]">
                <div v-for="(item, index) in faq" :key="index">
                    <p class="text-[20px] font-bold mt-[30px] xl:text-left">
                        {{ item.question }}
                    </p>
                    <div class="flex text-[17px] xl:text-left mb-5 justify-center xl:justify-start">
                        {{ item.response }}
                    </div>
                    <hr class="pb-10">
                </div>
            </div>
        </div>

    </div>

</template>
<script setup lang="ts">
const faq = ref([
    {
        question: "What is the dress code for your wedding?",
        response: "Formal attire is requested. We can’t wait to see you dressed up and ready to celebrate!"
    },
    {
        question: "Are children allowed at the wedding?",
        response: "We kindly ask that our wedding day remain an child-free occasion"
    },
    {
        question: "Do you have a registry?",
        response: "We are not creating a registry but we welcome any contributions to help us start this new chapter together."
    },
    {
        question: "What food options will be available?",
        response: "We will be serving a variety of appetizers, entrees, and desserts. Please let us know if you have any dietary restrictions."
    }
]
);
</script>
<style lang="css"></style>