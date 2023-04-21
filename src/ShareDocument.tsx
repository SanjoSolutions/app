import { Modal } from "bootstrap"
import { getAuth } from "firebase/auth"
import { arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore"
import { useCallback, useEffect, useRef } from "react"
import { app } from "./index.jsx"
import { retrieveOpenDocumentID } from "./retrieveOpenDocumentID.js"

interface ShareDocumentProps {
  onClose: () => void
}

export function ShareDocument({ onClose }: ShareDocumentProps) {
  const ref = useRef<HTMLDivElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(
    function initialize() {
      const modal = new Modal(ref.current!)

      modal.show()
      emailRef.current!.focus()

      return function () {
        modal.dispose()
      }
    },
    [ref]
  )

  const onSubmit = useCallback(
    async function onSubmit() {
      const openDocumentID = await retrieveOpenDocumentID()
      if (openDocumentID) {
        const db = getFirestore(app)
        const documentReference = doc(db, "documents", openDocumentID)
        const email = emailRef.current!.value
        await updateDoc(documentReference, {
          users: arrayUnion(email),
        })
      }
    },
    [emailRef]
  )

  return (
    <div ref={ref} className="modal" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={onSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Share document</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
                onClick={onClose}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Share document
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
