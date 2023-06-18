import './spell.scss'
import Sprite from "../../../../../../Common/Sprite/sprite"
import { useContext } from 'react'
import { DragDropContext } from '../../../../../../Common/DragDropProvider'
import { DragDropTypes } from '../../../../../../../constants'

const getScaletoFit = (originalWidth, originalHeight, targetWidth, targetHeight) => {
  const widthDiff = originalWidth - targetWidth
  const heightDiff = originalHeight - targetHeight
  const heightScale = targetHeight / originalHeight
  const widthScale = targetWidth / originalWidth
  if (heightScale < widthScale) return heightScale
  return widthScale
}

export const Spell = ({spellInfo, selected, ...otherProps}) => {
  const dragDropContext = useContext(DragDropContext);
  const grhInfo = window.parent.BabelUI.GetGrhDrawInfo(spellInfo.grh)
  const targetScale = getScaletoFit(grhInfo.width, grhInfo.height, 12, 12)
  const iconStyle = {
    transform: `scale(${targetScale})`,
    margin: `${(grhInfo.height-12) / -2}px ${(grhInfo.width-12) / -2}px`
  }
  const onSpellMouseDown = evt => {
    dragDropContext.MouseDownOnDragable(spellInfo, DragDropTypes.SPELL,  Date.now())
  }
  return (
    <div className={'spell-entry ' + (selected ? 'selected-spell' : '')} {...otherProps} onMouseDown={onSpellMouseDown}>
      <span className="spell-icon">
      <Sprite 
        imageName={grhInfo.imageNumber}
        x={grhInfo.startX}
        y={grhInfo.startY}
        width={grhInfo.width}
        height={grhInfo.height}
        customSectionStyle={iconStyle}
      /></span>{spellInfo.name}
    </div>
  )
}