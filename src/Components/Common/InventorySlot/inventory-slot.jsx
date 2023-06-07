import Sprite from '../Sprite/sprite'
import './inventory-slot.scss'
import { DragDropTypes } from '../../../constants'
import InventoryItem from './InventoryItem/inventory-item'
import { CooldownIndicator } from './CooldownIndicator/cooldown-indicator'
import { DropArea } from '../DropArea'

export default function InventorySlot({content, locked, selected, onSelect, onActivate, dropId}) {
  let style = locked ? 'locked-slot ': 'inv-slot '
  if (selected) {
    style += 'selected-slot'
  }
 
  return (
    <div className={style}>
      <DropArea id={dropId} acceptTypes={[DragDropTypes.ITEM]}>
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
        content.equipped ? <span className='equiped'>+</span> : null
      }
      <CooldownIndicator/>
      </DropArea>
    </div>
  )
}