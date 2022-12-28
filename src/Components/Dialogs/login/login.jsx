import React, {useState} from "react";
import './login.scss'
import { useTranslation } from 'react-i18next';
import AoButton from '../../Common/ao-button/ao-button';
import AoInput from '../../Common/ao-input/ao-input';
import AoDialog from '../../Common/ao-dialog/ao-dialog';
import AoCheckbox from "../../Common/ao-checkbox/ao-checkbox";

export default function LogIn({setNewDialog}) {
  const [userCredentials, setCredentials] = useState({email:'', password:''});
  const {email, password } = userCredentials;
  const { t } = useTranslation();

  const handleChange = event => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value});
  }
  const updateDialog = event => {
    event.preventDefault();
    setNewDialog('create-account')
  }
  return (
    <AoDialog styles='login-dialog-pos'>
      <h1 class='login-header'>{t('log in').toUpperCase()}</h1>
        <div class="input-area">
          <div class='named-input user'>
            <p class='name'>
              {t('email').toUpperCase()}
            </p>
            <AoInput name="email" type="email" value={email} required handleChange={handleChange} />
          </div>
          <div class='named-input password'>
            <p class='name'>
              {t('password').toUpperCase()}
            </p>
            <AoInput name="password" type="password" value={password} required handleChange={handleChange} />
          </div>
          <AoCheckbox label={t('Remember me')} styles='split-area right-padding'/>
          <AoButton caption='connect' styles='split-area red-bg'/>
      </div>
      <div class='bottom-line'>
        <AoButton caption='account' styles='split-area' onClick={ updateDialog }/>
        <AoButton caption='exit' styles='split-area'/>
      </div>
    </AoDialog>
  )
}