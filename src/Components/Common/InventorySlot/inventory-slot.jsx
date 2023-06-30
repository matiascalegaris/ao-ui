import './inventory-slot.scss'
import { DragDropTypes, ItemCounFormat } from '../../../constants'
import InventoryItem from './InventoryItem/inventory-item'
import { DropArea } from '../DropArea'
import { CooldownIndicator } from './CooldownIndicator/cooldown-indicator'
import { TooltipTypes, useTooltipHover } from '../Tooltip/Tooltip-manager'
import { useRef } from 'react'
import { selectItemCountFormat } from '../../../redux/GameplaySlices/GameSettings'
import { useSelector } from 'react-redux'

const formatItemCount = (itemCount, format) => {
  if (format == ItemCounFormat.DisplayAll) {
    return itemCount
  } 
  if (itemCount < 1000) {
    return itemCount
  }
  return `${(itemCount/1000).toFixed(1)}k`
}
export default function InventorySlot({content, locked, selected, onSelect,
                                       onActivate, dropId, onDropAction}) {
  let style = locked ? 'locked-slot ': 'inv-slot '
  if (selected && content.grh && !locked > 0) {
    style += 'selected-slot'
  }
  const onDrop = (mouseEvt, dragInfo) => {
    onDropAction(dragInfo.item, dropId)
  }
  const itemCountFormat = useSelector(selectItemCountFormat)
  
  const containerRef = useRef(null)
  const [eventHandlers] = useTooltipHover(content.grh ? content : null, TooltipTypes.ITEM, containerRef)
  return (
    <div className={style} ref={containerRef} {...eventHandlers}>  
      <DropArea id={{...dropId, onDrop:onDrop}} acceptTypes={[DragDropTypes.ITEM]}>
      { content.grh && !locked > 0 ?
      <InventoryItem
        item={content}
        onActivate={onActivate}
        onSelect={onSelect}
      /> : <span className='empty-selection' onClick={()=> {onSelect(content)}}></span>
      }
      {
        content.cantUse > 0 ? <span className='cant-use'></span> : null
      }
      {
        content.count > 0 && !locked ? <p className='item-count'>{formatItemCount(content.count, itemCountFormat)}</p> : null
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