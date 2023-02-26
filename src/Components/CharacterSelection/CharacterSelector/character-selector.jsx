import ManagedSprite from '../../Common/ManagedSprite/manged-sprite';
import './character-selector.scss'

export default function CharacterSelector({charInfo, ...otherProps}) {
  return (
    <div className='character-selector-container ' {...otherProps}>
      <div className='frame'>
        <span className='selection-marker'></span>
        <div className='char-render-area'>
          <ManagedSprite imageName="1148" x={26} y={0} width={26} height={53}></ManagedSprite>
        </div>
      </div>
      <p className='char-name'>{charInfo.name}</p>
    </div>
  );
}