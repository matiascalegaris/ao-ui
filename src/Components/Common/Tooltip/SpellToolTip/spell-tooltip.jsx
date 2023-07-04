import './spell-tooltip.scss'
import Sprite from '../../Sprite/sprite'

export const SpellDetails = ({spellInfo}) => {
  return (
    <>
      {
        spellInfo.description ? <div className="description">{spellInfo.description}</div> : null
      }
      <div className="stats-line">
      {
        spellInfo.requiredMana > 0 ? 
          <div className="stats-line">
            <img className="icon" src={require('../../../../assets/Icons/gameplay/ico_stats_mana.png')}/>
            <span className="value">{spellInfo.requiredMana}</span>
          </div> : null
      }
      {
        spellInfo.requiredStamina > 0 ? 
          <div className="stats-line">
            <img className="icon" src={require('../../../../assets/Icons/gameplay/ico_stats_stamina.png')}/>
            <span className="value">{spellInfo.requiredStamina}</span>
          </div> : null
      }      
      {
        spellInfo.cooldown > 0 ? 
          <div className="stats-line">
            <img className="icon" src={require('../../../../assets/Icons/gameplay/ico_timer.png')}/>
            <span className="value">{spellInfo.cooldown/1000}s</span>
          </div> : null
      }
      {
        spellInfo.requiredSkill > 0 ? 
          <div className="stats-line">
            <img className="icon" src={require('../../../../assets/Icons/gameplay/ico_skillpoints.png')}/>
            <span className="value">{spellInfo.requiredSkill}</span>
          </div> : null
      }
      </div>
    </>
  )
}
export const SpellTooltip = ({spell}) => {
  const spellInfo = window.parent.BabelUI.GetSpellInfo(spell.spellIndex)
  const grhInfo = window.parent.BabelUI.GetGrhDrawInfo(spell.grh)
  return (
    <div className="item-tooltip">
      <div className="item-header">
      <Sprite
          styles="icon"
          imageName={grhInfo.imageNumber}
          x={grhInfo.startX}
          y={grhInfo.startY}
          width={grhInfo.width}
          height={grhInfo.height}
        />
        <span className="title">{spell.name}</span>
      </div>
      <SpellDetails spellInfo={spellInfo}/>
    </div>
  )
}