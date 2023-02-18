import React, {useState} from "react";
import './validate-code.scss'
import { useTranslation } from 'react-i18next';
import AoButton from '../../Common/ao-button/ao-button';
import AoInput from '../../Common/ao-input/ao-input';
import AoDialog from '../../Common/ao-dialog/ao-dialog';
import { useDispatch } from 'react-redux';
import { displayLoadingText, setActiveDialog } from '../../../redux/UIFlowSlice'
import { ValidValidationCode } from "../../../Tools/Utils";

export default function ValidateCode() {
  const [userCredentials, setCredentials] = useState({code:''});
  const {code } = userCredentials;
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const handleChange = event => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value});
  }

  const cancel = event => {
    event.preventDefault();
    dispatch(setActiveDialog('validate-account'));
  }

  const send = event => {
    event.preventDefault();
    dispatch(displayLoadingText(t('connecting-to-server')))
    window.parent.BabelUI.ValidatePrevCode(code);
  }
  const validCode = ValidValidationCode(code)
  return (
    <AoDialog styles='validate-code login-dialog-pos'>
      <h1 class='dialog-header'>{t('verification').toUpperCase()}</h1>
      <div class='content-area'>
        <p class='desc-text'>{t('Enter the validation code sent to the email you used for registering.')}</p>
        <div class='code-area'>
          <AoInput name="code" styles="code" value={code} IsValid={validCode || code.length === 0} required handleChange={handleChange} />
        </div>
      </div>
      <div class='bottom-line'>
          <div class='line'>
            <AoButton caption='cancel' styles='split-area' onClick={cancel}/>
            <AoButton caption='accept' disabled={!validCode} isRed={true} styles='split-area' onClick={send}/>
          </div>
      </div>
    </AoDialog>
  )
}