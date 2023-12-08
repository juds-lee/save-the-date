<template>
  <div class="flex justify-center items-center h-screen flex-col">
    <p>{{ $route.params.inviteId }}</p>
    <h3>Kindly reply before June 22 2024</h3>
    <form @submit.prevent="submitForm" class="flex flex-col items-center justify-center">
      <label class="mb-1"> <input type="radio" v-model="rsvpOption" value="yes" /> Yes </label>
      <label class="mb-1"> <input type="radio" v-model="rsvpOption" value="no" /> No </label>
      <div class="flex flex-col">
        <!-- <label class="mb-1" v-if="guestNumber === 2">
          How many guests?
          <input class="border-2" type="text" v-model="guestNumber" />
        </label> -->
        <label class="mb-1">
          Allergies?
          <input type="text" class="border-2" v-model="allergies" />
        </label>
      </div>
      <button type="submit" :class="rsvpOption !== null ? 'active' : 'disabled'">Submit</button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { db } from "../services/firebaseclient";
import { doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";
const route = useRoute();
interface GuestInfo {
  name: string;
  email: string;
  number: string;
  inviteId: string;
  allergies: string;
  rsvpOption: string;
}

const rsvpOption = ref(null);
// const guestNumber = ref(2);
const allergies = ref("");
const guestInfo = ref<GuestInfo[]>([]);
const guestId = route.params.inviteId;

// Users will submit their rsvp info here
const submitForm = async () => {
  const rsvpSubmissionRef = doc(collection(db, "guestInfoTESTING"));
  await setDoc(rsvpSubmissionRef, {
    inviteId: guestId,
    rsvpOption: rsvpOption.value,
    // guestNumber: guestNumber.value,
    allergies: allergies.value,
  });
};

//Same code as the dashboard page to read all guest info just submiting diff props
const readGuestInfo = async () => {
  try {
    const guestInfoCollectionRef = collection(db, "guestInfoTESTING");
    // console.log(guestInfoCollectionRef, "guestInfoCollectionRef");
    const q = query(guestInfoCollectionRef, where("guestInviteId", "==", guestId));
    // console.log(q);
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    const data: GuestInfo[] = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data() as GuestInfo);
    });
    guestInfo.value = data;
  } catch (error) {
    console.log(error);
  }
};
onMounted(() => {
  // Call readAllGuestInfo when the component is mounted
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
