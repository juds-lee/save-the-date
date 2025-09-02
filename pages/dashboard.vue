<template>
  <div class="px-5 bg-white mt-[93px]">
    <h1 class="py-5 font-bold">Dashboard</h1>
    <div class="flex flex-row justify-between gap-5">
      <div class="border w-full">
        <form @submit.prevent="submitGuest">
          <div class="h-10">
            <label for="name" class="mr-3">Name</label>
            <input type="text" id="name" v-model="guest.name" required class="border-green-300  border-2" />
          </div>
          <div class="h-10">
            <label for="email">Email Address</label>
            <input class="border-green-300  border-2" type="email" id="email" v-model="guest.email" required />
          </div>
          <div class="h-10">
            <label for="allergies">Allergies</label>
            <input class="border-green-300  border-2" type="text" id="allergies" v-model="guest.allergies" />
          </div>
          <div class="h-10">
            <p>RSVP</p>
            <label>
              <input class="border-green-300  border-2" type="radio" name="rsvpOption" value="accept"
                v-model="guest.rsvpOption" /> YES
            </label>
            <label>
              <input class="border-green-300  border-2" type="radio" name="rsvpOption" value="decline"
                v-model="guest.rsvpOption" /> Unfortunately No
            </label>
          </div>
          <div class="h-10">
            <label>
              <input class="border-green-300  border-2" type="checkbox" v-model="guest.hasPlusOne" /> Plus 1
            </label>
          </div>
          <div v-if="guest.hasPlusOne" class="h-10">
            <label for="partner">Partner Name</label>
            <input class="border-green-300  border-2" type="text" id="partner"
              v-model="guest.secondaryGuest.secondaryName" />
          </div>
          <div v-if="guest.hasPlusOne" class="h-10">
            <label for="partnerAllergies">Partner Allergies</label>
            <input class="border-green-300  border-2" type="text" id="partnerAllergies"
              v-model="guest.secondaryGuest.secondaryAllergies" />
          </div>
          <button type="submit" class="border-green-300  border-2">Submit</button>
        </form>
      </div>
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
                  <p v-if="guest.hasPlusOne">Partner Name: {{ guest.secondaryGuest.secondaryName }}</p>
                  <p v-if="guest.hasPlusOne">Partner Allergies: {{ guest.secondaryGuest.secondaryAllergies }}</p>
                  <p v-if="guest.hasPlusOne">Partner Attendance: {{ guest.secondaryGuest.secondaryRsvpOption }}</p>
                </div>
              </div>
              <div class="flex flex-col m-auto">
                <button class="bg-green-300 p-1 rounded-md mb-2">edit guest</button>
                <button type="button" @click="removeGuest(guest)" class="bg-pink-300 p-1 rounded-md">
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

<script setup>
import { ref, onMounted } from "vue";
import { db } from "../services/firebaseclient";
import { collection, doc, setDoc, getDocs, deleteDoc, query, where } from "firebase/firestore";

const guest = ref({
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

const fbGuestInfo = ref([]);

const submitGuest = async () => {
  try {
    const docRef = doc(collection(db, "guestInfoSaveTheDateing"));
    guest.value.guestUuid = docRef.id;
    await setDoc(docRef, guest.value);
    readGuestInfo();
    guest.value = {
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
    };
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

const readGuestInfo = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "guestInfoSaveTheDateing"));
    const data = querySnapshot.docs.map(doc => doc.data());
    data.sort((a, b) => a.name.localeCompare(b.name));
    fbGuestInfo.value = data;
  } catch (error) {
    console.error("Error reading guest info: ", error);
  }
};

const removeGuest = async (guest) => {
  try {
    const guestRef = query(collection(db, "guestInfoSaveTheDateing"), where("guestUuid", "==", guest.guestUuid));
    const querySnapshot = await getDocs(guestRef);
    if (!querySnapshot.empty) {
      const docId = querySnapshot.docs[0].id;
      await deleteDoc(doc(db, "guestInfoSaveTheDateing", docId));
      readGuestInfo();
    }
  } catch (error) {
    console.error("Error removing guest: ", error);
  }
};

onMounted(readGuestInfo);
</script>

<style>
.name-container {
  width: 20%;
}

.details-container {
  width: 50%;
}
</style>
