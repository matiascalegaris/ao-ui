import { useSelector } from 'react-redux'
import { selectExitScreenActive } from '../../../redux/UIFlowSlice'
import './ao-dialog.scss'

export default function AoDialog({children, styles, contentStyles}) {
  const transitionActive = useSelector(selectExitScreenActive)
  
  let animStyles = ' dialog-intro-animation '
  if (transitionActive) {
    animStyles= ' dialog-exit-animation '
  }
  return (
    <form className={'dialog-container' + animStyles + styles} autoComplete="off">
      <div className='frame-side-container left'>
        <div className='corner-spacer'></div>
        <div className='left-img frame-center'></div>
        <div className='corner-spacer'></div>
      </div>
      <div className='frame-side-container right'>
        <div className='corner-spacer'></div>
        <div className='right-img frame-center'></div>
        <div className='corner-spacer'></div>
      </div>
      <div className='frame-line-container top'>
        <img className='frame-left-corner' src={require('../../../assets/frame/top-left.jpg')} />
        <img className='frame-center' src={require('../../../assets/frame/top-center.jpg')} />
        <img className='frame-right-corner' src={require('../../../assets/frame/top-right.jpg')} />
      </div>
      <div className='frame-line-container bottom'>
        <img className='frame-left-corner' src={require('../../../assets/frame/bottom-left.png')} />
        <img className='frame-center' src={require('../../../assets/frame/bottom-center.jpg')} />
        <img className='frame-right-corner' src={require('../../../assets/frame/bottom-right.jpg')} />
      </div>
      <div className={'content ' + contentStyles}>
        {children}
      </div>
      
    </form>
  )
}