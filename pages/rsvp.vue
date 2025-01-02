<template>
    <div class="rsvp px-6" v-if="guestCanAccess && name">
        <p>Dear {{ guestInfo.hasPlusOne ? `${guestInfo.name} and ${guestInfo.secondaryGuest.secondaryName}` :
            guestInfo.name
            }}, we would love for you to join us in our celebrations.
            Please rsvp no later than May 20 2025
        </p>
        <RsvpForm :guestInfo="guestInfo" />
    </div>
    <div class="rsvp max-w-[700px] mx-auto" v-else>
        <div>
            <h1>Please log in using the secret passcode or by clicking the link in your email invitation to access this
                page</h1>
        </div>
    </div>
</template>
<script setup lang="ts">
import { db } from "../services/firebaseclient";
import { doc, getDocs, collection, query, where, updateDoc } from "firebase/firestore";
const isLoading = ref(false);
let searchUuid = "";
let guestName = ref("")
let guestInfo = ref<GuestInfo>({});
const searchGuestWithName = async () => {
    searchUuid = uuid.value;
    try {
        isLoading.value = true;
        const guestRsvpRef = collection(db, "guestInfoTesting");
        const q = query(guestRsvpRef, where("guestUuid", "==", searchUuid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            guestInfo.value = doc.data() as GuestInfo;
        });
        if (querySnapshot.size === 0) {
            console.log("guest could not be found")
        }
    } catch (error) {
        console.log(error);
    } finally {
        isLoading.value = false;
    }
}
const { name, uuid } = storeToRefs(useUserStore());
const credsCookie = useCookie('creds')
credsCookie.value = uuid.value;
const { guestCanAccess } = useVerificationCheck();
onMounted(() => {
    searchGuestWithName();
})
</script>
<style lang="postcss"></style>