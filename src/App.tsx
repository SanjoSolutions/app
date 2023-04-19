import { useCallback, useState } from 'react'
import './App.css'
import type { Box as BoxInterface } from './core/Box.js'
import { Box } from './Box.jsx'
import { persistenceService } from './services.js'

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

function App() {
  const [boxes, setBoxes] = useState<BoxInterface[]>(() => {
    const boxes = defaultBoxes.map(box => {
      return persistenceService.loadBox(box.id) || { ...box }
    })
    return boxes
  })

  const onChange = useCallback(
    function onChange(box: BoxInterface) {
      persistenceService.saveBox(box)

      const updatedBoxes = Array.from(boxes)
      const index = updatedBoxes.findIndex(box2 => box2.id === box.id)
      updatedBoxes.splice(index, 1, box)
      setBoxes(updatedBoxes)
    },
    [boxes]
  )

  return (
    <div>
      { boxes.map(box => <Box key={ box.id } box={ box } onChange={ onChange } />) }
    </div>
  )
}

export default App
