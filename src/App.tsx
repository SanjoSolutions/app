import "./App.css"
import { TopNavigation } from "./TopNavigation.jsx"

interface AppProps {
  children: any
}

export function App({ children }: AppProps) {
  return (
    <div>
      <TopNavigation />

      <main className="d-flex flex-nowrap" style={{ height: "100vh" }}>
        {children}
      </main>
    </div>
  )
}
