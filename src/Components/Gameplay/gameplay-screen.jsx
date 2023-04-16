import './gameplay-screen.scss'
import SideMenu from './SideMenu/side-menu'

export default function GameplayScreen() {
  return (
    <div className='gameplay-screen'>
      <div className='top-bar'></div>
      <div className='gameplay-area'>
      <div className='menu-separator'></div>
        <div className='gameplay-and-chat'>
          <div className='chat-section'>
            <div className='chat-area'></div>
            <div className='map-area'>
              <div className='map-content'></div>
            </div>
          </div>
          <div className='gameplay-window'></div>
        </div>
        <div className='menu-separator'></div>
        <SideMenu styles='right-panel'/>
      </div>
    </div>
  )
}
