import './inventory.scss'
import InventoryFrame from '../InventoryFrame/inventory-frame'
import InventorySlot from '../../../../Common/InventorySlot/inventory-slot'
import ExtraSlotLine from './ExtraSlotLine/extra-slot-line'
import { useDispatch, useSelector } from 'react-redux'
import { selectExtraSlotState, selectInventorySlots, selectInvSlot, selectSelectedItemIndex } from '../../../../../redux/GameplaySlices/InventorySlice'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DragLayer } from '../../../../Common/DragLayer/drag-layer'

export default function Inventory() {
  const inventory = useSelector(selectInventorySlots)
  const extraSlotLines = useSelector(selectExtraSlotState)
  const dispatch = useDispatch()
  const selectedItem = useSelector(selectSelectedItemIndex)
  const onSelectItem = item => {
    if (item.index !== selectedItem) {
      dispatch(selectInvSlot(item.index))
      window.parent.BabelUI.updateSelectedInvSlot(item.index)
    }
  }
  const onActivateItem = item => {
    window.parent.BabelUI.useInvSlotIndex(item.index)
  }
  const onDragEnd = result => {
    console.log(' drag end')
    console.log(result)
  }
  return (
    <div className='inventory-area'>
      <InventoryFrame styles='item-list' >
        <DndProvider backend={HTML5Backend}>
          <DragLayer/>
        <div className='main-inv'>
        {
          inventory.slice(0,24).map( (item,index) => (
            <InventorySlot key={item.id} content={item} 
                            onSelect={onSelectItem} 
                            onActivate={onActivateItem}
                            selected={index === selectedItem}/>
          ))
        }
        </div>
        <div className='locked-lines'>
          <ExtraSlotLine locked={!extraSlotLines[0]} inventory={inventory} start={24} />
          <ExtraSlotLine locked={!extraSlotLines[1]} inventory={inventory} start={30} />
          <ExtraSlotLine locked={!extraSlotLines[2]} inventory={inventory} start={36} />
        </div>
      </DndProvider>
      </InventoryFrame>
      <span className='delete-item'></span>
    </div>
  )
}