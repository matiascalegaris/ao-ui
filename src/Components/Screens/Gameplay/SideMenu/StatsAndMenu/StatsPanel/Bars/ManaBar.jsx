import { useSelector } from 'react-redux'
import { selectCurrentMana, selectMaxMana } from '../../../../../../../redux/GameplaySlices/PlayerStatsSlice'
import ProgressBar from '../../../../../../Common/ProgressBar/progress-bar'
import { Actions } from '../../../../../../../constants'

export const ManaBar = () => {
  const currentMana = useSelector(selectCurrentMana)
  const maxMana = useSelector(selectMaxMana)
  const requestAction = action => {
    window.parent.BabelUI.RequestAction(Actions.SetMeditate)
  }
  return (
    <div className='mana-line'>
        <img className='' src={require('../../../../../../../assets/Icons/gameplay/ico_stats_mana.png')} />
        <ProgressBar styles='mana-bar-outer' 
                     currentVal={currentMana} 
                     maxValue={maxMana} 
                     displayMax={true} 
                     onClick={requestAction}
                     barStyle='mana-bar'
        />
    </div>
  )
}