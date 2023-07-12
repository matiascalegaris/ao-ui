import React, {useState} from "react";
import './Settings.scss'
import { useTranslation } from 'react-i18next';
import AoButton from './Common/ao-button/ao-button';
import AoInput from './Common/ao-input/ao-input';
import AoDialog from "./Common/ao-dialog/ao-dialog";

export default function Settings() {
  const [userCredentials, setCredentials] = useState({email:''});
  const {email } = userCredentials;
  const { t } = useTranslation();

  const handleChange = event => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value});
  }

  return (
    <AoDialog>
      <h1 className='header'>{t('SETTINGS').toUpperCase()}</h1>
      <span className='tabSelection'>
        <h2 className='option'>{t('GAMEPLAY').toUpperCase()}</h2>
        <h2 className='option'>{t('VIDEO').toUpperCase()}</h2>
        <h2 className='option'>{t('AUDIO').toUpperCase()}</h2>
      </span>
      <AoInput name="email" type="text" value={email} required handleChange={handleChange} />
      <AoButton caption='guardar'/>
    </AoDialog>
  )
}