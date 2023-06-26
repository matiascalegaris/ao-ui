import './item-tooltip.scss'
import Sprite from '../../Sprite/sprite'
import { eObjType } from '../../../../constants'
import { SpellDetails } from '../SpellToolTip/spell-tooltip'
import { useTranslation } from 'react-i18next'

const getDefIconForItemType = item => {
  switch(item.type) {
    case eObjType.otArmor:
      return require('../../../../assets/Icons/gameplay/ico_stats_armor.png')
    case eObjType.otSHIELD:
      return require('../../../../assets/Icons/gameplay/ico_stats_shield.png')
    case eObjType.otHELMET:
        return require('../../../../assets/Icons/gameplay/ico_stats_helmet.png')
    default:
      return require('../../../../assets/Icons/gameplay/ico_stats_shield.png')
  }
}

const getItemCustomData = objectInfo => {
  switch(objectInfo.objType) {
    case eObjType.otScrolls:
      if (objectInfo.spellIndex > 0) {
        const spellInfo = window.parent.BabelUI.GetSpellInfo(objectInfo.spellIndex)
        return <SpellDetails spellInfo={spellInfo}/>
      }
      return <></>
    default:
      return <></>
  }
}

export const ItemTooltip = ({itemInfo}) => {
  const grhInfo = window.parent.BabelUI.GetGrhDrawInfo(itemInfo.grh)
  const objInfo = window.parent.BabelUI.GetItemInfo(itemInfo.objIndex)
  const {t}  = useTranslation()
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
        <span className="title">{itemInfo.name}</span>
      </div>
      {
        itemInfo.description ? <div className="description">{itemInfo.description}</div> : null
      }
      <div className="stats-line">
      {
        itemInfo.minDef > 0 || itemInfo.maxDef > 0 ? 
          <div className="stats-line">
            <img className="icon" src={getDefIconForItemType(itemInfo)}/>
            <span className="value">{itemInfo.minDef}/{itemInfo.maxDef}</span>
          </div> : null
      }
      {
        itemInfo.minHit > 0 || itemInfo.maxHit > 0 ? 
          <div className="stats-line">
            <img className="icon" src={require('../../../../assets/Icons/gameplay/ico_stats_sword.png')}/>
            <span className="value">{itemInfo.minHit}/{itemInfo.maxHit}</span>
          </div> : null
      }
      {
        itemInfo.cooldown > 0 ? 
          <div className="stats-line">
            <img className="icon" src={require('../../../../assets/Icons/gameplay/ico_timer.png')}/>
            <span className="value">{itemInfo.cooldown/1000}s</span>
          </div> : null
      }
      </div>
      {
        itemInfo.cantUse > 0 ? <p className='cant-use'>{t(`cant-use-reason-${itemInfo.cantUse}`)}</p>
        : null
      }
      {
        getItemCustomData(objInfo)
      }
    </div>
  )
}