import { useSelector } from "react-redux"
import { selectHotkeySpellSlot } from "../../../../redux/GameplaySlices/InventorySlice"
import Sprite from "../../../Common/Sprite/sprite"
import { SpellCdIndicator } from "../SideMenu/InvetoryAndSpells/SpellSelection/SpellEntry/Spell/spell-cd-indocator"

export const HotkeySpell = ({targetElement}) => {
  const content = useSelector(state => selectHotkeySpellSlot(state, targetElement))
  if (!content) {
    return (<></>)
  }
  const grhInfo = window.parent.BabelUI.GetGrhDrawInfo(content.grh)
  return (
    <div>
      {
        content.grh > 0 ?
        <Sprite
          styles="item-icon"
          imageName={grhInfo.imageNumber}
          x={grhInfo.startX}
          y={grhInfo.startY}
          width={grhInfo.width}
          height={grhInfo.height}
        /> : null
      }
      {
        content.spellIndex > 0 ? <SpellCdIndicator spellId={content.spellIndex}/> : null
      }
    </div>
  )
}