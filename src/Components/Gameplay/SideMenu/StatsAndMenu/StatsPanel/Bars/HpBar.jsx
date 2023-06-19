import { useSelector } from 'react-redux'
import { selectCurrentHp, selectCurrentShield, selectMaxHp } from '../../../../../../redux/GameplaySlices/PlayerStatsSlice'
import ProgressBar from '../../../../../Common/ProgressBar/progress-bar'
import { Actions } from '../../../../../../constants'

export const HpBar = () => {
  const currentHp = useSelector(selectCurrentHp)
  const maxHp = useSelector(selectMaxHp)
  const currentShield = useSelector(selectCurrentShield)
  const requestAction = action => {
    window.parent.BabelUI.RequestAction(Actions.DisplayHPInfo)
  }
  return (
    <div className='hp-line'>
        <img className='' src={require('../../../../../../assets/Icons/gameplay/ico_stats_health.png')} />
        <ProgressBar styles='hp-bar-outer' 
                    currentVal={currentHp} 
                    maxValue={maxHp} 
                    displayMax={true} barStyle='hp-bar'
                    onClick={requestAction}
                    extraFill={currentShield} extraStyle='extra-style'/>
      </div>
  )
}