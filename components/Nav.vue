<template>
    <nav class="w-full">
        <ul class="w-full flex flex-row justify-between">
            <span class="flex flex-row justify-center space-x-6 p-4">
                <li class="text-white">
                    HOME
                </li>
                <li class="text-white">
                    FAQ
                </li>
                <li class="text-white">
                    CONTACT
                </li>
            </span>
            <button class="text-white px-7 py-2 border">RSVP</button>
        </ul>

    </nav>
</template>
<script setup>
const { name, uuid } = storeToRefs(useUserStore());

</script>