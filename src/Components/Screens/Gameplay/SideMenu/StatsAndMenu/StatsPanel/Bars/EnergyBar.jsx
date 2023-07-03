import { useSelector } from 'react-redux'
import { selectCurrentEnergy, selectMaxEnergy } from '../../../../../../../redux/GameplaySlices/PlayerStatsSlice'
import ProgressBar from '../../../../../../Common/ProgressBar/progress-bar'

export const EnergyBar = () => {
  const currentEnergy = useSelector(selectCurrentEnergy)
  const maxEnergy = useSelector(selectMaxEnergy)
  return (
    <>
    <img className='stats-icon' src={require('../../../../../../assets/Icons/gameplay/ico_stats_stamina.png')} />
    <ProgressBar styles='energy-bar-outer' currentVal={currentEnergy} maxValue={maxEnergy} displayMax={true} barStyle='energy-bar'/>
    </>
  )
}