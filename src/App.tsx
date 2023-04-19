import { useCallback, useState } from 'react'
import './App.css'
import { Box } from './Box.tsx'
import { persistenceService, zIndexService } from './services.ts'

const defaultBoxes = [
  {
    id: 0,
    color: 'gray',
    x: '0.5rem',
    y: '0.5rem',
  },
  {
    id: 1,
    color: 'blue',
    x: 300,
    y: 300,
  },
]

function App() {
  const [boxes, setBoxes] = useState(() => {
    const boxes = defaultBoxes.map(box => {
      const info = persistenceService.loadBox(box.id)
      let x
      let y
      let zIndex
      if (info) {
        x = info.x
        y = info.y
        zIndex = info.zIndex
      } else {
        x = box.x
        y = box.y
        zIndex = zIndexService.receiveNextZIndex()
      }
      return {
        ...box,
        x,
        y,
        zIndex,
      }
    })
    return boxes
  })

  const onChange = useCallback(
    function onChange(box) {
      persistenceService.saveBox(box)

      const updatedBoxes = Array.from(boxes)
      const index = updatedBoxes.findIndex(box2 => box2.id === box.id)
      updatedBoxes.splice(index, 1, box)
      setBoxes(updatedBoxes)
    },
    [boxes],
  )

  return (
    <div>
      { boxes.map(box => <Box key={ box.id } box={ box } onChange={ onChange } />) }
    </div>
  )
}

export default App
