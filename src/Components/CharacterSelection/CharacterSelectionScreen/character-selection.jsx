import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAvailableCharacters, selectCharacter, selectSelectedCharacter } from '../../../redux/CharSelectionSlice'
import { selectExitScreenActive } from '../../../redux/UIFlowSlice'
import CharacterSelector from '../CharacterSelector/character-selector'
import CharSelectBottom from '../CharSelectBottom/char-select-bottom'
import Header from '../Header/header'
import './character-selection.scss'


export default function CharacterSelectionScreen() {
  const availableCharacters = useSelector(selectAvailableCharacters)
  const dispatch = useDispatch()
  const selectedCharacter = useSelector(selectSelectedCharacter)
  const selectedId = selectedCharacter == null ? -1 : selectedCharacter.index
  const selectOption = (selection) => {
    if (selectedId < 1 || (selectedCharacter.index !== selection.index &&
      selection.name != null )) {
      dispatch(selectCharacter(selection.index));
      window.parent.BabelUI.SelectCharacter(selection.index)
    }
  }
  const loginWithCharaceter = (charater) =>{
    window.parent.BabelUI.LoginCharacter(charater)
  }
  const doBack = event => {
    event.preventDefault();
    window.parent.BabelUI.ExitCharacterSelection();
  }
  const transitionActive = useSelector(selectExitScreenActive)
  let animLeftStyles = ' animate-left'
  let animRightStyles = ' animate-right'
  if (transitionActive) {
    animLeftStyles = ' exit-animation-left'
    animRightStyles = ' exit-animation-right'
  }
  useEffect(() => {
    setTimeout(() => {
      if (availableCharacters[0].name != null) {
        dispatch(selectCharacter(availableCharacters.index));
        window.parent.BabelUI.SelectCharacter(availableCharacters.index)
      }
    }, 100)    
  },[]);
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
                onClick={  evt => {selectOption(item)}}/>) :
            null
          }
        </div>
        <div className={'char-list-line' + animRightStyles}>
          {
            availableCharacters.length > 0 ?
            availableCharacters.slice(5, 10).map( item => <CharacterSelector selected={selectedId === item.index} key={item.index} charInfo={item} onClick={ evt => {selectOption(item)}}/>) :
            null
          }
        </div>
      </div>
      <CharSelectBottom/>
    </div>
  )
}