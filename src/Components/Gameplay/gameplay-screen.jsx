import Chat from './Chat/chat'
import './gameplay-screen.scss'
import MiniMap from './MiniMap/mini-map'
import SideMenu from './SideMenu/side-menu'

export default function GameplayScreen() {
  return (
    <div className='gameplay-screen'>
      <div className='top-bar'></div>
      <div className='gameplay-area'>
      <span className='menu-separator'><span className='frame-corner bot-left'></span></span>
        <div className='gameplay-and-chat'>
          <div className='chat-section'>
            <Chat/>
            <MiniMap/>
          </div>
          <div className='gameplay-window'></div>
          <span className='gameplay-bottom-frame'></span>
        </div>
        <span className='menu-separator'><span className='frame-corner bot-right'></span></span>
        <SideMenu styles='right-panel'/>
      </div>
    </div>
  )
}
