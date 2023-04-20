import './Navigation.css'
import { NavigationItem } from './NavigationItem.jsx'

export function Navigation({ addBox }: { addBox: () => void }){
  return (
    <div className="navigation">
      <NavigationItem icon="square" onClick={() => {
        addBox()
      }} />
      { /* <NavigationItem icon="change_history" onClick={noop} /> */ }
    </div>
  )
}
