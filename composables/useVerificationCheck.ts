export default function useVerificationCheck() {
  const { name } = storeToRefs(useUserStore());
  const cookie = useCookie("isAuth");

  const setAuth = (authValue) => {
    cookie.value = authValue;
  };

  const guestCanAccess = computed(() => {
    return !!name.value || cookie.value;
  });

  return { setAuth, guestCanAccess };
}
