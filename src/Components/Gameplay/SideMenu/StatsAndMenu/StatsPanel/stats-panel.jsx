import ProgressBar from '../../../../Common/ProgressBar/progress-bar'
import './stats-panel.scss'
import StatValue from './StatValue/stat-value'

export default function StatsPanel({styles}) {
  return (
    <div className={'stats-panel'}>
      <div className='gold-line'>
        <span className='gold'>
          <img className='stats-icon' src={require('../../../../../assets/Icons/gameplay/ico_stats_coins.png')} />
          <p>1.600.546</p>
        </span>
        <span className='agi'>
          <img className='stats-icon' src={require('../../../../../assets/Icons/gameplay/ico_stats_agi.png')} />
          <p>18</p>
        </span>
        <span className='str'>
          <img className='stats-icon' src={require('../../../../../assets/Icons/gameplay/ico_stats_str.png')} />
          <p>18</p>
        </span>
      </div>
      <span className='separator-line'></span>
      <div className='hp-line'>
        <img className='' src={require('../../../../../assets/Icons/gameplay/ico_stats_health.png')} />
        <ProgressBar styles='hp-bar-outer' currentVal={457} MaxValue={490} displayMax={true} barStyle='hp-bar'/>
      </div>
      <div className='mana-line'>
        <img className='' src={require('../../../../../assets/Icons/gameplay/ico_stats_mana.png')} />
        <ProgressBar styles='mana-bar-outer' currentVal={457} MaxValue={490} displayMax={true} barStyle='mana-bar'/>
      </div>
      <div className='energy-line'>
      <img className='stats-icon' src={require('../../../../../assets/Icons/gameplay/ico_stats_stamina.png')} />
      <ProgressBar styles='energy-bar-outer' currentVal={457} MaxValue={490} displayMax={true} barStyle='energy-bar'/>
      <img className='stats-icon' src={require('../../../../../assets/Icons/gameplay/ico_stats_thirst.png')} />
      <ProgressBar styles='drink-bar-outer' currentVal={457} MaxValue={490} displayMax={false} barStyle='drink-bar'/>
      <img className='stats-icon' src={require('../../../../../assets/Icons/gameplay/ico_stats_hunger.png')} />
      <ProgressBar styles='food-bar-outer' currentVal={457} MaxValue={490} displayMax={false} barStyle='food-bar'/>
      </div>
      <span className='separator-line'></span>
      <div className='defense-area'>
        <StatValue icon={require('../../../../../assets/Icons/gameplay/ico_stats_sword.png')}>5/8</StatValue>
        <StatValue icon={require('../../../../../assets/Icons/gameplay/ico_stats_shield.png')}>0/0</StatValue>
        <StatValue icon={require('../../../../../assets/Icons/gameplay/ico_stats_helmet.png')}>0/0</StatValue>
        <StatValue icon={require('../../../../../assets/Icons/gameplay/ico_stats_armor.png')}>0/0</StatValue>
        <StatValue iconStyle='magic-armor' icon={require('../../../../../assets/Icons/gameplay/ico_stats_magicshield.png')}>+0</StatValue>
        <StatValue icon={require('../../../../../assets/Icons/gameplay/ico_stats_magic.png')}>+0%</StatValue>
      </div>
    </div>
  )
}