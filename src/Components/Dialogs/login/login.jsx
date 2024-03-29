import React, {useState, useEffect} from "react";
import './login.scss'
import { useTranslation } from 'react-i18next';
import AoButton from '../../Common/ao-button/ao-button';
import AoInput from '../../Common/ao-input/ao-input';
import AoDialog from '../../Common/ao-dialog/ao-dialog';
import AoCheckbox from "../../Common/ao-checkbox/ao-checkbox";
import { useDispatch, useSelector } from 'react-redux';
import { setActiveDialog, displayLoadingText, updateEndpoint, selectActiveEndPoint } from '../../../redux/UIFlowSlice'
import { ValidateEmail, ValidatePassword } from "../../../Tools/Utils";
import Select from 'react-select';
import { clearCharList } from "../../../redux/CharSelectionSlice";

const ServerOptions = [
  { value: 'Localhost', label: 'Localhost', index: 0},
  { value: 'LocalHostPymmo', label: 'LocalHostPymmo', index: 1},
  { value: 'Staging', label: 'Staging', index: 2},
  { value: 'Production', label: 'Production', index: 3}
]
export default function LogIn({styles}) {
  const [userCredentials, setCredentials] = useState({email:'', password:'', storeCredentials:false});
  const {email, password, storeCredentials } = userCredentials;
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const displayServerSelection = window.parent.BabelUI.EnableDebug()
  const selectedServerIndex = useSelector(selectActiveEndPoint)
  const serverOption = ServerOptions[selectedServerIndex]
  useEffect(() => {
    const credentials = window.parent.BabelUI.GetCredentials()
    if (credentials.user.length > 0 || credentials.password.length > 0) {
      setCredentials({ ...userCredentials, 
        storeCredentials: true,
        email: credentials.user,
        password: credentials.password});  
    }
    window.parent.BabelUI.SetHost(serverOption.value)
  },[]);
  const handleChange = event => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value});
  }

  const rememberLogin = event => {
    setCredentials({ ...userCredentials, storeCredentials: !storeCredentials});
  }
  const updateDialog = event => {
    event.preventDefault();
    dispatch(setActiveDialog('create-account'));
  }
  const DoLogin = event => {
    event.preventDefault();
    dispatch(clearCharList())
    dispatch(displayLoadingText(t('connecting-to-server')))
    window.parent.BabelUI.Login(email, password, storeCredentials);
  }

  const SelectServer = event => {  
    window.parent.BabelUI.SetHost(event.value)
    dispatch(updateEndpoint(event.index))
  }

  const DoClose = event => {
    event.preventDefault();
    window.parent.BabelUI.CloseClient();
  }
  const validUser = ValidateEmail(email)
  const validPwd = ValidatePassword(password)
  const enableLogin = validUser && validPwd && email.length > 0 && password.length > 0
  return (
    <AoDialog styles={styles}>
      <h1 className='login-header'>{t('log in').toUpperCase()}</h1>
        <div className="input-area">
          <div className='named-input user'>
            <p className='name'>
              {t('email').toUpperCase()}
            </p>
            <AoInput name="email" type="text" IsValid={validUser} value={email} required handleChange={handleChange} />
          </div>
          <div className='named-input password'>
            <p className='name'>
              {t('password').toUpperCase()}
            </p>
            <AoInput name="password" IsValid={validPwd} type="password" value={password} required handleChange={handleChange} />
          </div>
          <AoCheckbox label={t('Remember me')} name="storeCredentials" styles='split-area right-padding' handleChange={rememberLogin} state={storeCredentials} />
          <AoButton styles='split-area' isRed={true} disabled={!enableLogin}  onClick={ DoLogin }>{t('connect').toUpperCase()}</AoButton>
      </div>
      {
        displayServerSelection && <Select unstyled className="server-selector" classNamePrefix='selector-prop' options={ServerOptions} value={serverOption} onChange={SelectServer}  />
      }
      <div className='bottom-line'>
        <AoButton styles='split-area' onClick={ updateDialog }>{t('account').toUpperCase()}</AoButton>
        <span className="horizontal-gap10"></span>
        <AoButton styles='split-area' onClick={ DoClose }>{t('exit').toUpperCase()}</AoButton>
      </div>
    </AoDialog>
  )
}