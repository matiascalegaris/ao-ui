import { useDispatch, useSelector } from 'react-redux'
import { DragDropTypes } from '../../../../constants'
import { DropArea } from '../../../Common/DropArea'
import './hotkey-bar.scss'
import { selectHotkeys, setHotkeySlot } from '../../../../redux/GameplaySlices/InventorySlice'
import { HotkeyItem } from './hotkey-item'
import { HotkeySpell } from './hoykey-spell'
import Frame from '../../../Common/Frame/frame'

const DrawContent = (type, content) => {
  if ((type & DragDropTypes.ITEM) > 0) {
    return (<HotkeyItem targetElement={content} />)
  } else if ((type & DragDropTypes.SPELL) > 0) {
    return (<HotkeySpell targetElement={content}/>)
  }
  else {
    return null
  }
}
export const HotKeyBar = () => {
  const hoykeyList = useSelector(selectHotkeys)
  const dispath = useDispatch()
  const onDrop = (mouseEvt, dragInfo) => {
    if ((dragInfo.itemType & DragDropTypes.ITEM) > 0) {
      dispath(setHotkeySlot({
        type: dragInfo.itemType,
        index: dragInfo.activeContainer.id,
        content: {
          targetIndex: dragInfo.item.objIndex,
          lastKnownSlot: dragInfo.item.index,
          lastUse: 0
        }
      }))
      window.parent.BabelUI.UpdateHoykeySlotInfo(dragInfo.activeContainer.id, dragInfo.item.objIndex, dragInfo.item.index, DragDropTypes.ITEM)
    } else if ((dragInfo.itemType & DragDropTypes.SPELL) > 0) {
      dispath(setHotkeySlot({
        type: dragInfo.itemType,
        index: dragInfo.activeContainer.id,
        content: {
          targetIndex: dragInfo.item.spellIndex,
          lastKnownSlot: dragInfo.item.index,
          lastUse: 0
        }
      }))
      window.parent.BabelUI.UpdateHoykeySlotInfo(dragInfo.activeContainer.id, dragInfo.item.spellIndex, dragInfo.item.index, DragDropTypes.SPELL)
    }
    
  }
  return (
    <Frame styles='hotkey-bar' contentStyles='content-style'>
      {
        hoykeyList.map((el,index) => (
          <div className='slot-container'>
            <div key={index} className='slot'>
            <DropArea id={{type:'hotkey', id:index, onDrop:onDrop}} acceptTypes={DragDropTypes.BINDABLE}>
            {
              DrawContent(el.type, el.content)
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