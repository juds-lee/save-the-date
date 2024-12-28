<template>
    <FormKit type="form" @submit="submitGuestInfo">
        <FormKit type="radio" name="rsvp" label="RSVP" :options="{
            true: 'YES', false: 'Unfortunately No'
        }" v-model="rsvpOption" :value="rsvpOption" />
        <FormKit type="text" name="allergies" v-model="allergies" label="Allergies"
            help="Please share any allergies or dietary restrictions" />
    </FormKit>
    <div v-if="guestInfo.hasPlusOne">
        {{ guestInfo }}
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    guestInfo: GuestInfo;
}>()

const rsvpOption = ref(null);
const allergies = ref("");
const { updateGuestRsvp } = useFirebase();
const rsvpError = ref(false);
const submitGuestInfo = () => {
    try {
        updateGuestRsvp(rsvpOption.value, allergies.value,)
    } catch (error) {
        rsvpError.value = true;
        console.error(error)
    }
}
</script>