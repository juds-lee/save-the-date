<template>
  <div class="flex justify-center items-center h-screen flex-col" v-if="!isLoading">
    <p>{{ guestName }}</p>
    <h3>Kindly reply before June 22 2024</h3>
    <!-- <FormKit @submit.prevent="submitForm" class="flex flex-col items-center justify-center" v-model="rsvpOption"
      type="radio" :options="{ true: 'I would love to', false: 'cannot make it' }">
      <FormKit type="text" name="name" label="Your name" placeholder="Jane Doe" help="What do people call you?"
        validation="required" />
      <p>{{ rsvpOption }}</p>
      <button type="submit" :class="rsvpOption !== null ? 'active' : 'disabled'">Submit</button>
    </FormKit> -->
    <FormKit type="form" :value="{ allergies: '', rsvp: 'yes' }" submit-label="send" @submit="submitForm">
      <FormKit type="radio" name="rsvp" label="RSVP" :options="{
        true: 'YES',
        false: 'unfortunately no',
      }" />
      <FormKit type="text" name="allergies" label="Allergies"
        help="Please share any allergies or dietary restrictions" />
    </FormKit>
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
  rsvpOption: boolean;
  numberInvited: string;
}

//data we submit
const rsvpOption = ref(false);
const number = ref("");
const allergies = ref("");
const guestInfo = ref<GuestInfo[]>([]);
const guestUuid = route.params.guestUuid;
let numberInvited = ref("");
let guestName = ref("");
const isLoading = ref(true);

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
    if (querySnapshot.size === 0) {
      router.push({ path: "/" });
      return;
    }
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
