import './frame.scss'

export default function Frame({children, contentStyles, styles}) {
  var spacer = {
    width: `9px`,
    height: `9px`
  }
  return (
  <div className={'frame ' + styles}>
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
        <img style={spacer} src={require(`../../../assets/frames/box/topleft.png`)} />
        <div className='frame-center image-top'></div>
        <img style={spacer} src={require(`../../../assets/frames/box/topright.png`)} />
    </div>
    <div className='frame-line-container frame-bottom'>
      <img style={spacer} src={require(`../../../assets/frames/box/bottomleft.png`)} />
      <div className='frame-center image-bottom'></div>
      <img style={spacer} src={require(`../../../assets/frames/box/bottomright.png`)} />
    </div>
    <div className={'frame-content ' + contentStyles}>
        {children}
    </div>
  </div>
)}