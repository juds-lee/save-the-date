<template>
    <div class="px-10 max-w-[1200px] mx-auto" v-if="guestCanAccess && name">
        <div class="flex flex-col lg:flex-row items-center">
            <img src="../assets/svg/flower-1.svg" class="w-[500px]" />
            <div>
                <p class="font-greatvibes text-[40px] text-main max-w-[700px]">Dear {{ guestInfo.hasPlusOne ?
                    `${guestInfo.name} and
                    ${guestInfo.secondaryGuest.secondaryName}` :
                    guestInfo.name
                    }}, we would love for you to join us in our celebrations.
                </p>
                <p> Please rsvp no later than May 20 2025</p>
            </div>

        </div>

        <div class="form-container">
            <RsvpForm :guestInfo="guestInfo" />
            <NuxtImg
                src="https://res.cloudinary.com/djatkco6m/image/upload/v1736097763/EE072B49-3841-4F3E-91BD-5D18EF2131EA_fgvydh.jpg"
                class="elevator-image" />
        </div>
    </div>
    <div v-else>
        <h1 class="max-w-[700px]">Please log in using the secret passcode or by clicking the link in your email
            invitation to access this
            page</h1>
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
<style lang="postcss">
.form-container {
    display: flex;
    flex-direction: column;
    margin-top: 24px;
    margin-bottom: 24px;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    @media screen and (min-width: 1200px) {
        flex-direction: row;
        justify-content: space-between;

    }
}

.elevator-image {
    width: 100%;
    margin-top: 24px;
    max-width: 600px;

    @media screen and (min-width: 1200px) {
        margin-top: 24px;
    }
}
</style>