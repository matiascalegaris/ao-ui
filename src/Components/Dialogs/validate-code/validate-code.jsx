import React, {useState} from "react";
import './validate-code.scss'
import { useTranslation } from 'react-i18next';
import AoButton from '../../Common/ao-button/ao-button';
import AoInput from '../../Common/ao-input/ao-input';
import AoDialog from '../../Common/ao-dialog/ao-dialog';
import { useDispatch } from 'react-redux';
import { setActiveDialog } from '../../../redux/UIFlowSlice'

export default function ValidateCode() {
  const [userCredentials, setCredentials] = useState({code:''});
  const {code } = userCredentials;
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const handleChange = event => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value});
  }

  return (
    <AoDialog styles='validate-code login-dialog-pos'>
      <h1 class='dialog-header'>{t('verification').toUpperCase()}</h1>
      <div class='content-area'>
        <p class='desc-text'>{t('Enter the validation code sent to the email you used for registering.')}</p>
        <div class='code-area'>
          <AoInput name="code" styles="code" value={code} required handleChange={handleChange} />
        </div>
      </div>
      <div class='bottom-line'>
          <div class='line'>
            <AoButton caption='cancel' styles='split-area'/>
            <AoButton caption='accept' styles='split-area'/>
          </div>
      </div>
    </AoDialog>
  )
}