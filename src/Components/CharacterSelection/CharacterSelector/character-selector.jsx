import './character-selector.scss'

export default function CharacterSelector({charInfo}) {
  return (
    <div className='character-selector-container '>
      <div className='frame'>
        <span className='selection-marker'></span>
        <div className='char-render-area'></div>
      </div>
      <p className='char-name'>{charInfo.name}</p>
    </div>
  );
}