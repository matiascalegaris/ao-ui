import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectCharacter, selectSelectedCharacter } from '../../../redux/CharSelectionSlice';
import { selectExitScreenActive, setActiveDialog } from '../../../redux/UIFlowSlice';
import { GetColorForCharacterStatus, GetNameForClassId } from '../../../Tools/Utils';
import LoginButton from '../LogInButton/login-button'
import './char-select-bottom.scss'

export default function CharSelectBottom() {
  const { t } = useTranslation();
  const selectedCharacter = useSelector(selectSelectedCharacter)
  const loginEnabled = selectCharacter != null
  const nameColor = selectedCharacter ? GetColorForCharacterStatus(selectedCharacter.status) : ''
  const dispatch = useDispatch()
  const doLogin = character => {
    if (selectCharacter != null && selectCharacter.name != null) {
      window.parent.BabelUI.LoginCharacter(selectedCharacter.index)
      dispatch(setActiveDialog(''))
    }
  }
  const transitionActive = useSelector(selectExitScreenActive)
  let animStyles = ' char-select-bottom-intro-animation'
  if (transitionActive) {
    animStyles = ' char-select-bottom-exit-animation'
  }

  const createCharacter = event => {
    dispatch(setActiveDialog('create-character'))
    window.parent.BabelUI.SelectCharacter(-1)
  }
  return (
    <div className={'char-selection-bottom' + animStyles}>
      <div className='character-details'>
        <div className='section-divider'></div>
        <div className='section-divider'>
          <div className='seleccion-detais'>
             <div className='details-border-left'></div>
             <div className='details-box'>
             <div className='border-left'></div>
             <div className='text-area'>
               { selectedCharacter != null ? <p className={'text ' + nameColor}>{selectedCharacter.name}</p> : null }
               { selectedCharacter != null ? <p className='text'>{t('class', {className: t(GetNameForClassId(selectCharacter.class))})}</p> : null }
               { selectedCharacter != null ? <p className='text'>{t('level', { level: selectedCharacter.level})}</p> : null}
             </div>
             <div className='border-right'></div>
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
          <LoginButton onClick={createCharacter}>{t('create character').toUpperCase()}</LoginButton>
          <LoginButton disabled={!loginEnabled} isRed={true} onClick={doLogin}>{t('play').toUpperCase()}</LoginButton>
        </div>
      </div>
      </div>
    </div>
  )
}