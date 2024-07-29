<template>
    <div>
        <div>
            <h1>JUDY AND DUNCANS WEDDING</h1>
        </div>
        <div>
            <h1>Enter your name to RSVP</h1>
            <FormKit type="form" @submit="searchGuestName">
            <FormKit type="text" name="First Name" v-model="firstName" label="First Name" validation="required" />
            <FormKit type="text" name="Last Name" label="Last Name" v-model="lastName" validation="required" />
            </FormKit>

        </div>
    </div>
</template>
<script setup lang="ts">
import { db } from "../services/firebaseclient";
import { doc, getDocs, collection, query, where, updateDoc } from "firebase/firestore";
const router = useRouter();
const firstName = ref("");
const lastName = ref("");
const isLoading = ref(false);
let searchName = "";
const guestUuid = ref("");
const searchGuestName = async () => {
    searchName = firstName.value + " " + lastName.value;
    try {
    isLoading.value = true;
    const guestRsvpRef = collection(db, "guestInfoTESTING");
    const q = query(guestRsvpRef, where("name", "==", searchName));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
        guestUuid.value = doc.data().guestUuid;
    });
    console.log(guestUuid.value, "GUEST UUID");
    if (querySnapshot.size === 0) {
      console.log("guest could not be found")
    } else {
        router.push({path: guestUuid.value, hash: 'judy'});
    }
    } catch (error) {
        console.log(error);
    } finally {
        isLoading.value = false;
  }
}
</script>