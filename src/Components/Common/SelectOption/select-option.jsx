import './select-option.scss'

export default function SelectOption({children, styles, contentStyles, selected, ...otherProps}) {
  let style = 'select-option-container '
  if (selected) {
    style += 'selected '
  }
  return (
    <div {...otherProps} className={style + styles} disabled={true}>
      <div className={'button-content ' + contentStyles}>{children}</div>
    </div>
  )
}