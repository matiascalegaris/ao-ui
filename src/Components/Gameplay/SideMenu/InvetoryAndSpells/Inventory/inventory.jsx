import './inventory.scss'
import InventoryFrame from '../InventoryFrame/inventory-frame'
import InventorySlot from '../../../../Common/InventorySlot/inventory-slot'
import ExtraSlotLine from './ExtraSlotLine/extra-slot-line'
import { useSelector } from 'react-redux'
import { selectExtraSlotState, selectInventorySlots } from '../../../../../redux/GameplaySlices/InventorySlice'

export default function Inventory() {
  const inventory = useSelector(selectInventorySlots)
  const extraSlotLines = useSelector(selectExtraSlotState)
  return (
    <div className='inventory-area'>
      <InventoryFrame styles='item-list'>
        <div className='main-inv'>
        {
          inventory.slice(0,24).map( (item,index) => (
            <InventorySlot key={index} item={item}/>
          ))
        }
        </div>
        <div className='locked-lines'>
          <ExtraSlotLine locked={!extraSlotLines[0]} inventory={inventory} start={24} />
          <ExtraSlotLine locked={!extraSlotLines[1]} inventory={inventory} start={30} />
          <ExtraSlotLine locked={!extraSlotLines[2]} inventory={inventory} start={36} />
        </div>
      </InventoryFrame>
      <span className='delete-item'></span>
    </div>
  )
}