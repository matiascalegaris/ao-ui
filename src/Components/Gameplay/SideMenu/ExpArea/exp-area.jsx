import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectCharacterClass, selectCharacterExp, selectCharacterLevel, selectCharacterName, selectGameTime } from '../../../../redux/GameplaySlices/CharacterInfoSlice';
import AoButton from '../../../Common/ao-button/ao-button';
import ProgressBar from '../../../Common/ProgressBar/progress-bar';
import './exp-area.scss'
import { Actions, classList } from '../../../../constants';

export default function ExpArea() {
  const { t } = useTranslation();
  const charName = useSelector(selectCharacterName)
  const className = classList[useSelector(selectCharacterClass)]
  const userLevel = useSelector(selectCharacterLevel)
  const expBar = useSelector(selectCharacterExp)
  const gameTime = useSelector(selectGameTime)
  const expBarText = expBar.max === 0 ? t('max-level-exp') : undefined;
  const openStats = evt => {
    window.parent.BabelUI.RequestAction(Actions.RequestSkill)
  }
  console.log('exp area render')
  return (
    <div className='exp-area'>
      <p className='name-line'>{charName}</p>
      <span className='class-line'>
        <p className='class-and-level'>{t('user-class-and-level',{class:t(className), level: userLevel})}</p>
        <AoButton styles='skill-button' onClick={openStats}>
          <img src={require('../../../../assets/Icons/gameplay/ico_skillpoints.png')}/>
        </AoButton>
      </span>
      <span className='exp-bar-container'>
        <ProgressBar styles='exp-bar-outer' barStyle='exp-bar-inner'
                     currentVal={expBar.min} maxValue={expBar.max} 
                     displayMax={true} customText={expBarText}/>
      </span>
      <span className='time-bar'>
        <p className='timer'>{gameTime}</p>
      </span>
    </div>
  )
}