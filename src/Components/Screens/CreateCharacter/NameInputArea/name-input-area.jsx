import { Trans, useTranslation } from 'react-i18next'
import AoInput from '../../../Common/ao-input/ao-input'
import './name-input-area.scss'

export default function NameInputArea ({currentName, onChange, styles}) {
  const { t } = useTranslation();
  return (
    <div className={'character-details' + styles}>
      <div className='section-divider'></div>
      <div className='section-divider'>
        <div className='seleccion-detais'>
          <div className='details-border-left'></div>
          <div className='details-box'>
          <div className='border-left'></div>
          <div className='text-area'>
            <p className='char-name-tittle'>{t('character name').toUpperCase()}</p>
            <AoInput styles='name-input' 
                    inputStyles='inner-input' 
                    name="name" type="name" 
                    IsValid={true} value={currentName} 
                    required handleChange={onChange}/>
            <p className='name-rules'><Trans i18nKey="rules-desc" count={1}>rules<span className='warning'>desc</span>.</Trans></p>
          </div>
          <div className='border-right'></div>
          </div>
          <div className='details-border-right'></div>
        </div>
      </div>
      <div className='section-divider'></div>
    </div>
  )
}