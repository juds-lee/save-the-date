import { db } from "../services/firebaseclient";
import { collection, setDoc, doc, updateDoc } from "firebase/firestore";

export default function useFirebase() {
  const { uuid } = storeToRefs(useUserStore());
  const updateGuestRsvp = async (guestInfo: GuestInfo) => {
    if (!uuid.value) return;
    const guestDocRef = doc(db, "guestInfoTesting", uuid.value);
    await updateDoc(guestDocRef, { ...guestInfo });
  };
  const sendGuestInfo = async (guestInfo: GuestInfo) => {
    const guestInfoSubmissionRef = doc(collection(db, "guestInfoTesting"));
    await setDoc(guestInfoSubmissionRef, guestInfo);
    guestInfo.guestUuid = guestInfoSubmissionRef.id;
    await updateDoc(guestInfoSubmissionRef, {
      guestUuid: guestInfo.guestUuid,
    });
  };
  return { updateGuestRsvp, sendGuestInfo };
}
