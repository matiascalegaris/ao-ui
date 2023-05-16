import Sprite from '../../Sprite/sprite'
import './inventory-item.scss'
import {useDrag } from 'react-dnd'
import { DragDropTypes } from '../../../../constants'

export default function InventoryItem ({item}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragDropTypes.ITEM,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))
  const grhInfo = window.parent.BabelUI.GetHeadDrawInfo(item.grh)
  return (
    <Sprite
        innerRef={drag}
        styles="item-icon"
        imageName={grhInfo.imageNumber}
        x={grhInfo.startX}
        y={grhInfo.startY}
        width={grhInfo.width}
        height={grhInfo.height}
      />
  )
}