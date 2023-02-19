import React, {useState} from "react";
import './request-password-reset.scss'
import { useTranslation } from 'react-i18next';
import AoButton from '../../Common/ao-button/ao-button';
import AoInput from '../../Common/ao-input/ao-input';
import AoDialog from '../../Common/ao-dialog/ao-dialog';
import AoLinkButton from "../../Common/ao-button/ao-link-button/ao-link-button";
import { useDispatch } from 'react-redux';
import { setActiveDialog } from '../../../redux/UIFlowSlice'
import { ValidateEmail } from "../../../Tools/Utils";

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

  const emailValid = ValidateEmail(email)
  const sendEnabled = !(emailValid && email.length > 0)
  return (
    <AoDialog styles='request-password-reset login-dialog-pos'>
      <h1 className='dialog-header'>{t('recover pasword').toUpperCase()}</h1>
      <div className='content-area'>
        <p className='desc-text'>{t('recover-password-text')}</p>
        <span className="vertical-gap10"></span>
        <div className='named-input user'>
          <p className='name'>
            {t('email').toUpperCase()}
          </p>
          <AoInput name="email" type="email" value={email} IsValid={emailValid} required handleChange={handleChange} />
        </div>
        <span className="vertical-gap10"></span>
        <p className='desc-text info-text'>{t('recovery-mail-hint')}</p>
      </div>
      <div className='bottom-line'>
        <div className='line'>
          <AoButton className='split-area' styles='split-area' onClick={ returnToMain }>{t('cancel').toUpperCase()}</AoButton>
          <span className="horizontal-gap10"></span>
          <AoButton className='split-area' isRed={true} disabled={sendEnabled} styles='split-area'>{t('send').toUpperCase()}</AoButton>
        </div>
        <div className='line'>
          <AoLinkButton styles='links' onClick={validateCode} caption='I already have a recovery code' onclick={validateCode}/>
        </div>
      </div>
    </AoDialog>
  )
}