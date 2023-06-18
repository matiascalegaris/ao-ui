import { useSelector } from 'react-redux'
import { selectFood } from '../../../../../../redux/GameplaySlices/PlayerStatsSlice'
import ProgressBar from '../../../../../Common/ProgressBar/progress-bar'

export const FoodBar = () => {
  const food = useSelector(selectFood)
  return (
    <>
      <img className='stats-icon' src={require('../../../../../../assets/Icons/gameplay/ico_stats_hunger.png')} />
      <ProgressBar styles='food-bar-outer' currentVal={food} maxValue={100} displayMax={false} barStyle='food-bar'/>
    </>
  )
}