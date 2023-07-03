import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { RegisterApiCallback } from '../../../../Api/Api'
import { removeCharacter, selectAvailableCharacters, selectCharacter, selectSelectedCharacter } from '../../../../redux/CharSelectionSlice'
import { displayLoading, displayLoadingText, selectExitScreenActive, setActiveDialog, setActivePopup, setFadeOut } from '../../../../redux/UIFlowSlice'
import OptionDialog from '../../../Dialogs/OptionDialog/option-dialog'
import ValidateCode from '../../../Dialogs/validate-code/validate-code'
import CharacterSelector from '../CharacterSelector/character-selector'
import CharSelectBottom from '../CharSelectBottom/char-select-bottom'
import Header from '../Header/header'
import './character-selection.scss'


export default function CharacterSelectionScreen() {
  const [selectionState, setSelectionState] = useState({popUp:null, lastSelectTime: 0, lastSelected:-1});
  const availableCharacters = useSelector(selectAvailableCharacters)
  const dispatch = useDispatch()
  const { t } = useTranslation();
  const selectedCharacter = useSelector(selectSelectedCharacter)
  const selectedId = selectedCharacter == null ? -1 : selectedCharacter.index
  const transitionActive = useSelector(selectExitScreenActive)
  const selectOption = (selection) => {
    const timeStamp = Date.now()
    if (selectedId < 0 || (selectedCharacter.index !== selection.index &&
        selection.name != null )) {
      dispatch(selectCharacter(selection.index));
      window.parent.BabelUI.SelectCharacter(selection.index)
      setSelectionState({...selectionState, lastSelectTime:timeStamp, lastSelected:selection})
    }
    else if (selection === selectionState.lastSelected &&
             timeStamp - selectionState.lastSelectTime < 350) {
      loginWithCharaceter(selection)
      dispatch(setFadeOut(true))
    }
    else if(selectedCharacter.index === selection.index) {
      setSelectionState({...selectionState, lastSelectTime:timeStamp, lastSelected:selection})
    }
  }

  const loginWithCharaceter = (character) =>{
    if (transitionActive) return
    if (character != null && character.name != null) {
      window.parent.BabelUI.LoginCharacter(character.index)
    }
  }
  const doBack = event => {
    event.preventDefault();
    window.parent.BabelUI.ExitCharacterSelection();
  }
  
  let animLeftStyles = ' animate-left'
  let animRightStyles = ' animate-right'
  if (transitionActive) {
    animLeftStyles = ' exit-animation-left'
    animRightStyles = ' exit-animation-right'
  }
  
  useEffect(() => {
    setTimeout(() => {
      if (availableCharacters[0].name != null) {
        dispatch(selectCharacter(availableCharacters[0].index));
        window.parent.BabelUI.SelectCharacter(availableCharacters[0].index)
      }
    }, 100)
    RegisterApiCallback('RequestDeleteCode', (charInfo) => {
      dispatch(displayLoading(false))
      setSelectionState({...selectionState, popUp:{popUp:'validate-erase-code'}})
    })
    RegisterApiCallback('ConfirmDeleteChar', (charInfo) => {
      dispatch(displayLoading(false))
      dispatch(removeCharacter(charInfo));
      setSelectionState({...selectionState, popUp:null})
    }) 
  },[]);
  useEffect( () => () => {
    RegisterApiCallback('RequestDeleteCode', (charInfo) => {})
    RegisterApiCallback('ConfirmDeleteChar', (charInfo) => {})
  }, [] );
  const onDeleteCharPress = event => {
    if (selectedCharacter != null && selectedCharacter.name != null) {
      setSelectionState({...selectionState, popUp:{
        popUp:'option-dialog',
        text: t('delete-char-message', { charName: selectedCharacter.name}),
        actions: [{
          caption: t('cancel').toUpperCase(),
          action:  evt => {
            setSelectionState({...selectionState, popUp:null})
          }}, {
          caption: t('continue').toUpperCase(),
          action:  evt => {
            dispatch(displayLoadingText(t('connecting-to-server')))
            window.parent.BabelUI.RequestDeleteCharacter(selectedCharacter.index)
          },
          isRed: true}
        ]
      }})
    }
  }
  const deleteChar = code => {
    dispatch(displayLoadingText(t('connecting-to-server')))
    window.parent.BabelUI.ConfirmDeleteCharacter(selectedCharacter.index, code)
  }
  const closePopUp = evt => {
    setSelectionState({...selectionState, popUp:null})
  }
  const onTransferCharPress = event => {
    if (selectedCharacter != null && selectedCharacter.name != null) {
      setSelectionState({...selectionState, popUp:{
        popUp:'option-dialog',
        text: t('transfer-char-message', { charName: selectedCharacter.name}),
        actions: [{
          caption: t('cancel').toUpperCase(),
          action:  evt => {
            closePopUp(evt)
          }}, {
          caption: t('continue').toUpperCase(),
          action:  evt => {
            closePopUp(evt)
            dispatch(setActivePopup({popUp:'transfer-character', data: selectedCharacter}))
          },
          isRed: true}
        ]
      }})
    }
  }
  return (
    <div className='character-selection-screen'>
      <Header goBack={doBack}/>
      <div className='char-list'>
        <div className={'char-list-line' + animLeftStyles}>
          {
            availableCharacters.length > 0 ?
            availableCharacters.slice(0,5).map( item => <CharacterSelector 
                selected={selectedId === item.index} 
                key={item.index} charInfo={item} 
                onClick={() =>selectOption(item)} />) :
            null
          }
        </div>
        <div className={'char-list-line' + animRightStyles}>
          {
            availableCharacters.length > 0 ?
            availableCharacters.slice(5, 10).map( item => <CharacterSelector 
              selected={selectedId === item.index} 
              key={item.index} charInfo={item} 
              onClick={() =>selectOption(item)}/>) :
            null
          }
        </div>
      </div>
      <CharSelectBottom onDeleteChar={onDeleteCharPress} onTransferChar={onTransferCharPress}/>
      {
        selectionState.popUp ?
        <div className='popups'>
          {{
              'option-dialog':<OptionDialog styles='centered' settings={selectionState.popUp}/>,
              'validate-erase-code':<ValidateCode styles='centered' onCancel={closePopUp} onAccept={deleteChar}/>,
            }
            [selectionState.popUp.popUp]
          }
        </div> :
        null
      }
    </div>
  )
}