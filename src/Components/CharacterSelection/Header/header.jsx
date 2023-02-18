import AoButton from '../../Common/ao-button/ao-button'
import './header.scss'

export default function Header() {
  return (
    <div className='header'>
      <div className='leather-frame'>
        <div className='top-leather'>
          <AoButton>
            <img className='logo' src={require('../../../assets/Icons/ico_arrow_back.png')} />
          </AoButton>
          <AoButton></AoButton>
        </div>
        <img className='top-long-frame' src={require('../../../assets/Misc/divider_horizontal_med.png')} />
      </div>
      <div className='logo-container'>
        <img className='logo' src={require('../../../assets/Misc/ao20_logo_med.png')} />
      </div>
    </div>
  )
}