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
        <div>
          <ul>
            <li v-for="(guest, index) in guestInfo" :key="index">
              <p>Name: {{ guest.name }}</p>
              <p>Email: {{ guest.guestEmail }}</p>
              <p>Number: {{ guest.guestNumber }}</p>
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
  guestEmail: string;
  guestNumber: string;
}
const guestName = ref("");
const guestEmail = ref("");
const guestNumber = ref("");
const guestInfo = ref<GuestInfo[]>([]);

const sendGuestInfo = async () => {
  const guestInfoSubmissionRef = doc(collection(db, "guestInfo"));
  await setDoc(guestInfoSubmissionRef, {
    name: guestName.value,
    guestEmail: guestEmail.value,
    guestNumber: guestNumber.value,
  });
  readGuestInfo();
};

const readGuestInfo = async () => {
  const guestInfoCollectionRef = collection(db, "guestInfo");
  const querySnapshot = await getDocs(guestInfoCollectionRef);
  const data: GuestInfo[] = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data() as GuestInfo);
  });

  guestInfo.value = data;
};
onMounted(() => {
  // Call readAllGuestInfo when the component is mounted
  readGuestInfo();
});
</script>
