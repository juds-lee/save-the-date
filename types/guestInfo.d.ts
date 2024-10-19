interface GuestInfo {
  name: string;
  email: string;
  number: string;
  allergies: string;
  rsvpOption: string;
  numberInvited: string;
  guestUuid: string;
  hasPlusOne: boolean;
  secondaryGuest: secondaryGuest;
}
interface secondaryGuest {
  name: string;
  email: string;
  allergies: string;
}
