import './framemap.scss'

export const FrameMap = ({children, contentStyles, styles}) => {
  var spacer = {
    width: `15px`,
    height: `15px`
  }
  return (
  <div className={'frame-map ' + styles}>
    <div className='frame-side-container frame-left'>
        <div style={spacer}></div>
        <div className='frame-center'></div>
        <div style={spacer}></div>
    </div>
    <div className='frame-side-container frame-right'>
      <div style={spacer}></div>
      <div className='frame-center right-image'></div>
      <div style={spacer}></div>
    </div>
    <div className='frame-line-container frame-top'>
        <img style={spacer} src={require(`../../../../../assets/frames/boxmap/topleft.png`)} className='corners' />
        <div className='frame-center image-top'></div>
        <img style={spacer} src={require(`../../../../../assets/frames/boxmap/topright.png`)} className='corners' />
    </div>
    <div className='frame-line-container frame-bottom'>
      <img style={spacer} src={require(`../../../../../assets/frames/boxmap/bottomleft.png`)} className='corners' />
      <div className='frame-center image-bottom'></div>
      <img style={spacer} src={require(`../../../../../assets/frames/boxmap/bottomright.png`)} className='corners' />
    </div>
    <div className={'frame-content ' + contentStyles}>
        {children}
    </div>
  </div>
)}