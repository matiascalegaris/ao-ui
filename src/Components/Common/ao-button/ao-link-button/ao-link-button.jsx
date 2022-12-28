import './ao-link-button.scss'
import { useTranslation } from 'react-i18next';

export default function AoLinkButton({caption, styles, ...otherProps}) {
  const { t } = useTranslation();
  console.log(caption)
  return (
    <p {...otherProps} className={'link-button ' + styles} >
      {t(caption)}
    </p>
  )
}