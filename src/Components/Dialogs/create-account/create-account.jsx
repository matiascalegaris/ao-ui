import React, {useState} from "react";
import './create-account.scss'
import { useTranslation } from 'react-i18next';
import AoButton from '../../Common/ao-button/ao-button';
import AoInput from '../../Common/ao-input/ao-input';
import AoDialog from '../../Common/ao-dialog/ao-dialog';
import AoLinkButton from "../../Common/ao-button/ao-link-button/ao-link-button";
import { useDispatch } from 'react-redux';
import { setActiveDialog } from '../../../redux/UIFlowSlice'
import { GetRandomInt, ValidatePassword, ValidateEmail, ValidateRoboCode, ValidateString } from "../../../Tools/Utils";

export default function CreateAccount() {
  const [userCredentials, setCredentials] = useState({
    name:'',
    surname:'',
    email:'',
    password:'',
    validateField: '',
    validationParam1: GetRandomInt(10),
    validationParam2: GetRandomInt(10),
   });
  const {name, surname, email, password, validateField, validationParam1, validationParam2 } = userCredentials;
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const handleChange = event => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value});
  }
  const returnToMain = event => {
    event.preventDefault();
    dispatch(setActiveDialog('login'));
  }
  const validateAccount = event => {
    event.preventDefault();
    dispatch(setActiveDialog('validate-account'));
  }
  const validateCode = event => {
    event.preventDefault();
    dispatch(setActiveDialog('validate-code'));
  }
  const validName = ValidateString(name)
  const validSurName = ValidateString(surname)
  const validEmail = ValidateEmail(email)
  const validPassword = ValidatePassword(password)
  const validateRobotCode = ValidateRoboCode(validationParam1,validationParam2,validateField)
  const validForm = validName && validSurName && validEmail && validPassword && validateRobotCode
  return (
    <AoDialog styles='create-account login-dialog-pos'>
      <h1 class='dialog-header'>{t('create account').toUpperCase()}</h1>
        <div class="input-area">
        <div class='named-input name'>
            <p class='name'>
              {t('name').toUpperCase()}
            </p>
            <AoInput name="name" value={name} IsValid={validName} required handleChange={handleChange} />
          </div>
          <div class='named-input create-account surname'>
            <p class='name'>
              {t('surname').toUpperCase()}
            </p>
            <AoInput name="surname" value={surname} IsValid={validSurName} required handleChange={handleChange} />
          </div>
          <div class='named-input user'>
            <p class='name'>
              {t('email').toUpperCase()}
            </p>
            <AoInput name="email" type="email" IsValid={validEmail} value={email} required handleChange={handleChange} />
          </div>
          <div class='named-input password'>
            <p class='name'>
              {t('password').toUpperCase()}
            </p>
            <AoInput name="password" type="password" IsValid={validPassword} value={password} required handleChange={handleChange} />
          </div>
          <div class='named-input'>
            <p class='question'>
              {t('robot-code', {first:validationParam1, second: validationParam2})}
            </p>
          </div>
          <div class='named-input'>          
            <AoInput name="validateField" value={validateField} IsValid={validateRobotCode} required handleChange={handleChange} />
          </div>
      </div>
      <div class='bottom-line'>
        <div class='line'>
          <AoButton className='split-area' caption='cancel' styles='split-area'onClick={ returnToMain } />
          <AoButton className='split-area' caption='create account' isRed={true} disabled={!validForm} styles='split-area'/>
        </div>
        <div class='line'>
          <AoLinkButton styles='links split-area' onClick={validateAccount} caption={t('Validate account')}/>
          <AoLinkButton styles='links split-area' onClick={validateCode} caption={t('Recover password')}/>
        </div>
      </div>
    </AoDialog>
  )
}