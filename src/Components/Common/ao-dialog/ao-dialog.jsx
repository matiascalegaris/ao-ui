import './ao-dialog.scss'

export default function AoDialog({children, styles}) {
  return (
    <form className={'dialog-container ' + styles} autoComplete="off">
      <img className='frame-top-left' src={require('../../../assets/frame/top-left.jpg')} />
      <img className='frame-top-right' src={require('../../../assets/frame/top-right.jpg')} />
      <img className='frame-bottom-left' src={require('../../../assets/frame/bottom-left.png')} />
      <img className='frame-bottom-right' src={require('../../../assets/frame/bottom-right.jpg')} />
      <img className='frame-center-top' src={require('../../../assets/frame/top-center.jpg')} />
      <img className='frame-center-left' src={require('../../../assets/frame/left-center.jpg')} />
      <img className='frame-center-right' src={require('../../../assets/frame/right-center.png')} />
      <img className='frame-center-bottom' src={require('../../../assets/frame/bottom-center.jpg')} />
      <div className='content'>
        {children}
      </div>
      
    </form>
  )
}