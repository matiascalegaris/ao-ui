import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { RegisterApiCallback } from '../../Api/Api'
import { postChatMessage } from '../../redux/GameplaySlices/ChatSlice'
import Chat from './Chat/chat'
import './gameplay-screen.scss'
import MiniMap from './MiniMap/mini-map'
import SideMenu from './SideMenu/side-menu'
import TopBar from './TopBar/top-bar'

export default function GameplayScreen() {
  const dispatch = useDispatch()
  useEffect(() => {
    RegisterApiCallback('PostChatMsg', (msg) => {
      dispatch(postChatMessage(msg))
    })
  },[]);
  useEffect( () => () => {
    RegisterApiCallback('PostChatMsg', (charInfo) => {})
  }, [] );
  return (
    <div className='gameplay-screen'>
      <TopBar styles='top-bar'/>
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
