<template>
    <FormKit type="form" @submit="sendGuestInfo">
        <FormKit type="radio" name="rsvp" label="RSVP" :options="{
            true: 'YES', false: 'Unfortunately No'
        }" v-model="rsvpOption" validation="required" :value="rsvpOption" />
        <FormKit type="text" name="allergies" v-model="allergies" label="Allergies"
            help="Please share any allergies or dietary restrictions" />
    </FormKit>
</template>
<script setup lang="ts">
const rsvpOption = ref(null);
const allergies = ref("");
const sendGuestInfo = () => {
}
</script>