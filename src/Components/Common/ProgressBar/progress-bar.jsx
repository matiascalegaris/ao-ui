import './progress-bar.scss'

export default function ProgressBar({styles, currentVal, MaxValue, displayMax, barStyle}) {
  const progress = currentVal / MaxValue * 100
  const displayText = displayMax ? `${currentVal} / ${MaxValue}` : `${currentVal}`
  var progressStyle = { 
    width: `${progress}%`,
  };
  return (

    <div className={'progress-bar ' + styles}>
      <div className={'inner-bar ' + barStyle} style={progressStyle}></div>
      <div className='number'><p className='number-text'>{displayText}</p></div>
    </div>
  )

}