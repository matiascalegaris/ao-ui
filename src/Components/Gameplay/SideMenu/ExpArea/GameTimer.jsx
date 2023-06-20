import { useSelector } from "react-redux"
import { selectGameTime } from "../../../../redux/GameplaySlices/GameStateSlice"

export const GameTimer = () => {
  const gameTime = useSelector(selectGameTime)
  const hour = gameTime.hour.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })
  const min = gameTime.minutes.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })
  
  return (
    <p className='timer'>{hour}:{min}</p>
  )
}