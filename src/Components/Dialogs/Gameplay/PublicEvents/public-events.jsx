import './public-events.scss'
import { useDispatch } from 'react-redux';
import AoButton from '../../../Common/ao-button/ao-button'
import AoDialog from '../../../Common/ao-dialog/ao-dialog'
import { setGameActiveDialog } from '../../../../redux/GameplaySlices/GameStateSlice';
import { useTranslation } from 'react-i18next';
import { EventList } from './list-events';

export const PublicEvents = ({activeEvents}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const onClose = e => {
    dispatch(setGameActiveDialog(null))
  }
  activeEvents = [{id: 1, eventType: 'Deathmatch', Description: 'prueba', groupSize:1, groupType:1, minLevel:1, maxLevel:47, minPlayers:1, maxPlayers:12, currentPlayers:0, inscriptionFee: 5430233},
                  {id: 1, eventType: 'Abordaje', Description: 'prueba 2', groupSize:6, groupType:2, minLevel:1, maxLevel:47, minPlayers:1, maxPlayers:12, currentPlayers:0, inscriptionFee: 5430233}]
  return (
    <AoDialog styles='event-list-dialog' contentStyles='content'>
      <div className='header-line'>
        <h1 className='game-dialog-header'>{t('event-list').toUpperCase()}</h1>
      </div>
      <span className='header-underline'></span>
      <AoButton styles='close-button' onClick={onClose}>
        <img src={require('../../../../assets/Icons/gameplay/ico_close.png')}></img>
      </AoButton>

      <EventList activeEvents={activeEvents}/>

      <AoButton isRed={true} styles='main-action-button'>{t('create-new').toLocaleUpperCase()}</AoButton>
    </AoDialog>
  )
}