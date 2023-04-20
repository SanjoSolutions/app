import './NavigationItem.css'

interface NavigationItemProps {
  icon: string
  onClick: () => void
}

export function NavigationItem({ icon, onClick }: NavigationItemProps) {
  return (
    <div className="navigation-item" onClick={onClick}>
      <span className="material-symbols-outlined">{ icon }</span>
    </div>
  )
}
