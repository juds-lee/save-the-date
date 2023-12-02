<template>
  <div>
    <h1>Dashboard</h1>
    <div class="formkit-outer" data-family="text" data-type="text" data-empty="true"></div>
    <h2>Edit request</h2>
    <p>Edit your housing request below.</p>
    <FormKit type="text" name="location" label="Location" help="Where would you like to stay?" validation="required" />
    <FormKit
      type="text"
      name="duration"
      label="Duration"
      help="How long would you like to stay?"
      validation="required"
    />
    <FormKit
      type="radio"
      name="price"
      label="Pricing"
      help="How much are you able to pay"
      :options="{
        low: 'Below average',
        average: 'Average',
        high: 'Super luxe',
      }"
    />
    <!-- <form @submit.prevent="submitForm" class="flex flex-col items-center justify-center">
      <label class="mb-1"> <input type="radio" v-model="rsvpOption" value="yes" /> Yes </label>
      <label class="mb-1"> <input type="radio" v-model="rsvpOption" value="no" /> No </label>
      <label>
        <input type="text" />
      </label>
      <button type="submit" :class="rsvpOption !== null ? 'active' : 'disabled'">Submit</button>
    </form> -->
  </div>
</template>
