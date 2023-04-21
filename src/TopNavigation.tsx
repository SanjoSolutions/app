import { getAuth, onAuthStateChanged } from "firebase/auth"
import {
  addDoc, collection, doc, getFirestore, setDoc, updateDoc,
} from "firebase/firestore"
import { useCallback, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { app } from "./index.jsx"
import { ShareDocument } from "./ShareDocument.jsx"

export function TopNavigation() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  useEffect(function monitorLoggedInState() {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(Boolean(user))
    })

    return unsubscribe
  }, [])

  const onCreateDocument = useCallback(async function onCreateDocument() {
    const db = getFirestore(app)
    const auth = getAuth()
    const user = auth.currentUser
    const documentReference = await addDoc(collection(db, "documents"), {
      users: [user!.email],
    })
    const userDocumentReference = doc(db, "users", user!.uid)
    try {
      await updateDoc(userDocumentReference, {
        openDocumentID: documentReference.id,
      })
    } catch (error: any) {
      if (error.code === 'not-found') {
        await setDoc(userDocumentReference, {
          openDocumentID: documentReference.id,
        })
      } else {
        throw error
      }
    }
  }, [])

  const [isShareDocumentModalShown, setIsShareDocumentModalShown] = useState<boolean>(
    false)

  const onShareDocument = useCallback(function onShareDocument() {
    setIsShareDocumentModalShown(true)
  }, [])

  return (
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 border-bottom">
      <div className="container-fluid">
        <div className="row">
          <div className="col-6">
            <button
              type="button"
              className="btn btn-primary"
              onClick={ onCreateDocument }
            >Create document
            </button>
          </div>
          <div className="col-6 text-end">
            { !isLoggedIn && <a
              href="/log-in"
              className="btn btn-outline-secondary"
            >Log in
            </a> }
            { !isLoggedIn &&
              <a href="/sign-up" className="btn btn-outline-secondary ms-2">Sign
                up</a> }
            { isLoggedIn && <button
              type="button"
              className="btn btn-outline-secondary ms-2"
              onClick={ onShareDocument }
            >Share document</button> }
            { isLoggedIn && <a
              href="/create-group"
              className="btn btn-outline-secondary ms-2"
            >Create group</a> }
          </div>
        </div>
      </div>

      { isShareDocumentModalShown && createPortal(
        <ShareDocument onClose={ () => setIsShareDocumentModalShown(false) } />,
        document.body,
      ) }
    </header>
  )
}
