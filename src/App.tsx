import {
  collection,
  CollectionReference, getFirestore, onSnapshot,
} from "firebase/firestore"
import { useCallback, useEffect, useState } from "react"
import "./App.css"
import { Box } from "./Box.jsx"
import type { Box as BoxInterface } from "./core/Box.js"
import { app } from "./index.jsx"
import { Navigation } from "./Navigation.jsx"
import { COLLECTION_NAME } from "./PersistenceService"
import { persistenceService } from "./services.js"

const nextIDFromLocalStorage = localStorage.getItem("nextID")
let nextID = nextIDFromLocalStorage ? parseInt(nextIDFromLocalStorage, 10) : 2

function App() {
  const [boxes, setBoxes] = useState<BoxInterface[]>([])

  useEffect(function loadBoxes(): void {
    async function loadBoxesAsync(): Promise<void> {
      setBoxes(await persistenceService.loadBoxes())
    }

    loadBoxesAsync()
  }, [])

  useEffect(
  	function updateBoxes() {
      const db = getFirestore(app)
  		const query = collection(db, COLLECTION_NAME) as CollectionReference<BoxInterface>
      const unsubscribe = onSnapshot(query, (querySnapshot) => {
        setBoxes(querySnapshot.docs.map(doc => doc.data()))
      })

      return unsubscribe
  	},
  	[]
  )

  const onChange = useCallback(function onChange(box: BoxInterface) {
    const updatedBoxes = Array.from(boxes)
    const index = updatedBoxes.findIndex(box2 => box2.id === box.id)
    updatedBoxes.splice(index, 1, box)

    setBoxes(updatedBoxes)

    persistenceService.saveBox(box)
  }, [boxes])

  const addBox = useCallback(function addBox() {
    const box = {
      id: String(nextID++),
      color: "#156e0c",
      x: "calc(4.5rem + 0.5rem)",
      y: "0.5rem",
      zIndex: 0,
    }
    localStorage.setItem("nextID", String(nextID))
    const updatedBoxes = [
      ...boxes, box,
    ]
    setBoxes(updatedBoxes)

    persistenceService.saveBox(box)
  }, [boxes])

  return (
    <main className="d-flex flex-nowrap" style={ { height: "100vh" } }>
      <Navigation addBox={ addBox } />
      { boxes.map(box => <Box
        key={ box.id }
        box={ box }
        onChange={ onChange }
      />) }
    </main>
  )
}

export default App
