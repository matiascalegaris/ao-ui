import './App.scss';
import Loading from './Components/Dialogs/Loading/loading';
import LogInFlow from './Components/Login-flow/login-flow';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoadingState, selectErrorMessage, displayErrorMessage } from './redux/UIFlowSlice'
import ErrorMessage from './Components/Dialogs/error-message/error-message';
import {RegisterApiCallback} from './Api/Api'
import { useTranslation } from 'react-i18next';

function App() {
  const dispatch = useDispatch()
  const { t } = useTranslation();
  useEffect(() => {
    RegisterApiCallback('ErrorMessage', (msg, localize, action) => {
      if (localize) {
        dispatch(displayErrorMessage(msg))
      }
      else {
        dispatch(displayErrorMessage(t(msg)))
      }
      
    })
  },[]);
  
  const [showLogin, loginMessage] = useSelector(selectLoadingState)
  const errorMsg = useSelector(selectErrorMessage)
  return (
    <div className='app'>
      <LogInFlow/>
      { showLogin &&
        <div class='popups'>
          <Loading styles='centered'>{loginMessage}</Loading>
        </div>
      }
      { errorMsg &&
        <div class='popups'>
          <ErrorMessage styles='centered'>{errorMsg}</ErrorMessage>
        </div>
      }
    </div>
  );
}

export default App;
