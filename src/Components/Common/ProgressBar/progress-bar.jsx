import './progress-bar.scss'

export default function ProgressBar({styles, currentVal, MaxValue, displayMax, extraFill, barStyle, extraStyle}) {
  if (extraFill === undefined) {
    extraFill = 0
  }
  const progress = currentVal / (MaxValue+extraFill) * 100
  const extraSize = extraFill / (MaxValue+extraFill) * 100
  let displayText = displayMax ? `${currentVal} / ${MaxValue}` : `${currentVal}`
  if (extraFill > 0) {
    displayText += `+ ${extraFill}`
  }
  var progressStyle = { 
    width: `${progress}%`,
  };
  var bonusSize = {
    width: `${extraSize}%`
  }
  return (

    <div className={'progress-bar ' + styles}>
      <div className={'inner-bar ' + barStyle} style={progressStyle}></div>
      { extraFill > 0 ? <div className={'inner-bar ' + extraStyle} style={bonusSize}></div> : null }
      <div className='number'><p className='number-text'>{displayText}</p></div>
    </div>
  )

}