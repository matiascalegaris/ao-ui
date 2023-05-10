import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectCharacterClass, selectCharacterExp, selectCharacterLevel, selectCharacterName, selectGameTime } from '../../../../redux/GameplaySlices/CharacterInfoSlice';
import AoButton from '../../../Common/ao-button/ao-button';
import ProgressBar from '../../../Common/ProgressBar/progress-bar';
import './exp-area.scss'

export default function ExpArea() {
  const { t } = useTranslation();
  const charName = useSelector(selectCharacterName)
  const className = useSelector(selectCharacterClass)
  const userLevel = useSelector(selectCharacterLevel)
  const expBar = useSelector(selectCharacterExp)
  const gameTime = useSelector(selectGameTime)
  return (
    <div className='exp-area'>
      <p className='name-line'>{charName}</p>
      <span className='class-line'>
        <p className='class-and-level'>{t('user-class-and-level',{class:t(className), level: userLevel})}</p>
        <AoButton styles='skill-button'><img src={require('../../../../assets/Icons/gameplay/ico_skillpoints.png')}/></AoButton>
      </span>
      <span className='exp-bar-container'>
        <ProgressBar styles='exp-bar-outer' barStyle='exp-bar-inner' currentVal={expBar.min} MaxValue={expBar.max} displayMax={true} />
      </span>
      <span className='time-bar'>
        <p className='timer'>{gameTime}</p>
      </span>
    </div>
  )
}