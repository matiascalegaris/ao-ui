import { useRef } from 'react'
import './slider.scss'
import { MouseButtons } from '../../../constants'

export const Slider = ({min, max, currentValue, onChange}) => {
  const posPercent = ((currentValue - min) / (max - min)) * 100
  const sliderStype = {
    left: `${posPercent}%`,
  }

  const selector = useRef(null)
  const sliderLine = useRef(null)
  const onMouseDown = evt => {
    if (evt.button === MouseButtons.left) {
      const clientRect = sliderLine.current.getBoundingClientRect()
      const localX = evt.clientX - clientRect.x;
      const localY = evt.clientY - clientRect.y;
      onChange(localX / clientRect.width * max)
    }
    
  }
  const onMouseMove = evt => {
    if (evt.buttons > 0 ) {
      const clientRect = sliderLine.current.getBoundingClientRect()
      const localX = evt.clientX - clientRect.x;
      const localY = evt.clientY - clientRect.y;
      onChange(localX / clientRect.width * max)
    }
  }
  return (
    <div className='ao-slider' onMouseDown={onMouseDown} onMouseMove={onMouseMove}>
    <span className="slider-line" ref={sliderLine} ></span>
    <span className="selector" ref={selector} style={sliderStype}></span>
    </div>
  )
}