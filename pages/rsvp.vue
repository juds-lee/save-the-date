<template>
    <div v-if="name"
        class="px-10 rsvp-sm:px-20 lg:max-w-[1500px] mx-auto bg-bg flex items-center justify-center min-h-screen">
        <div class="form-container">
            <RsvpForm :guestInfo="guestInfo" @submitted="handleSubmissionTransition" class="fade-up-element" />
            <div class="hero-image shadow-lg fade-up-element" />
        </div>
    </div>
    <div v-else-if="!name || !uuid"
        class="px-10 rsvp-sm:px-20 lg:max-w-[1500px] mx-auto bg-bg flex items-center justify-center">
        <h1 class="max-w-[700px] mx-auto mt-4 font-semibold font-plantagenet-cherokee">Please RSVP by clicking the
            link in your
            email
            invitation</h1>
    </div>
</template>
<script setup lang="ts">
import { db } from "../services/firebaseclient";
import { getDocs, collection, query, where, } from "firebase/firestore";
const isLoading = ref(false);
let searchUuid = "";
let guestInfo = ref<GuestInfo>({});
const searchGuestWithName = async () => {
    searchUuid = uuid.value;
    try {
        isLoading.value = true;
        const guestRsvpRef = collection(db, "guestInfoSaveTheDateing");
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
const isNowSubmitted = ref(false);
const handleSubmissionTransition = () => {
    isNowSubmitted.value = true
}

const { name, uuid } = storeToRefs(useUserStore());
const credsCookie = useCookie('creds')
credsCookie.value = uuid.value;
let observer;
const { initFadeUpAnimation } = useFadeUpAnimation();
onMounted(() => {
    searchGuestWithName();
    observer = initFadeUpAnimation();
});
onUnmounted(() => {
    observer.disconnect();

});
</script>
<style lang="postcss" scoped>
.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 40px 0;
    min-height: 100vh;

    @media screen and (min-width: 1130px) {
        flex-direction: row;
        padding: 0;
        justify-content: center;
        gap: 10px;
    }
}

.hero-image {
    background-image: url("https://res.cloudinary.com/djatkco6m/image/upload/t_jd-1/v1727984209/DSC04460_2_fqkuyj.jpg");
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    width: 100%;
    height: 600px;
    max-width: 500px;

    @media screen and (min-width: 1300px) {
        height: 700px;
        max-width: 700px;
    }

}
</style>