import GameBarButton from '../../Common/ao-button/GameBarButton/game-bar-button'
import './top-bar.scss'

export default function TopBar({styles}) {
  return (
    <div className={'top-bar ' + styles}>
      <img className='ao-logo' src={require('../../../assets/Misc/ao20_horizontal.png')} />
      <div className='gm-command-area'></div>
      <div className='fps-area'></div>
      <div className='location-coords'></div>
      <div className='button-online-area'>
        <GameBarButton styles='bar-button'>
          <img src={require('../../../assets/Icons/gameplay/ico_gear.png')}></img>
        </GameBarButton>
        <GameBarButton styles='bar-button'>
          <img src={require('../../../assets/Icons/gameplay/ico_info.png')}></img>
        </GameBarButton>
        <span className='spacer'></span>
        <GameBarButton styles='bar-button'>
          <img src={require('../../../assets/Icons/gameplay/ico_minimize.png')}></img>
        </GameBarButton>
        <GameBarButton styles='bar-button'>
          <img src={require('../../../assets/Icons/gameplay/ico_close.png')}></img>
        </GameBarButton>
        
          
          
      </div>
    </div>
  )
}