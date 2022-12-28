import './ao-button.scss'
import { useTranslation } from 'react-i18next';

export default function AoButton({caption, styles, ...otherProps}) {
  const { t } = useTranslation();
  console.log(caption)
  return (
    <div {...otherProps} className={'button-container ' + styles} >
      <p>{t(caption).toUpperCase()}</p>
    </div>
  )
}