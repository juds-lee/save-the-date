<template>
    <div class="px-10 rsvp-sm:px-20 lg:max-w-[1500px] mx-auto pb-10 bg-bg" v-show="guestCanAccess && name">
        <div class="flex flex-col lg:flex-row items-center">
            <img src="../assets/svg/flower-1.svg" class="w-[500px]" />
            <div>
                <p class="font-greatvibes text-[40px] text-main max-w-[700px]">Dear {{ guestInfo.hasPlusOne ?
                    `${guestInfo.name} and
                    ${guestInfo.secondaryGuest.secondaryName}` :
                    guestInfo.name
                    }},
                </p>
                <p> we would love for you to join us in our celebrations. Please rsvp no later than May 20 2025.</p>
            </div>
        </div>
        <div class="form-container">
            <div v-if="userHasSubmitted">
                <p class="font-greatvibes text-main">Your response has been submitted.</p>
            </div>
            <RsvpForm v-else :guestInfo="guestInfo" @submitted="handleSubmissionTransition" />
            <div class="hero-image" />
            <!-- <NuxtImg
                src="https://res.cloudinary.com/djatkco6m/image/upload/v1736097763/EE072B49-3841-4F3E-91BD-5D18EF2131EA_fgvydh.jpg"
                class="elevator-image" /> -->
        </div>
    </div>
    <div v-show="!(guestCanAccess && name)">
        <h1 class="max-w-[700px] mx-auto font-semibold">Please RSVP by clicking the link in your email
            invitation</h1>
    </div>
</template>
<script setup lang="ts">
import { db } from "../services/firebaseclient";
import { getDocs, collection, query, where, } from "firebase/firestore";
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
const userHasSubmitted = useState(() => false);
const isNowSubmitted = ref(false);
const handleSubmissionTransition = () => {
    isNowSubmitted.value = true
}
const { name, uuid } = storeToRefs(useUserStore());
const credsCookie = useCookie('creds')
credsCookie.value = uuid.value;
const { guestCanAccess } = useVerificationCheck();
onMounted(() => {
    searchGuestWithName();
    console.log(userHasSubmitted.value)
})
</script>
<style lang="postcss" scoped>
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

.hero-image {
    background-image: url("https://res.cloudinary.com/djatkco6m/image/upload/t_jd-1/v1727984209/DSC04460_2_fqkuyj.jpg");
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    width: 100%;
    height: 500px;
    margin-top: 20px;

    @media screen and (min-width: 415px) {
        height: 400px;
    }

    @media screen and (min-width: 700px) {
        height: 700px;
    }

    @media screen and (min-width: 1200px) {
        height: 700px;
    }

    ;
}
</style>