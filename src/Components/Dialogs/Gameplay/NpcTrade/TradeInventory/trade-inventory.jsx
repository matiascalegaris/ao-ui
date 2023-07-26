import Frame from "../../../../Common/Frame/frame"
import InventorySlot from "../../../../Common/InventorySlot/inventory-slot"
import RibbonTittle from "../../../../Common/RibbonTittle/ribbon-tittle"
import './trade-inventory.scss'

export const TradeInventory = ({tittle, slotDetail, selectedIndex, onSelect, onDropItem, unlockedSlots}) => {
  return (
    <Frame styles='inv-frame-content'>
      <RibbonTittle styles='ribbon-pos' text={tittle} />
      <div className="inventory-slots">
      {
        slotDetail.map( (item,index) => (
              index < unlockedSlots ?
              <InventorySlot key={item.index} content={item} 
                              onSelect={onSelect} 
                              //onActivate={onActivateItem}
                              selected={index === selectedIndex}
                              dropId={{type:'inventory', id:item.index}}
                              onDropAction={onDropItem}
                              />
              : <img key={item.index} src={require('../../../../../assets/Icons/inventory-extra/locked-slot.png')}/>
        ))
      }
      </div>
    </Frame>
  )
}