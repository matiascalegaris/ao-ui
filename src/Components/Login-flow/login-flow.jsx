import './login-flow.scss'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import LogIn from "../Dialogs/login/login";
import CreateAccount from "../Dialogs/create-account/create-account";
import ValidateAccount from "../Dialogs/validate-account/validate-account";
import ValidateCode from "../Dialogs/validate-code/validate-code";
import { selectActiveDialog, setActiveDialog } from '../../redux/UIFlowSlice'
import {RegisterApiCallback} from '../../Api/Api'


export default function LogInFlow() {
  const activeDialog = useSelector(selectActiveDialog)
  const dispatch = useDispatch()
  useEffect(() => {
    RegisterApiCallback('setActiveDialog', (dialog) => {
      dispatch(setActiveDialog(dialog))
    });
  },[]);
  return (
    <div className='login-flow'>
      {
        {
          'login':<LogIn/>,
          'create-account': <CreateAccount/>,
          'validate-account': <ValidateAccount/>,
          'validate-code': <ValidateCode />
        }
        [activeDialog]
      }
    </div>
  )
}