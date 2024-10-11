import { ref } from "vue";
import { db } from "../services/firebaseclient";
import { collection, doc, setDoc, getDocs, deleteDoc, query, where, updateDoc } from "firebase/firestore";

export default function useFirebase() {
  const { uuid } = storeToRefs(useUserStore());
  const updateGuestRsvp = async (rsvp, alleriges) => {
    if (!uuid.value) return;
    const guestRef = collection(db, "guestInfoTESTING");
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
  return { updateGuestRsvp };
}
