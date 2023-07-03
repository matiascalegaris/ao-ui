import { useSelector } from 'react-redux'
import { selectCurrentMana, selectMaxMana } from '../../../../../../../redux/GameplaySlices/PlayerStatsSlice'
import ProgressBar from '../../../../../../Common/ProgressBar/progress-bar'

export const ManaBar = () => {
  const currentMana = useSelector(selectCurrentMana)
  const maxMana = useSelector(selectMaxMana)
  return (
    <div className='mana-line'>
        <img className='' src={require('../../../../../../assets/Icons/gameplay/ico_stats_mana.png')} />
        <ProgressBar styles='mana-bar-outer' 
                     currentVal={currentMana} 
                     maxValue={maxMana} 
                     displayMax={true} 
                     barStyle='mana-bar'
        />
    </div>
  )
}