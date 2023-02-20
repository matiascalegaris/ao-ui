import React, {useState} from "react";
import './validate-account.scss'
import { useTranslation } from 'react-i18next';
import AoButton from '../../Common/ao-button/ao-button';
import AoInput from '../../Common/ao-input/ao-input';
import AoDialog from '../../Common/ao-dialog/ao-dialog';
import { useDispatch } from 'react-redux';
import { displayLoadingText, setActiveDialog } from '../../../redux/UIFlowSlice'
import { ValidateEmail, ValidValidationCode } from "../../../Tools/Utils";

export default function ValidateAccount() {
  const [userCredentials, setCredentials] = useState({email:'', code:''});
  const {email, code } = userCredentials;
  const { t } = useTranslation();
  const dispatch = useDispatch()

  const handleChange = event => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value});
  }
  const cancel = event => {
    event.preventDefault();
    dispatch(setActiveDialog('create-account'));
  }
  const resendCode = event => {
    event.preventDefault();
    window.parent.BabelUI.ResendValidationCode(email)
  }
  const validateCode = event => {
    event.preventDefault();
    dispatch(displayLoadingText(t('connecting-to-server')))
    window.parent.BabelUI.ValidateCode(email, code)
  }

  const validEmail = ValidateEmail(email)
  const validCode = ValidValidationCode(code)
  const buttonEnabled = validEmail && validCode
  return (
    <AoDialog styles='validate-account login-dialog-pos'>
      <h1 class='dialog-header'>{t('validate account').toUpperCase()}</h1>
      <div class='content-area'>
        <p class='desc-text'>{t('Enter the validation code sent to the email you used for registering.')}</p>
        <span className="vertical-gap10"></span>
        <div class='named-input user'>
          <p class='name'>
            {t('email').toUpperCase()}
          </p>
          <AoInput name="email" type="email" value={email} IsValid={validEmail || email.length === 0} required handleChange={handleChange} />
        </div>
        <span className="vertical-gap10"></span>
        <div class='code-area'>
          <p class='code'>
            {t('validation-code').toUpperCase()}
          </p>
          <span className="horizontal-gap10"></span>
          <AoInput name="code" value={code} IsValid={validCode || email.length === 0} required handleChange={handleChange} />
        </div>
      </div>
      <div class='bottom-line'>
          <div class='line'>
            <AoButton disabled={!validEmail || email.length === 0} styles='split-area' onClick={ resendCode }>{t('resend-code').toUpperCase()}</AoButton>
          </div>
          <div class='line'>
            <AoButton styles='split-area' onClick={ cancel }>{t('cancel').toUpperCase()}</AoButton>
            <span className="horizontal-gap10"></span>
            <AoButton isRed={true} disabled={!buttonEnabled} styles='split-area' onClick={ validateCode }>{t('send').toUpperCase()}</AoButton>
          </div>
      </div>
    </AoDialog>
  )
}