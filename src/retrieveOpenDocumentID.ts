import { getAuth } from "firebase/auth"
import { doc, getDoc, getFirestore } from "firebase/firestore"
import { app } from "./index.jsx"

export async function retrieveOpenDocumentID(): Promise<string | null> {
  let openDocumentID

  const db = getFirestore(app)
  const auth = getAuth()
  const user = auth.currentUser
  if (user) {
    const userDocumentRef = doc(db, "users", user!.uid)
    const userDocumentSnapshot = await getDoc(userDocumentRef)
    const userDocument = userDocumentSnapshot.data()
    openDocumentID = userDocument!.openDocumentID
  } else {
    openDocumentID = null
  }

  return openDocumentID
}
