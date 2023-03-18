import { GetColorForCharacterStatus, useSingleAndDoubleClick } from '../../../Tools/Utils';
import DrawCharacter from '../../Common/DrawCharacter/draw-character';
import './character-selector.scss'

export default function CharacterSelector({charInfo, selected, onSingleClick, onDoubleClick, ...otherProps}) {
  const nameColor = GetColorForCharacterStatus(charInfo.status)
  const onClick = useSingleAndDoubleClick(
    () => onSingleClick(charInfo),
    () => onDoubleClick(charInfo),
    250, true
  );
  return (
    <div className='character-selector-container ' {...otherProps} onClick={onClick}>
      <div className='frame'>
        <span className='selection-marker'></span>
        <div className={'char-render-area' + (selected ? ' selected-char' : '')}>
          {
            charInfo.name != null ? 
            <DrawCharacter body={charInfo.body} head={charInfo.head} helm={charInfo.helm} shield={charInfo.shield} weapon={charInfo.weapon} /> 
            : null
          }
        </div>
      </div>
      <p className={'char-name ' + nameColor}>{charInfo.name}</p>
    </div>
  );
}