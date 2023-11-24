<template>
    <NuxtLayout />
</template>
<script>
export default {
  components: {
    rsvp: () => import('@/layouts/rsvp.vue'),
  },
};
</script>