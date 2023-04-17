import './inventory.scss'
import InventoryFrame from '../InventoryFrame/inventory-frame'
import InventorySlot from '../../../../Common/InventorySlot/inventory-slot'
import ExtraSlotLine from './ExtraSlotLine/extra-slot-line'

export default function Inventory() {
  const inventory = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]
  return (
    <div className='inventory-area'>
      <InventoryFrame styles='item-list'>
        <div className='main-inv'>
        {
          inventory.slice(0,24).map( (item,index) => (
            <InventorySlot id={index} />
          ))
        }
        </div>
        <div className='locked-lines'>
          <ExtraSlotLine locked={false} inventory={inventory} start={24} />
          <ExtraSlotLine locked={false} inventory={inventory} start={30} />
          <ExtraSlotLine locked={true} inventory={inventory} start={36} />
        </div>
      </InventoryFrame>
      <span className='delete-item'></span>
    </div>
  )
}