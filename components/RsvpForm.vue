<template>
    <FormKit type="form" @submit="submitGuestInfo">
        <p>{{ guestInfo.name }}</p>
        <FormKit type="radio" name="rsvp" label="RSVP" :options="{ true: 'YES', false: 'Unfortunately No' }"
            v-model="guestInfo.rsvpOption" validation="required" validation-message="RSVP is required." />
        <FormKit type="text" name="allergies" v-model="guestInfo.allergies" label="Allergies and Dietary Restrictions"
            help="Please share any allergies or dietary restrictions" />

        <div v-if="guestInfo.hasPlusOne">
            <p>{{ guestInfo.secondaryGuest.secondaryName }}</p>
            <FormKit type="radio" name="secondaryRsvpOption" label="RSVP"
                :options="{ true: 'YES', false: 'Unfortunately No' }"
                v-model="guestInfo.secondaryGuest.secondaryRsvpOption" validation="required"
                validation-message="Secondary guest RSVP is required if bringing a plus one." />
            <FormKit type="text" name="secondaryAllergies" v-model="guestInfo.secondaryGuest.secondaryAllergies"
                label="Allergies and Dietary Restrictions"
                help="Please share any allergies or dietary restrictions for the secondary guest" />
        </div>
    </FormKit>
    {{ guestInfo }}
</template>

<script setup lang="ts">
const props = defineProps<{
    guestInfo: GuestInfo;
}>()

const { updateGuestRsvp } = useFirebase();
const rsvpError = ref(false);

const submitGuestInfo = async () => {
    try {
        await updateGuestRsvp(props.guestInfo);
    } catch (error) {
        rsvpError.value = true;
        console.error(error);
    }
}
</script>
