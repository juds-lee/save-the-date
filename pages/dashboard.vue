<template>
  <!-- CREATING THE GUEST LIST  -->
  <div class="px-5">
    <h1 class="py-5 font-bold">Dashboard</h1>
    <div class="flex flex-row justify-between gap-5">
      <div class="border w-full">
        <FormKit type="form" @submit="submitGuest" v-model="guest">
          <FormKit type="text" name="name" v-model="guest.name" label="Name" validation="required" />
          <FormKit type="text" name="email" v-model="guest.email" label="Email Address" validation="required" />
          <FormKit type="text" name="allergies" v-model="guest.allergies" label="Allergies" />
          <FormKit type="radio" name="rsvpOption" label="RSVP" :options="{
            true: 'YES', false: 'Unfortunately No'
          }" v-model="guest.rsvpOption" :value="guest.rsvpOption" />
          <FormKit type="checkbox" label="Plus 1" value="false" name="hasPlusOne" v-model="guest.hasPlusOne" />
          <FormKit type="text" v-if="guest.hasPlusOne" name="partner" v-model="guest.secondaryGuest.secondaryName"
            label="Partner Name" />
          <FormKit type="text" v-if="guest.hasPlusOne" name="partnerAllergies"
            v-model="guest.secondaryGuest.secondaryAllergies" label="allergies" />
        </FormKit>
      </div>
      <!-- READING THE RSVP  -->
      <div class="w-full border">
        <h1 class="pr-5 font-bold">Guest Info</h1>
        <div>
          <ul>
            <li v-for="(guest, index) in fbGuestInfo" :key="index" class="guest-container flex flex-row border-y">
              <div class="name-container flex flex-col gap-1">
                <p class="font-bold">Name</p>
                <p>{{ guest.name }}</p>
                <p>{{ index + 1 }}</p>
              </div>
              <div class="flex flex-col gap-1 details-container">
                <p class="font-bold">Details</p>
                <div>
                  <p>RSVP OPTION: {{ guest.rsvpOption }}</p>
                  <p>Allergies: {{ guest.allergies }}</p>
                  <p>Email: {{ guest.email }}</p>
                  <p>UUID: {{ guest.guestUuid }}</p>
                  <p>Plus One: {{ guest.hasPlusOne }}</p>
                  <p v-if="guest.hasPlusOne">Partner Name: {{ guest.secondaryGuest.secondaryName }}
                  </p>
                  <p v-if="guest.hasPlusOne">Partner Allergies: {{ guest.secondaryGuest.secondaryAllergies }}
                  </p>
                  <p v-if="guest.hasPlusOne">Partner Attendance: {{ guest.secondaryGuest.secondaryRsvpOption }}
                  </p>
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
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { db } from "../services/firebaseclient";
import { collection, doc, setDoc, getDocs, deleteDoc, query, where, updateDoc } from "firebase/firestore";

const guest = ref<GuestInfo>({
  name: "",
  email: "",
  allergies: "",
  rsvpOption: "",
  guestUuid: "",
  hasPlusOne: false,
  secondaryGuest: {
    secondaryName: "",
    secondaryAllergies: "",
    secondaryRsvpOption: "",
  },
});
const fbGuestInfo = ref<GuestInfo[]>([]);
const { sendGuestInfo } = useFirebase();
const submitGuest = async () => {
  await sendGuestInfo(guest.value);
  readGuestInfo();

};

const readGuestInfo = async () => {
  const guestInfoCollectionRef = collection(db, "guestInfoSaveTheDate");
  const querySnapshot = await getDocs(guestInfoCollectionRef);
  const data: GuestInfo[] = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data() as GuestInfo);
  });
  data.sort((a, b) => a.name.localeCompare(b.name));
  fbGuestInfo.value = data;
};

const removeGuest = async (guest: GuestInfo) => {
  if (guest) {
    const guestId = guest.guestUuid;
    try {
      const guestRef = collection(db, "guestInfoSaveTheDate");
      const q = query(guestRef, where("guestUuid", "==", guestId));
      const querySnapshot = await getDocs(q);
      //Check if a document with the uuid exists
      if (querySnapshot.size > 0) {
        // There should only be one document for a unique inviteId
        const documentSnapshot = querySnapshot.docs[0];
        // Remove the guest document with that unique id
        const removeGuestRef = doc(db, "guestInfoSaveTheDate", documentSnapshot.id);
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
