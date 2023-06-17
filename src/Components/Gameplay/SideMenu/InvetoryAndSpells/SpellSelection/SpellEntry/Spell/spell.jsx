import Sprite from "../../../../../../Common/Sprite/sprite"

export const Spell = ({spellInfo, selected, ...otherProps}) => {
  const grhInfo = window.parent.BabelUI.GetGrhDrawInfo(spellInfo.grh)
  return (
    <div className={'spell-entry ' + (selected ? 'selected-spell' : '')} {...otherProps}>
      <span className="spell-icon">
      <Sprite 
        imageName={grhInfo.imageNumber}
        x={grhInfo.startX}
        y={grhInfo.startY}
        width={grhInfo.width}
        height={grhInfo.height}
      /></span>{spellInfo.name}
    </div>
  )
}