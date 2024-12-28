<template>
    <div class="h-screen flex justify-center items-center"> </div>
</template>
<script setup lang="ts">
const successMessage = ref<string | null>(null);

async function sendEmail(data, node): Promise<void> {
    successMessage.value = null;
    try {
        const { data: emailRes, error } = await useFetch("/api/user/send-email", {
            method: "POST",
            body: data,
        });
        if (!emailRes.value) {
            node?.setErrors([error.value?.statusMessage!]);
        }
        if (emailRes.value === 200) {
            successMessage.value = "Email has been sent.";
        }
    } catch (error) {
        console.log(error);
    }
}
</script>
<style lang="css">
.formkit-wrapper {
    max-width: 100% !important;
    width: 100%;
}

.formkit-label {
    font-weight: 400 !important;
    opacity: 0.8;
}
</style>