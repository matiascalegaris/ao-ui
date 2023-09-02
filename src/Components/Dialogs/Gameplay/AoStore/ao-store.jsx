import './ao-store.scss'
import AoDialog from "../../../Common/ao-dialog/ao-dialog"
import AoButton from '../../../Common/ao-button/ao-button'
import AoInput from '../../../Common/ao-input/ao-input';
import { useDispatch } from 'react-redux'
import { setGameActiveDialog } from '../../../../redux/GameplaySlices/GameStateSlice'
import { useTranslation } from 'react-i18next'
import { useState } from 'react';
import Frame from '../../../Common/Frame/frame';

export const AoStore = ({settings}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const [ dialogState, setDialogState] = useState({search:''})
  const { search } = dialogState;
  const onClose = e => {
    dispatch(setGameActiveDialog(null))
  }
  const handleChange = event => {
    const { value, name } = event.target;
    setDialogState({ ...dialogState, [name]: value});
  }
  return (
    <AoDialog styles='ao-shop' contentStyles='content'>
      <div className='header-line'>
        <img src={require('../../../../assets/Icons/Dialogs/AOShopIcon.png')}/>
        <h1 className='game-dialog-header'>{t('ao-shop').toUpperCase()}</h1>
      </div>
      <span className='header-underline'></span>
      <AoButton styles='close-button' onClick={onClose}>
        <img src={require('../../../../assets/Icons/gameplay/ico_close.png')}></img>
      </AoButton>
      <div className='search-area'>
        <div className='search-bar'>
          <p className='search-text'>{t('search')}</p>
          <AoInput styles='search-input' name="search" value={search} IsValid={true} required handleChange={handleChange} />
        </div>
        <div className='credit-area'>
          <p className='cretis-text'>{t('credits')}</p>
          <p className='cretis-text'>{settings.availableCredits}</p>
        </div>
      </div>
      <div className='item-selection-area'>
        <Frame styles='item-list-frame'>
        </Frame>
        <Frame styles='item-preview-frame'>
        </Frame>
         
      </div>
      <div className='button-line'>

      </div>
    </AoDialog>
)}