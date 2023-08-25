import './spell.scss'
import Sprite from "../../../../../../../Common/Sprite/sprite"
import { useContext } from 'react'
import { DragDropContext } from '../../../../../../../Common/DragDropProvider'
import { DragDropTypes, MouseButtons } from '../../../../../../../../constants'
import { SpellCdIndicator } from './spell-cd-indocator'

const getScaletoFit = (originalWidth, originalHeight, targetWidth, targetHeight) => {
  const heightScale = targetHeight / originalHeight
  const widthScale = targetWidth / originalWidth
  if (heightScale < widthScale) return heightScale
  return widthScale
}

export const Spell = ({spellInfo, selected, innerRef, styles, dragEnabled, ...otherProps}) => {
  const dragDropContext = useContext(DragDropContext);
  const grhInfo = window.parent.BabelUI.GetGrhDrawInfo(spellInfo.grh)
  const targetScale = getScaletoFit(grhInfo.width, grhInfo.height, 12, 12)
  const iconStyle = {
    transform: `scale(${targetScale})`,
    margin: `${(grhInfo.height-12) / -2}px ${(grhInfo.width-12) / -2}px`
  }
  let DragType = DragDropTypes.SPELL
  if (spellInfo.isBindable) {
    DragType |= DragDropTypes.BINDABLE
  }
  const onSpellMouseDown = evt => {
    if (dragEnabled && (evt.button === MouseButtons.right || process.env.NODE_ENV === 'development')) {
      dragDropContext.MouseDownOnDragable(spellInfo, DragType,  Date.now())
    }
  }
  const selectedStyle = {
    ...styles,
    opacity: `${dragDropContext.item && dragDropContext.item.index === spellInfo.index ? 0.5 : 1}`
  }
  return (
    <div className={'spell-entry ' + (selected ? 'selected-spell' : '')} 
         style={selectedStyle} 
         {...otherProps} 
         onMouseDown={onSpellMouseDown}
         ref={innerRef}
         >
      <span className="spell-icon">
      <Sprite 
        imageName={grhInfo.imageNumber}
        x={grhInfo.startX}
        y={grhInfo.startY}
        width={grhInfo.width}
        height={grhInfo.height}
        customSectionStyle={iconStyle}
      />
      {
        spellInfo.spellIndex > 0 ? <SpellCdIndicator spellId={spellInfo.spellIndex}/> : null
      }
      
      </span>{spellInfo.name}
    </div>
  )
}