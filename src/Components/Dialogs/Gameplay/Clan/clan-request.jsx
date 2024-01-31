import './clan-details-dialog.scss'
import AoDialog from "../../../Common/ao-dialog/ao-dialog"
import { useTranslation } from 'react-i18next'
import AoButton from '../../../Common/ao-button/ao-button'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setGameActiveDialog } from '../../../../redux/GameplaySlices/GameStateSlice'

export const ClanRequest = ({guildDetails}) => {
  const {t} = useTranslation()
  const [ requestValue, setRequestValue] = useState('')
  const dispatch = useDispatch()
  const onClose = evt => {
    dispatch(setGameActiveDialog({
      popUp:'guild-detail',
      details: guildDetails
    }))
  }

  const onSendRequest = e => {
    dispatch(setGameActiveDialog(null))
    window.parent.BabelUI.SendGuildRequest(guildDetails.name, requestValue)
  }
  return (
    <AoDialog styles='clan-details-dialog' contentStyles='clan-details-content' ignoreAnimation={true}>
      <p className='join-guild-text'>{t('long-clan-request-text')}</p>
      <AoButton styles='close-button' onClick={onClose}>
        <img src={require('../../../../assets/Icons/gameplay/ico_close.png')}></img>
      </AoButton>
      <label className='description-box text-title'>
          {t('admission-application')}
          <textarea 
            className='text-input'
            value={requestValue}
            onChange={e => setRequestValue(e.target.value)}
          />
        </label>
        <AoButton caption='guardar' styles='guardar' onClick={onSendRequest}>{t('send-request').toUpperCase()}</AoButton>
    </AoDialog>
  )
}