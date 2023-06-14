import Sprite from '../Sprite/sprite'
import './inventory-slot.scss'
import { DragDropTypes } from '../../../constants'
import InventoryItem from './InventoryItem/inventory-item'
import { CooldownIndicator } from './CooldownIndicator/cooldown-indicator'
import { DropArea } from '../DropArea'

export default function InventorySlot({content, locked, selected, onSelect,
                                       onActivate, dropId, onDropAction}) {
  let style = locked ? 'locked-slot ': 'inv-slot '
  if (selected) {
    style += 'selected-slot'
  }
  const onDrop = dragInfo => {
    onDropAction(dragInfo.item, dropId)
  }
  const progress = 1
  const fillRate = progress * 360
  const fillStyle = {
    background: `conic-gradient(transparent 0deg ${fillRate}deg, rgba(255, 0, 0, 0.514) 0deg 360deg)`
  }
  return (
    <div className={style}>
      <DropArea id={{...dropId, onDrop:onDrop}} acceptTypes={[DragDropTypes.ITEM]}>
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
      {
        progress < 1 ? <span className='cooldown' style={fillStyle}></span> : null
      }
      </DropArea>
    </div>
  )
}