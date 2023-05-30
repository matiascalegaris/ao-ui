import Sprite from '../../Sprite/sprite'
import './inventory-item.scss'
import { useSingleAndDoubleClick } from '../../../../Tools/Utils'
import { useDrag } from 'react-dnd';
import { DragDropTypes } from '../../../../constants'
import { useEffect } from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';

export default function InventoryItem ({item, onSelect, onActivate}) {
  const grhInfo = window.parent.BabelUI.GetGrhDrawInfo(item.grh)
  const click = useSingleAndDoubleClick(()=>{onSelect(item)}, ()=>{onActivate(item)}, 350, true);
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: DragDropTypes.ITEM,
    item: item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))
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
          onClick={click}
          innerRef={drag}
        />
  )
}