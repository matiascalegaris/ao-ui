import './cd-filler.scss'

export const CdFiller = ({percent}) => {
  const leftRotation = percent > 0.5 ? 0 : 180 - (360 * percent);
  const rightRotation = percent > 0.5 ?  360 - (percent * 360) : 180
  const leftStyle = {
    transformOrigin: 'right center',
    transform: `rotate(${leftRotation}deg)`
  }
  const rightStyle = {
    transformOrigin: 'left center',
    transform: `rotate(${rightRotation}deg)`
  }
  return (
  <div className='filler'>
    <span className='left-side'>
      <div className='filler-inside' style={leftStyle}></div>
    </span>
    <span className='right-side'>
      <div className='filler-inside' style={rightStyle}></div>
    </span>
  </div>
)}