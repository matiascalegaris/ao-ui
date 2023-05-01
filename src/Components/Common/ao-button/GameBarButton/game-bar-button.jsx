import './game-bar-button.scss'

export default function GameBarButton({children, styles, contentStyles, disabled, isRed, ...otherProps}) {
  let style = 'game-bar-button-container '
  if (isRed) {
    style += 'red-bg '
    if (disabled) {
      style += 'red-disabled '
    }
  }
  else if (disabled) {
    style += 'disabled '
  }
  return (
    <div {...otherProps} className={style + styles} disabled={true}>
      <div className={'button-content ' + contentStyles}>{children}</div>
    </div>
  )
}