import './login-flow.scss'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import CreateAccount from "../Dialogs/create-account/create-account";
import ValidateAccount from "../Dialogs/validate-account/validate-account";
import { selectActiveDialog, setActiveDialog } from '../../redux/UIFlowSlice'
import {RegisterApiCallback} from '../../Api/Api'
import RequestPasswordReset from '../Dialogs/request-password-reset/request-password-reset';
import CharacterSelectionScreen from '../Screens/CharacterSelection/CharacterSelectionScreen/character-selection';
import SetNewPassword from '../Dialogs/set-new-password/set-new-password';
import CreateCharacterScreen from '../Screens/CreateCharacter/create-character';
import ValidateCodeScreen from '../Dialogs/ValidateCodeScreen/validate-code-screen';
import GameplayScreen from '../Screens/Gameplay/gameplay-screen';
import { LoginScreen } from '../Screens/LogInScreen/login-screen';


export default function LogInFlow() {
  const activeDialog = useSelector(selectActiveDialog)
  const dispatch = useDispatch()
  useEffect(() => {
    RegisterApiCallback('SetActiveDialog', (dialog) => {
      dispatch(setActiveDialog(dialog))
    });
  },[]);
  return (
    <div className='login-flow'>
      {
        {
          'login':<LoginScreen/>,
          'create-account': <CreateAccount styles='login-dialog-pos'/>,
          'validate-account': <ValidateAccount styles='login-dialog-pos'/>,
          'validate-code': <ValidateCodeScreen styles='login-dialog-pos'/>,
          'reset-password-request': <RequestPasswordReset styles='login-dialog-pos' />,
          'character-selection': <CharacterSelectionScreen/>,
          'set-new-password': <SetNewPassword styles='login-dialog-pos'/>,
          'create-character': <CreateCharacterScreen/>,
          'gameplay':<GameplayScreen/>
        }
        [activeDialog]
      }
    </div>
  )
}