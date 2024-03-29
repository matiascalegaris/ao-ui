import Sprite from '../../Sprite/sprite'
import './inventory-item.scss'
import { DragDropTypes, MouseButtons } from '../../../../constants'
import React, { useState } from 'react';
import { DragDropContext } from '../../DragDropProvider';

export default function InventoryItem ({item, onSelect, onActivate}) {
  const grhInfo = window.parent.BabelUI.GetGrhDrawInfo(item.grh)
  const [slotState, setSlotState] = useState({lastSelectTime: 0})
  const dragDropContext = React.useContext(DragDropContext);

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
  let DragType = DragDropTypes.ITEM
  if (item.isBindable) {
    DragType |= DragDropTypes.BINDABLE
  }
  const onMouseDown = evt => {
    if (evt.button === MouseButtons.right || process.env.NODE_ENV === 'development') {
      dragDropContext.MouseDownOnDragable(item, DragType,  Date.now())
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
          onMouseDown={onMouseDown}
        />
  )
}