import Sprite from '../Sprite/sprite'
import './draw-character.scss'

const DrawCharacter = ({ body, head, helm, shield, weapon, styles, style }) => {
  const charInfo = window.parent.BabelUI.GetCharacterDrawInfo(body, head, helm, shield, weapon)
  const bodyStyle = {
    width: `${charInfo.body.body.width}px`,
    height: `${charInfo.body.body.height}px`,
  }
  const headStyle = {
    top: `${charInfo.body.HeadOffsetY + 13}px`,
  }
  return (
    <div className={'character-container ' + styles} style={style}>
      <div className='body-area' style={bodyStyle}>
        <Sprite className='body' imageName={charInfo.body.body.imageNumber} x={charInfo.body.body.startX}
        y={charInfo.body.body.startY} width={charInfo.body.body.width} height={charInfo.body.body.height}/>
        <div className='weapon'>
        { charInfo.weapon.imageNumber >= 0 ?
            <Sprite imageName={charInfo.weapon.imageNumber} x={charInfo.weapon.startX}
                    y={charInfo.weapon.startY} width={charInfo.weapon.width} height={charInfo.weapon.height}/>
            : null
          }
        </div>
      </div>
      <div className='head-area' style={headStyle}>
        <div className='head'>
          { charInfo.head.imageNumber >= 0 ?
            <Sprite imageName={charInfo.head.imageNumber} x={charInfo.head.startX}
                    y={charInfo.head.startY} width={charInfo.head.width} height={charInfo.head.height}/>
            : null
          }
        </div>
        <div className='helm'>
          { charInfo.helm.imageNumber >= 0 ?
            <Sprite imageName={charInfo.helm.imageNumber} x={charInfo.helm.startX}
                    y={charInfo.helm.startY} width={charInfo.helm.width} height={charInfo.helm.height}/>
            : null
          }
        </div>
      </div>
      <div className='shield'>
        { charInfo.shield.imageNumber >= 0 ?
            <Sprite imageName={charInfo.shield.imageNumber} x={charInfo.shield.startX}
                    y={charInfo.shield.startY} width={charInfo.shield.width} height={charInfo.shield.height}/>
            : null
          }
        </div>
    </div>
  )
}

export default DrawCharacter