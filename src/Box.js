import { Component, createRef } from 'react'
import './Box.css'
import { zIndexService } from './services.js'
import { makeMovable } from './unnamed/makeMovable.js'

export class Box extends Component {
  ref = createRef()

  componentDidMount() {
    const element = this.ref.current
    this.removeEventListeners = makeMovable(element, {
      onPointerDown: () => {
        if (this.props.onChange) {
          this.props.onChange({
            ...this.props.box,
            zIndex: zIndexService.receiveNextZIndex(),
          })
        }
      },
      onPointerUp: () => {
        if (this.props.onChange) {
          this.props.onChange({
            ...this.props.box,
            x: element.offsetLeft,
            y: element.offsetTop,
          })
        }
      },
    })
  }

  render() {
    const { box } = this.props

    return (
      <div
        ref={ this.ref }
        className="box"
        style={ { backgroundColor: box.color, left: box.x, top: box.y, zIndex: box.zIndex } }
      ></div>
    )
  }
}
