import { useSelector } from 'react-redux'
import { selectAvailableCharacters } from '../../../redux/CharSelectionSlice'
import CharacterSelector from '../CharacterSelector/character-selector'
import CharSelectBottom from '../CharSelectBottom/char-select-bottom'
import Header from '../Header/header'
import './character-selection.scss'


export default function CharacterSelectionScreen() {
  const availableCharacters = useSelector(selectAvailableCharacters)
  return (
    <div className='character-selection-screen'>
      <Header/>
      <div className='char-list'>
        <div className='char-list-line animate-left'>
          {
            availableCharacters.length > 0 ?
            availableCharacters.slice(0,5).map( item => <CharacterSelector charInfo={item}/>) :
            null
          }
        </div>
        <div className='char-list-line animate-right'>
          {
            availableCharacters.length > 0 ?
            availableCharacters.slice(5, 10).map( item => <CharacterSelector charInfo={item}/>) :
            null
          }
        </div>
      </div>
      <CharSelectBottom/>
    </div>
  )
}