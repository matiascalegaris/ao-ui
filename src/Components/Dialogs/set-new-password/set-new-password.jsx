import React, {useState} from "react";
import './set-new-password.scss'
import { useTranslation } from 'react-i18next';
import AoButton from '../../Common/ao-button/ao-button';
import AoInput from '../../Common/ao-input/ao-input';
import AoDialog from '../../Common/ao-dialog/ao-dialog';
import { useDispatch } from 'react-redux';
import { setActiveDialog } from '../../../redux/UIFlowSlice'

export default function SetNewPassword() {
  const [userCredentials, setCredentials] = useState({password:'', passwordValidation:'', code:''});
  const {password, passwordValidation, code } = userCredentials;
  const { t } = useTranslation();
  const dispatch = useDispatch()
  
  const handleChange = event => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value});
  }

  return (
    <AoDialog styles='set-new-password login-dialog-pos'>
      <h1 className='dialog-header'>{t('recover password').toUpperCase()}</h1>
      <div className='content-area'>
        <p className='desc-text'>{t('Enter the validation code sent to the email you used for registering.')}</p>
        <div className='code-area'>
          <p className='code'>
            {t('enter recovery code').toUpperCase()}
          </p>
          <AoInput name="code" value={code} required handleChange={handleChange} />
        </div>
        <div className='named-input user'>
          <p className='name'>
            {t('new password').toUpperCase()}
          </p>
          <AoInput name="password" type="password" value={password} required handleChange={handleChange} />
        </div>
        <div className='named-input user'>
          <p className='name'>
            {t('confirm new password').toUpperCase()}
          </p>
          <AoInput name="passwordValidation" type="password" value={passwordValidation} required handleChange={handleChange} />
        </div>
        <p className='desc-text info-text'>{t('password-requirements')}</p>
      </div>
      <div className='bottom-line'>
          <div className='line'>
            <AoButton caption='cancel' styles='split-area'/>
            <AoButton caption='send' styles='split-area'/>
          </div>
      </div>
    </AoDialog>
  )
}