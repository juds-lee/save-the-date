interface GuestInfo {
  name: string;
  email: string;
  allergies: string;
  rsvpOption: boolean;
  guestUuid: string;
  hasPlusOne: boolean;
  secondaryGuest: secondaryGuest;
}
interface secondaryGuest {
  secondaryName: string;
  secondaryAllergies: string;
  secondaryRsvpOption: boolean;
}
