import './App.scss';
import Loading from './Components/Dialogs/Loading/loading';
import LogInFlow from './Components/Login-flow/login-flow';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoadingState, selectErrorMessage, displayErrorMessage, displayLoading } from './redux/UIFlowSlice'
import ErrorMessage from './Components/Dialogs/error-message/error-message';
import {RegisterApiCallback} from './Api/Api'
import { useTranslation } from 'react-i18next';
import { setCharacter } from './redux/CharSelectionSlice';

function App() {
  const dispatch = useDispatch()
  const { t, i18n  } = useTranslation();
  useEffect(() => {
    RegisterApiCallback('ErrorMessage', (msg, localize, action) => {
      console.log('message:' + msg + ' ' + localize + '' + action )
      if (localize) {
        dispatch(displayErrorMessage(t(msg)))
      }
      else {
        dispatch(displayErrorMessage(msg))
      }
    })
    RegisterApiCallback('SetLoadingMessage', (msg, localize) => {
      if (localize) {
        dispatch(displayLoading(t(msg)))
      }
      else {
        dispatch(displayLoading(msg))
      }
    })
    RegisterApiCallback('SetCharacter', (charInfo) => {
      dispatch(setCharacter(charInfo))
    }) 
    const language = window.parent.BabelUI.GetStoredLocale()
    console.log("setting current language to:" + language)
    i18n.changeLanguage(language)
  },[]);
  
  const [showLogin, loginMessage] = useSelector(selectLoadingState)
  const errorMsg = useSelector(selectErrorMessage)
  return (
    <div className='app'>
      <LogInFlow/>
      { showLogin &&
        <div className='popups'>
          <Loading styles='centered'>{loginMessage}</Loading>
        </div>
      }
      { errorMsg &&
        <div className='popups'>
          <ErrorMessage styles='centered'>{errorMsg}</ErrorMessage>
        </div>
      }
    </div>
  );
}

export default App;
