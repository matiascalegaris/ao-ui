import './Settings.scss'
import { useTranslation } from 'react-i18next';
import AoButton from './Common/ao-button/ao-button';

export default function Settings() {
  const { t } = useTranslation();
  return (
    <div className='container'>
      <h1 className='header'>{t('SETTINGS').toUpperCase()}</h1>
      <span className='tabSelection'>
        <h2 className='option'>{t('GAMEPLAY').toUpperCase()}</h2>
        <h2 className='option'>{t('VIDEO').toUpperCase()}</h2>
        <h2 className='option'>{t('AUDIO').toUpperCase()}</h2>
      </span>
      <AoButton caption='guardar'/>
    </div>
  )
}