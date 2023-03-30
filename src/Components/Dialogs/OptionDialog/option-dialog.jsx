import AoDialog from '../../Common/ao-dialog/ao-dialog'
import './option-dialog.scss'
import { useDispatch } from 'react-redux';
import { hideErrorMessage, setActivePopup } from '../../../redux/UIFlowSlice'
import { useTranslation } from 'react-i18next';
import AoButton from '../../Common/ao-button/ao-button';


export default function OptionDialog({styles, settings}) {
  return (
    <AoDialog styles={styles} ignoreAnimation={true}>
      <div className='option-dialog'>
        <div className='text'>
          {settings.text}
        </div>
        <span className="vertical-gap10"></span>
        <div className={'button-line ' + settings.optionStyle}>
          {
            settings.actions.map( (action, index) => (
              <AoButton styles={'button-settings'} key={index} isRed={action.isRed} onClick={action.action }>{action.caption}</AoButton>
            ))
          }
        </div>
      </div>
    </AoDialog>
  )
}