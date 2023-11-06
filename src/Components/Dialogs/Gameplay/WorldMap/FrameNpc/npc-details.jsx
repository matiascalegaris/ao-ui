import { useTranslation } from 'react-i18next';
import './npc-details.scss'
import Sprite from '../../../../Common/Sprite/sprite';
import { ConvertToPercent } from '../../../../../Tools/Utils';

export const NpcDetails = ({npcDetails}) => {
  const { t } = useTranslation();
  const itemList = npcDetails.dropList && npcDetails.dropList
                  .map( drop => ({...drop, details: window.parent.BabelUI.GetItemInfo(drop.itemIndex)}))
                  .map( item => ({...item, grhInfo: window.parent.BabelUI.GetGrhDrawInfo(item.details.grhIndex)}))
  return (
    <div className="npc-details">
      <div className="info-line">
        <img className='info-icon' src={require('../../../../../assets/Icons/gameplay/ico_stats_health.png')}/>
        <p className='info-text'>{npcDetails.hp}</p>
        <span className='spacer'></span>
        <img className='info-icon' src={require('../../../../../assets/Icons/gameplay/ico_stats_sword.png')}/>
        <p className='info-text'>{npcDetails.minDamage} / {npcDetails.maxDamage}</p>
      </div>
      <div className="info-line">
        <p className='info-text'>{t('experience')}: {npcDetails.exp}</p>
      </div>
      { npcDetails.clanExp > 0 &&
        <div className="info-line">
          <p className='info-text'>{t('clan-exp')}: {npcDetails.clanExp}</p>
        </div>
      }
      {
        itemList || npcDetails.gold > 0 ?
        <>
          <div className="info-line">
            <h4 className='drop-title'>{t('drops').toUpperCase()}</h4>
          </div>
          <div className='drop-list'>
            { npcDetails.gold > 0 &&
              <div className="info-line center-elements">
                <img className='gold-icon' src={require('../../../../../assets/Icons/gameplay/ico_stats_coins.png')}/>
                <p className='info-text'>{npcDetails.gold}</p>
              </div>
            }
            {
              itemList && itemList.map( (item, index) => (
                <div className="info-line" key={index} >
                  <Sprite
                    styles="drop-item-icon"
                    imageName={item.grhInfo.imageNumber}
                    x={item.grhInfo.startX}
                    y={item.grhInfo.startY}
                    width={item.grhInfo.width}
                    height={item.grhInfo.height}
                  />
                  <p className='info-text'>{item.details.name} ({ConvertToPercent(item.dropRate)}%)</p>
                </div>
              ))
           
            }
          </div> 
        </> : null
      }
    </div>
  )
}