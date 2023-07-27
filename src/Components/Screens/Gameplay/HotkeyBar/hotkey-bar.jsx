import { useDispatch, useSelector } from 'react-redux'
import { DragDropTypes } from '../../../../constants'
import { DropArea } from '../../../Common/DropArea'
import './hotkey-bar.scss'
import { selectHotkeys, setHotkeySlot } from '../../../../redux/GameplaySlices/InventorySlice'
import { HotkeyItem } from './hotkey-item'
import { HotkeySpell } from './hoykey-spell'
import Frame from '../../../Common/Frame/frame'

export const HotKeyBar = () => {
  const hoykeyList = useSelector(selectHotkeys)
  const dispath = useDispatch()
  const onDrop = (mouseEvt, dragInfo) => {
    console.log(dragInfo)
    if (dragInfo.itemType === DragDropTypes.ITEM) {
      dispath(setHotkeySlot({
        type: dragInfo.itemType,
        index: dragInfo.activeContainer.id,
        content: {
          targetIndex: dragInfo.item.objIndex,
          lastKnownSlot: dragInfo.item.index,
          lastUse: 0
        }
      }))
    } else if (dragInfo.itemType === DragDropTypes.SPELL) {
      dispath(setHotkeySlot({
        type: dragInfo.itemType,
        index: dragInfo.activeContainer.id,
        content: {
          targetIndex: dragInfo.item.spellIndex,
          lastKnownSlot: dragInfo.item.index,
          lastUse: 0
        }
      }))
    }
    
  }
  return (
    <Frame styles='hotkey-bar' contentStyles='content-style'>
      {
        hoykeyList.map((el,index) => (
          <div className='slot-container'>
            <div key={index} className='slot'>
            <DropArea id={{type:'hotkey', id:index, onDrop:onDrop}} acceptTypes={[DragDropTypes.ITEM, DragDropTypes.SPELL]}>
            {
              {
                'Item':<HotkeyItem targetElement={el.content} />,
                'Spell':<HotkeySpell targetElement={el.content}/>
              }
              [el.type]
            }
            </DropArea>
            </div>
            {
              <div key={el.lastUse} className='hk-number'>{index + 1}</div>
            }
          </div>
        ))
      }
    </Frame>
  )
}