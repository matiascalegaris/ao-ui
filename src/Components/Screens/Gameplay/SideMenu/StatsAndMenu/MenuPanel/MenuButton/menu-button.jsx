import AoButton from '../../../../../../Common/ao-button/ao-button'
import './menu-button.scss'

export default function MenuButton({icon,label, onClick}) {
  return (
  <div className='menu-button'>
    <AoButton styles='button' onClick={onClick}>  
      <img src={icon}/>
    </AoButton>
    <div className='label-container'>
      <p className='button-label'>{label}</p>
    </div>
  </div>)
}