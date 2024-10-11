import { skipHydrate } from "pinia";
export const useUserStore = defineStore("user", () => {
  // skipHydrate marks this as a client only localstorage var
  // without that, it will hydrate during SSR and set this back to false on load
  const name = skipHydrate(useLocalStorage<boolean>("name", ""));
  const uuid = skipHydrate(useLocalStorage<boolean>("uuid", ""));

  const setGuestName = (guestName: string) => {
    console.log("trying to setGuestName", guestName);
    name.value = guestName;
  };
  const setGuestUuid = (guestUuid: string) => {
    uuid.value = guestUuid;
  };

  return { name, uuid, setGuestName, setGuestUuid };
});
