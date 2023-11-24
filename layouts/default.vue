<template>
  <div class="flex justify-center items-center h-screen flex-col">
    <p>{{ name }}</p>
    <h3>Kindly reply before June 22 2024</h3>
     <form @submit.prevent="submitForm" class="flex flex-col items-center justify-center">
      <label class="mb-1">
        <input type="radio" v-model="rsvpOption" value="yes"> Yes
      </label>
      <label class="mb-1">
        <input type="radio" v-model="rsvpOption" value="no"> No
      </label>
      <div class="flex flex-col">
        <label class="mb-1" v-if="guestNumber === 2">
       How many guests?
        <input class="border-2" type="text" v-model="guestNumber">
      </label>
       <label class="mb-1">
       Allergies?
        <input type="text" class="border-2" v-model="allergies">
      </label>
      </div>


      <button type="submit" :class="rsvpOption !== null ? 'active' : 'disabled'">Submit</button>
    </form>
  </div>
</template>
<script setup>
   import { ref } from 'vue';
   import { db } from '../services/firebaseclient';
   import { collection, doc, setDoc } from "firebase/firestore"; 

  const rsvpOption = ref(null);
  const guestNumber = ref(2);
  const name = ref("Jim and Bob")
  const submitForm = async () => {
    console.log( rsvpOption.value);
   const rsvpSubmissionRef = doc(collection(db, "rsvps"));
   await setDoc(rsvpSubmissionRef, {
      name: name.value,
      rsvpOption: rsvpOption.value,
      guestNumber: guestNumber.value,
      // allergies: allergies.value
   });
    
};
</script>
<style>
.rsvp {
  list-style-type:none; 
}
.active {
  background-color: green;
}
.disabled {
  background-color: red;
}
</style>