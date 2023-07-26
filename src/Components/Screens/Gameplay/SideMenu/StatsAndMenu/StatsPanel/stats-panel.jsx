import { useDispatch, useSelector } from 'react-redux'
import { selectAgi, selectAgiState, selectGold, selectMagicBonus, selectMagicDef, selectSafeGoldForLevel, selectStr, selectStrState } from '../../../../../../redux/GameplaySlices/PlayerStatsSlice'
import { FormatNumberWithDots } from '../../../../../../Tools/Utils'
import './stats-panel.scss'
import StatValue from './StatValue/stat-value'
import { selectEquippedBonus, selectInvSlot } from '../../../../../../redux/GameplaySlices/InventorySlice'
import { HpBar } from './Bars/HpBar'
import { DrinkBar } from './Bars/DrinkBar'
import { FoodBar } from './Bars/FoodBar'
import { EnergyBar } from './Bars/EnergyBar'
import { ManaBar } from './Bars/ManaBar'
import { selectCharacterLevel } from '../../../../../../redux/GameplaySlices/CharacterInfoSlice'


const GetStateStyle = state => {
  switch (state)
  {
    case 1:
      return 'min-buff'
    case 2:
      return 'max-buff'
    case 3:
      return 'animate-color-change'
    default:
      return 'default-state'
  }
}

export default function StatsPanel({styles}) {
  const userGold = useSelector(selectGold)
  const agi = useSelector(selectAgi)
  const str = useSelector(selectStr)
  const strState = useSelector(selectStrState)
  const agiState = useSelector(selectAgiState)
  const mdef = useSelector(selectMagicDef)
  const mattack = useSelector(selectMagicBonus)
  const dispatch = useDispatch()
  const equippedItems = useSelector(selectEquippedBonus)
  const onGoldClick = evt => {
    window.parent.BabelUI.GoldClick()
    dispatch(selectInvSlot(-1))
  }
  //console.log('statsPannel render')
  const showArrowBonus = equippedItems.amunition.min > 0 ||
                         equippedItems.amunition.max > 0
  const goldForLevel = useSelector(selectSafeGoldForLevel)
  const userLevel = useSelector(selectCharacterLevel)
  const alertGold =  userGold > (goldForLevel * userLevel)
  return (
    <div className={'stats-panel'}>
      <div className='gold-line'>
        <span className={'gold ' + (alertGold ? 'gold-alert' : '') }>
          <img className='stats-icon' 
            onClick={onGoldClick}
            src={require('../../../../../../assets/Icons/gameplay/ico_stats_coins.png')} 
          />
          <p onClick={onGoldClick}>{FormatNumberWithDots(userGold)}</p>
        </span>
        <span className={'agi ' + GetStateStyle(agiState)}>
          <img className='stats-icon' src={require('../../../../../../assets/Icons/gameplay/ico_stats_agi.png')} />
          <p>{agi}</p>
        </span>
        <span className={'str ' + GetStateStyle(strState)}>
          <img className='stats-icon' src={require('../../../../../../assets/Icons/gameplay/ico_stats_str.png')} />
          <p>{str}</p>
        </span>
      </div>
      <span className='separator-line'></span>
      <HpBar/>
      <ManaBar/>
      <div className='energy-line'>
        <EnergyBar/>
        <DrinkBar/>
        <FoodBar/>
      </div>
      <span className='separator-line'></span>
      <div className='defense-area'>
        <StatValue icon={require('../../../../../../assets/Icons/gameplay/ico_stats_sword.png')}>
          {equippedItems.weapon.min + "/" + equippedItems.weapon.max}
          {
            showArrowBonus ? `+${equippedItems.amunition.min}/${equippedItems.amunition.max}` : null
          }
        </StatValue>
        <StatValue icon={require('../../../../../../assets/Icons/gameplay/ico_stats_shield.png')}>{equippedItems.shield.min + "/" + equippedItems.shield.max}</StatValue>
        <StatValue icon={require('../../../../../../assets/Icons/gameplay/ico_stats_helmet.png')}>{equippedItems.helm.min + "/" + equippedItems.helm.max}</StatValue>
        <StatValue icon={require('../../../../../../assets/Icons/gameplay/ico_stats_armor.png')}>{equippedItems.armor.min + "/" + equippedItems.armor.max}</StatValue>
        <StatValue iconStyle='magic-armor' icon={require('../../../../../../assets/Icons/gameplay/ico_stats_magicshield.png')}>+{mdef}</StatValue>
        <StatValue icon={require('../../../../../../assets/Icons/gameplay/ico_stats_magic.png')}>+{mattack}%</StatValue>
      </div>
    </div>
  )
}