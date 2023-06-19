import './progress-bar.scss'

export default function ProgressBar({styles, currentVal, maxValue, displayMax, extraFill, barStyle, extraStyle, customText, ...otherProps}) {
  if (extraFill === undefined) {
    extraFill = 0
  }
  let safeMaxVal = maxValue
  if (safeMaxVal === 0) {
    safeMaxVal = currentVal
    if (safeMaxVal === 0) {
      safeMaxVal = 1
      currentVal = 1
    }
  }
  const progress = currentVal / (safeMaxVal+extraFill) * 100
  const extraSize = extraFill / (safeMaxVal+extraFill) * 100
  let displayText = displayMax ? `${currentVal} / ${safeMaxVal}` : `${currentVal}`
  if (extraFill > 0) {
    displayText += `+ ${extraFill}`
  }
  var progressStyle = { 
    width: `${progress}%`,
  };
  var bonusSize = {
    width: `${extraSize}%`
  }
  displayText = customText !== undefined ? customText : displayText
  return (
    <div className={'progress-bar ' + styles} {...otherProps}>
      {
        maxValue > 0 || customText ?
          <>
          <div className={'inner-bar ' + barStyle} style={progressStyle}></div>
          { extraFill > 0 ? <div className={'inner-bar ' + extraStyle} style={bonusSize}></div> : null }
          <div className='number'><p className='number-text'>{displayText}</p></div>
          </>
        : null
      }
      
    </div>
  )

}