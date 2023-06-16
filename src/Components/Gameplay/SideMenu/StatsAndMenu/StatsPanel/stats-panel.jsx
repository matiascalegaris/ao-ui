import { useDispatch, useSelector } from 'react-redux'
import { selectAgi, selectAgiState, selectCharacterStats, selectCurrentEnergy, selectCurrentHp, selectCurrentMana, selectCurrentShield, selectDrink, selectFood, selectGold, selectMagicBonus, selectMagicDef, selectMaxEnergy, selectMaxHp, selectMaxMana, selectStr, selectStrState } from '../../../../../redux/GameplaySlices/PlayerStatsSlice'
import { FormatNumberWithDots } from '../../../../../Tools/Utils'
import ProgressBar from '../../../../Common/ProgressBar/progress-bar'
import './stats-panel.scss'
import StatValue from './StatValue/stat-value'
import { selectEquipedItems, selectInvSlot } from '../../../../../redux/GameplaySlices/InventorySlice'

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
  const currentHp = useSelector(selectCurrentHp)
  const maxHp = useSelector(selectMaxHp)
  const currentShield = useSelector(selectCurrentShield)
  const currentMana = useSelector(selectCurrentMana)
  const maxMana = useSelector(selectMaxMana)
  const strState = useSelector(selectStrState)
  const agiState = useSelector(selectAgiState)
  const currentEnergy = useSelector(selectCurrentEnergy)
  const maxEnergy = useSelector(selectMaxEnergy)
  const drink = useSelector(selectDrink)
  const food = useSelector(selectFood)
  const mdef = useSelector(selectMagicDef)
  const mattack = useSelector(selectMagicBonus)
  const dispatch = useDispatch()
  const equippedItems = useSelector(selectEquipedItems)
  const onGoldClick = evt => {
    window.parent.BabelUI.GoldClick()
    dispatch(selectInvSlot(0))
  }
  console.log('statsPannel render')
  const showArrowBonus = equippedItems.amunition.min > 0 ||
                         equippedItems.amunition.max > 0
  return (
    <div className={'stats-panel'}>
      <div className='gold-line'>
        <span className='gold' >
          <img className='stats-icon' 
            onClick={onGoldClick}
            src={require('../../../../../assets/Icons/gameplay/ico_stats_coins.png')} 
          />
          <p onClick={onGoldClick}>{FormatNumberWithDots(userGold)}</p>
        </span>
        <span className={'agi ' + GetStateStyle(agiState)}>
          <img className='stats-icon' src={require('../../../../../assets/Icons/gameplay/ico_stats_agi.png')} />
          <p>{agi}</p>
        </span>
        <span className={'str ' + GetStateStyle(strState)}>
          <img className='stats-icon' src={require('../../../../../assets/Icons/gameplay/ico_stats_str.png')} />
          <p>{str}</p>
        </span>
      </div>
      <span className='separator-line'></span>
      <div className='hp-line'>
        <img className='' src={require('../../../../../assets/Icons/gameplay/ico_stats_health.png')} />
        <ProgressBar styles='hp-bar-outer' 
                    currentVal={currentHp} 
                    maxValue={maxHp} 
                    displayMax={true} barStyle='hp-bar'
                    extraFill={currentShield} extraStyle='extra-style'/>
      </div>
      <div className='mana-line'>
        <img className='' src={require('../../../../../assets/Icons/gameplay/ico_stats_mana.png')} />
        <ProgressBar styles='mana-bar-outer' currentVal={currentMana} maxValue={maxMana} displayMax={true} barStyle='mana-bar'/>
      </div>
      <div className='energy-line'>
      <img className='stats-icon' src={require('../../../../../assets/Icons/gameplay/ico_stats_stamina.png')} />
      <ProgressBar styles='energy-bar-outer' currentVal={currentEnergy} maxValue={maxEnergy} displayMax={true} barStyle='energy-bar'/>
      <img className='stats-icon' src={require('../../../../../assets/Icons/gameplay/ico_stats_thirst.png')} />
      <ProgressBar styles='drink-bar-outer' currentVal={drink} maxValue={100} displayMax={false} barStyle='drink-bar'/>
      <img className='stats-icon' src={require('../../../../../assets/Icons/gameplay/ico_stats_hunger.png')} />
      <ProgressBar styles='food-bar-outer' currentVal={food} maxValue={100} displayMax={false} barStyle='food-bar'/>
      </div>
      <span className='separator-line'></span>
      <div className='defense-area'>
        <StatValue icon={require('../../../../../assets/Icons/gameplay/ico_stats_sword.png')}>
          {equippedItems.weapon.min + "/" + equippedItems.weapon.max}
          {
            showArrowBonus ? `+${equippedItems.amunition.min}/${equippedItems.amunition.max}` : null
          }
        </StatValue>
        <StatValue icon={require('../../../../../assets/Icons/gameplay/ico_stats_shield.png')}>{equippedItems.shield.min + "/" + equippedItems.shield.max}</StatValue>
        <StatValue icon={require('../../../../../assets/Icons/gameplay/ico_stats_helmet.png')}>{equippedItems.helm.min + "/" + equippedItems.helm.max}</StatValue>
        <StatValue icon={require('../../../../../assets/Icons/gameplay/ico_stats_armor.png')}>{equippedItems.armor.min + "/" + equippedItems.armor.max}</StatValue>
        <StatValue iconStyle='magic-armor' icon={require('../../../../../assets/Icons/gameplay/ico_stats_magicshield.png')}>+{mdef}</StatValue>
        <StatValue icon={require('../../../../../assets/Icons/gameplay/ico_stats_magic.png')}>+{mattack}%</StatValue>
      </div>
    </div>
  )
}