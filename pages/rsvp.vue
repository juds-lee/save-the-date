<template>
    <Nav />
    <div class="rsvp" v-if="guestCanAccess">
        <div>
            <h1>JUDY AND DUNCANS WEDDING</h1>
        </div>
        <!-- IF YOU ARE LOGGED IN BUT NO TOKEN -->
        <!-- <div>
            <h1>Enter your name to RSVP</h1>
            <FormKit type="form" @submit="searchGuestName">
                <FormKit type="text" name="First Name" v-model="searchWithFirstName" label="First Name"
                    validation="required" />
                <FormKit type="text" name="Last Name" label="Last Name" v-model="searchWithLastName"
                    validation="required" />
            </FormKit>
        </div> -->
        <p>Dear {{ name }}, we would love for you to join us in our celebrations. Please rsvp no later than May 20 2025
        </p>
        <RsvpForm />
    </div>
    <div class="rsvp" v-else>
        <div>
            <h1>Please log in using the secret passcode or by clicking the link in your email invitation to access this
                page</h1>
        </div>
    </div>
</template>
<script setup lang="ts">
import { db } from "../services/firebaseclient";
import { doc, getDocs, collection, query, where, updateDoc } from "firebase/firestore";

const router = useRouter();
const searchWithFirstName = ref("");
const searchWithLastName = ref("");
const isLoading = ref(false);
let searchName = "";
const guestUuid = ref("");
const names = ref("judy");
// const searchGuestName = async () => {
//     searchName = searchWithFirstName.value.toLocaleLowerCase() + " " + searchWithLastName.value.toLocaleLowerCase();
//     try {
//         isLoading.value = true;
//         const guestRsvpRef = collection(db, "guestInfoTesting");
//         const q = query(guestRsvpRef, where("name", "==", searchName));
//         const querySnapshot = await getDocs(q);
//         querySnapshot.forEach((doc) => {
//             console.log(doc.data());
//             guestUuid.value = doc.data().guestUuid;
//         });
//         if (querySnapshot.size === 0) {
//             console.log("guest could not be found")
//         } else {
//             router.push({ path: guestUuid.value, hash: 'judy' });
//         }
//     } catch (error) {
//         console.log(error);
//     } finally {
//         isLoading.value = false;
//     }
// }
const { name, uuid } = storeToRefs(useUserStore());
const credsCookie = useCookie('creds')
credsCookie.value = uuid.value;
const { guestCanAccess } = useVerificationCheck();

</script>
<style lang="postcss">
.rsvp {
    background-color: palegoldenrod;
}
</style>