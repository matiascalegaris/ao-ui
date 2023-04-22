import { useTranslation } from 'react-i18next';
import AoButton from '../../../Common/ao-button/ao-button';
import ProgressBar from '../../../Common/ProgressBar/progress-bar';
import './exp-area.scss'

export default function ExpArea() {
  const { t } = useTranslation();
  return (
    <div className='exp-area'>
      <p className='name-line'>Osim</p>
      <span className='class-line'>
        <p className='class-and-level'>{t('user-class-and-level',{class:t('Druid'), level: 37})}</p>
        <AoButton styles='skill-button'><img src={require('../../../../assets/Icons/gameplay/ico_skillpoints.png')}/></AoButton>
      </span>
      <span className='exp-bar-container'>
        <ProgressBar styles='exp-bar-outer' barStyle='exp-bar-inner' currentVal={6999999} MaxValue={9999999} displayMax={true} />
      </span>
      <span className='time-bar'>
        <p className='timer'>00:00</p>
      </span>
    </div>
  )
}