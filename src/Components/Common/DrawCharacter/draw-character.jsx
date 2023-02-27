import Sprite from '../Sprite/sprite'
import './draw-character.scss'

const DrawCharacter = ({ body, head, helm, shield, weapon }) => {
  const charInfo = window.parent.BabelUI.GetCharacterDrawInfo(body, head, helm, shield, weapon)
  console.log(charInfo)
  const bodyStyle = {
    width: `${charInfo.body.body.width}px`,
    height: `${charInfo.body.body.height}px`,
  }
  const headStyle = {
    top: `${charInfo.body.HeadOffsetY / 2}px`,
  }
  return (
    <div className='character-container'>
      <div className='body-area' style={bodyStyle}>
        <Sprite className='body' imageName={charInfo.body.body.imageNumber} x={charInfo.body.body.startX}
        y={charInfo.body.body.startY} width={charInfo.body.body.width} height={charInfo.body.body.height}/>
      </div>
      <div className='head-area' style={headStyle}>
        <Sprite className='head' imageName={charInfo.head.imageNumber} x={charInfo.head.startX}
        y={charInfo.head.startY} width={charInfo.head.width} height={charInfo.head.height}/>
      </div>
    </div>
  )
}

export default DrawCharacter