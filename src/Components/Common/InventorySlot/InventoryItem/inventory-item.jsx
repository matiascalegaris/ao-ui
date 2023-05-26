import Sprite from '../../Sprite/sprite'
import './inventory-item.scss'
import { useSingleAndDoubleClick } from '../../../../Tools/Utils'
import { useDrag } from 'react-dnd';
import { DragDropTypes } from '../../../../constants'

export default function InventoryItem ({item, onSelect, onActivate}) {
  const grhInfo = window.parent.BabelUI.GetHeadDrawInfo(item.grh)
  const click = useSingleAndDoubleClick(()=>{onSelect(item)}, ()=>{onActivate(item)}, 350, true);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragDropTypes.ITEM,
    item: item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))
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
        >
        </Sprite>
  )
}