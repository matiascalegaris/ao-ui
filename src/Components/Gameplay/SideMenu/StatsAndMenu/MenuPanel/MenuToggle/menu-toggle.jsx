import AoButton from '../../../../../Common/ao-button/ao-button'
import './menu-toggle.scss'

const getIconForStatus = status => {
  if (status) {
    return require('../../../../../../assets/Icons/gameplay/ico_check_green.png')
  }
  else {
    return require('../../../../../../assets/Icons/gameplay/ico_cross_red.png')
  }
}
export default function MenuToggle({children, status}){
  return (
    <div className='menu-toggle'>
      <AoButton styles='button'>
        {children}
      </AoButton>
      <img className='status' src={getIconForStatus(status)}/>
    </div>
  )

}