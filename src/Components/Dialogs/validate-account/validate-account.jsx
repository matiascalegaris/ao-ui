import React, {useState} from "react";
import './validate-account.scss'
import { useTranslation } from 'react-i18next';
import AoButton from '../../Common/ao-button/ao-button';
import AoInput from '../../Common/ao-input/ao-input';
import AoDialog from '../../Common/ao-dialog/ao-dialog';
import { useDispatch } from 'react-redux';
import { setActiveDialog } from '../../../redux/UIFlowSlice'

export default function ValidateAccount() {
  const [userCredentials, setCredentials] = useState({email:'', code:''});
  const {email, code } = userCredentials;
  const { t } = useTranslation();
  const dispatch = useDispatch()

  const handleChange = event => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value});
  }

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
          <AoInput name="email" type="email" value={email} required handleChange={handleChange} />
        </div>
        <span className="vertical-gap10"></span>
        <div class='code-area'>
          <p class='code'>
            {t('validation code').toUpperCase()}
          </p>
          <span className="horizontal-gap10"></span>
          <AoInput name="code" value={code} required handleChange={handleChange} />
        </div>
      </div>
      <div class='bottom-line'>
          <div class='line'>
            <AoButton caption='cancel' styles='split-area'/>
            <span className="horizontal-gap10"></span>
            <AoButton caption='send' styles='split-area'/>
          </div>
      </div>
    </AoDialog>
  )
}