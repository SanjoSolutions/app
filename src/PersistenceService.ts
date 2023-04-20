import { collection, CollectionReference, doc, getDocs, getFirestore, setDoc } from "firebase/firestore"
import type { Box } from './core/Box.js'
import { app } from "./index.jsx"

export const COLLECTION_NAME = 'boxes'

export class PersistenceService {
  async loadBoxes(): Promise<Box[]> {
    const db = getFirestore(app)
    const querySnapshot = await getDocs<Box>(collection(db, COLLECTION_NAME) as CollectionReference<Box>)
    const boxes = querySnapshot.docs.map(doc => doc.data())
    return boxes
  }

  async saveBox(box: Box): Promise<void> {
    const db = getFirestore(app)
    await setDoc(doc(db, COLLECTION_NAME, box.id), box)
  }
}
