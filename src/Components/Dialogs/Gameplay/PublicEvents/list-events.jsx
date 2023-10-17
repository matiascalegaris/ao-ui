import { useTranslation } from "react-i18next";
import AoButton from "../../../Common/ao-button/ao-button"
import { useDispatch } from "react-redux";
import { setGameActiveDialog } from "../../../../redux/GameplaySlices/GameStateSlice";

export const EventList = ({activeEvents, createNew}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const onJoinEvent = lobby => {
    if (lobby.isPrivate) {
      const deleteItemAction = {
        popUp:'input-dialog',
        text: t('request-lobby-password'),
        actions: [{
          caption: t('cancel').toUpperCase(),
          action:  evt => {
            dispatch(setGameActiveDialog({
              popUp: 'public-events',
              eventList: activeEvents,
            }))
          }}, {
          caption: t('continue').toUpperCase(),
          action:  evt => {
            dispatch(setGameActiveDialog(null))
            window.parent.BabelUI.JoinLobby(lobby.id, evt)
          },
          isRed: true}
        ]
      }
      dispatch(setGameActiveDialog(deleteItemAction))
    }
    else {

    }
  }
  return (
    <div className='eventList-area'>
        <span className='event-line'>
          <div className='event-name'>{t('event-description')}</div>
          <div className='event-name'>{t('event-type')}</div>
          <div className='party-size center-text'>{t('group-size')}</div>
          <div className='party-size center-text'>{t('level-range')}</div>
          <div className='max-user center-text'>{t('max-players')}</div>
          <div className='inscription-price center-text'>{t('incription-price')}</div>
          <div className='action-button'></div>
        </span>
        <div className='event-list'>
          {
            activeEvents.map( el => (
              <span className='event-line' key={el.id}>
                { el.isPrivate && <img className="private-room" src={require('../../../../assets/Icons/inventory-extra/transparent-lock.png')}/> }
                <div className='event-name'>{el.Description}</div>
                <div className='event-name'>{el.eventType}</div>
                <div className='party-size center-text'>{el.groupSize} { el.groupType === 1 ? t('random') : t('premade')}</div>
                <div className='group-type center-text'>{el.minLevel}/{el.maxLevel}</div>
                <div className='max-user center-text'>{el.registeredPlayers}/{el.maxPlayers}</div>
                <div className='inscription-price center-text'>{el.inscriptionFee}</div>
                <AoButton styles='action-button' onClick={() => onJoinEvent(el)}>{t('join')}</AoButton>
              </span>
            ))
          }
        </div>
        <AoButton isRed={true} styles='action-button main-action-button' onClick={createNew}>{t('create-new').toLocaleUpperCase()}</AoButton>
      </div>
  )
}