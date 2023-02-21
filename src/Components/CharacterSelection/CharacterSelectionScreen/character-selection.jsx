import CharSelectBottom from '../CharSelectBottom/char-select-bottom'
import Header from '../Header/header'
import './character-selection.scss'


export default function CharacterSelectionScreen() {
  return (
    <div className='character-selection-screen'>
      <Header/>
      <div className='char-list'></div>
      <CharSelectBottom/>
    </div>
  )
}