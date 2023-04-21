import {
  getAuth, sendPasswordResetEmail, signInWithEmailAndPassword,
} from "firebase/auth"
import { FormEvent, useCallback, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { App } from "./App.jsx"
import { useRedirectWhenLoggedIn } from "./useRedirectWhenLoggedIn.js"

export function LogIn() {
  const form = useRef<HTMLFormElement>(null)

  const navigate = useNavigate()

  const onSubmit = useCallback(async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(form.current!)

    const auth = getAuth()
    try {
      await signInWithEmailAndPassword(
        auth,
        formData.get("email") as string,
        formData.get("password") as string,
      )
      navigate("/")
    } catch (error) {
      console.error(error)
    }
  }, [form, navigate])

  useRedirectWhenLoggedIn()

  const resetPassword = useCallback(async function resetPassword() {
    const formData = new FormData(form.current!)

    const auth = getAuth()
    try {
      await sendPasswordResetEmail(auth, formData.get("email") as string)
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <App>
      <div className="container">
        <div className="mt-3 row justify-content-center">
          <form ref={ form } onSubmit={ onSubmit } className="col-md-4">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
              />
            </div>
            <button
              type="button"
              className="btn btn-outline-secondary float-start"
              onClick={ resetPassword }
            >Reset password
            </button>
            <button type="submit" className="btn btn-primary float-end">Log in
            </button>
          </form>
        </div>
      </div>
    </App>
  )
}
