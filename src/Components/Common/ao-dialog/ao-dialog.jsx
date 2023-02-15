import './ao-dialog.scss'

export default function AoDialog({children, styles}) {
  return (
    <form className={'dialog-container ' + styles} autoComplete="off">
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
      
      <div className='frame-side-container left'>
        <div className='spacer'></div>
        <div className='frame-center left-img'></div>
        <div className='spacer'></div>
      </div>
      <div className='frame-side-container right'>
        <div className='spacer'></div>
        <div className='frame-center right-img'></div>
        <div className='spacer'></div>
      </div>
      <div className='content'>
        {children}
      </div>
      
    </form>
  )
}