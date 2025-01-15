<template>
    <div class="px-10 max-w-[1500px] flex flex-col mx-auto text-center">
        <h1 class="font-greatvibes text-[50px] lg:text-[100px]">Important Information</h1>
        <div class=" flex justify-center items-center">
            <NuxtImg src="https://res.cloudinary.com/djatkco6m/image/upload/v1727983013/DSC04426_2_io6dfc.jpg"
                class="lg:h-[300px] " />
            <!-- location -->
            <!-- more info (dess code, no children, rno registry, food options) -->
            <!-- <div></div> -->
        </div>
        <div class="grid grid-cols-2 text-white mt-10 justify-center items-center text-center">
            <!-- <div class="flex items-center justify-center">
                <h3 class="text-[60px] font-greatvibes">Venue</h3>
            </div>
            <div class="flex items-center justify-center">
                <p class="text-[20px] font-bold mb-5">The Toronto Golf Club</p>
            </div> -->
            <!-- <div class="flex items-center justify-center text-[20px] text-left">
                <p>123 Demo St.<br>Sonoma, CA<br>12345</p>
            </div> -->
        </div>
        <div class="flex flex-col lg:flex-row lg:px-20 justify-between mt-10">
            <h3 class="text-[50px] font-greatvibes">Venue</h3>
            <div class="flex-col justify-center mx-auto lg:mx-0">
                <p class="text-[20px] font-bold mt-[30px] lg:text-left">The Toronto Golf Club</p>
                <div class="flex text-[17px] lg:text-left mb-5 justify-center lg:justify-start">
                    <p>1305 Dixie Rd<br>Mississauga, ON<br>L5E 2P5
                    </p>
                </div>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.599049143956!2d-79.55079340000002!3d43.5940672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b4876b0587f71%3A0xd8d88abb73269038!2sToronto%20Golf%20Club!5e0!3m2!1sen!2sca!4v1736963073215!5m2!1sen!2sca"
                    width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>

        </div>
        <!-- <div class="flex flex-col lg:flex-row justify-between  mt-10">
            <h3 class="text-[60px] font-greatvibes">Dress Code</h3>
            <div class="flex-col justify-center">
                <p class="text-[20px] font-bold mt-[30px]">The Toronto Golf Club</p>
                <div class="flex text-[17px] text-left">
                    <p>1305 Dixie Rd<br>Mississauga, ON<br>L5E 2P5
                    </p>
                </div>
            </div>
        </div> -->
    </div>

</template>
<script setup lang="ts">
</script>
<style lang="css"></style>