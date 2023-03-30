import React, {useState} from "react";
import './validate-code.scss'
import { useTranslation } from 'react-i18next';
import AoButton from '../../Common/ao-button/ao-button';
import AoInput from '../../Common/ao-input/ao-input';
import AoDialog from '../../Common/ao-dialog/ao-dialog';
import { ValidValidationCode } from "../../../Tools/Utils";

export default function ValidateCode({styles, onCancel, onAccept}) {
  const [userCredentials, setCredentials] = useState({code:''});
  const {code } = userCredentials;
  const { t } = useTranslation();
  const handleChange = event => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value});
  }

  const send = event => {
    event.preventDefault();
    onAccept(code)
  }
  const validCode = ValidValidationCode(code)
  return (
    <AoDialog styles={'validate-code ' + styles}>
      <h1 class='dialog-header'>{t('verification').toUpperCase()}</h1>
      <div class='content-area'>
        <p class='desc-text'>{t('verification-code-input')}</p>
        <div class='code-area'>
          <AoInput name="code" styles="code" value={code} IsValid={validCode || code.length === 0} required handleChange={handleChange} />
        </div>
      </div>
      <div class='bottom-line'>
          <div class='line'>
            <AoButton styles='split-area' onClick={onCancel}>{t('cancel').toUpperCase()}</AoButton>
            <AoButton disabled={!validCode} isRed={true} styles='split-area' onClick={send}>{t('accept').toUpperCase()}</AoButton>
          </div>
      </div>
    </AoDialog>
  )
}