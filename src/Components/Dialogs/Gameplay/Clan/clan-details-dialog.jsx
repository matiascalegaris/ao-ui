import { useState } from 'react'
import './clan-details-dialog.scss'
import AoDialog from '../../../Common/ao-dialog/ao-dialog'
import AoButton from '../../../Common/ao-button/ao-button'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { setGameActiveDialog } from '../../../../redux/GameplaySlices/GameStateSlice'
import { Actions } from '../../../../constants'

const Label = ({name, value}) => (
  <div key={name} className='label'>
    <span className='text'>{name}: </span>
    <span className='text'>{value}</span>
  </div>
)

export const ClanDetailsDialog = ({ guild }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const onClose = evt => {
    dispatch(setGameActiveDialog(null))
    window.parent.BabelUI.RequestAction(Actions.OpenClanDialog)
  }
  const onRequestJoin = e => {
    dispatch(setGameActiveDialog({
      popUp:'guild-request',
      details: guild
    }))
  }
  return (
    <AoDialog styles='clan-details-dialog' contentStyles='clan-details-content' ignoreAnimation={true}>
        <div className='details-box'>
          <p className='text-title'>{t('clan-information')}</p>
          <Label name={t('name')} value={guild.name}/>
          <Label name={t('founder')} value={guild.founderName}/>
          <Label name={t('creation-date')} value={guild.creationDate}/>
          <Label name={t('leader')} value={guild.leaderName}/>
          <Label name={t('members')} value={guild.memberCount}/>
          <Label name={t('alignment')} value={t(guild.aligment)}/>
          <Label name={t('clan-level')} value={guild.level}/>
          <div className='flag'/>
        </div>
        <AoButton styles='close-button' onClick={onClose}>
          <img src={require('../../../../assets/Icons/gameplay/ico_close.png')}></img>
        </AoButton>
        <label className='description-box text-title'>
          {t('Description')}
          <textarea 
            className='text-input'
            disabled
            value={guild.description}
          />
        </label>
        <AoButton caption='guardar' styles='guardar' onClick={onRequestJoin}>{t('request-admission').toUpperCase()}</AoButton>
    </AoDialog>
  )
}
