import { CircularProgressbar } from 'react-circular-progressbar'
import './cooldown-indicator.scss'

export const CooldownIndicator = () => {
  const progress = 75.0
  return (
    <div className='progress-filler-style'>
      <CircularProgressbar value={progress} strokeWidth={100}/>
    </div>
  )
}