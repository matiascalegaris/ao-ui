import Sprite from '../../Sprite/sprite'
import './inventory-item.scss'
import { DragDropTypes } from '../../../../constants'
import { useState } from 'react';

export default function InventoryItem ({item, onSelect, onActivate}) {
  const grhInfo = window.parent.BabelUI.GetGrhDrawInfo(item.grh)
  const [slotState, setSlotState] = useState({lastSelectTime: 0})
  
  const onClick = evt => {
    const timeStamp = Date.now()
    if (timeStamp - slotState.lastSelectTime < 350) {
      setSlotState({...slotState, lastSelectTime:0})
      onActivate(item)
    } else {
      setSlotState({...slotState, lastSelectTime:timeStamp})
      onSelect(item)
    }
  }
  return (
    <Sprite
          styles="item-icon"
          imageName={grhInfo.imageNumber}
          x={grhInfo.startX}
          y={grhInfo.startY}
          width={grhInfo.width}
          height={grhInfo.height}
          onClick={onClick}
        />
  )
}