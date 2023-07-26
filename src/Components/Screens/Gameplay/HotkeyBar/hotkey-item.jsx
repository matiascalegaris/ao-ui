import { useSelector } from "react-redux"
import { selectHotkeySlot, selectInventorySlots } from "../../../../redux/GameplaySlices/InventorySlice"
import InventoryItem from "../../../Common/InventorySlot/InventoryItem/inventory-item"
import { CooldownIndicator } from "../../../Common/InventorySlot/CooldownIndicator/cooldown-indicator"
import { selectItemCountFormat } from "../../../../redux/GameplaySlices/GameSettings"
import { ItemCounFormat } from "../../../../constants"

const formatItemCount = (itemCount, format) => {
  if (format == ItemCounFormat.DisplayAll) {
    return itemCount
  } 
  if (itemCount < 1000) {
    return itemCount
  }
  return `${(itemCount/1000).toFixed(1)}k`
}

export const HotkeyItem = ({targetElement}) => {
  const content = useSelector(state => selectHotkeySlot(state, targetElement))
  const itemCountFormat = useSelector(selectItemCountFormat)
  if (!content) {
    return (<></>)
  }
  return (
    <div>
      {
        content.grh > 0 ?
       <InventoryItem
        item={content}
        /> : <span className='empty-selection'></span>
      }
      {
        content.cantUse > 0 ? <span className='cant-use'></span> : null
      }
      {
        content.count > 0 ? <p className='item-count'>{formatItemCount(content.count, itemCountFormat)}</p> : null
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
    </div>
  )
}