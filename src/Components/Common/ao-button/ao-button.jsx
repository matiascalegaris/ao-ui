import './ao-button.scss'
import { useTranslation } from 'react-i18next';

export default function AoButton({caption}) {
  const { t } = useTranslation();
  console.log(caption)
  return (
    <div className='button-container'>
      {t(caption).toUpperCase()}
    </div>
  )
}