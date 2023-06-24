import './item-tooltip.scss'
import Sprite from '../../Sprite/sprite'

const getDefIconForItemType = item => {
  switch(item.type) {
    default:
      require('../../../../assets/Icons/gameplay/ico_stats_shield.png')
  }
}
export const ItemTooltip = ({itemInfo}) => {
  const grhInfo = window.parent.BabelUI.GetGrhDrawInfo(itemInfo.grh)
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
    </div>
  )
}