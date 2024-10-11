import { ref } from "vue";
import { db } from "../services/firebaseclient";
import { collection, doc, setDoc, getDocs, deleteDoc, query, where, updateDoc } from "firebase/firestore";

export default function useFirebase() {
  const guestUuid = ref("");
  const postGuestInfo = async (info) => {
    console.log("trying to postGuestInfo", info);
    const guestInfoSubmissionRef = doc(collection(db, "guestInfoTESTING"));
    await setDoc(guestInfoSubmissionRef, { info });
    guestUuid.value = guestInfoSubmissionRef.id;
  };
  const readGuestInfo = async () => {};
  return { postGuestInfo, guestUuid };
}
