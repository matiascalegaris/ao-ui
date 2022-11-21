import './Settings.scss'
import { useTranslation } from 'react-i18next';

export default function Settings() {
  const { t } = useTranslation();
  return (
    <div className='container'>
      <h1 className='header'>{t('SETTINGS')}</h1>
      <span className='tabSelection'>
        <h2 className='option'>{t('GAMEPLAY')}</h2>
        <h2 className='option'>{t('VIDEO')}</h2>
        <h2 className='option'>{t('AUDIO')}</h2>
      </span>
    </div>
  )
}