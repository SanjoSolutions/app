import { addDoc, collection, getFirestore } from "firebase/firestore"
import { useEffect } from "react"
import { App } from "./App.jsx"
import { app } from "./index.jsx"

export function CreateGroup() {
  useEffect(function createGroup() {
    async function createGroupAsync() {
      const db = getFirestore(app)
      await addDoc(collection(db, "groups"), {
        members: []
      })
    }

    createGroupAsync()
  }, [])

  return (
    <App>

    </App>
  )
}
