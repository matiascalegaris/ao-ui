import { useSelector } from 'react-redux'
import { selectDrink } from '../../../../../../redux/GameplaySlices/PlayerStatsSlice'
import ProgressBar from '../../../../../Common/ProgressBar/progress-bar'

export const DrinkBar = () => {
  const drink = useSelector(selectDrink)
  return (
    <>
      <img className='stats-icon' src={require('../../../../../../assets/Icons/gameplay/ico_stats_thirst.png')} />
      <ProgressBar styles='drink-bar-outer' currentVal={drink} maxValue={100} displayMax={false} barStyle='drink-bar'/>
    </>
  )
}