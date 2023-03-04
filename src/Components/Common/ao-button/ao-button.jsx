import './ao-button.scss'

export default function AoButton({children, styles, contentStyles, disabled, isRed, ...otherProps}) {
  let style = 'button-container '
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