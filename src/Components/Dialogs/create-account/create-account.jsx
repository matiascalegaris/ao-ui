import React, {useState} from "react";
import './create-account.scss'
import { useTranslation } from 'react-i18next';
import AoButton from '../../Common/ao-button/ao-button';
import AoInput from '../../Common/ao-input/ao-input';
import AoDialog from '../../Common/ao-dialog/ao-dialog';
import AoLinkButton from "../../Common/ao-button/ao-link-button/ao-link-button";

export default function CreateAccount({setNewDialog}) {
  const [userCredentials, setCredentials] = useState({name:'', surname:'',email:'', password:'', validateField: ''});
  const {name, surname, email, password, validation } = userCredentials;
  const { t } = useTranslation();

  const handleChange = event => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value});
  }
  const returnToMain = event => {
    event.preventDefault();
    setNewDialog('login')
  }
  const validateAccount = event => {
    event.preventDefault();
    setNewDialog('validate-account')
  }
  const validateCode = event => {
    event.preventDefault();
    setNewDialog('validate-code')
  }
  return (
    <AoDialog styles='create-account login-dialog-pos'>
      <h1 class='header'>{t('create account').toUpperCase()}</h1>
        <div class="input-area">
        <div class='named-input name'>
            <p class='name'>
              {t('name').toUpperCase()}
            </p>
            <AoInput name="name" value={name} required handleChange={handleChange} />
          </div>
          <div class='named-input create-account surname'>
            <p class='name'>
              {t('surname').toUpperCase()}
            </p>
            <AoInput name="surname" value={surname} required handleChange={handleChange} />
          </div>
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
          <div class='named-input'>
            <p class='question'>
              {t('what is 5 + 9')}
            </p>
          </div>
          <div class='named-input'>          
            <AoInput name="validation" value={validation} required handleChange={handleChange} />
          </div>
      </div>
      <div class='bottom-line'>
        <div class='line'>
          <AoButton className='split-area' caption='cancel' styles='split-area'onClick={ returnToMain } />
          <AoButton className='split-area' caption='create account' styles='split-area red-bg'/>
        </div>
        <div class='line'>
          <AoLinkButton styles='links split-area' onClick={validateAccount} caption={t('Validate account')}/>
          <AoLinkButton styles='links split-area' onClick={validateCode} caption={t('Recover password')}/>
        </div>
      </div>
    </AoDialog>
  )
}