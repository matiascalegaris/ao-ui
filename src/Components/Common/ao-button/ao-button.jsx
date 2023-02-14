import './ao-button.scss'
import { useTranslation } from 'react-i18next';

export default function AoButton({caption, styles, disabled, isRed, ...otherProps}) {
  const { t } = useTranslation();
  console.log(caption)
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
      <p>{t(caption).toUpperCase()}</p>
    </div>
  )
}