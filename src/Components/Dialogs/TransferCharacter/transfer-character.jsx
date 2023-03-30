import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { displayLoadingText, hidePopup } from '../../../redux/UIFlowSlice';
import { ValidateEmail } from '../../../Tools/Utils';
import AoButton from '../../Common/ao-button/ao-button';
import AoDialog from '../../Common/ao-dialog/ao-dialog'
import AoInput from '../../Common/ao-input/ao-input';
import './transfer-character.scss'

export default function TransferCharacter({styles, settings}) {
  const [currState, setState] = useState({email:''});
  const {email } = currState;
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const validEmail = ValidateEmail(email)

  const handleChange = event => {
    const { value, name } = event.target;
    setState({ ...currState, [name]: value});
  }
  const cancel = event => {
    event.preventDefault();
    dispatch(hidePopup());
  }

  const send = event => {
    event.preventDefault();
    dispatch(displayLoadingText(t('connecting-to-server')))
    window.parent.BabelUI.TransferCharacter(settings.index ,email);
  }
  return(
    <AoDialog styles={styles} ignoreAnimation={true}>
      <h1 class='dialog-header'>{t('transfer-character').toUpperCase()}</h1>
      <div class='content-area'>
        <p class='desc-text'>{t('dest-email')}</p>
        <div class='code-area'>
          <AoInput name="email" styles="code" value={email} IsValid={validEmail || email.length === 0} required handleChange={handleChange} />
        </div>
      </div>
      <div class='bottom-line'>
          <div class='line'>
            <AoButton styles='split-area' onClick={cancel}>{t('cancel').toUpperCase()}</AoButton>
            <AoButton disabled={!validEmail} isRed={true} styles='split-area' onClick={send}>{t('accept').toUpperCase()}</AoButton>
          </div>
      </div>
    </AoDialog>
  )
}