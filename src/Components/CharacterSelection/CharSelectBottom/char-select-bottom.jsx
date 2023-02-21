import { useTranslation } from 'react-i18next';
import LoginButton from '../LogInButton/login-button'
import './char-select-bottom.scss'

export default function CharSelectBottom() {
  const { t } = useTranslation();
  return (
    <div className='char-selection-bottom'>
      <div className='bottom-leather'></div>
      <div className='button-area'>
        <div className='bar-layer'>
          <div className='bar-img'></div>
        </div>
        <div className='button-layer'>
          <LoginButton isRed={true}>{t('create character').toUpperCase()}</LoginButton>
          <LoginButton isRed={true}>{t('play').toUpperCase()}</LoginButton>
        </div>
      </div>
    </div>
  )
}