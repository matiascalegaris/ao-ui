import './inventory.scss'
import InventoryFrame from '../InventoryFrame/inventory-frame'
import InventorySlot from '../../../../Common/InventorySlot/inventory-slot'

export default function Inventory() {
  const inventory = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]
  return (
    <div className='inventory-area'>
      <InventoryFrame styles='item-list'>
        <div className='main-inv'>
        {
          inventory.map( item => (
            <InventorySlot id={item} />
          ))
        }
        </div>
      </InventoryFrame>
    </div>
  )
}