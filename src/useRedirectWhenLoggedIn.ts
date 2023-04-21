import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function useRedirectWhenLoggedIn(): void {
  const navigate = useNavigate()

  useEffect(
    function redirectWhenLoggedOut() {
      const auth = getAuth()
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          navigate("/")
        }
      })

      return unsubscribe
    },
    [navigate]
  )
}
