import { useContext, useRef, useState } from 'react'
import { DragDropTypes } from '../../../../../../constants'
import './spell-entry.scss'
import { Spell } from './Spell/spell'
import { DropArea } from '../../../../../Common/DropArea'
import { DragDropContext } from '../../../../../Common/DragDropProvider'
import { useDispatch } from 'react-redux'
import { moveSpellSlot } from '../../../../../../redux/GameplaySlices/InventorySlice'
import { TooltipTypes, useTooltipHover } from '../../../../../Common/Tooltip/Tooltip-manager'

export default function SpellEntry({spell, selected, ...otherProps}) {
  const dragDropContext = useContext(DragDropContext);
  const [dragDirection, setDragDirection] = useState(null)
  const dispatch = useDispatch()
  const onDrop = (mouseEvt, dragInfo) => {
    if (dragDropContext.item.index === spell.index) {
      return
    }
    const rect = spellRef.current.getBoundingClientRect()
    const localY = mouseEvt.clientY - rect.top;
    let targetSlot = spell.index
    if (rect.height/2 < localY) {
      targetSlot = spell.index + 1
    }
    if (targetSlot > dragInfo.item.index) {
      targetSlot--
    }
    if (targetSlot === dragInfo.item.index) return
    window.parent.BabelUI.MoveSpellSlot(dragInfo.item.index, targetSlot)
    dispatch(moveSpellSlot({from:dragInfo.item.index , to:targetSlot}))
    
  }

  const mouseMove = evt => {
    if (dragDropContext.item) {
      const rect = spellRef.current.getBoundingClientRect()
      const localY = evt.clientY - rect.top;
      if (rect.height/2 > localY) {
        if (dragDirection !== 2) {
          setDragDirection(2)
        }
      } else {
        if (dragDirection !== 1) {
          setDragDirection(1)
        }
      }
    }
  }
  const DrawDragMarker = dragDropContext.item && dragDropContext.activeContainer && 
                          dragDropContext.activeContainer.id === spell.index
  const dragStyle = {
    borderBottom: DrawDragMarker && dragDirection === 1 ? '2px solid red' : 'none',
    borderTop: DrawDragMarker && dragDirection === 2 ? '2px solid red' : 'none'
  }
  const spellRef = useRef(null)
  const [eventHandlers] = useTooltipHover(spell.spellIndex > 0 ? spell : null, TooltipTypes.SPELL, spellRef)
  return (
    <DropArea id={{id:spell.index, onDrop:onDrop}} acceptTypes={[DragDropTypes.SPELL]}>
      <Spell spellInfo={spell} 
             selected={selected}
             innerRef={spellRef} 
             onMouseMove={mouseMove}
             styles={dragStyle}
             {...eventHandlers}
             {...otherProps}/>
    </DropArea>
  )
}