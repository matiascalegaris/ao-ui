import AoButton from '../../Common/ao-button/ao-button'
import './header.scss'

export default function Header() {
  return (
    <div className='header'>
      <div className='leather-frame'>
        <div className='top-leather'>
          <AoButton styles='button'>
            <img className='icon' src={require('../../../assets/Icons/ico_arrow_back.png')} />
          </AoButton>
          <div className='spacer'></div>
          <AoButton styles='button'>
          <img className='icon' src={require('../../../assets/Icons/ico_close.png')} />
          </AoButton>
        </div>
        <div className='top-long-frame'></div>
      </div>
      <div className='logo-container'>
        <img className='logo' src={require('../../../assets/Misc/ao20_logo_med.png')} />
      </div>
    </div>
  )
}