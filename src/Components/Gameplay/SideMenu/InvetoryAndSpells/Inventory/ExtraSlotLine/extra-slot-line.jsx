import InventorySlot from '../../../../../Common/InventorySlot/inventory-slot'
import './extra-slot-line.scss'

const getImageForState = state => {
  if (state) {
    return require('../../../../../../assets/Icons/inventory-extra/main_inv_check_off.png')
  }
  else {
    return require('../../../../../../assets/Icons/inventory-extra/main_inv_check_on.png')
  }
}
export default function ExtraSlotLine({locked, inventory, start, onSelect, onActivate, selectedItem, onDropAction}) {
  return (
    <div className='locked-line'>
      <img className='extra-slot' src={getImageForState(locked)}/>
      {
        inventory.slice(start, start+6).map( (item,index) => (
          <>
          {
            locked ? <img key={item.index} src={require('../../../../../../assets/Icons/inventory-extra/locked-slot.png')}/>
            : <InventorySlot key={item.index} content={item} locked={locked} 
                         selected={item.index === selectedItem}
                         onActivate={onActivate} onSelect={onSelect}
                         onDropAction={onDropAction}
                         dropId={{type:'inventory', id:item.index}}/>
          }
          </>
        ))
      }
    </div>
  )
}
