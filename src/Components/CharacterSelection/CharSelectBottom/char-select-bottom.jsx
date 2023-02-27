import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectSelectedCharacter } from '../../../redux/CharSelectionSlice';
import LoginButton from '../LogInButton/login-button'
import './char-select-bottom.scss'

export default function CharSelectBottom() {
  const { t } = useTranslation();
  const availableCharacters = useSelector(selectSelectedCharacter)
  return (
    <div className='char-selection-bottom'>
      <div className='character-details'>
        <div className='section-divider'></div>
        <div className='section-divider'>
          <div className='seleccion-detais'>
             <div className='details-border-left'></div>
             <div className='text-area'>
               { availableCharacters != null ? <p className='text'>{availableCharacters.name}</p> : null }
               { availableCharacters != null ? <p className='text'>{t('class', {className: t('Warrior')})}</p> : null }
               { availableCharacters != null ? <p>{t('level', { level:10})}</p> : null}
             </div>
             <div className='details-border-right'></div>
          </div>
        </div>
        <div className='section-divider'></div>
      </div>
      <div className='bottom-leather'>
      <div className='button-area'>
        <div className='bar-layer'>
          <div className='bar-img'></div>
        </div>
        <div className='button-layer'>
          <LoginButton>{t('create character').toUpperCase()}</LoginButton>
          <LoginButton isRed={true}>{t('play').toUpperCase()}</LoginButton>
        </div>
      </div>
      </div>
    </div>
  )
}