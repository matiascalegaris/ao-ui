import Sprite from '../../Sprite/sprite'
import './inventory-item.scss'
import { DragDropTypes } from '../../../../constants'
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
  const onMouseDown = evt => {
    dragDropContext.MouseDownOnDragable(item, DragDropTypes.ITEM,  Date.now())
  }
  let imgFilters = {}
  if (item.cantUse > 0) {
    imgFilters = {
      filter: 'grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8)'
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
          imageFilter={imgFilters}
        />
  )
}