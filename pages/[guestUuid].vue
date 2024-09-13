<template>
  <div class="flex justify-center items-center h-screen flex-col" v-if="!isLoading">
    <p>{{ guestName }}</p>
    <h3>Kindly reply before June 22 2024</h3>
    <form @submit.prevent="submitForm" class="flex flex-col items-center justify-center">
      <label class="mb-1"> <input type="radio" v-model="rsvpOption" value="yes" /> Yes </label>
      <label class="mb-1"> <input type="radio" v-model="rsvpOption" value="no" /> No </label>
      <div v-if="numberInvited === 'two'">
        <label class="mb-1"> <input type="radio" v-model="number" value="one" /> One Guest </label>
        <label class="mb-1"> <input type="radio" v-model="number" value="two" /> Two Guest </label>
      </div>
      <label class="mb-1">
        Allergies?
        <input type="text" class="border-2" v-model="allergies" />
      </label>

      <button type="submit" :class="rsvpOption !== null ? 'active' : 'disabled'">Submit</button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { db } from "../services/firebaseclient";
import { doc, getDocs, collection, query, where, updateDoc } from "firebase/firestore";
const route = useRoute();
const router = useRouter();
interface GuestInfo {
  name: string;
  email: string;
  number: string;
  inviteId: string;
  allergies: string;
  rsvpOption: string;
  numberInvited: string;
}

//data we submit
const rsvpOption = ref(null);
const number = ref("");
const allergies = ref("");
const guestInfo = ref<GuestInfo[]>([]);
const guestUuid = route.params.guestUuid;
let numberInvited = ref("");
let guestName = ref("");
const isLoading = ref(true); // New loading state
console.log(route.params);

//Users will submit their rsvp info here
const submitForm = async () => {
  try {
    const guestRsvpRef = collection(db, "guestInfoTESTING");
    const q = query(guestRsvpRef, where("inviteId", "==", guestUuid));
    const querySnapshot = await getDocs(q);
    //Check if a document with the inviteId exists
    if (querySnapshot.size > 0) {
      // There should only be one document for a unique inviteId
      const documentSnapshot = querySnapshot.docs[0];
      // Update the existing document with the new information
      const rsvpSubmissionRef = doc(db, "guestInfoTESTING", documentSnapshot.id);
      await updateDoc(rsvpSubmissionRef, {
        rsvpOption: rsvpOption.value,
        allergies: allergies.value,
        number: number.value,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//Same code as the dashboard page to read all guest info just submiting diff props
const readGuestInfo = async () => {
  try {
    const guestRsvpRef = collection(db, "guestInfoTESTING");
    const q = query(guestRsvpRef, where("guestUuid", "==", guestUuid));
    const querySnapshot = await getDocs(q);
    // redirect to home page if there is no matching invite id (INTRUDER ALERT)
    // if (querySnapshot.size === 0) {
    //   router.push({ path: "/" });
    //   return;
    // }
    if (querySnapshot.size > 0) {
      // initialize data array to store guest info
      const data: GuestInfo[] = [];
      // There should only be one document for a unique inviteId
      const doc = querySnapshot.docs[0];
      // push the doc data into the data array as a GuestInfo object
      data.push(doc.data() as GuestInfo);
      numberInvited = doc.data().numberInvited;
      guestName = doc.data().name;
      // set guestInfo to the data array
      guestInfo.value = data;
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};
onMounted(() => {
  readGuestInfo();
});
</script>
<style scoped>
.rsvp {
  list-style-type: none;
}

.active {
  background-color: green;
}

.disabled {
  background-color: red;
}
</style>
