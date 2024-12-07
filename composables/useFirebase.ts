import { ref } from "vue";
import { db } from "../services/firebaseclient";
import { collection, setDoc, getDocs, doc, query, where, updateDoc } from "firebase/firestore";

export default function useFirebase() {
  const { uuid } = storeToRefs(useUserStore());
  const updateGuestRsvp = async (rsvp, alleriges) => {
    if (!uuid.value) return;
    const guestRef = collection(db, "guestInfoTesting");
    const q = query(guestRef, where("guestUuid", "==", uuid.value));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
      const documentSnapshot = querySnapshot.docs[0];
      await updateDoc(doc(guestRef, documentSnapshot.id), {
        rsvp: rsvp,
        allergies: alleriges,
      });
    }
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
