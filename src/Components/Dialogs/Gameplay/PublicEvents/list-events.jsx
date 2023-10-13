import { useTranslation } from "react-i18next";
import AoButton from "../../../Common/ao-button/ao-button"

export const EventList = ({activeEvents}) => {
  const { t } = useTranslation();
  return (
    <div className='eventList-area'>
        <span className='event-line'>
          <div className='event-name'>{t('event-description')}</div>
          <div className='event-name'>{t('event-type')}</div>
          <div className='party-size'>{t('group-size')}</div>
          <div className='group-type'>{t('premade')}</div>
          <div className='max-user'>{t('max-players')}</div>
          <div className='inscription-price'>{t('incription-price')}</div>
          
        </span>
        <div className='event-list'>
          {
            activeEvents.map( el => (
              <span className='event-line' key={el.id}>
                <div className='event-name'>{el.Description}</div>
                <div className='event-name'>{el.eventType}</div>
                <div className='party-size'>{el.groupSize}</div>
                <div className='group-type'>{el.groupType}</div>
                <div className='max-user'>{el.currentPlayers}/{el.maxPlayers}</div>
                <div className='inscription-price'>{el.inscriptionFee}</div>
                <AoButton>{t('join')}</AoButton>
              </span>
            ))
          }
        </div>
      </div>
  )
}