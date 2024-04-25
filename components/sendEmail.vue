<template>
  <div class="border-t">
    <form @submit.prevent="sendEmail">
      <div class="border">
        <label for="email">Email Address:</label>
        <input type="email" v-model="emailAddress" required />
      </div>
      <div class="flex border">
        <label for="message">Message:</label>
        <textarea v-model="message" class="w-full h-full" required></textarea>
      </div>
      <button class="submit-email" type="submit">Send</button>
    </form>
    <div v-if="successMessage">{{ successMessage }}</div>
    <div v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>
<script setup>
const email = ref("");
const message = ref("");
const successMessage = ref("");
const errorMessage = ref("");

const sendEmail = async () => {
  successMessage.value = "";
  errorMessage.value = "";
  const apiUrl = "http://localhost:3000/api/send-email2";
  try {
    const response = await useFetch(apiUrl, {
      method: "POST",
      body: {
        email: emailAddress.value,
        text: message.value,
      },
    });
    successMessage.value = "Email sent successfully!";
  } catch (error) {
    console.log(error);
    errorMessage.value = `Error sending email: ${error.message}`;
  }
};
</script>

<style>
form {
  display: flex;
  flex-direction: column;
}

div {
  margin-bottom: 1em;
}

label {
  margin-bottom: 0.5em;
}

input,
textarea {
  padding: 0.5em;
  font-size: 1em;
}

.submit-email {
  padding: 0.5em 1em;
  font-size: 1em;
  cursor: pointer;
  background: khaki;
  display: flex;
  align-self: center;
  justify-content: center;
}

.success {
  color: green;
}

.error {
  color: red;
}
</style>
