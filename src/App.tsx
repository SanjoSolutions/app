import { useCallback, useState } from 'react'
import './App.css'
import type { Box as BoxInterface } from './core/Box.js'
import { Box } from './Box.jsx'
import { persistenceService } from './services.js'
import { Navigation } from './Navigation.jsx'

const defaultBoxes: BoxInterface[] = [
  {
    id: '0',
    color: '#156e0c',
    x: '0.5rem',
    y: '0.5rem',
    zIndex: 0
  },
  {
    id: '1',
    color: '#6ab1eb',
    x: 300,
    y: 300,
    zIndex: 0
  },
]

const nextIDFromLocalStorage = localStorage.getItem('nextID')
let nextID = nextIDFromLocalStorage ? parseInt(nextIDFromLocalStorage, 10) : 2

function App() {
  const [boxes, setBoxes] = useState<BoxInterface[]>(() => {
    let boxes = persistenceService.loadBoxes()
    if (boxes.length === 0) {
      boxes = defaultBoxes
    }
    return boxes
  })

  const onChange = useCallback(
    function onChange(box: BoxInterface) {
      const updatedBoxes = Array.from(boxes)
      const index = updatedBoxes.findIndex(box2 => box2.id === box.id)
      updatedBoxes.splice(index, 1, box)

      persistenceService.saveBoxes(updatedBoxes)
      setBoxes(updatedBoxes)
    },
    [boxes]
  )

  const addBox = useCallback(
  	function addBox() {
      const box = {
        id: String(nextID++),
        color: '#156e0c',
        x: 'calc(48px + 0.5rem)',
        y: '0.5rem',
        zIndex: 0
      }
      localStorage.setItem('nextID', String(nextID))
      const updatedBoxes = [
        ...boxes,
        box
      ]
  		setBoxes(updatedBoxes)
  	},
  	[boxes]
  )

  return (
    <div>
      <Navigation addBox={addBox} />
      { boxes.map(box => <Box key={ box.id } box={ box } onChange={ onChange } />) }
    </div>
  )
}

export default App
