import { useDispatch, useSelector } from 'react-redux'
import { selectAvailableCharacters, selectCharacter, selectSelectedCharacter } from '../../../redux/CharSelectionSlice'
import CharacterSelector from '../CharacterSelector/character-selector'
import CharSelectBottom from '../CharSelectBottom/char-select-bottom'
import Header from '../Header/header'
import './character-selection.scss'


export default function CharacterSelectionScreen() {
  const availableCharacters = useSelector(selectAvailableCharacters)
  const dispatch = useDispatch()
  const selectedCharacter = useSelector(selectSelectedCharacter)
  const selectedId = selectedCharacter == null ? -1 : selectedCharacter.index
  const seletCharacter = selection => {
    if ( selectedId < 1 || selectedCharacter.index != selection.index) {
      dispatch(selectCharacter(selection.index));
      window.parent.BabelUI.SelectCharacter(selection.index)
    }
  }
  return (
    <div className='character-selection-screen'>
      <Header/>
      <div className='char-list'>
        <div className='char-list-line animate-left'>
          {
            availableCharacters.length > 0 ?
            availableCharacters.slice(0,5).map( item => <CharacterSelector selected={selectedId === item.index} key={item.index} charInfo={item} onClick={ () => {seletCharacter(item)}}/>) :
            null
          }
        </div>
        <div className='char-list-line animate-right'>
          {
            availableCharacters.length > 0 ?
            availableCharacters.slice(5, 10).map( item => <CharacterSelector selected={selectedId === item.index} key={item.index} charInfo={item} onClick={ () => {seletCharacter(item)}}/>) :
            null
          }
        </div>
      </div>
      <CharSelectBottom/>
    </div>
  )
}