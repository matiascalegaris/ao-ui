import GameBarButton from "../ao-button/GameBarButton/game-bar-button"
import Frame from "../Frame/frame"
import './iframe-dialog.scss'

export const IFrameDialog = ({options}) => {

  
  return (
    <Frame styles='iframe-parent-style' contentStyles='iframe-content'>
      <iframe src={options.url} className="iframe-style"></iframe>
      <GameBarButton styles='close-button' onClick={options.onClose}>
        <img src={require('../../../assets/Icons/gameplay/ico_close.png')}></img>
      </GameBarButton>
    </Frame>
  )
}