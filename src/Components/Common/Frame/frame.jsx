import './frame.scss'

export default function Frame({children, contentStyles, sideSize}) {
  var spacer = {
    width: `${sideSize}px`,
    height: `${sideSize}px`
  }
  return (
  <div className='frame'>
    <div className='frame-side-container left'>
        <div style={spacer}></div>
        <div className='frame-center'></div>
        <div style={spacer}></div>
    </div>
    <div className='frame-side-container right'>
      <div style={spacer}></div>
      <div className='frame-center right-image'></div>
      <div style={spacer}></div>
    </div>
    <div className='frame-line-container top'>
        <img style={spacer} src={require(`../../../assets/frames/box/topleft.png`)} />
        <div className='frame-center image-top'></div>
        <img style={spacer} src={require(`../../../assets/frames/box/topright.png`)} />
    </div>
    <div className='frame-line-container bottom'>
      <img style={spacer} src={require(`../../../assets/frames/box/bottomleft.png`)} />
      <div className='frame-center image-bottom'></div>
      <img style={spacer} src={require(`../../../assets/frames/box/bottomright.png`)} />
    </div>
    <div className={'content ' + contentStyles}>
        {children}
    </div>
  </div>
)}