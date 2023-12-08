<template>
  <!-- CREATING THE GUEST LIST COLLECTION -->
  <div class="pl-5">
    <h1 class="py-5 font-bold">Dashboard</h1>
    <div class="flex flex-row justify-between gap-5">
      <div class="border w-full">
        <FormKit type="form" @submit="sendGuestInfo">
          <FormKit type="text" name="Guest Names" v-model="name" label="Name" validation="required" />
          <FormKit type="text" name="Guest Email" v-model="email" label="Email Address" validation="required" />
          <FormKit type="text" name="Guest Invite Id" v-model="inviteId" label="Invitation Id" validation="required" />
          <FormKit
            type="radio"
            v-model="number"
            label="Number of guests"
            name="Number of guests"
            :options="{
              one: '1',
              two: '2',
            }"
          />
        </FormKit>
      </div>
      <!-- READING THE RSVP COLLECTION -->
      <div class="w-full border">
        <h1 class="pr-5 font-bold">Guest Info</h1>
        <div>
          <ul>
            <li v-for="(guest, index) in info" :key="index">
              <div class="flex gap-1 border-y">
                <p>Name: {{ guest.name }}</p>
                <p>Email: {{ guest.email }}</p>
                <p>Invite ID: {{ guest.inviteId }}</p>
              </div>
              <div class="flex gap-1">
                <!-- <p># of guests {{ guest.guestNumber }}</p> -->
                <p>RSVP OPTION: {{ guest.rsvpOption }}</p>
                <p>Allergies: {{ guest.allergies }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { db } from "../services/firebaseclient";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
interface GuestInfo {
  name: string;
  email: string;
  number: string;
  inviteId: string;
  allergies: string;
  rsvpOption: string;
}
const name = ref("");
const email = ref("");
const number = ref("");
const inviteId = ref("");
const info = ref<GuestInfo[]>([]);

const sendGuestInfo = async () => {
  const guestInfoSubmissionRef = doc(collection(db, "guestInfoTESTING"));
  await setDoc(guestInfoSubmissionRef, {
    name: name.value,
    email: email.value,
    number: number.value,
    inviteId: inviteId.value,
  });
  readGuestInfo();
};

const readGuestInfo = async () => {
  const guestInfoCollectionRef = collection(db, "guestInfoTESTING");
  const querySnapshot = await getDocs(guestInfoCollectionRef);
  console.log(querySnapshot);
  const data: GuestInfo[] = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data() as GuestInfo);
  });

  info.value = data;
  console.log(info.value);
};
onMounted(() => {
  // Call readAllGuestInfo when the component is mounted
  readGuestInfo();
});
</script>
