import React, {useState} from "react";
import './set-new-password.scss'
import { useTranslation } from 'react-i18next';
import AoButton from '../../Common/ao-button/ao-button';
import AoInput from '../../Common/ao-input/ao-input';
import AoDialog from '../../Common/ao-dialog/ao-dialog';
import { useDispatch } from 'react-redux';
import { displayLoadingText, setActiveDialog } from '../../../redux/UIFlowSlice'
import { ValidateEmail, ValidatePassword, ValidResetPwdCode } from "../../../Tools/Utils";

export default function SetNewPassword() {
  const [userCredentials, setCredentials] = useState({email: '',password:'', passwordValidation:'', code:''});
  const {password, passwordValidation, code, email } = userCredentials;
  const { t } = useTranslation();
  const dispatch = useDispatch()
  
  const handleChange = event => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value});
  }

  const onCancel = event => {
    event.preventDefault();
    dispatch(setActiveDialog('login'));
  }

  const onAccept = event => {
    event.preventDefault();
    dispatch(displayLoadingText(t('connecting-to-server')))
    window.parent.BabelUI.NewPasswordRequest(email, code, password);
  }

  const validEmail = ValidateEmail(email)
  const validPassword = ValidatePassword(password)
  const validCode = ValidResetPwdCode(code)
  const validSecondPassword = password === passwordValidation
  const enableSend = validEmail && validSecondPassword && email.length > 0 && password.length > 0 && code.length > 0

  return (
    <AoDialog styles='set-new-password login-dialog-pos'>
      <h1 className='dialog-header'>{t('set new password').toUpperCase()}</h1>
      <div className='content-area'>
        <p className='desc-text'>{t('validation-code-intro')}</p>
        <div className="vertical-gap10"></div>
        <div className='code-area'>
          <p className='code'>
            {t('enter recovery code').toUpperCase()}
          </p>
          <AoInput name="code" value={code} IsValid={validCode}  required handleChange={handleChange} />
        </div>
        <div className="vertical-gap10"></div>
        <div className='named-input user'>
          <p className='name'>
            {t('email').toUpperCase()}
          </p>
          <AoInput name="email" type="email" value={email} IsValid={validEmail} required handleChange={handleChange} />
        </div>
        <div className="vertical-gap10"></div>
        <div className='named-input user'>
          <p className='name'>
            {t('new password').toUpperCase()}
          </p>
          <AoInput name="password" type="password" IsValid={validPassword} value={password} required handleChange={handleChange} />
        </div>
        <div className="vertical-gap10"></div>
        <div className='named-input user'>
          <p className='name'>
            {t('confirm new password').toUpperCase()}
          </p>
          <AoInput name="passwordValidation" type="password" value={passwordValidation} IsValid={validSecondPassword} required handleChange={handleChange} />
        </div>
        <div className="vertical-gap10"></div>
        <p className='desc-text info-text'>{t('password-requirements')}</p>
      </div>
      <div className='bottom-line'>
          <div className='line'>
            <AoButton styles='split-area' onClick={onCancel}>{t('cancel').toUpperCase()}</AoButton>
            <div className="horizontal-gap10"></div>
            <AoButton styles='split-area' onClick={onAccept} disabled={!enableSend} isRed={true}>{t('send').toUpperCase()}</AoButton>
          </div>
      </div>
    </AoDialog>
  )
}