import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      name: "jane",
      uuid: "",
    };
  },
  actions: {
    setGuestName(name: string) {
      this.name = name;
    },
    setGuestUuid(uuid: string) {
      this.uuid = uuid;
    },
  },
});
