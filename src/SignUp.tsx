import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { FormEvent, useCallback, useRef } from "react"
import { App } from "./App.jsx"
import { useRedirectWhenLoggedIn } from "./useRedirectWhenLoggedIn.js"

export function SignUp() {
  const form = useRef<HTMLFormElement>(null)

  const onSubmit = useCallback(async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const auth = getAuth()
    const formData = new FormData(form.current!)
    try {
      await createUserWithEmailAndPassword(
        auth,
        formData.get("email") as string,
        formData.get("password") as string,
      )
    } catch (error) {
      console.error(error)
    }
  }, [form])

  useRedirectWhenLoggedIn()

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
            <button type="submit" className="btn btn-primary float-end">Sign
              up
            </button>
          </form>
        </div>
      </div>
    </App>
  )
}
