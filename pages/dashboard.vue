<template>
  <div class="pl-5">
    <h1 class="py-5 font-bold">Dashboard</h1>
    <div class="flex flex-row justify-between gap-5">
      <div class="border w-full">
        <FormKit type="form" @submit="sendGuestInfo">
          <FormKit type="text" name="Guest Names" v-model="guestName" label="Name" validation="required" />
          <FormKit type="text" name="Guest Names" v-model="guestEmail" label="Email Address" validation="required" />
          <FormKit
            type="radio"
            v-model="guestNumber"
            label="Number of guests"
            name="Number of guests"
            :options="{
              one: '1',
              two: '2',
            }"
          />
        </FormKit>
      </div>
      <div class="w-full border">
        <h1 class="pr-5">Guest Info</h1>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { db } from "../services/firebaseclient";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";

const guestName = ref("");
const guestEmail = ref("");
const guestNumber = ref("");

const sendGuestInfo = async () => {
  const guestInfoSubmissionRef = doc(collection(db, "guestInfo"));
  await setDoc(guestInfoSubmissionRef, {
    name: guestName.value,
    guestEmail: guestEmail.value,
    guestNumber: guestNumber.value,
  });
};

const readGuestInfo = async () => {
  console.log("Reading guest info");
  const guestInfoCollectionRef = collection(db, "guestInfo");

  const querySnapshot = await getDocs(guestInfoCollectionRef);
  console.log(querySnapshot);
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    console.log("Guest Info:", data);
    // Access data properties like data.name, data.guestEmail, data.guestNumber
  });
};
onMounted(() => {
  // Call readAllGuestInfo when the component is mounted
  readGuestInfo();
});
</script>
