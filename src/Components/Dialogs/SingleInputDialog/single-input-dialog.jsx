import React, {useState} from "react";
import './single-input-dialog.scss'
import { useTranslation } from 'react-i18next';
import AoButton from '../../Common/ao-button/ao-button';
import AoInput from '../../Common/ao-input/ao-input';
import AoDialog from '../../Common/ao-dialog/ao-dialog';

export default function SingleInputDialog({styles, settings}) {
  const [text, setText] = useState('');
  const { t } = useTranslation();
  const handleChange = event => {
    const { value } = event.target;
    setText(value);
  }

  const send = event => {
    event.preventDefault();
    settings.onAccept(text)
  }
  const handleKeyUp = event => {
    
    if (event.key === 'Enter' ) {
      settings.onAccept(text)
    }    
  }
  const validCode = true
  return (
    <AoDialog styles={'input-dialog ' + styles}>
      <h1 className='dialog-header'>{t('verification').toUpperCase()}</h1>
      <div className='content-area'>
        <p className='desc-text'>{settings.text}</p>
        <div className='code-area'>
          <AoInput name="code" 
                   styles="code" value={text} 
                   IsValid={validCode || text.length === 0} 
                   autoFocus 
                   required 
                   onKeyUp={handleKeyUp}
                   handleChange={handleChange} />
        </div>
      </div>
      <div className='bottom-line'>
          <div className='line'>
            <AoButton styles='split-area' onClick={settings.onCancel}>{t('cancel').toUpperCase()}</AoButton>
            <div className="horizontal-gap10"></div>
            <AoButton disabled={!validCode} isRed={true} styles='split-area' onClick={send}>{t('accept').toUpperCase()}</AoButton>
          </div>
      </div>
    </AoDialog>
  )
}