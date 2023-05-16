import Sprite from '../Sprite/sprite'
import './inventory-slot.scss'
import { useDrop } from 'react-dnd'
import { DragDropTypes } from '../../../constants'
import InventoryItem from './InventoryItem/inventory-item'

const moveItem = (item) => {
  console.log('move item!')
}
export default function InventorySlot({item, locked}) {
  const style = locked ? 'locked-slot': 'inv-slot'
  const [{ isOver }, drop] = useDrop(() => ({
    accept: DragDropTypes.ITEM,
    drop: () => moveItem(item),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }), [item])
  return (
    <div className={style}>
      { item.grh && !locked > 0 ?
      <InventoryItem
        item={item}
      /> : null
      }
      {
        item.count > 0 && !locked ? <p className='item-count'>{item.count}</p> : null
      }
    </div>
  )
}