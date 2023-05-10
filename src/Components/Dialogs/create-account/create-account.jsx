import React, {useState} from "react";
import './create-account.scss'
import { useTranslation } from 'react-i18next';
import AoButton from '../../Common/ao-button/ao-button';
import AoInput from '../../Common/ao-input/ao-input';
import AoDialog from '../../Common/ao-dialog/ao-dialog';
import AoLinkButton from "../../Common/ao-button/ao-link-button/ao-link-button";
import { useDispatch } from 'react-redux';
import { setActiveDialog, displayLoadingText } from '../../../redux/UIFlowSlice'
import { GetRandomInt, ValidatePassword, ValidateEmail, ValidateRoboCode, ValidateString } from "../../../Tools/Utils";

export default function CreateAccount({styles}) {
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
  const passwordReset = event => {
    event.preventDefault();
    dispatch(setActiveDialog('reset-password-request'));
  }

  const createAccount = event => {
    event.preventDefault();
    dispatch(displayLoadingText(t('connecting-to-server')))
    window.parent.BabelUI.CreateAccount(email, password, name, surname);
  }
  const validName = ValidateString(name)
  const validSurName = ValidateString(surname)
  const validEmail = ValidateEmail(email)
  const validPassword = ValidatePassword(password)
  const validateRobotCode = ValidateRoboCode(validationParam1,validationParam2,validateField)
  const hasValues = name.length > 0 && surname.length > 0 && email.length > 0 && password.length > 0 && validateField.length > 0
  const validForm = hasValues && validName && validSurName && validEmail && validPassword && validateRobotCode
  return (
    <AoDialog styles={'create-account ' + styles}>
      <h1 className='dialog-header'>{t('create account').toUpperCase()}</h1>
        <div className="input-area">
        <div className='named-input name'>
            <p className='name'>
              {t('name').toUpperCase()}
            </p>
            <AoInput name="name" value={name} IsValid={validName} required handleChange={handleChange} />
          </div>
          <div className='named-input create-account surname'>
            <p className='name'>
              {t('surname').toUpperCase()}
            </p>
            <AoInput name="surname" value={surname} IsValid={validSurName} required handleChange={handleChange} />
          </div>
          <div className='named-input user'>
            <p className='name'>
              {t('email').toUpperCase()}
            </p>
            <AoInput name="email" type="email" IsValid={validEmail} value={email} required handleChange={handleChange} />
          </div>
          <div className='named-input password'>
            <p className='name'>
              {t('password').toUpperCase()}
            </p>
            <AoInput name="password" type="password" IsValid={validPassword} value={password} required handleChange={handleChange} />
          </div>
          <div className='named-input'>
            <p className='question'>
              {t('robot-code', {first:validationParam1, second: validationParam2})}
            </p>
          </div>
          <div className='named-input'>          
            <AoInput name="validateField" value={validateField} IsValid={validateRobotCode} required handleChange={handleChange} />
          </div>
      </div>
      <div className='bottom-line'>
        <div className='line'>
          <AoButton className='split-area' styles='split-area'onClick={ returnToMain }>{t('cancel').toUpperCase()}</AoButton>
          <span className="horizontal-gap10"></span>
          <AoButton className='split-area' isRed={true} disabled={!validForm} 
                    styles='split-area' onClick={createAccount}>
            {t('create account').toUpperCase()}
          </AoButton>
        </div>
        <span className="vertical-gap10"></span>
        <div className='line'>
          <AoLinkButton styles='split-area' onClick={validateAccount} caption={t('Validate account')}/>
          <span className="horizontal-gap10"></span>
          <AoLinkButton styles='split-area' onClick={passwordReset} caption={t('Recover password')}/>
        </div>
      </div>
    </AoDialog>
  )
}