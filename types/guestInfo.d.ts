interface GuestInfo {
  name: string;
  email: string;
  allergies: string;
  rsvpOption: string;
  guestUuid: string;
  hasPlusOne: boolean;
  secondaryGuest: secondaryGuest;
}
interface secondaryGuest {
  secondaryName: string;
  secondaryAllergies: string;
  secondaryRsvpOption: string;
}
