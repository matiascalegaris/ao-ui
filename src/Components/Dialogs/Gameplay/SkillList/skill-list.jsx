import { useTranslation } from 'react-i18next';
import AoDialog from '../../../Common/ao-dialog/ao-dialog'
import './skill-list.scss'
import AoButton from '../../../Common/ao-button/ao-button';
import { useDispatch } from 'react-redux';
import { setGameActiveDialog } from '../../../../redux/GameplaySlices/GameStateSlice';
import GameBarButton from '../../../Common/ao-button/GameBarButton/game-bar-button';
import { SkillListId } from '../../../../constants';
import { useState } from 'react';

const SkillGroups = {
  combat: [
    [{name: 'Magic', id: SkillListId.Magic}, 
     {name: 'Meditatation', id: SkillListId.Meditate}, 
     {name: 'Magic resistance', id: SkillListId.MagicResistance}],
    
     [{name: 'Combat dexterity', id: SkillListId.CombatTechnique}, 
     {name: 'Unarmed combat', id: SkillListId.Wrestling}, 
     {name: 'Armed combat', id: SkillListId.Weapons}, 
     {name: 'Shield defence', id: SkillListId.Defense},
     {name: 'Ranged weapons', id: SkillListId.Projetiles},
     {name: 'Stabbing', id: SkillListId.Stab}],
    
     [{name: 'Stealing', id: SkillListId.Steal}]
  ],
  other: [
    [{name: 'Logging', id: SkillListId.Lumber}, 
     {name: 'Fishing', id: SkillListId.Fishing}, 
     {name: 'Mining', id: SkillListId.Mining},
     {name: 'Carpentry', id: SkillListId.Carpenter},
     {name: 'Smithy', id: SkillListId.Smith}],
    
     [{name: 'Hiding', currValue: 0, id: SkillListId.Hide}, 
     {name: 'Survival', currValue: 0, id: SkillListId.Survival}],
    
     [{name: 'Commerce', id: SkillListId.Comerce}, 
     {name: 'Leadership', id: SkillListId.Leadership}, 
     {name: 'Taming', id: SkillListId.Taming},
     {name: 'Sailing', id: SkillListId.Sail},
     {name: 'Tailoring', id: SkillListId.Tailoring},
     {name: 'Alchemy', id: SkillListId.Alchemy}]
  ]
}
export const SkillList = ({details}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [ modifiedSkills, setModifiedSkills] = useState(Array(SkillListId.SkillTypeCount).fill(0))
  const [ availableSkills, setAvailableSkills] = useState(details.availableSkills)

  const onClose = e => {
    dispatch(setGameActiveDialog(null))
  }

  const decreaseAmount = (skillId) => {
    if (modifiedSkills[skillId] > 0) {
      modifiedSkills[skillId] -= 1
      setModifiedSkills(modifiedSkills)
      setAvailableSkills(availableSkills + 1)
    }
  }

  const increaseAmount = (skillId) => {
    if (availableSkills <= 0) return

    if (details.skillList[skillId] + modifiedSkills[skillId] < 100) {
      modifiedSkills[skillId] += 1
      setModifiedSkills(modifiedSkills)
      setAvailableSkills(availableSkills - 1)
    }
  }
  const maxAmount = (skillId) => {
    if (availableSkills <= 0) return

    const amount = Math.min(100 - (details.skillList[skillId] + modifiedSkills[skillId]), availableSkills)
    modifiedSkills[skillId] += amount
    setModifiedSkills(modifiedSkills)
    setAvailableSkills(availableSkills - amount)
  }
  const onAcceptChange = evt => {
    if (details.availableSkills === availableSkills ) {
      dispatch(setGameActiveDialog(null))
      return;
    }
    const questionACtion = {
      popUp:'option-dialog',
      text: t('update-skill-question'),
      actions: [{
        caption: t('decline').toUpperCase(),
        action:  evt => {          
          dispatch(setGameActiveDialog(null))
        }}, {
        caption: t('accept').toUpperCase(),
        action:  evt => {
          window.parent.BabelUI.UpdateSkills(modifiedSkills)
          dispatch(setGameActiveDialog(null))
        },
        isRed: true}
      ]
    }
    dispatch(setGameActiveDialog(questionACtion))
  }
  return (
    <AoDialog styles='skill-dialog' contentStyles='content'>
      <div className='header-line'>
        <img className='skill-icon' src={require('../../../../assets/Icons/gameplay/ico_skillpoints.png')}/>
        <h1 className='game-dialog-header'>{t('skill-list').toUpperCase()}</h1>
      </div>
      <span className='header-underline'></span>
      <AoButton styles='close-button' onClick={onClose}>
        <img src={require('../../../../assets/Icons/gameplay/ico_close.png')}></img>
      </AoButton>
      <span className='avialble-skill-line'>
        <p className='title'>{t('availableskills').toLocaleUpperCase()}</p>
        <p className='value'>{availableSkills}</p>
      </span>
      <div className='skill-area'>
        <div className='skill-column title-left'>
          <AoButton styles='column-title'>{t('combat skills').toLocaleUpperCase()}</AoButton>
          {
            SkillGroups.combat.map( (group, gIndex) => (
              <>
                {
                  group.map( (opt, index) => (
                    <span className='skill-line' key={opt.id}>
                      <p className='sname'>{t(opt.name)}</p>
                      <GameBarButton styles='increment-decrement-buttons' 
                        disabled={modifiedSkills[opt.id] === 0}
                        onClick={() => decreaseAmount(opt.id)}>-</GameBarButton>
                      <p className='currentValue'>{details.skillList[opt.id] + modifiedSkills[opt.id]}</p>
                      <GameBarButton styles='increment-decrement-buttons' 
                        disabled={details.skillList[opt.id] + modifiedSkills[opt.id] >= 100 || availableSkills === 0}
                        onClick={() => increaseAmount(opt.id)}>+</GameBarButton>
                      <GameBarButton styles='increment-decrement-buttons' 
                        disabled={details.skillList[opt.id] + modifiedSkills[opt.id] >= 100 || availableSkills === 0}
                        onClick={() => maxAmount(opt.id)}>max</GameBarButton>
                    </span>
                ))}
                { gIndex < (SkillGroups.combat.length - 1) ? <span className='split-line'></span> : null}
              </>
          ))}
        </div>
        <div className='skill-column title-right'>
          <AoButton styles='column-title'>{t('other skills').toLocaleUpperCase()}</AoButton>
          {
            SkillGroups.other.map( (group, ogIndex) => (
              <>
                {
                  group.map( (opt,index) => (
                    <span className='skill-line' key={opt.id}>
                      <p className='sname'>{t(opt.name)}</p>
                      <GameBarButton styles='increment-decrement-buttons' 
                        disabled={modifiedSkills[opt.id] === 0}
                        onClick={() => decreaseAmount(opt.id)}>-</GameBarButton>
                      <p className='currentValue'>{details.skillList[opt.id] + modifiedSkills[opt.id]}</p>
                      <GameBarButton styles='increment-decrement-buttons' 
                        disabled={details.skillList[opt.id] + modifiedSkills[opt.id] >= 100 || availableSkills === 0}
                        onClick={() => increaseAmount(opt.id)}>+</GameBarButton>
                      <GameBarButton styles='increment-decrement-buttons' 
                        disabled={details.skillList[opt.id] + modifiedSkills[opt.id] >= 100 || availableSkills === 0}
                        onClick={() => maxAmount(opt.id)}>max</GameBarButton>
                    </span>
                ))}
                { ogIndex < (SkillGroups.other.length - 1) ? <span className='split-line'></span> : null}
              </>
          ))}
        </div>
      </div>
      <span className='footer-underline'></span>
      <AoButton styles='save-changes' onClick={onAcceptChange}>{t('accept').toLocaleUpperCase()}</AoButton>
    </AoDialog>
  )
}