import AoButton from '../../Common/ao-button/ao-button'
import AoDialog from '../../Common/ao-dialog/ao-dialog'
import './error-message.scss'
import { useDispatch } from 'react-redux';
import { hideErrorMessage } from '../../../redux/UIFlowSlice'


export default function ErrorMessage({children, styles}) {
  const dispatch = useDispatch()
  return (
    <AoDialog styles={'message ' + styles}>
      <div className='message'>
        {children}
      </div>
      <span className="vertical-gap10"></span>
      <div className='button-line'>
        <AoButton caption='accept' onClick={ ()=> dispatch(hideErrorMessage()) }></AoButton>
      </div>
    </AoDialog>
  )
}