import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { displayLoadingText, setActiveDialog } from "../../../redux/UIFlowSlice";
import ValidateCode from "../validate-code/validate-code";


export default function ValidateCodeScreen({styles}) {
  const dispatch = useDispatch()
  const { t } = useTranslation();
  const cancel = event => {
    event.preventDefault();
    dispatch(setActiveDialog('validate-account'));
  }
  const send = code => {
    dispatch(displayLoadingText(t('connecting-to-server')))
    window.parent.BabelUI.ValidatePrevCode(code);
  }
  return (<ValidateCode styles='login-dialog-pos' onCancel={cancel} onAccept={send}/>)
}