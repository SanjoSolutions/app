import {
  collection,
  CollectionReference,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore"
import type { Box } from "./core/Box.js"
import { app } from "./index.jsx"

export const COLLECTION_NAME = "documents"

export class PersistenceService {
  async saveBox(documentID: string, box: Box): Promise<void> {
    const db = getFirestore(app)
    await setDoc(doc(db, COLLECTION_NAME, documentID, "boxes", box.id), box)
  }
}
