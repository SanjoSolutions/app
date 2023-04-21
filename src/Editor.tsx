import { getAuth, onAuthStateChanged } from "firebase/auth"
import {
  collection,
  CollectionReference,
  doc,
  getFirestore,
  onSnapshot,
} from "firebase/firestore"
import { useCallback, useEffect, useState } from "react"
import { App } from "./App.jsx"
import { Box } from "./Box.jsx"
import type { Box as BoxInterface } from "./core/Box.js"
import { app } from "./index.jsx"
import { Navigation } from "./Navigation.jsx"
import { COLLECTION_NAME } from "./PersistenceService.js"
import { retrieveOpenDocumentID } from "./retrieveOpenDocumentID.js"
import { persistenceService } from "./services.js"

const nextIDFromLocalStorage = localStorage.getItem("nextID")
let nextID = nextIDFromLocalStorage ? parseInt(nextIDFromLocalStorage, 10) : 2

export function Editor() {
  const [boxes, setBoxes] = useState<BoxInterface[]>([])

  useEffect(function updateBoxes() {
    let unsubscribeFromAuthStateChanged: (() => void) | null = null
    let unsubscribeUserDocument: (() => void) | null = null
    let unsubscribeBoxes: (() => void) | null = null

    async function updateBoxesAsync() {
      const auth = getAuth()
      unsubscribeFromAuthStateChanged = onAuthStateChanged(
        auth,
        async (user) => {
          if (unsubscribeUserDocument) {
            unsubscribeUserDocument()
            unsubscribeUserDocument = null
          }
          if (unsubscribeBoxes) {
            unsubscribeBoxes()
            unsubscribeBoxes = null
          }

          if (user) {
            const db = getFirestore(app)
            const userDocumentRef = doc(db, "users", user!.uid)
            unsubscribeUserDocument = onSnapshot(
              userDocumentRef,
              (userDocumentSnapshot) => {
                if (unsubscribeBoxes) {
                  unsubscribeBoxes()
                  unsubscribeBoxes = null
                }

                const userDocument = userDocumentSnapshot.data()
                const openDocumentID = userDocument!.openDocumentID
                if (openDocumentID) {
                  const db = getFirestore(app)
                  const boxesReference = collection(
                    db,
                    COLLECTION_NAME,
                    openDocumentID,
                    "boxes"
                  ) as CollectionReference<BoxInterface>
                  unsubscribeBoxes = onSnapshot(
                    boxesReference,
                    (querySnapshot) => {
                      setBoxes(querySnapshot.docs.map((doc) => doc.data()))
                    }
                  )
                }
              }
            )
          }
        }
      )
    }

    updateBoxesAsync()

    return function () {
      if (unsubscribeFromAuthStateChanged) {
        unsubscribeFromAuthStateChanged()
      }
      if (unsubscribeUserDocument) {
        unsubscribeUserDocument()
      }
      if (unsubscribeBoxes) {
        unsubscribeBoxes()
      }
    }
  }, [])

  const onChange = useCallback(
    async function onChange(box: BoxInterface) {
      const updatedBoxes = Array.from(boxes)
      const index = updatedBoxes.findIndex((box2) => box2.id === box.id)
      updatedBoxes.splice(index, 1, box)

      setBoxes(updatedBoxes)

      const openDocumentID = await retrieveOpenDocumentID()
      if (openDocumentID) {
        persistenceService.saveBox(openDocumentID, box)
      }
    },
    [boxes]
  )

  const addBox = useCallback(
    async function addBox() {
      const box = {
        id: String(nextID++),
        color: "#156e0c",
        x: "calc(4.5rem + 0.5rem)",
        y: "0.5rem",
        zIndex: 0,
      }
      localStorage.setItem("nextID", String(nextID))
      const updatedBoxes = [...boxes, box]
      setBoxes(updatedBoxes)

      const openDocumentID = await retrieveOpenDocumentID()
      if (openDocumentID) {
        persistenceService.saveBox(openDocumentID, box)
      }
    },
    [boxes]
  )

  return (
    <App>
      <Navigation addBox={addBox} />
      {boxes.map((box) => (
        <Box key={box.id} box={box} onChange={onChange} />
      ))}
    </App>
  )
}
