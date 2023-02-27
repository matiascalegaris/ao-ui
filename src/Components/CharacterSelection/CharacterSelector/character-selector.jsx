import DrawCharacter from '../../Common/DrawCharacter/draw-character';
import './character-selector.scss'

export default function CharacterSelector({charInfo, ...otherProps}) {
  return (
    <div className='character-selector-container ' {...otherProps}>
      <div className='frame'>
        <span className='selection-marker'></span>
        <div className='char-render-area'>
          {
            charInfo.name != null ? 
            <DrawCharacter body={charInfo.body} head={charInfo.head} helm={charInfo.helm} shield={charInfo.shield} weapon={charInfo.weapon} /> 
            : null
          }
        </div>
      </div>
      <p className='char-name'>{charInfo.name}</p>
    </div>
  );
}