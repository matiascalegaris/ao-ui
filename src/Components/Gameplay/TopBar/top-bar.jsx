import { useSelector } from 'react-redux'
import GameBarButton from '../../Common/ao-button/GameBarButton/game-bar-button'
import './top-bar.scss'
import { selectFps } from '../../../redux/GameplaySlices/GameStateSlice'
import { selectCurrentCoordinates, selectIsSafeMap, selectMapName, selectMapNumber } from '../../../redux/GameplaySlices/MapInfoSlice'
import { Actions } from '../../../constants'

export default function TopBar({styles}) {
  const fps = useSelector(selectFps)
  const onClose = evt => {
    window.parent.BabelUI.OpenVBDialog('frmCerrar')
  }
  const minimize = evt => {
    window.parent.BabelUI.RequestAction(Actions.Minimize)
  }
  const openSettings = evt => {
    window.parent.BabelUI.OpenVBDialog('frmOpciones')
  }
  const showHelp = evt => {
    
  }
  const mapName = useSelector(selectMapName)
  const isSafe = useSelector(selectIsSafeMap)
  const mapNumber = useSelector(selectMapNumber)
  const mapCoords = useSelector(selectCurrentCoordinates)
  return (
    <div className={'top-bar ' + styles}>
      <img className='ao-logo' src={require('../../../assets/Misc/ao20_horizontal.png')} />
      <div className='gm-command-area'></div>
      <div className='fps-area'>
        <p className='fps'>FPS: {fps}</p>
      </div>
      <div className='location-coords'>
        <p className='map-name'>{mapName}</p>
        <p className={ 'map-coords ' + (isSafe ? 'safe-area' : '') }>{`${mapNumber}-${mapCoords.x}-${mapCoords.y}`}</p>
      </div>
      <div className='button-online-area'>
        <GameBarButton styles='bar-button' onClick={openSettings}>
          <img src={require('../../../assets/Icons/gameplay/ico_gear.png')}></img>
        </GameBarButton>
        <GameBarButton styles='bar-button' onClick={showHelp}>
          <img src={require('../../../assets/Icons/gameplay/ico_info.png')}></img>
        </GameBarButton>
        <span className='spacer'></span>
        <GameBarButton styles='bar-button' onClick={minimize}>
          <img src={require('../../../assets/Icons/gameplay/ico_minimize.png')}></img>
        </GameBarButton>
        <GameBarButton styles='bar-button' onClick={onClose}>
          <img src={require('../../../assets/Icons/gameplay/ico_close.png')}></img>
        </GameBarButton>
      </div>
    </div>
  )
}