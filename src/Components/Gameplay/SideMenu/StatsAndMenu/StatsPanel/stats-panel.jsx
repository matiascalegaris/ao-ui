import ProgressBar from '../../../../Common/ProgressBar/progress-bar'
import './stats-panel.scss'
import StatValue from './StatValue/stat-value'

export default function StatsPanel({styles}) {
  return (
    <div className={'stats-panel'}>
      <div className='gold-line'>
        <span className='gold'>
          <img className='stat-icon' src={require('../../../../../assets/Icons/ico_trash.png')} />
          <p>1.600.546</p>
        </span>
        <span className='agi'>
          <img className='stat-icon' src={require('../../../../../assets/Icons/ico_trash.png')} />
          <p>18</p>
        </span>
        <span className='str'>
          <img className='stat-icon' src={require('../../../../../assets/Icons/ico_trash.png')} />
          <p>18</p>
        </span>
      </div>
      <span className='separator-line'></span>
      <div className='hp-line'>
        <ProgressBar styles='hp-bar-outer' currentVal={457} MaxValue={490} displayMax={true} barStyle='hp-bar'/>
      </div>
      <div className='mana-line'>
        <ProgressBar styles='mana-bar-outer' currentVal={457} MaxValue={490} displayMax={true} barStyle='mana-bar'/>
      </div>
      <div className='energy-line'>
      <ProgressBar styles='energy-bar-outer' currentVal={457} MaxValue={490} displayMax={true} barStyle='energy-bar'/>
      <ProgressBar styles='drink-bar-outer' currentVal={457} MaxValue={490} displayMax={false} barStyle='drink-bar'/>
      <ProgressBar styles='food-bar-outer' currentVal={457} MaxValue={490} displayMax={false} barStyle='food-bar'/>
      </div>
      <span className='separator-line'></span>
      <div className='defense-area'>
        <StatValue >5/8</StatValue>
        <StatValue >0/0</StatValue>
        <StatValue >0/0</StatValue>
        <StatValue >0/0</StatValue>
        <StatValue >+0</StatValue>
        <StatValue >+0%</StatValue>
      </div>
    </div>
  )
}