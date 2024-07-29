<template>
  <!-- CREATING THE GUEST LIST  -->
  <div class="px-5">
    <h1 class="py-5 font-bold">Dashboard</h1>
    <div class="flex flex-row justify-between gap-5">
      <div class="border w-full">
        <FormKit type="form" @submit="sendGuestInfo">
          <FormKit type="text" name="Guest Names" v-model="name" label="Name" validation="required" />
          <FormKit type="text" name="Guest Email" v-model="email" label="Email Address" validation="required" />
          <FormKit type="text" name="Guest Invite Id" v-model="inviteId" label="Invitation Id" validation="required" />
          <FormKit type="text" name="Allergies" v-model="allergies" label="Allergies" validation="required" />
          <FormKit
            type="radio"
            v-model="numberInvited"
            label="Number of guests"
            name="Number of guests"
            :options="{
              one: '1',
              two: '2',
            }"
          />
          <FormKit
            type="radio"
            v-model="rsvpOption"
            label="rsvp"
            name="rsvp"
            :options="{
              yes: 'yes',
              no: 'no',
            }"
          />
        </FormKit>
      </div>
      <!-- READING THE RSVP  -->
      <div class="w-full border">
        <h1 class="pr-5 font-bold">Guest Info</h1>
        <div>
          <ul>
            <li v-for="(guest, index) in info" :key="index" class="guest-container flex flex-row border-y">
              <div class="name-container flex flex-col gap-1">
                <p class="font-bold">Name</p>
                <p>{{ guest.name }}</p>
              </div>
              <div class="flex flex-col gap-1 details-container">
                <p class="font-bold">Details</p>
                <div>
                  <p>RSVP OPTION: {{ guest.rsvpOption }}</p>
                  <p>Allergies: {{ guest.allergies }}</p>
                  <p>Email: {{ guest.email }}</p>
                  <p>Invite ID: {{ guest.inviteId }}</p>
                  <p>Number Attending: {{ guest.number }}</p>
                  <p>Number Invited: {{ guest.numberInvited }}</p>
                  <p>UUID: {{ guest.guestUuid }}</p>
                </div>
              </div>
              <div class="flex flex-col m-auto">
                <button class="bg-green-300 p-1 rounded-md mb-2">edit guest</button>
                <button type="submit" @click="removeGuest(guest)" class="bg-pink-300 p-1 rounded-md">
                  remove guest
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <sendEmail />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { db } from "../services/firebaseclient";
import { collection, doc, setDoc, getDocs, deleteDoc, query, where, updateDoc } from "firebase/firestore";
interface GuestInfo {
  name: string;
  email: string;
  number: string;
  inviteId: string;
  allergies: string;
  rsvpOption: string;
  numberInvited: string;
  guestUuid: string;
}
const name = ref("");
const email = ref("");
const numberInvited = ref("");
const inviteId = ref("");
const allergies = ref("tba");
const rsvpOption = ref("");
const info = ref<GuestInfo[]>([]);
const guestUuid = ref("");

const sendGuestInfo = async () => {
  const guestInfoSubmissionRef = doc(collection(db, "guestInfoTESTING"));
  await setDoc(guestInfoSubmissionRef, {
    name: name.value,
    email: email.value,
    numberInvited: numberInvited.value,
    allergies: allergies.value,
    inviteId: inviteId.value,
    rsvpOption: rsvpOption.value,
  });
  guestUuid.value = guestInfoSubmissionRef.id;
  await updateDoc(guestInfoSubmissionRef, {
    guestUuid: guestUuid.value,
  });
  readGuestInfo();
};
const readGuestInfo = async () => {
  const guestInfoCollectionRef = collection(db, "guestInfoTESTING");
  const querySnapshot = await getDocs(guestInfoCollectionRef);
  const data: GuestInfo[] = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data() as GuestInfo);
  });
  info.value = data;
  console.log(info.value);
};

//delete guess from Firestore
const removeGuest = async (guest: GuestInfo) => {
  if (guest && guest.inviteId) {
    const guestId = guest.inviteId;
    try {
      const guestRef = collection(db, "guestInfoTESTING");
      const q = query(guestRef, where("inviteId", "==", guestId));
      const querySnapshot = await getDocs(q);
      //Check if a document with the inviteId exists
      if (querySnapshot.size > 0) {
        // There should only be one document for a unique inviteId
        const documentSnapshot = querySnapshot.docs[0];
        // Remove the guest document with that unique id
        const removeGuestRef = doc(db, "guestInfoTESTING", documentSnapshot.id);
        await deleteDoc(removeGuestRef);
      }
      readGuestInfo();
    } catch (error) {
      console.log(error);
    }
  }
};

onMounted(() => {
  readGuestInfo();
});
</script>
<style>
.name-container {
  width: 20%;
}
.details-container {
  width: 50%;
}
</style>
