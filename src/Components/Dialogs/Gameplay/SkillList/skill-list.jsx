import { useTranslation } from 'react-i18next';
import AoDialog from '../../../Common/ao-dialog/ao-dialog'
import './skill-list.scss'
import AoButton from '../../../Common/ao-button/ao-button';
import { useDispatch } from 'react-redux';
import { setGameActiveDialog } from '../../../../redux/GameplaySlices/GameStateSlice';
import GameBarButton from '../../../Common/ao-button/GameBarButton/game-bar-button';

const SkillGroups = {
  combat: [
    [{name: 'Magic', currValue: 100, id: 1}, {name: 'Meditate', currValue: 100, id: 1}, {name: 'Magic resistance', currValue: 100, id: 1}],
    [{name: 'Combat skill', currValue: 100, id: 1}, {name: 'Hand combat', currValue: 100, id: 1}, {name: 'Weapong combat', currValue: 100, id: 1}, {name: 'Shield defence', currValue: 100, id: 1},{name: 'Ranged weapons', currValue: 100, id: 1},{name: 'Stab', currValue: 100, id: 1}],
    [{name: 'Steal', currValue: 100, id: 1}]
  ],
  other: [
    [{name: 'magic', currValue: 100, id: 1}, {name: 'magic', currValue: 100, id: 1}, {name: 'magic', currValue: 100, id: 1}],
    [],
    []
  ]
}
export const SkillList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const onClose = e => {
    dispatch(setGameActiveDialog(null))
  }

  const decreaseAmount = () => {

  }

  const increaseAmount = () => {
    
  }
  const maxAmount = () => {
    
  }
  return (
    <AoDialog styles='skill-dialog' contentStyles='content'>
      <div className='header-line'>
        <img src={require('../../../../assets/Icons/Dialogs/AOShopIcon.png')}/>
        <h1 className='game-dialog-header'>{t('skill-list').toUpperCase()}</h1>
      </div>
      <span className='header-underline'></span>
      <AoButton styles='close-button' onClick={onClose}>
        <img src={require('../../../../assets/Icons/gameplay/ico_close.png')}></img>
      </AoButton>
      <span className='avialble-skill-line'>
        <p className='title'>{t('availableskills').toLocaleUpperCase()}</p>
        <p className='value'>{46}</p>
      </span>
      <div className='skill-area'>
        <div className='skill-column title-left'>
          <AoButton styles='column-title'>{t('combat skills').toLocaleUpperCase()}</AoButton>
          {
            SkillGroups.combat.map( (group, gIndex) => (
              <>
                {
                  group.map( (opt,index) => (
                    <span className='skill-line'>
                      <p className='sname'>{t(opt.name)}</p>
                      <GameBarButton styles='increment-decrement-buttons' onClick={decreaseAmount}>-</GameBarButton>
                      <p className='currentValue'>{opt.currValue}</p>
                      <GameBarButton styles='increment-decrement-buttons' onClick={increaseAmount}>+</GameBarButton>
                      <GameBarButton styles='increment-decrement-buttons' onClick={maxAmount}>max</GameBarButton>
                    </span>
                ))}
                { gIndex < group.length ? <span className='split-line'></span> : null}
              </>
          ))}
        </div>
        <div className='skill-column title-right'>
          <AoButton styles='column-title'>{t('combat skills').toLocaleUpperCase()}</AoButton>
        </div>
      </div>
    </AoDialog>
  )
}