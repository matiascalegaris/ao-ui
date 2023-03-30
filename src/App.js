import './App.scss';
import Loading from './Components/Dialogs/Loading/loading';
import LogInFlow from './Components/Login-flow/login-flow';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { displayErrorMessage, displayLoading, selectActivePopup, selectPopupData } from './redux/UIFlowSlice'
import ErrorMessage from './Components/Dialogs/error-message/error-message';
import {RegisterApiCallback} from './Api/Api'
import { useTranslation } from 'react-i18next';
import { setCharacter } from './redux/CharSelectionSlice';
import OptionDialog from './Components/Dialogs/OptionDialog/option-dialog';
import ValidateCode from './Components/Dialogs/validate-code/validate-code';
import TransferCharacter from './Components/Dialogs/TransferCharacter/transfer-character';

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
  
  const activePopup = useSelector(selectActivePopup)
  const popupData = useSelector(selectPopupData)
  return (
    <div className='app'>
      <LogInFlow/>
      {
          activePopup !== '' ?
          <div className='popups'>
          {
            {
                'loading':<Loading styles='centered'>{popupData}</Loading>,
                'error-message':<ErrorMessage styles='centered'>{popupData}</ErrorMessage>,
                'option-dialog':<OptionDialog styles='centered' settings={popupData}/>,
                'validate-code':<ValidateCode styles='centered'/>,
                'transfer-character':<TransferCharacter styles='centered' settings={popupData}/>
            }
            [activePopup]
          }
          </div>
          :
          null
      }
    </div>
  );
}

export default App;
