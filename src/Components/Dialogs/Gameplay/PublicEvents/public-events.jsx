import './public-events.scss'
import { useDispatch } from 'react-redux';
import AoButton from '../../../Common/ao-button/ao-button'
import AoDialog from '../../../Common/ao-dialog/ao-dialog'
import { setGameActiveDialog } from '../../../../redux/GameplaySlices/GameStateSlice';
import { useTranslation } from 'react-i18next';
import { EventList } from './list-events';
import { useState } from 'react';
import { CreateEvent } from './create-event';

const EventMenuState = {
  ListEvents: 1,
  CreateEvent: 2
}
export const PublicEvents = ({activeEvents}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [dialogState, setDialogState] = useState({displayState:EventMenuState.ListEvents})
  const { displayState } = dialogState
  const onClose = e => {
    dispatch(setGameActiveDialog(null))
  }
  if (process.env.NODE_ENV === 'development') {
    activeEvents = [{ index: 0, id: 1, eventType: 'Deathmatch', description: 'partida de uff al sudar', groupSize:1, groupType:1, minLevel:1, maxLevel:47, minPlayers:1, maxPlayers:12, registeredPlayers:0, inscriptionFee: 5430233, isPrivate:false},
                    { index: 1, id: 2, eventType: 'Abordaje', description: 'prueba 2', groupSize:6, groupType:2, minLevel:1, maxLevel:47, minPlayers:1, maxPlayers:12, registeredPlayers:0, inscriptionFee: 5430233, isPrivate:true}]
  }
  const createNewEvent = evt => {
    setDialogState({...dialogState, displayState: EventMenuState.CreateEvent})
  }
  return (
    <AoDialog styles='event-list-dialog' contentStyles='content'>
      <div className='header-line'>
        <h1 className='game-dialog-header'>{ displayState === EventMenuState.ListEvents ? t('event-list').toUpperCase() : t('create-event').toUpperCase()}</h1>
      </div>
      <span className='header-underline'></span>
      <AoButton styles='close-button' onClick={onClose}>
        <img src={require('../../../../assets/Icons/gameplay/ico_close.png')}></img>
      </AoButton>
      {
        displayState === EventMenuState.ListEvents ? <EventList activeEvents={activeEvents} createNew={createNewEvent}/> : <CreateEvent/>
      }
      
    </AoDialog>
  )
}