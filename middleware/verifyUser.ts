export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = from.query.p;
  //if token
  // check for token -->verify
  //if unverified redirect to rsvp
  // if verified store in cookies
  // if verified rediect to /rsvp

  // check for cookies in storage --> verify
  // if no cookies redirect to rsvp
  // if cookies redirect to /rsvp and grab data
  if (from.query.p) {
    const router = useRouter();

    const response = await fetch(`http://localhost:3000/api/rsvp?p=${token}`);
    const guestData: apiResponse = await response.json();
    if (guestData.statusCode === 200 && import.meta.client) {
      const { setGuestUuid, setGuestName } = useUserStore();
      setGuestUuid(guestData?.data?.uuid);
      setGuestName(guestData?.data?.name);
      // return  window.location.href = "/rsvp";
      return router.push("/rsvp");
    }
  }
});
