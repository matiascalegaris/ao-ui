import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectCharacterClass, selectCharacterExp, selectCharacterLevel, selectCharacterName } from '../../../../../redux/GameplaySlices/CharacterInfoSlice';
import AoButton from '../../../../Common/ao-button/ao-button';
import ProgressBar from '../../../../Common/ProgressBar/progress-bar';
import './exp-area.scss'
import { Actions, classList } from '../../../../../constants';
import { GameTimer } from './GameTimer';
import { useState } from 'react';
import { ErrorBoundary } from '../../../../ErrorBoundary/error-boundary';
import { setGameActiveDialog } from '../../../../../redux/GameplaySlices/GameStateSlice';

export default function ExpArea() {
  const { t } = useTranslation();
  const charName = useSelector(selectCharacterName)
  const className = classList[useSelector(selectCharacterClass)]
  const userLevel = useSelector(selectCharacterLevel)
  const expBar = useSelector(selectCharacterExp)
  const expBarText = expBar.max === 0 ? t('max-level-exp') : undefined;
  const [displayPercentExp, setDisplayPercentExp] = useState(false)
  const dispatch = useDispatch()
  const openStats = evt => {
    // dispatch(setGameActiveDialog({
    //   popUp:'skill-list',
    //   details: {
    //     availableSkills: 200,
    //     skillList: Array(25).fill(0).map( (e,index) => (index))
    //   }
    // })) 
    window.parent.BabelUI.RequestAction(Actions.RequestSkill)
  }
  //console.log('exp area render')
  const clickExpBar = evt => {
    setDisplayPercentExp(!displayPercentExp)
  }
  return (
    <div className='exp-area'>
      <ErrorBoundary compName="exp area">
      <p className='name-line'>{charName}</p>
      <span className='class-line'>
        <p className='class-and-level'>{t('user-class-and-level',{class:t(className), level: userLevel})}</p>
        <AoButton styles='skill-button' onClick={openStats}>
          <img src={require('../../../../../assets/Icons/gameplay/ico_skillpoints.png')}/>
        </AoButton>
      </span>
      <span className='exp-bar-container'>
        <ProgressBar styles='exp-bar-outer' barStyle='exp-bar-inner'
                     currentVal={expBar.min} maxValue={expBar.max} 
                     displayMax={true} customText={expBarText}
                     displayPercent={displayPercentExp}
                     onClick={clickExpBar}/>
      </span>
      <span className='time-bar'>
        <GameTimer/>
      </span>
      </ErrorBoundary>
    </div>
  )
}