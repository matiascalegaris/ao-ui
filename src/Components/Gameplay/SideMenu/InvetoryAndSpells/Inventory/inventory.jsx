import './inventory.scss'
import InventoryFrame from '../InventoryFrame/inventory-frame'
import InventorySlot from '../../../../Common/InventorySlot/inventory-slot'

export default function Inventory() {
  const inventory = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]
  return (
    <div className='inventory-area'>
      <InventoryFrame styles='item-list'>
        <div className='main-inv'>
        {
          inventory.slice(0,39).map( (item,index) => (
            <InventorySlot id={index} />
          ))
        }
        </div>
        <div className='locked-lines'>
          <div className='locked-line'>
            {
              inventory.slice(40,46).map( (item,index) => (
                <InventorySlot id={index} />
              ))
            }
          </div>
        </div>
      </InventoryFrame>
    </div>
  )
}