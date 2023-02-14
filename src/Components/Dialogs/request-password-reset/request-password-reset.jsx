import React, {useState} from "react";
import './request-password-reset.scss'
import { useTranslation } from 'react-i18next';
import AoButton from '../../Common/ao-button/ao-button';
import AoInput from '../../Common/ao-input/ao-input';
import AoDialog from '../../Common/ao-dialog/ao-dialog';
import AoLinkButton from "../../Common/ao-button/ao-link-button/ao-link-button";
import { useDispatch } from 'react-redux';
import { setActiveDialog } from '../../../redux/UIFlowSlice'

export default function RequestPasswordReset() {
  const [userCredentials, setCredentials] = useState({email:''});
  const {email} = userCredentials;
  const { t } = useTranslation();
  const dispatch = useDispatch()

  const handleChange = event => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value});
  }
  const validateCode = event => {
    event.preventDefault();
    dispatch(setActiveDialog('validate-code'));
  }
  const returnToMain = event => {
    event.preventDefault();
    dispatch(setActiveDialog('create-account'));
  }

  return (
    <AoDialog styles='request-password-reset login-dialog-pos'>
      <h1 class='dialog-header'>{t('recover pasword').toUpperCase()}</h1>
      <div class='content-area'>
        <p class='desc-text'>{t('recover-password-text')}</p>
        <div class='named-input user'>
          <p class='name'>
            {t('email').toUpperCase()}
          </p>
          <AoInput name="email" type="email" value={email} required handleChange={handleChange} />
        </div>
        <p class='desc-text info-text'>{t('recovery-mail-hint')}</p>
      </div>
      <div class='bottom-line'>
        <div class='line'>
          <AoButton className='split-area' caption='cancel' styles='split-area' onClick={ returnToMain } />
          <AoButton className='split-area' caption='create account' isRed={true} disabled={true} styles='split-area'/>
        </div>
        <div class='line'>
          <AoLinkButton styles='links' onClick={validateCode} caption='I already have a recovery code'/>
        </div>
      </div>
    </AoDialog>
  )
}