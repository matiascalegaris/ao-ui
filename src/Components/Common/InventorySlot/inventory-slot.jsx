import './inventory-slot.scss'
import { DragDropTypes } from '../../../constants'
import InventoryItem from './InventoryItem/inventory-item'
import { DropArea } from '../DropArea'
import { CooldownIndicator } from './CooldownIndicator/cooldown-indicator'

export default function InventorySlot({content, locked, selected, onSelect,
                                       onActivate, dropId, onDropAction}) {
  let style = locked ? 'locked-slot ': 'inv-slot '
  if (selected) {
    style += 'selected-slot'
  }
  const onDrop = (mouseEvt, dragInfo) => {
    onDropAction(dragInfo.item, dropId)
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
        content.cdMask > 0 ? <CooldownIndicator cdMask={content.cdMask} 
                                          cdType={content.cdType} 
                                          elementCD={content.cooldown} /> 
        : null
      }
      </DropArea>
    </div>
  )
}