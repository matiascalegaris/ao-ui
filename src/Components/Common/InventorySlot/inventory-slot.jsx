import Sprite from '../Sprite/sprite'
import './inventory-slot.scss'
import { DragDropTypes } from '../../../constants'
import InventoryItem from './InventoryItem/inventory-item'
import { useDrop } from 'react-dnd'
import { CooldownIndicator } from './CooldownIndicator/cooldown-indicator'

const moveItem = (item, dest) => {
  console.log('move item!')
  console.log(item)
  console.log(dest)
}
export default function InventorySlot({content, locked, selected, onSelect, onActivate}) {
  let style = locked ? 'locked-slot ': 'inv-slot '
  if (selected) {
    style += 'selected-slot'
  }
  const [, drop] = useDrop(
    () => ({
      accept: DragDropTypes.ITEM,
      drop: (item, monitor) => moveItem(item, content)
    }),
    [content]
  )
  return (
    <div className={style} ref={drop}>
      { content.grh && !locked > 0 ?
      <InventoryItem
        item={content}
        onActivate={onActivate}
        onSelect={onSelect}
      /> : null
      }
      {
        content.count > 0 && !locked ? <p className='item-count'>{content.count}</p> : null
      }
      {
        content.equiped ? <span className='equiped'>+</span> : null
      }
      <CooldownIndicator/>
    </div>
  )
}