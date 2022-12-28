import React, {useState} from "react";
import './login-flow.scss'
import LogIn from "../Dialogs/login/login";
import CreateAccount from "../Dialogs/create-account/create-account";
import ValidateAccount from "../Dialogs/validate-account/validate-account";
import ValidateCode from "../Dialogs/validate-code/validate-code";

export default function LogInFlow() {
  const [state, setState] = useState({activeDialog:'login'});
  const {activeDialog} = state;

  const changeDialog = newDialog => {
    setState({activeDialog: newDialog})
  }

  return (
    <div class='login-flow'>
      {
        {
          'login':<LogIn setNewDialog={changeDialog}/>,
          'create-account': <CreateAccount setNewDialog={changeDialog}/>,
          'validate-account': <ValidateAccount setNewDialog={changeDialog}/>,
          'validate-code': <ValidateCode setNewDialog={changeDialog}/>
        }
        [activeDialog]
      }
    </div>
  )
}