import SelectOption from '../../../Common/SelectOption/select-option'
import AoButton from '../../../Common/ao-button/ao-button'
import './stats-and-menu.scss'

export default function StatsAndMenu ({styles}) {

  const onChange = opt => {

  }
  return (
    <div className='stats-menu-area'>
      <div className='button-line'>
        <AoButton styles='stats-opt-button'>{"stats".toUpperCase()}</AoButton>
        <AoButton styles='stats-opt-button'>{"menu".toUpperCase()}</AoButton>
      </div>
      <div className='content-area'>

      </div>
    </div>
  )
}