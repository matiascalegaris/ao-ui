import './inventory-frame.scss'


export default function InventoryFrame({children, contentStyles, styles, innerRef, ...otherProps}) {
  var topCornerspacer = {
    width: `13px`,
    height: `13px`
  }
  var bottomCornerSpacer = {
    width: `13px`,
    height: `10px`
  }
  return (
  <div className={'inventory-frame ' + styles}>
    <div className='frame-side-container left'>
        <div style={topCornerspacer}></div>
        <div className='frame-center'></div>
        <div style={topCornerspacer}></div>
    </div>
    <div className='frame-side-container right'>
      <div style={topCornerspacer}></div>
      <div className='frame-center right-image'></div>
      <div style={bottomCornerSpacer}></div>
    </div>
    <div className='frame-line-container top'>
        <img style={topCornerspacer} src={require(`../../../../../assets/frames/inventory/top-left.png`)} />
        <div className='frame-center image-top'></div>
        <img style={topCornerspacer} src={require(`../../../../../assets/frames/inventory/top-right.png`)} />
    </div>
    <div className='frame-line-container bottom'>
      <img style={bottomCornerSpacer} src={require(`../../../../../assets/frames/inventory/bottom-left.png`)} />
      <div className='frame-center image-bottom'></div>
      <img style={bottomCornerSpacer} src={require(`../../../../../assets/frames/inventory/bottom-right.png`)} />
    </div>
    <div className={'content ' + contentStyles} ref={innerRef} {...otherProps}>
        {children}
    </div>
  </div>
)}
