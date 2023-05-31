import Sprite from '../../Sprite/sprite'
import './inventory-item.scss'
import { useSingleAndDoubleClick } from '../../../../Tools/Utils'
import { useDrag } from 'react-dnd';
import { DragDropTypes } from '../../../../constants'
import { useEffect } from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useState } from 'react';

export default function InventoryItem ({item, onSelect, onActivate}) {
  const grhInfo = window.parent.BabelUI.GetGrhDrawInfo(item.grh)
  const [slotState, setSlotState] = useState({lastSelectTime: 0})
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: DragDropTypes.ITEM,
    item: item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))
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
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [])
  return (
    <Sprite
          styles="item-icon"
          imageName={grhInfo.imageNumber}
          x={grhInfo.startX}
          y={grhInfo.startY}
          width={grhInfo.width}
          height={grhInfo.height}
          onClick={onClick}
          innerRef={drag}
        />
  )
}